module Jekyll
  module HomeAssistant
    class AlertBlock < Liquid::Block
      def initialize(tag_name, args, tokens)
        super
        raise SyntaxError, <<~MSG unless args.strip =~ SYNTAX
          Syntax error in alert block while parsing the following options:

          #{args}

          Valid syntax:
            {% <note|tip|important|warning|caution> [title="Extra title"] [icon="mdi:alert"] %}
        MSG

        @type = tag_name
        @options = Regexp.last_match(1)
      end

      def render(context)
        # We parse on render, as we now have context
        options = parse_options(@options, context)
        contents = super(context)

        title = @type.capitalize
        if options.include? :title
          title += ": #{options[:title]}"
        end

        if options.include? :icon
          icon = options[:icon]
        elsif @type == 'tip'
          icon = "mdi:lightbulb-outline"
        elsif @type == 'important'
          icon = "mdi:message-alert-outline"
        elsif @type == 'warning'
          icon = "mdi:alert-outline"
        elsif @type == 'caution'
          icon = "mdi:alert-circle-outline"
        else
          icon = "mdi:information-outline"
        end

        <<~MARKUP
          <div class="alert alert-#{@type}">
            <p class="alert-title"><iconify-icon inline icon='#{icon}'></iconify-icon> #{title}</p>
            <p class="alert-content">
              #{contents}
            </p>
          </div>
        MARKUP
      end

      private

      SYNTAX = /^((\s+\w+(=([\w.]+?|".+?"))?)*)$/
      OPTIONS_REGEX = /(?:\w="[^"]*"|\w=[\w.]+|\w)+/

      def parse_options(input, context)
        options = {}
        return options if input.empty?

        # Split along 3 possible forms: key="value", key=value, or just key
        input.scan(OPTIONS_REGEX) do |opt|
          key, value = opt.split('=')
          unless value.nil?
            if value&.include?('"')
              value.delete!('"')
            else
              value = context[value]
            end
          end
          options[key.to_sym] = value || true
        end
        options
      end
    end
  end
end
Liquid::Template.register_tag('note', Jekyll::HomeAssistant::AlertBlock)
Liquid::Template.register_tag('tip', Jekyll::HomeAssistant::AlertBlock)
Liquid::Template.register_tag('important', Jekyll::HomeAssistant::AlertBlock)
Liquid::Template.register_tag('warning', Jekyll::HomeAssistant::AlertBlock)
Liquid::Template.register_tag('caution', Jekyll::HomeAssistant::AlertBlock)
