require 'safe_yaml'

# Render a list of options for the user-interface audience on action,
# trigger, and condition pages. Shows a human-readable label, an
# optional/required indicator, and a description. Emits the same
# `config-vars basic` div structure as `configuration_basic` so existing
# CSS applies without any new styling.
module Jekyll
  class OptionsUiBlock < Liquid::Block
    def slug(key)
      key.downcase.strip.gsub(' ', '-').gsub(/[^\w\-]/, '')
    end

    def render_fields(vars, converter)
      items = vars.map do |key, attr|
        required = attr['required']
        desc = attr['description'].to_s
        raise ArgumentError, "Option '#{key}' is missing a description" if desc.strip.empty?

        label_html = +"<span class='config-vars-label-name'>#{key}</span>"
        if required == true || required == false
          klass = required == true ? 'true' : 'false'
          text = required == true ? 'Required' : 'Optional'
          label_html << "<span class='config-vars-required'> (<span class='#{klass}'>#{text}</span>)</span>"
        end

        <<~ITEM
          <div class='config-vars-item'>
            <div class='config-vars-label'>
              #{label_html}
              <a name='#{slug(key)}' class='title-link' href='##{slug(key)}'></a>
            </div>
            <div class='config-vars-description-and-children'>
              <span class='config-vars-description'>#{converter.convert(desc)}</span>
            </div>
          </div>
        ITEM
      end
      "<div class='config-vars basic'>#{items.join}</div>"
    end

    def render(context)
      contents = super(context)
      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
      vars = SafeYAML.load(contents)
      raise ArgumentError, "options_ui block must contain a YAML mapping" unless vars.is_a?(Hash)
      render_fields(vars, converter)
    end
  end
end

Liquid::Template.register_tag('options_ui', Jekyll::OptionsUiBlock)
