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
      SOURCE_TYPES = %w[posts pinned data].freeze
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
        if source.key?('label') && blank?(source['label'])
          fail!("#{path}.label", 'must be text, e.g. Newsletter')
        end
        validate_limit!(source['limit'], "#{path}.limit") if source.key?('limit')
        if source.key?('exclude_category') && source['type'] != 'posts'
          fail!("#{path}.exclude_category", 'only works on sources of type posts')
        end
        if source['type'] == 'data'
          unless source['file'].to_s.match?(/\A[\w-]+\z/)
            fail!("#{path}.file", 'must name a data file, e.g. newsletter for source/_data/newsletter.json')
          end
          return
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
        if section.key?('hero') && ![true, false].include?(section['hero'])
          fail!("#{path}.hero", 'must be true or false')
        end

        if section['type'] == 'feed'
          if section.key?('source') == section.key?('sources')
            fail!(path, 'needs either source: one-source or sources: [a, b], not both')
          end
          key = section.key?('sources') ? 'sources' : 'source'
          names = section_sources(section)
          fail!("#{path}.sources", 'must be a non-empty list of source names') if names.empty?
          names.each do |name|
            next if sources.key?(name)

            fail!("#{path}.#{key}", "unknown source \"#{name}\". Declared: #{sources.keys.join(', ')}")
          end
          validate_limit!(section.fetch('limit', 1), "#{path}.limit")
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

      def validate_limit!(limit, path)
        return if limit.is_a?(Integer) && limit.between?(1, 10)

        fail!(path, 'must be a whole number from 1 to 10')
      end

      # `source: blog` and `sources: [latest, newsletter]` both work.
      def section_sources(section)
        Array(section['sources'] || section['source']).map(&:to_s)
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
      def resolve(config, posts, now, site_url, data = {})
        sources = config['sources'] || {}
        newest_first = posts.sort_by(&:date).reverse
        sections = config['sections'] || []
        feed_tiles = claim_feed_items(sections, sources, newest_first, now, data)

        sections.each_with_index.filter_map do |section, index|
          tiles =
            if section['type'] == 'feed'
              feed_tiles[index].each_with_index.map do |item, position|
                hero = section['hero'] == true && position.zero?
                feed_tile(item, section, sources, newest_first, site_url, hero: hero)
              end
            else
              section['items']
                .select { |item| in_window?(item, now) }
                .map { |item| link_tile(item, newest_first, site_url) }
            end

          next if tiles.empty?

          # The first item becomes a large card with its image on top. Without
          # an image it stays a normal tile rather than a card with a hole.
          if section['hero'] == true && tiles.first['image']
            tiles.first['hero'] = true
          end

          { 'title' => section['title'], 'tiles' => tiles }
        end
      end

      # On release day the release post is also the newest blog post. It should
      # appear once, under the section that describes it best: a pin first,
      # then a category feed such as releases, and only then the general blog,
      # which backfills with its next post. Sections still render in YAML order.
      def claim_feed_items(sections, sources, posts, now, data)
        candidates = sections.each_with_index.filter_map do |section, index|
          next unless section['type'] == 'feed'

          [index, section, merged_items(section, sources, posts, now, data)]
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

      # Everything a feed section's sources produce, as one list: an active pin
      # first, because someone chose it, then the rest newest first, whichever
      # feed they came from. A source's `limit` caps how many of its items can
      # take part, so one busy feed can't crowd out the others.
      def merged_items(section, sources, posts, now, data)
        items = section_sources(section).flat_map do |name|
          resolve_source(name, sources, posts, now, data)
        end

        items = items
          .group_by { |item| item['source'] }
          .flat_map do |name, group|
            cap = sources.dig(name, 'limit')
            cap ? group.first(cap) : group
          end
          .uniq { |item| item['url'] }

        pinned, dated = items.partition { |item| sources.dig(item['source'], 'type') == 'pinned' }
        pinned + dated.sort_by { |item| item['date'] || Time.at(0) }.reverse
      end

      # Which source actually produced the items: a pin may have fallen back.
      def specificity(items, sources)
        source = sources[items.first&.fetch('source', nil)]
        return 0 if source.nil?
        return 2 if source['type'] == 'pinned'

        source['category'] ? 1 : 0
      end

      def resolve_source(name, sources, posts, now, data = {}, seen = [])
        source = sources[name]
        return [] if source.nil? || seen.include?(name)

        items =
          case source['type']
          when 'posts' then posts_for(source, posts, name)
          when 'data' then data_items(data[source['file']], name)
          when 'pinned'
            (source['items'] || [])
              .reject { |item| (expires = parse_time!(item['expires'], name)) && expires <= now }
              .map { |item| item.merge('source' => name) }
          end

        # An expired or empty pin is not an error: it means "back to the feed".
        if items.empty? && source['fallback']
          return resolve_source(source['fallback'], sources, posts, now, data, seen + [name])
        end

        items
      end

      # Items downloaded before the build, such as the newsletter (see the
      # newsletter_data task in the Rakefile). The download never fails the
      # build, so a missing file, an empty list or a malformed entry just
      # means fewer items, never an error.
      def data_items(list, name)
        return [] unless list.is_a?(Array)

        list.filter_map do |entry|
          next unless entry.is_a?(Hash) && !blank?(entry['title']) && !blank?(entry['url'])

          date = begin
            Time.parse(entry['date'].to_s) unless blank?(entry['date'])
          rescue ArgumentError
            nil
          end

          {
            'title' => entry['title'],
            'url' => entry['url'],
            'date' => date,
            'image' => entry['image'],
            'source' => name,
          }
        end.sort_by { |item| item['date'] || Time.at(0) }.reverse
      end

      def posts_for(source, posts, name)
        include = Array(source['category']).map { |c| c.to_s.downcase }
        exclude = Array(source['exclude_category']).map { |c| c.to_s.downcase }
        posts
          .select do |post|
            categories = Array(post.data['categories']).map(&:downcase)
            (include.empty? || include.intersect?(categories)) && !exclude.intersect?(categories)
          end
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

      def feed_tile(item, section, sources, posts, site_url, hero: false)
        date = item['date']&.strftime('%B %-d, %Y')
        # "Newsletter · October 1, 2026", so a mixed list says what each item is.
        note = [sources.dig(item['source'], 'label'), date].compact.join(' · ')
        {
          'label' => item['title'],
          'url' => item['url'],
          'note' => item['note'] || (note.empty? ? nil : note),
          'image' => section['images'] || hero ? image_for(item, posts, site_url) : nil,
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
          'resolved_sections' => Bio.resolve(config, site.posts.docs, site.time, site.config['url'].to_s, site.data),
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
