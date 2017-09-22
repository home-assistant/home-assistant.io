module Jekyll
  class ConfigurationBlock < Liquid::Block
    TYPE_LINKS = {
      'action'       => '/docs/scripts/',
      'device_class' => '/components/%{component}/#device_class',
      'template'     => '/docs/configuration/templating/',
    }

    def initialize(tag_name, text, tokens)
      super
      @component, @platform = text.strip.split('.', 2)
    end

    def slug(key)
      key.downcase.strip.gsub(' ', '-').gsub(/[^\w\-]/, '')
    end

    def type_class(type)
      ((type.is_a? Array) ? type.join(' ') : type).downcase
    end

    def type_link(type, component: nil)
      if type.include? ','
        type = type.split(',')
      end

      if type.is_a? Array
        return (type.map { |t| type_link(t, component: component) }).join(' | ')
      end

      type.strip!
      if TYPE_LINKS.include? type.downcase
        url = TYPE_LINKS[type.downcase] % {component: component}
        "[%s](%s)" % [type, url]
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

    def render_config_vars(vars:, component:, platform:, classes: nil)
      result = Array.new
      result << "<dl class='#{classes}'>"

      result << vars.map do |key, attr|
        markup = Array.new
        markup << "<dt><a class='title-link' name='#{slug(key)}' href='\##{slug(key)}'></a> #{key}</dt>"
        markup << "<dd>"
        markup << "<p class='desc'>"
        if attr.key? 'type'
          markup << "<span class='type'>(<span class='#{type_class(attr['type'])}'>"
          markup << "#{type_link(attr['type'], component: component)}</span>)</span>"
        end
        if attr.key? 'required'
          markup << "<span class='required'>(#{required_value(attr['required'])})</span>"
        end
        if attr.key? 'description'
          markup << "<span class='description'>#{attr['description']}</span>"
        end
        markup << "</p>"
        if attr.key? 'default'
          markup << "<p class='default'>Default value: #{attr['default']}</p>"
        end
        markup << "</dd>"

        # Check for nested configuration variables
        if attr.key? 'keys'
          markup << "<dd>"
          markup << render_config_vars(
            vars: attr['keys'], component: component,
            platform: platform, classes: 'nested')
          markup << "</dd>"
        end

        markup
      end

      result << "</dl>"
      result.join
    end

    def render(context)
      if @component.nil? and @platform.nil?
        page = context.environments.first['page']
        @component, @platform = page['slug'].split('.', 2)
      end

      contents = super(context)

      component = Liquid::Template.parse(@component).render context
      platform  = Liquid::Template.parse(@platform).render context

      vars = SafeYAML.load(contents)

      <<~MARKUP
        <div class="config-vars">
          <h3><a class="title-link" name="configuration-variables" href="#configuration-variables"></a> Configuration Variables</h3>
          #{render_config_vars(vars: vars, component: component, platform: platform)}
        </div>
      MARKUP
    end
  end
end

Liquid::Template.register_tag('configuration', Jekyll::ConfigurationBlock)
