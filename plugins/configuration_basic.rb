module Jekyll
  class ConfigurationBasicBlock < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
      @component, @platform = text.strip.split('.', 2)
    end

    def slug(key)
      key.downcase.strip.gsub(' ', '-').gsub(/[^\w\-]/, '')
    end

    def render_config_vars(vars:, component:, platform:, converter:, classes: nil, parent_type: nil)
      result = Array.new
      result << "<div class='#{classes}'>"

      result << vars.map do |key, attr|
        markup = Array.new
        markup << "<div class='config-vars-item'><div class='config-vars-label'><span class='config-vars-label-name'>#{key}</span><a name='#{slug(key)}' class='title-link' href='\##{slug(key)}'></a></div><div class='config-vars-description-and-children'>"

        if attr.key? 'description'
          markup << "<span class='config-vars-description'>#{converter.convert(attr['description'].to_s)}</span>"
        else
          # Description is missing
          raise ArgumentError, "Configuration key '#{key}' is missing a description."
        end

        markup << "</div>"

        # Check for nested configuration variables
        if attr.key? 'keys'
          markup << render_config_vars(
            vars: attr['keys'], component: component,
            platform: platform, converter: converter,
            classes: 'nested', parent_type: attr['type'])
        end

        markup << "</div>"
      end

      result << "</div>"
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

      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

      vars = SafeYAML.load(contents)

      <<~MARKUP
        <div class="config-vars basic">
          #{render_config_vars(
            vars: vars,
            component: component,
            platform: platform,
            converter: converter
          )}
        </div>
      MARKUP
    end
  end
end

Liquid::Template.register_tag('configuration_basic', Jekyll::ConfigurationBasicBlock)