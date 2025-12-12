module Jekyll
  module HomeAssistant
    class Icon < Liquid::Tag

      def initialize(tag_name, args, tokens)
        super
        if args.strip =~ SYNTAX
          @icon = Regexp.last_match[:icon].downcase
          @title = Regexp.last_match[:title]
        else
          raise SyntaxError, <<~MSG
            Syntax error in tag 'icon' while parsing the following options:

            #{args}

            Valid syntax:
              {% icon "<icon-set>:<icon-name>" [title="<title>"] %}
          MSG
        end
      end
      
      def default_title(icon)
        # split away "mdi:" part
        icon_name = icon.split(':').last

        # remove dashes and capitalize e.g. "water-polo" to "Water polo"
        parts = icon_name.split('-')
        parts[0] = parts[0].capitalize
        parts.join(' ')
      end

      def render(_context)
        title = @title || default_title(@icon)
        "<iconify-icon inline icon='#{@icon}' title='#{title}'></iconify-icon>"
      end

      private

      SYNTAX = %r!^"(?<icon>[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:-[a-z0-9]+)*)"(?:\s+title="(?<title>[^"]+)")?$!.freeze
    end
  end
end

Liquid::Template.register_tag('icon', Jekyll::HomeAssistant::Icon)
