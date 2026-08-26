# Precompute the per-domain label/icon index used by the action, trigger,
# and condition pages and sidebars.
#
# Without this, every action/trigger/condition page resolved each domain
# label with `site.integrations | where: 'ha_domain', domain | first`,
# a linear scan over 1500+ integration documents. Repeated for every
# domain in the sidebar of every page, that scan dominated the build time.
#
# For each collection this generator exposes:
#
#   site.data['<kind>_domain_index']   ordered array of entries, sorted by
#                                      domain key, for building the full
#                                      domain list in sidebars and indexes
#   site.data['<kind>_domain_lookup']  the same entries keyed by domain,
#                                      for single-domain lookups
#
# Each entry carries 'key', 'label', 'icon', and 'description'. Values come
# from the optional site.data['<kind>_domains'] data file when present, and
# fall back to the integration title and a generic puzzle icon otherwise.
module Jekyll
  class DomainIndexGenerator < Generator
    safe true
    priority :low

    KINDS = {
      'actions' => 'action',
      'triggers' => 'trigger',
      'conditions' => 'condition'
    }.freeze

    DEFAULT_ICON = 'mdi:puzzle-outline'.freeze

    def generate(site)
      integration_titles = {}
      site.collections['integrations']&.docs&.each do |doc|
        domain = doc.data['ha_domain']
        next unless domain

        integration_titles[domain] ||= doc.data['title'] || domain
      end

      KINDS.each do |collection_name, kind|
        domain_data = site.data["#{kind}_domains"]
        domain_data = [] unless domain_data.is_a?(Array)
        # Keep the first entry per key, matching how the previous Liquid
        # lookup (`| where: 'key', ... | first`) resolved duplicates.
        data_by_key = {}
        domain_data.each do |entry|
          next unless entry.is_a?(Hash) && entry['key']

          data_by_key[entry['key']] ||= entry
        end

        lookup = {}
        site.collections[collection_name]&.docs&.each do |doc|
          domain = doc.data['domain']
          next unless domain
          next if lookup.key?(domain)

          entry = data_by_key[domain] || {}
          lookup[domain] = {
            'key' => domain,
            'label' => entry['label'] || integration_titles[domain] || domain,
            'icon' => entry['icon'] || DEFAULT_ICON,
            'description' => entry['description']
          }
        end

        site.data["#{kind}_domain_index"] = lookup.values.sort_by { |entry| entry['key'] }
        site.data["#{kind}_domain_lookup"] = lookup
      end
    end
  end
end
