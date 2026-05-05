require 'safe_yaml'
require_relative 'configuration'

# Render the options block for the YAML-audience section of action,
# trigger, and condition pages. Reuses the same `config-vars` layout and
# type-link helpers as the shared `ConfigurationBlock`, but only shows a
# "Required" badge on required fields. Optional fields render with no
# badge at all, so the reader quickly sees which options they must set.
module Jekyll
  class OptionsYamlBlock < ConfigurationBlock
    def render(context)
      contents = Liquid::Block.instance_method(:render).bind_call(self, context)

      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

      vars = SafeYAML.load(contents)
      raise ArgumentError, "options_yaml block must contain a YAML mapping" unless vars.is_a?(Hash)

      # Drop "required: false" so render_config_vars skips the badge entirely
      # for optional fields. Required fields keep their badge.
      vars.each_value do |attr|
        next unless attr.is_a?(Hash)
        attr.delete('required') if attr['required'] == false
      end

      <<~MARKUP
        <div class="config-vars">
          #{render_config_vars(
            vars: vars,
            component: '',
            platform: '',
            converter: converter
          )}
        </div>
      MARKUP
    end
  end
end

Liquid::Template.register_tag('options_yaml', Jekyll::OptionsYamlBlock)
