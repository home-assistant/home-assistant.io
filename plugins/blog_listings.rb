# frozen_string_literal: true

# Builds the blog's listing pages: the blog index and a page for every
# category, author and year, each split into pages of POSTS_PER_PAGE
# posts. Every filter is a static page, so filtering works without
# JavaScript, and each filtered view can be shared and indexed.
#
#   /blog/                          all posts; page 1 features the newest
#   /blog/categories/<category>/    the URLs the category pages always had
#   /blog/authors/<author>/
#   /blog/<year>/                   the parent of the year's post URLs
#   .../posts/<n>/                  later pages of each, as /blog/posts/<n>/
#
# The pages use the `blog_listing` layout. Each gets in `page.listing`:
#   - heading, intro: the page's heading and the line under it, if any
#   - entries: the posts on the page, each with its post, categories
#     and authors (as below) and reading time in minutes
#   - featured: the featured entry (page 1 of /blog/ only)
#   - facet: the filter this page shows (kind, slug, label, count, url)
#   - facets: every filter, for the filter bar (all, categories, authors, years)
#   - page, total_pages, pages: pagination (see pagination_items)
#
# Ported from the blog filters of esphome.io (#8195) and
# openhomefoundation.org (#174).
module Jekyll
  module BlogListings
    POSTS_PER_PAGE = 12

    # Category names in front matter are hyphenated ("Release-Notes").
    # Labels that replacing the hyphens with spaces gets wrong.
    CATEGORY_LABELS = {
      'release-notes' => 'Release notes',
      'works-with-home-assistant' => 'Works with Home Assistant',
      'public-service-announcement' => 'Public service announcement',
      'how-to' => 'How-to',
      'state-of-the-open-home' => 'State of the Open Home',
      'internet-of-things' => 'Internet of Things',
      'iot-data' => 'IoT data',
      'user-stories' => 'User stories',
      'device-tracking' => 'Device tracking',
      'presence-detection' => 'Presence detection',
      'haos' => 'HAOS',
      'ios' => 'iOS',
      'ai' => 'AI',
      'z-wave' => 'Z-Wave',
    }.freeze

    # The words in a post's Markdown, without Liquid tags or HTML.
    def self.reading_time(content)
      words = content.to_s.gsub(/\{%.*?%\}|<[^>]*>/m, ' ').split.size
      [(words / 230.0).round, 1].max
    end

    def self.category_slug(name)
      GenerateCategories.category_dir('', name).delete_prefix('/')
    end

    def self.category_label(name)
      CATEGORY_LABELS.fetch(category_slug(name)) { name.tr('-', ' ') }
    end

    def self.avatar(site, name)
      github = site.data.dig('people', name, 'github')
      github && "https://github.com/#{github}.png?size=64"
    end

    # A post's filter values, by kind.
    def self.values(entry, kind)
      case kind
      when 'category' then entry['categories']
      when 'author' then entry['authors']
      when 'year' then [{ 'slug' => entry['year'], 'label' => entry['year'] }]
      end
    end

    def self.url(kind, slug)
      case kind
      when 'category' then "/blog/categories/#{slug}/"
      when 'author' then "/blog/authors/#{slug}/"
      when 'year' then "/blog/#{slug}/"
      end
    end

    def self.page_url(base, number)
      number == 1 ? base : "#{base}posts/#{number}/"
    end

    def self.facets(entries, kind)
      facets = {}
      entries.each do |entry|
        values(entry, kind).each do |value|
          facet = facets[value['slug']] ||= {
            'kind' => kind, 'slug' => value['slug'], 'label' => value['label'],
            'count' => 0, 'url' => url(kind, value['slug']), 'avatar' => value['avatar'],
          }
          facet['count'] += 1
        end
      end
      facets.values
    end

    # First and last two pages, and those next to the current one. A gap
    # between them is an item with `ellipsis` set.
    def self.pagination_items(current, total, base)
      numbers = [1, 2, current - 1, current, current + 1, total - 1, total]
                .select { |n| n.between?(1, total) }.uniq.sort
      numbers.each_with_index.flat_map do |n, i|
        item = { 'number' => n, 'url' => page_url(base, n), 'current' => n == current }
        i.positive? && n - numbers[i - 1] > 1 ? [{ 'ellipsis' => true }, item] : [item]
      end
    end

    class ListingPage < Page
      def initialize(site, dir, data)
        @site = site
        @base = site.source
        @dir = dir
        @name = 'index.html'
        process(@name)
        @content = ''
        @data = data
        data['layout'] = 'blog_listing'
      end
    end

    class Generator < Jekyll::Generator
      safe true
      priority :normal

      def generate(site)
        entries = site.posts.docs.reverse.map { |post| entry(site, post) }

        by_count = ->(a, b) { [b['count'], a['label']] <=> [a['count'], b['label']] }
        all = { 'kind' => 'all', 'slug' => '', 'label' => 'All posts', 'count' => entries.size, 'url' => '/blog/' }
        facets = {
          'all' => all,
          'categories' => BlogListings.facets(entries, 'category').sort(&by_count),
          'authors' => BlogListings.facets(entries, 'author').sort(&by_count),
          'years' => BlogListings.facets(entries, 'year').sort_by { |f| -f['slug'].to_i },
        }

        [all, *facets['categories'], *facets['authors'], *facets['years']].each do |facet|
          paginate(site, facet, facets, entries)
        end
      end

      private

      def entry(site, post)
        categories = Array(post.data['categories']).flat_map { |c| c.to_s.split }
        authors = Array(post.data['author']).map { |a| a.to_s.strip }.reject(&:empty?)
        {
          'post' => post,
          'year' => post.date.strftime('%Y'),
          'reading_time' => BlogListings.reading_time(post.content),
          'categories' => categories.map do |name|
            { 'slug' => BlogListings.category_slug(name), 'label' => BlogListings.category_label(name) }
          end,
          'authors' => authors.map do |name|
            { 'slug' => Utils.slugify(name, mode: 'latin'), 'label' => name, 'avatar' => BlogListings.avatar(site, name) }
          end,
        }
      end

      # The unfiltered blog features its newest post on page 1, ahead of a
      # full page of cards.
      def paginate(site, facet, facets, entries)
        matching = if facet['kind'] == 'all'
                     entries
                   else
                     entries.select { |e| BlogListings.values(e, facet['kind']).any? { |v| v['slug'] == facet['slug'] } }
                   end
        featured = facet['kind'] == 'all' ? matching.first : nil
        rest = featured ? matching.drop(1) : matching
        pages = rest.each_slice(POSTS_PER_PAGE).to_a
        pages = [[]] if pages.empty?

        pages.each_with_index do |page_entries, i|
          number = i + 1
          url = BlogListings.page_url(facet['url'], number)
          site.pages << ListingPage.new(site, url, {
            'title' => title(facet, number, pages.size),
            'description' => intro(site, facet) || description(facet),
            'blog_index' => true,
            'sidebar' => false,
            'feedback' => false,
            'listing' => {
              'heading' => heading(facet),
              'intro' => intro(site, facet),
              'entries' => page_entries,
              'featured' => number == 1 ? featured : nil,
              'facet' => facet,
              'facets' => facets,
              'page' => number,
              'total_pages' => pages.size,
              'previous_url' => number > 1 ? BlogListings.page_url(facet['url'], number - 1) : nil,
              'next_url' => number < pages.size ? BlogListings.page_url(facet['url'], number + 1) : nil,
              'pages' => BlogListings.pagination_items(number, pages.size, facet['url']),
            },
          })
        end
      end

      def heading(facet)
        case facet['kind']
        when 'all' then 'Blog'
        when 'category' then facet['label']
        when 'author' then "Posts by #{facet['label']}"
        when 'year' then "Posts from #{facet['label']}"
        end
      end

      def title(facet, number, total)
        number > 1 ? "#{heading(facet)}, page #{number} of #{total}" : heading(facet)
      end

      # The line under the heading: the blog's own, or a category's from
      # source/_data/blog_categories.yml, keyed by category slug:
      #
      #   release-notes:
      #     intro: Everything new in each monthly release.
      #
      # Other filtered pages have none.
      def intro(site, facet)
        case facet['kind']
        when 'all' then description(facet)
        when 'category' then site.data.dig('blog_categories', facet['slug'], 'intro')
        end
      end

      def description(facet)
        case facet['kind']
        when 'all' then 'News, release notes, and stories from the Home Assistant project and community.'
        when 'category' then "Home Assistant blog posts in #{facet['label']}."
        when 'author' then "Home Assistant blog posts by #{facet['label']}."
        when 'year' then "Home Assistant blog posts from #{facet['label']}."
        end
      end
    end
  end
end
