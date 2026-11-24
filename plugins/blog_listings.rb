# frozen_string_literal: true

# Builds the blog's listing pages: the blog index and a page for every
# category, author and year, and every category in each of its years,
# each split into pages of POSTS_PER_PAGE posts. Every filter is a
# static page, so filtering works without JavaScript, and each filtered
# view can be shared.
#
#   /blog/                                all posts; page 1 features the newest
#   /blog/categories/<category>/          the URLs the category pages always had
#   /blog/categories/<category>/<year>/   a category in one year (noindex)
#   /blog/authors/<author>/               everything by one person
#   /blog/<year>/                         the parent of the year's post URLs
#   .../posts/<n>/                        later pages of each, as /blog/posts/<n>/
#
# Only category and year combine: an author page is always that
# person's full list of posts.
#
# The pages use the `blog_listing` layout. Each gets in `page.listing`:
#   - heading, intro: the page's heading and the line under it, if any
#   - count: how many posts match
#   - breadcrumbs: the pages above this one ({name, url}), after Home
#   - filters: the active filters, each {kind, label, remove_url}
#   - drawer: the filters panel's lists, each item {label, count, url, current}
#   - entries: the posts on the page, each with its post, categories
#     and authors (as below) and reading time in minutes
#   - featured: the featured entry (page 1 of /blog/ only)
#   - page, total_pages, pages, compact_pages: pagination (see pagination_items)
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

    # The page for a set of filters: {'category' =>, 'year' =>, 'author' =>}
    # with facets as values, any of them nil.
    def self.filters_url(filters)
      category, year, author = filters.values_at('category', 'year', 'author')
      return author['url'] if author
      return "#{category['url']}#{year['slug']}/" if category && year
      return category['url'] if category
      return year['url'] if year

      '/blog/'
    end

    def self.matches?(entry, filters)
      filters.compact.all? { |kind, facet| values(entry, kind).any? { |v| v['slug'] == facet['slug'] } }
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

    # The page numbers to link: the first and last two pages and those
    # next to the current one or, `compact` for phones, the first, current
    # and last pages only. A gap between them is an item with `ellipsis` set.
    def self.pagination_items(current, total, base, compact: false)
      numbers = compact ? [1, current, total] : [1, 2, current - 1, current, current + 1, total - 1, total]
      numbers = numbers.select { |n| n.between?(1, total) }.uniq.sort
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

      BY_COUNT = ->(a, b) { [b['count'], a['label']] <=> [a['count'], b['label']] }

      def generate(site)
        @site = site
        @entries = site.posts.docs.reverse.map { |post| entry(post) }
        @categories = BlogListings.facets(@entries, 'category').sort(&BY_COUNT)
        @authors = BlogListings.facets(@entries, 'author').sort(&BY_COUNT)
        @years = BlogListings.facets(@entries, 'year').sort_by { |f| -f['slug'].to_i }
        years_by_slug = @years.to_h { |y| [y['slug'], y] }

        listings = [{}]
        listings += @categories.map { |c| { 'category' => c } }
        listings += @authors.map { |a| { 'author' => a } }
        listings += @years.map { |y| { 'year' => y } }
        @categories.each do |category|
          in_category = @entries.select { |e| BlogListings.matches?(e, 'category' => category) }
          BlogListings.facets(in_category, 'year').each do |year|
            listings << { 'category' => category, 'year' => years_by_slug[year['slug']] }
          end
        end

        listings.each { |filters| paginate(filters) }
      end

      private

      def entry(post)
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
            { 'slug' => Utils.slugify(name, mode: 'latin'), 'label' => name, 'avatar' => BlogListings.avatar(@site, name) }
          end,
        }
      end

      # The unfiltered blog features its newest post on page 1, ahead of a
      # full page of cards.
      def paginate(filters)
        matching = @entries.select { |e| BlogListings.matches?(e, filters) }
        base = BlogListings.filters_url(filters)
        featured = filters.empty? ? matching.first : nil
        rest = featured ? matching.drop(1) : matching
        pages = rest.each_slice(POSTS_PER_PAGE).to_a
        pages = [[]] if pages.empty?
        shared = {
          'heading' => heading(filters),
          'intro' => intro(filters),
          'count' => matching.size,
          'breadcrumbs' => breadcrumbs(filters),
          'filters' => active_filters(filters),
          'drawer' => drawer(filters),
          'feed' => filters['category'] ? "#{filters['category']['url']}atom.xml" : '/atom.xml',
        }

        pages.each_with_index do |page_entries, i|
          number = i + 1
          @site.pages << ListingPage.new(@site, BlogListings.page_url(base, number), {
            'title' => number > 1 ? "#{shared['heading']}, page #{number} of #{pages.size}" : shared['heading'],
            'description' => intro(filters) || description(filters),
            'noindex' => filters.key?('category') && filters.key?('year'),
            'blog_index' => true,
            'sidebar' => false,
            'feedback' => false,
            'listing' => shared.merge(
              'is_index' => filters.empty? && number == 1,
              'entries' => page_entries,
              'featured' => number == 1 ? featured : nil,
              'page' => number,
              'total_pages' => pages.size,
              'previous_url' => number > 1 ? BlogListings.page_url(base, number - 1) : nil,
              'next_url' => number < pages.size ? BlogListings.page_url(base, number + 1) : nil,
              'pages' => BlogListings.pagination_items(number, pages.size, base),
              'compact_pages' => BlogListings.pagination_items(number, pages.size, base, compact: true),
            ),
          })
        end
      end

      # The active filters for the toolbar's chips. Removing one keeps the
      # others.
      def active_filters(filters)
        %w[category year author].filter_map do |kind|
          facet = filters[kind] or next
          { 'kind' => kind, 'label' => facet['label'], 'remove_url' => BlogListings.filters_url(filters.except(kind)) }
        end
      end

      # The filters panel shows what each choice would give from this page:
      # a category's years, or a year's categories, with their counts.
      # Authors always lead to the author's full list.
      def drawer(filters)
        category, year, author = filters.values_at('category', 'year', 'author')
        in_year = year ? @entries.select { |e| BlogListings.matches?(e, 'year' => year) } : @entries
        in_category = category ? @entries.select { |e| BlogListings.matches?(e, 'category' => category) } : @entries

        categories = BlogListings.facets(in_year, 'category').sort(&BY_COUNT).map do |c|
          item(c['label'], c['count'], BlogListings.filters_url('category' => c, 'year' => year), category&.dig('slug') == c['slug'])
        end
        years = BlogListings.facets(in_category, 'year').sort_by { |y| -y['slug'].to_i }.map do |y|
          item(y['label'], y['count'], BlogListings.filters_url('category' => category, 'year' => y), year&.dig('slug') == y['slug'])
        end

        {
          'all_categories' => item('All posts', in_year.size, BlogListings.filters_url('year' => year), !category && !author),
          'top_categories' => categories.first(7),
          'more_categories' => categories.drop(7).sort_by { |c| c['label'].downcase },
          'more_open' => categories.drop(7).any? { |c| c['current'] },
          'all_years' => item('All', in_category.size, BlogListings.filters_url('category' => category), !year && !author),
          'years' => years,
          'authors' => @authors.map do |a|
            item(a['label'], a['count'], a['url'], author&.dig('slug') == a['slug']).merge('avatar' => a['avatar'])
          end,
        }
      end

      def item(label, count, url, current)
        { 'label' => label, 'count' => count, 'url' => url, 'current' => current }
      end

      def breadcrumbs(filters)
        crumbs = [{ 'name' => 'Blog', 'url' => '/blog/' }]
        crumbs << { 'name' => filters['category']['label'], 'url' => filters['category']['url'] } if filters['category'] && filters['year']
        crumbs
      end

      def heading(filters)
        category, year, author = filters.values_at('category', 'year', 'author')
        if category && year then "#{category['label']} from #{year['label']}"
        elsif category then category['label']
        elsif author then "Posts by #{author['label']}"
        elsif year then "Posts from #{year['label']}"
        else 'Blog'
        end
      end

      # The line under the heading: the blog's own, or a category's from
      # source/_data/blog_categories.yml, keyed by category slug:
      #
      #   release-notes:
      #     intro: Everything new in each monthly release.
      #
      # Other filtered pages have none.
      def intro(filters)
        return description(filters) if filters.empty?
        return unless filters.keys == ['category']

        @site.data.dig('blog_categories', filters['category']['slug'], 'intro')
      end

      def description(filters)
        return 'News, release notes, and stories from the Home Assistant project and community.' if filters.empty?

        category, year, author = filters.values_at('category', 'year', 'author')
        parts = []
        parts << "in #{category['label']}" if category
        parts << "by #{author['label']}" if author
        parts << "from #{year['label']}" if year
        "Home Assistant blog posts #{parts.join(' ')}."
      end
    end
  end
end
