require 'safe_yaml'
require_relative 'configuration'

# Render the options block for the YAML-audience section of action,
# trigger, and condition pages. Reuses the same `config-vars` layout,
# type-link helpers, and Required/Optional badge rendering as the shared
# `ConfigurationBlock`.
module Jekyll
  class OptionsYamlBlock < ConfigurationBlock
    def render(context)
      contents = Liquid::Block.instance_method(:render).bind_call(self, context)
      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
      vars = SafeYAML.load(contents)
      raise ArgumentError, "options_yaml block must contain a YAML mapping" unless vars.is_a?(Hash)

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
