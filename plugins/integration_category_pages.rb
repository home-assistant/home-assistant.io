# One page per integration category, like /integrations/category/climate/,
# so a category has a stable link the app and the Marketplace can point to.
# Each page is the integrations page with that category selected.
module Jekyll
  class IntegrationCategoryPagesGenerator < Generator
    safe true
    priority :normal

    def generate(site)
      (site.data['integration_categories'] || []).each do |category|
        page = PageWithoutAFile.new(site, site.source, File.join('integrations', 'category', category['slug']), 'index.html')
        page.data.merge!(
          'title' => "#{category['name']} integrations",
          'description' => category['description'],
          'layout' => 'page',
          'sidebar' => false,
          'is_homepage' => true,
          'feedback' => false,
          'body_id' => 'components-page',
          'regenerate' => false,
          'integration_category' => category['slug'],
        )
        page.content = '{% include integrations/browser.html category=page.integration_category %}'
        site.pages << page
      end
    end
  end
end
