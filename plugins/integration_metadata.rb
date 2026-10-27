# Use the integration metadata from Home Assistant core as the source of
# truth for the integration pages. `rake integrations_data` extracts it from
# the core manifests into source/_data/integrations/<domain>.json.
#
# The metadata is merged into the front matter of the main page of each
# integration (the page named after its domain), so layouts and includes
# keep reading `page.ha_codeowners` and friends. Core wins: a key core does
# not set is removed. Docs keep what core does not know about, like the
# description and `ha_release`. Pages for integrations that do not exist in
# core are left alone.
#
# This runs right after the site is read, so every generator, including the
# validators, sees the merged data.
module Jekyll
  module IntegrationMetadata
    IOT_CLASSES = {
      'assumed_state' => 'Assumed State',
      'calculated' => 'Calculated',
      'cloud_polling' => 'Cloud Polling',
      'cloud_push' => 'Cloud Push',
      'local_polling' => 'Local Polling',
      'local_push' => 'Local Push'
    }.freeze

    DISCOVERY_METHODS = %w[bluetooth dhcp homekit mqtt ssdp usb zeroconf].freeze

    # A virtual integration has no code of its own. It shows the metadata
    # of the integration that supports it, the same way core does.
    INHERITED_KEYS = %w[codeowners config_flow iot_class platforms discovery categories].freeze

    # Front matter keys this plugin always sets or removes, so they have no
    # effect on a page that has core metadata. `ha_domain` stays, the extra
    # pages of an integration need it. The last few are old misspellings.
    SYNCED_KEYS = (
      %w[title ha_integration_type ha_codeowners ha_config_flow ha_iot_class
         ha_quality_scale ha_platforms ha_iot_standard ha_supporting_domain
         ha_supporting_integration] +
      DISCOVERY_METHODS.map { |method| "ha_#{method}" } +
      %w[ha_code_owners ha_qa_scale quality_scale integration_type]
    ).freeze

    module_function

    def apply(site)
      integrations = site.data['integrations'] || {}
      return if integrations.empty?

      site.collections['integrations']&.docs&.each do |doc|
        domain = doc.basename_without_ext
        integration = integrations[domain]
        next unless integration

        merge(doc.data, resolve(integration, integrations), integrations)
      end
    end

    def resolve(integration, integrations)
      supporting = integrations[integration['supported_by']]
      return integration unless supporting

      inherited = supporting.slice(*INHERITED_KEYS)
      inherited.merge(integration)
    end

    def merge(data, integration, integrations)
      data['title'] = integration['name']
      data['ha_domain'] = integration['domain']

      # Core defaults to `hub`, the docs have always called this `integration`.
      data['ha_integration_type'] = integration['integration_type'] || 'integration'

      set(data, 'ha_codeowners', integration['codeowners'])
      set(data, 'ha_config_flow', integration['config_flow'] || nil)
      set(data, 'ha_iot_class', IOT_CLASSES[integration['iot_class']])
      set(data, 'ha_quality_scale', integration['quality_scale'])
      set(data, 'ha_platforms', integration['platforms'])
      set(data, 'ha_iot_standard', integration['iot_standards']&.first)

      discovery = integration['discovery'] || []
      DISCOVERY_METHODS.each do |method|
        set(data, "ha_#{method}", discovery.include?(method) || nil)
      end

      supporting = integrations[integration['supported_by']]
      set(data, 'ha_supporting_domain', supporting && supporting['domain'])
      set(data, 'ha_supporting_integration', supporting && supporting['name'])

      # Not every integration in core has categories yet, keep the ones from
      # the front matter until it does.
      data['ha_categories'] = integration['categories'] if integration['categories']
    end

    # The front matter keys that are ignored on the page of this integration.
    def synced_keys(integration, integrations)
      keys = SYNCED_KEYS
      keys += ['ha_categories'] if resolve(integration, integrations)['categories']
      keys
    end

    def set(data, key, value)
      if value.nil? || value == []
        data.delete(key)
      else
        data[key] = value
      end
    end
  end

  Hooks.register :site, :post_read do |site|
    IntegrationMetadata.apply(site)
  end
end
