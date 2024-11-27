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

      def render(_context)
        title_attribute = @title ? " title='#{@title}'" : ""
        "<iconify-icon inline icon='#{@icon}'#{title_attribute}></iconify-icon>"
      end

      private

      SYNTAX = %r!^"(?<icon>[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:-[a-z0-9]+)*)"(?:\s+title="(?<title>[^"]+)")?$!.freeze
    end
  end
end

Liquid::Template.register_tag('icon', Jekyll::HomeAssistant::Icon)
