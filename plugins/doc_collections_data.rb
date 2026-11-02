require 'json'
require 'safe_yaml'

# Generate JSON lookups of all actions, triggers, and conditions (with
# their data fields) for use by prism-doc-links.js. For each entry the
# lookup exposes:
#
#   d = description (from front matter, used as fallback tooltip text)
#   u = URL of the page
#   t = title (for fallback tooltip text)
#   p = parameters map { field_name: short_description }, extracted from
#       the first `{% fields %}` or `{% fields_yaml %}` block in the page
#       content. The former carries both UI and YAML sub-maps; we pick the
#       `yaml:` sub-map. The latter is a standalone YAML-only block.
#
# Three separate data keys are emitted, so the client JS can look up each
# kind in its own namespace:
#   site.data.actions_json     keyed by "<domain>.<name>"
#   site.data.triggers_json    keyed by "<domain>.<name>"
#   site.data.conditions_json  keyed by "<domain>.<name>"
module Jekyll
  class DocCollectionsDataGenerator < Generator
    safe true
    priority :low

    COLLECTIONS = [
      { name: 'actions',    front_matter_key: 'action',    data_key: 'actions_json' },
      { name: 'triggers',   front_matter_key: 'trigger',   data_key: 'triggers_json' },
      { name: 'conditions', front_matter_key: 'condition', data_key: 'conditions_json' }
    ].freeze

    OPTIONS_YAML_PATTERN = /\{%\s*options_yaml\s*%\}(.*?)\{%\s*endoptions_yaml\s*%\}/m
    MAX_FIELD_DESCRIPTION_LENGTH = 160

    def generate(site)
      COLLECTIONS.each do |info|
        entries = {}
        site.collections[info[:name]]&.docs&.each do |doc|
          name = doc.data[info[:front_matter_key]]
          next unless name

          entry = {
            'd' => doc.data['description'].to_s,
            'u' => doc.url,
            't' => doc.data['title'].to_s
          }

          params = extract_fields(doc, name)
          entry['p'] = params if params && !params.empty?

          entries[name] = entry
        end

        # Escape </ to prevent breaking out of <script> tags when embedded in HTML
        site.data[info[:data_key]] = JSON.generate(entries).gsub('</', '<\\/')
      end
    end

    private

    # Extract option descriptions from the page's `{% options_yaml %}` block.
    def extract_fields(doc, entry_name)
      match = doc.content.match(OPTIONS_YAML_PATTERN)
      return nil unless match

      yaml_body = SafeYAML.load(match[1])
      return nil unless yaml_body.is_a?(Hash)

      fields = {}
      yaml_body.each do |name, config|
        next unless config.is_a?(Hash) && config['description']
        desc = config['description'].to_s.strip.gsub(/\s+/, ' ')
        # Truncate to first sentence if too long for a tooltip.
        desc = desc.split(/(?<=\.)\s/)[0] if desc.length > MAX_FIELD_DESCRIPTION_LENGTH
        fields[name] = desc
      end
      fields
    rescue => e
      Jekyll.logger.warn "DocCollectionsData:", "Failed to parse fields for #{entry_name}: #{e.message}"
      nil
    end
  end
end
