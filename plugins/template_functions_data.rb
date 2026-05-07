require 'json'
require 'safe_yaml'

# Generate a JSON lookup of all template functions and their parameters
# for use by prism-template-links.js (hover tooltips and clickable links)
module Jekyll
  class TemplateFunctionsDataGenerator < Generator
    safe true
    priority :low

    # Aliases must be word-only names (no operators like ==, >=, <)
    # and lowercase to match how they appear in template code.
    WORD_ALIAS_PATTERN = /\A[a-z_]\w*\z/
    FUNCTION_PARAMETERS_PATTERN = /\{%\s*function_parameters\s*%\}(.*?)\{%\s*endfunction_parameters\s*%\}/m
    MAX_PARAM_DESCRIPTION_LENGTH = 120

    def generate(site)
      funcs = {}

      site.collections['template_functions']&.docs&.each do |doc|
        func_name = doc.data['function_name']
        next unless func_name

        entry = {
          'd' => doc.data['description'].to_s,
          'u' => doc.url
        }

        params = extract_parameters(doc, func_name)
        entry['p'] = params if params && !params.empty?

        funcs[func_name] = entry

        register_aliases(funcs, doc.data['aliases'], entry)
      end

      # Escape </ to prevent breaking out of <script> tags when embedded in HTML
      site.data['template_functions_json'] = JSON.generate(funcs).gsub('</', '<\\/')
    end

    private

    def extract_parameters(doc, func_name)
      match = doc.content.match(FUNCTION_PARAMETERS_PATTERN)
      return nil unless match

      parsed = SafeYAML.load(match[1])
      return nil unless parsed.is_a?(Hash)

      params = {}
      parsed.each do |name, config|
        next unless config.is_a?(Hash) && config['description']
        desc = config['description'].to_s.strip.gsub(/\s+/, ' ')
        # Truncate to first sentence if too long
        desc = desc.split(/(?<=\.)\s/)[0] if desc.length > MAX_PARAM_DESCRIPTION_LENGTH
        params[name] = desc
      end
      params
    rescue => e
      Jekyll.logger.warn "TemplateFunctionsData:", "Failed to parse params for #{func_name}: #{e.message}"
      nil
    end

    def register_aliases(funcs, aliases, entry)
      (aliases || []).each do |alias_name|
        name = alias_name.to_s
        # Only register word-shaped aliases, and never overwrite an existing function name
        next unless name.match?(WORD_ALIAS_PATTERN)
        next if funcs.key?(name)
        funcs[name] = entry
      end
    end
  end
end
