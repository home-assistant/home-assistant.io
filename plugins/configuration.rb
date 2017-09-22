module Jekyll
  class ConfigurationBlock < Liquid::Block
    TYPE_LINKS = {
      'action'       => '/docs/automation/action/',
      'device_class' => '/components/binary_sensor/',
      'template'     => '/docs/configuration/templating/',
    }

    REQUIRED_VALUES = {
      true        => 'Required',
      false       => 'Optional',
      'required'  => 'Required',
      'optional'  => 'Optional',
      'inclusive' => 'Inclusive',
      'exclusive' => 'Exclusive'
    }

    def initialize(tag_name, text, tokens)
      super
    end

    def slug(key)
      key.downcase.strip.gsub(' ', '-').gsub(/[^\w-_]/, '')
    end

    def type_class(type)
      ((type.is_a? Array) ? type.join(' ') : type).downcase
    end

    def type_link(type)
      if type.include? ','
        type = type.split(',')
      end

      if type.is_a? Array
        return (type.map { |t| type_link(t) }).join(' | ')
      end

      type = type.strip
      (TYPE_LINKS.include? type.downcase) ? "[%s](%s)" % [type, TYPE_LINKS[type.downcase]] : type
    end

    def required_value(value)
      if !!value == value
        return REQUIRED_VALUES[value]
      end

      value = value.strip.downcase
      (REQUIRED_VALUES.include? value) ? REQUIRED_VALUES[value] : REQUIRED_VALUES[false]
    end

    def render_config_vars(vars, nested = false)
      result = Array.new
      result << "<dl class='#{nested ? "nested" : ""}'>"

      result << vars.map do |key, attr|
        markup = Array.new
        markup << "<dt><a class='title-link' name='#{slug(key)}' href='\##{slug(key)}'></a> #{key}</dt>"
        markup << "<dd>"
        markup << "  <p class='desc'>"
        markup << "    <span class='type'>(<span class='#{type_class(attr['type'])}'>#{type_link(attr['type'])}</span>)</span> " if attr.key? 'type'
        markup << "    <span class='required'>(#{required_value(attr['required'])})</span> " if attr.key? 'required'
        markup << "    <span class='description'>#{attr['description']}</span>" if attr.key? 'description'
        markup << "  </p>"
        markup << "  <p class='default'>Default value: #{attr['default']}</p>" if attr.key? 'default'
        markup << "</dd>"

        # Check for nested configuration variables
        markup << "<dd>#{render_config_vars(attr['keys'], true)}</dd>" if attr.key? 'keys'
        markup
      end

      result << "</dl>"
      result.join
    end

    def render(context)
      contents = super(context)

      vars = SafeYAML.load(contents)

      <<-MARKUP.squeeze(' ').strip
        <div class="config-vars">
          <h3><a class="title-link" name="configuration-variables" href="#configuration-variables"></a> Configuration Variables</h3>
          #{render_config_vars(vars)}
        </div>
      MARKUP
    end
  end
end

Liquid::Template.register_tag('configuration', Jekyll::ConfigurationBlock)
