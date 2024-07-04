module Jekyll
  module HomeAssistant
    class Icon < Liquid::Tag

      def initialize(tag_name, args, tokens)
        super
        if args.strip =~ SYNTAX
          @icon = Regexp.last_match(1).downcase
        else
          raise SyntaxError, <<~MSG
            Syntax error in tag 'icon' while parsing the following options:

            #{args}

            Valid syntax:
              {% icon "<icon-set>:<icon-name>" %}
          MSG
        end
      end

      def render(_context)
        "<iconify-icon inline icon='#{@icon}'></iconify-icon>"
      end

      private

      SYNTAX = %r!^"([a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:-[a-z0-9]+)*)"$!.freeze
    end
  end
end

Liquid::Template.register_tag('icon', Jekyll::HomeAssistant::Icon)
