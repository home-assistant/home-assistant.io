# One page per integration category, like /integrations/category/climate/,
# and per subcategory, like /integrations/category/climate/water_heaters/,
# so each has a stable link the app and the Marketplace can point to.
# Each page is the integrations page with that category selected.
module Jekyll
  class IntegrationCategoryPagesGenerator < Generator
    safe true
    priority :normal

    def generate(site)
      (site.data['integration_categories'] || []).each do |category|
        add_page(site, category)
        (category['subcategories'] || []).each do |subcategory|
          add_page(site, category, subcategory)
        end
      end
    end

    private

    def add_page(site, category, subcategory = nil)
      dir = File.join('integrations', 'category', category['slug'])
      dir = File.join(dir, subcategory['slug']) if subcategory

      page = PageWithoutAFile.new(site, site.source, dir, 'index.html')
      page.data.merge!(
        'layout' => 'page',
        'sidebar' => false,
        'is_homepage' => true,
        'feedback' => false,
        'body_id' => 'components-page',
        'regenerate' => false,
        'integration_category' => category['slug'],
        'integration_category_name' => category['name'],
      )
      if subcategory
        page.data.merge!(
          'title' => "#{subcategory['name']} integrations",
          'description' => "#{subcategory['name']} integrations for Home Assistant, part of #{category['name']}. #{category['description']}",
          'integration_subcategory' => subcategory['slug'],
        )
      else
        page.data.merge!(
          'title' => "#{category['name']} integrations",
          'description' => category['description'],
        )
      end
      page.content = '{% include integrations/browser.html category=page.integration_category subcategory=page.integration_subcategory %}'
      site.pages << page
    end
  end
end
