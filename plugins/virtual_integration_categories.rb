# A virtual integration, like Somfy, points to the integration that supports
# it, like Overkiz. It shows the categories of that integration, the same way
# core does in integrations.json, so the categories only live in one place.
# A virtual integration that sets its own `ha_categories` keeps them.
module Jekyll
  class VirtualIntegrationCategories < Generator
    safe true
    # After the categories are validated, before anything uses them.
    priority :high

    def generate(site)
      docs = site.collections['integrations']&.docs || []

      # Only the main page of an integration, not the extra pages some have.
      categories = docs.each_with_object({}) do |doc, found|
        domain = doc.data['ha_domain']
        next unless domain && doc.basename_without_ext == domain && doc.data['ha_categories']

        found[domain] = doc.data['ha_categories']
      end

      docs.each do |doc|
        next unless doc.data['ha_integration_type'] == 'virtual'
        next if doc.data['ha_categories']

        supporting = categories[doc.data['ha_supporting_domain']]
        doc.data['ha_categories'] = supporting if supporting
      end
    end
  end
end
