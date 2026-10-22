require 'cgi'
require 'date'
require 'set'
require 'time'

module Jekyll
  module HomeAssistant
    # Builds the link-in-bio page at /bio/ from source/_data/bio.yml.
    #
    # The page is what Instagram's "link in bio" points at, so it is assembled
    # from data the site already has: blog posts, release notes and their
    # og_image. Nothing is fetched over the network, so it cannot slow down or
    # break the build for reasons outside this repository.
    #
    # bio.yml is edited by people who don't run the site locally, so every
    # mistake fails the build with the key path at fault, rather than silently
    # rendering an empty section in production.
    module Bio
      class ConfigError < StandardError; end

      SECTION_TYPES = %w[links feed].freeze
      SOURCE_TYPES = %w[posts pinned].freeze
      OG_ENDPOINT = 'https://assets.openhomefoundation.org/opengraph'.freeze
      PLATFORMS = {
        'mastodon' => 'Mastodon', 'instagram' => 'Instagram', 'github' => 'GitHub',
        'youtube' => 'YouTube', 'discord' => 'Discord', 'reddit' => 'Reddit',
        'x' => 'X', 'linkedin' => 'LinkedIn', 'bluesky' => 'Bluesky',
        'facebook' => 'Facebook', 'tiktok' => 'TikTok', 'threads' => 'Threads',
        'rss' => 'RSS', 'web' => 'Website',
      }.freeze

      module_function

      # -- Validation ----------------------------------------------------------

      def validate!(config)
        fail!('', 'is empty or missing') unless config.is_a?(Hash)

        sources = config['sources'] || {}
        fail!('sources', 'must be a map of name: source') unless sources.is_a?(Hash)
        sources.each { |name, source| validate_source!(name, source, sources) }
        sources.each_key { |name| detect_cycle!(name, sources) }

        sections = config['sections'] || []
        fail!('sections', 'must be a list') unless sections.is_a?(Array)
        sections.each_with_index { |section, i| validate_section!(section, i, sources) }

        (config['socials'] || []).each_with_index do |social, i|
          path = "socials[#{i}]"
          unless PLATFORMS.key?(social['platform'])
            fail!("#{path}.platform", "must be one of: #{PLATFORMS.keys.join(', ')}")
          end
          require_url!(social, path)
        end

        true
      end

      def validate_source!(name, source, sources)
        path = "sources.#{name}"
        fail!(path, 'must be a map') unless source.is_a?(Hash)
        unless SOURCE_TYPES.include?(source['type'])
          fail!("#{path}.type", "must be one of: #{SOURCE_TYPES.join(', ')}")
        end
        return unless source['type'] == 'pinned'

        (source['items'] || []).each_with_index do |item, i|
          item_path = "#{path}.items[#{i}]"
          fail!("#{item_path}.title", 'is required') if blank?(item['title'])
          require_url!(item, item_path)
          parse_time!(item['expires'], "#{item_path}.expires")
        end

        fallback = source['fallback']
        return if fallback.nil?
        unless sources.key?(fallback)
          fail!("#{path}.fallback", "unknown source \"#{fallback}\". Declared: #{sources.keys.join(', ')}")
        end
      end

      # superRefine-style self-reference checks miss longer loops (a → b → a),
      # which would otherwise recurse until the stack gives out.
      def detect_cycle!(start, sources)
        seen = []
        name = start
        while name
          fail!("sources.#{start}.fallback", "fallback loop: #{(seen + [name]).join(' → ')}") if seen.include?(name)
          seen << name
          name = sources.dig(name, 'fallback')
        end
      end

      def validate_section!(section, index, sources)
        path = "sections[#{index}]"
        fail!(path, 'must be a map') unless section.is_a?(Hash)
        unless SECTION_TYPES.include?(section['type'])
          fail!("#{path}.type", "must be one of: #{SECTION_TYPES.join(', ')}")
        end

        if section['type'] == 'feed'
          unless sources.key?(section['source'])
            fail!("#{path}.source", "unknown source \"#{section['source']}\". Declared: #{sources.keys.join(', ')}")
          end
          limit = section.fetch('limit', 1)
          unless limit.is_a?(Integer) && limit.between?(1, 10)
            fail!("#{path}.limit", 'must be a whole number from 1 to 10')
          end
        else
          items = section['items']
          fail!("#{path}.items", 'must be a non-empty list') unless items.is_a?(Array) && !items.empty?
          items.each_with_index do |item, i|
            item_path = "#{path}.items[#{i}]"
            fail!("#{item_path}.label", 'is required') if blank?(item['label'])
            require_url!(item, item_path)
            parse_time!(item['starts'], "#{item_path}.starts")
            parse_time!(item['ends'], "#{item_path}.ends")
          end
        end
      end

      def require_url!(item, path)
        url = item['url'].to_s
        return if url.start_with?('/', 'https://', 'http://')

        fail!("#{path}.url", 'must be a site path like /blog/ or a full https:// URL')
      end

      def fail!(path, message)
        raise ConfigError, "source/_data/bio.yml #{path}: #{message}".sub(' :', ':')
      end

      def blank?(value)
        value.nil? || value.to_s.strip.empty?
      end

      ISO_DATE = /\A\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}(?::\d{2})?(?: ?(?:Z|[+-]\d{2}:?\d{2}))?)?\z/

      # YAML hands back a Date for 2026-11-01 and a Time for a full timestamp.
      # Anything else must be ISO: Time.parse would happily read "31/11/2026"
      # or "01/11/2026" as some other day instead of rejecting it.
      def parse_time!(value, path)
        case value
        when nil then nil
        when Time then value
        when Date then value.to_time
        else
          raise ArgumentError unless value.to_s.strip.match?(ISO_DATE)

          Time.parse(value.to_s)
        end
      rescue ArgumentError
        fail!(path, "\"#{value}\" is not a date. Use YYYY-MM-DD")
      end

      # -- Resolution ------------------------------------------------------------

      # Returns plain hashes for the layout: only sections with something to
      # show. An empty section would render as a heading above nothing.
      def resolve(config, posts, now, site_url)
        sources = config['sources'] || {}
        newest_first = posts.sort_by(&:date).reverse
        sections = config['sections'] || []
        feed_tiles = claim_feed_items(sections, sources, newest_first, now)

        sections.each_with_index.filter_map do |section, index|
          tiles =
            if section['type'] == 'feed'
              feed_tiles[index].map { |item| feed_tile(item, section, newest_first, site_url) }
            else
              section['items']
                .select { |item| in_window?(item, now) }
                .map { |item| link_tile(item, newest_first, site_url) }
            end

          next if tiles.empty?

          { 'title' => section['title'], 'tiles' => tiles }
        end
      end

      # On release day the release post is also the newest blog post. It should
      # appear once, under the section that describes it best: a pin first,
      # then a category feed such as releases, and only then the general blog,
      # which backfills with its next post. Sections still render in YAML order.
      def claim_feed_items(sections, sources, posts, now)
        candidates = sections.each_with_index.filter_map do |section, index|
          next unless section['type'] == 'feed'

          items = resolve_source(section['source'], sources, posts, now)
          [index, section, items]
        end

        claimed = Set.new
        result = Hash.new { |hash, key| hash[key] = [] }
        candidates
          .sort_by { |index, _section, items| [-specificity(items, sources), index] }
          .each do |index, section, items|
            result[index] = items
              .reject { |item| claimed.include?(item['url']) }
              .first(section.fetch('limit', 1))
              .each { |item| claimed << item['url'] }
          end
        result
      end

      # Which source actually produced the items: a pin may have fallen back.
      def specificity(items, sources)
        source = sources[items.first&.fetch('source', nil)]
        return 0 if source.nil?
        return 2 if source['type'] == 'pinned'

        source['category'] ? 1 : 0
      end

      def resolve_source(name, sources, posts, now, seen = [])
        source = sources[name]
        return [] if source.nil? || seen.include?(name)

        items =
          case source['type']
          when 'posts' then posts_for(source, posts, name)
          when 'pinned'
            (source['items'] || [])
              .reject { |item| (expires = parse_time!(item['expires'], name)) && expires <= now }
              .map { |item| item.merge('source' => name) }
          end

        # An expired or empty pin is not an error: it means "back to the feed".
        if items.empty? && source['fallback']
          return resolve_source(source['fallback'], sources, posts, now, seen + [name])
        end

        items
      end

      def posts_for(source, posts, name)
        category = source['category']&.downcase
        posts
          .select { |post| category.nil? || Array(post.data['categories']).map(&:downcase).include?(category) }
          .map do |post|
            {
              'title' => post.data['title'],
              # A crosspost exists only to redirect elsewhere; link straight there.
              'url' => post.data['external_url'] || post.url,
              'date' => post.date,
              'image' => post.data['og_image'],
              'source' => name,
            }
          end
      end

      def feed_tile(item, section, posts, site_url)
        {
          'label' => item['title'],
          'url' => item['url'],
          'note' => item['note'] || (item['date'] && item['date'].strftime('%B %-d, %Y')),
          'image' => section['images'] ? image_for(item, posts, site_url) : nil,
          'featured' => false,
          'source' => item['source'],
        }
      end

      def link_tile(item, posts, site_url)
        {
          'label' => item['label'],
          'url' => item['url'],
          'note' => item['note'],
          'image' => image_for(item, posts, site_url),
          'featured' => item['featured'] == true,
          'source' => 'curated',
        }
      end

      # `image: auto` reuses what the site already does for social previews: a
      # post's own og_image, or, for anything else, the OHF dynamic Open Graph
      # endpoint that social_meta.html and crosspost_og.rb fall back to.
      def image_for(item, posts, site_url)
        image = item['image']
        return nil if blank?(image)
        return image unless image == 'auto'

        url = item['url']
        path = url.start_with?(site_url) ? url.delete_prefix(site_url) : url
        if path.start_with?('/')
          post = posts.find { |candidate| candidate.url == path }
          return post.data['og_image'] if post && !blank?(post.data['og_image'])

          url = site_url + path
        end

        "#{OG_ENDPOINT}?url=#{CGI.escape(url)}"
      end

      def in_window?(item, now)
        starts = parse_time!(item['starts'], 'starts')
        ends = parse_time!(item['ends'], 'ends')
        (starts.nil? || starts <= now) && (ends.nil? || ends > now)
      end
    end

    class BioGenerator < Generator
      safe false
      # After CrosspostOpenGraph (:low), so crossposts already carry og_image.
      priority :lowest

      def generate(site)
        page = site.pages.find { |candidate| candidate.data['layout'] == 'bio' }
        return if page.nil?

        config = site.data['bio']
        Bio.validate!(config)

        page.data['bio'] = config.merge(
          'resolved_sections' => Bio.resolve(config, site.posts.docs, site.time, site.config['url'].to_s),
          'social_links' => (config['socials'] || []).map do |social|
            social.merge('label' => social['label'] || Bio::PLATFORMS[social['platform']])
          end,
        )
      rescue Bio::ConfigError => e
        raise Jekyll::Errors::FatalException, e.message
      end
    end
  end
end
