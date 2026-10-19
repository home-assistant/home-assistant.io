require 'safe_yaml'

module Jekyll
  class FunctionParametersBlock < ConfigurationBlock

    def render(context)
      contents = Liquid::Block.instance_method(:render).bind_call(self, context)

      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

      vars = SafeYAML.load(contents)

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

Liquid::Template.register_tag('function_parameters', Jekyll::FunctionParametersBlock)
