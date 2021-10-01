module Jekyll
  class ConfigurationBlock < Liquid::Block
    TYPE_LINKS = {
      'action'       => '/docs/scripts/',
      'device_class' => '/docs/configuration/customizing-devices/#device-class',
      'template'     => '/docs/configuration/templating/',
      'icon'         => '/docs/configuration/customizing-devices/#icon',
      'selector'     => '/docs/blueprint/selectors/',
    }

    TYPES = [
      'action', 'boolean', 'string', 'integer', 'float', 'time', 'template',
      'device_class', 'icon', 'map', 'list', 'date', 'datetime', 'any',
      'selector',
    ]

    MIN_DEFAULT_LENGTH = 30

    def initialize(tag_name, text, tokens)
      super
      @config_name = slug(text.strip)
    end

    def slug(key)
      key.downcase.strip.gsub(' ', '-').gsub(/[^\w\-]/, '')
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

      type.strip!
      if TYPE_LINKS.include? type.downcase
        url = TYPE_LINKS[type.downcase] 
        "<a href=\"%s\">%s</a>" % [url, type]
      else
        type
      end
    end

    def required_value(value)
      if value === true
        "Required"
      elsif value === false
        "Optional"
      else
        value.strip.titlecase
      end
    end

    def render_config_vars(vars:, converter:, config_name:, classes: nil, parent_type: nil)
      result = Array.new
      result << "<div class='#{classes}'>"

      result << vars.map do |key, attr|
        markup = Array.new
        # There are spaces around the "{key}", to improve double-click selection in Chrome.
        markup << "<div class='config-vars-item'><div class='config-vars-label'><a name='configuration-#{slug(key) + config_name}' class='title-link' href='\#configuration-#{slug(key) + config_name}'></a> <span class='config-vars-label-name'> #{key} </span>"

        if attr.key? 'type'

          # Check if the type (or list of types) are valid
          if attr['type'].kind_of? Array
            attr['type'].each do |type|
              raise ArgumentError, "Configuration type '#{type}' for key '#{key}' is not a valid type in the documentation."\
              " See: https://developers.home-assistant.io/docs/en/documentation_create_page.html#configuration" unless \
                TYPES.include? type
            end
          else
            raise ArgumentError, "Configuration type '#{attr['type']}' for key '#{key}' is not a valid type in the documentation."\
            " See: https://developers.home-assistant.io/docs/en/documentation_create_page.html#configuration" unless \
              TYPES.include? attr['type']
          end

          markup << "<span class='config-vars-type'>#{type_link(attr['type'])}</span>"
        else
          # Type is missing, which is required (unless we are in a list or template)
          raise ArgumentError, "Configuration key '#{key}' is missing a type definition" \
            unless ['list', 'template'].include? parent_type
        end

        defaultValue = ""
        isDefault = false
        if attr.key? 'default' and not attr['default'].to_s.empty?
          isDefault = true
          defaultValue = converter.convert(attr['default'].to_s)
        elsif attr['type'].to_s.include? 'boolean'
          # If the type is a boolean, a default key is required
          raise ArgumentError, "Configuration key '#{key}' is a boolean type and"\
            " therefore, requires a default."
        end

        if attr.key? 'required'
          # Check if required is a valid value
          raise ArgumentError, "Configuration key '#{key}' required field must be specified as: "\
            "true, false, inclusive or exclusive."\
            unless [true, false, 'inclusive', 'exclusive'].include? attr['required']

          isTrue = attr['required'].to_s == 'true'
          startSymbol = isTrue ? ' ' : ' ('
          endSymbol = isTrue ? '' : ')'
          showDefault = isDefault && (defaultValue.length <= MIN_DEFAULT_LENGTH)
          shortDefaultValue = ""
          if showDefault
            shortDefaultValue = defaultValue
            shortDefaultValue.slice!("<p>")
            shortDefaultValue.slice!("</p>")
            shortDefaultValue = shortDefaultValue.strip
            shortDefaultValue = ", default: " + shortDefaultValue
          end

          markup << "<span class='config-vars-required'>#{startSymbol}<span class='#{attr['required'].to_s}'>#{required_value(attr['required'])}</span><span class='default'>#{shortDefaultValue}</span>#{endSymbol}</span>"
        end

        markup << "</div><div class='config-vars-description-and-children'>"

        if attr.key? 'description'
          markup << "<span class='config-vars-description'>#{converter.convert(attr['description'].to_s)}</span>"
        else
          # Description is missing
          raise ArgumentError, "Configuration key '#{key}' is missing a description."
        end

        if isDefault && defaultValue.length > MIN_DEFAULT_LENGTH
          markup << "<div class='config-vars-default'>\nDefault: #{defaultValue}</div>"
        end
        markup << "</div>"

        # Check for nested configuration variables
        if attr.key? 'keys'
          markup << render_config_vars(
            vars: attr['keys'], converter: converter,
            config_name: config_name,
            classes: 'nested', parent_type: attr['type'])
        end

        markup << "</div>"
      end

      result << "</div>"
      result.join
    end

    def render(context)
      if !@config_name.to_s.empty?
        @config_name = "-" + @config_name
      end

      contents = super(context)

      config_name  = Liquid::Template.parse(@config_name).render context

      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

      vars = SafeYAML.load(contents)

      <<~MARKUP
        <div class="config-vars">
          <h3 id="configuration-variables#{config_name}">
            <a class="title-link" href="#configuration-variables#{config_name}"></a>Configuration Variables
          </h3>
          <div class="configuration-link">
            <a href="/docs/configuration/" target="_blank">Looking for your configuration file?</a>
          </div>
          #{render_config_vars(
            vars: vars,
            converter: converter,
            config_name: config_name
          )}
        </div>
      MARKUP
    end
  end
end

Liquid::Template.register_tag('configuration', Jekyll::ConfigurationBlock)
