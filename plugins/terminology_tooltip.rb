module Jekyll
  module HomeAssistant
    class TerminologyTooltip < Liquid::Tag
      def initialize(tag_name, args, tokens)
        super
        raise SyntaxError, <<~MSG unless args.strip =~ SYNTAX
          Syntax error in tag 'term' while parsing the following options:

          #{args}

          Valid syntax:
            {% term <term> [<text>] %}
        MSG

        @term = Regexp.last_match(1)
        @text = Regexp.last_match(2)
      end

      def render(context)
        @term.gsub!(/"/, '')
        entries = context.registers[:site].data['glossary'].select do |entry|
          entry.key?('term') and (@term.casecmp(entry['term']).zero? or (entry.key?('aliases') and entry['aliases'].any? do |s|
                                                                           s.casecmp(@term) == 0
                                                                         end))
        end

        raise ArgumentError, "Term #{@term} was not found in the glossary" if entries.length == 0
        raise ArgumentError, "Term #{@term} is in the glossary multiple times" if entries.length > 1
        raise ArgumentError, "Term #{@term} is missing a definition" unless entries[0].key?('definition')

        glossary = entries[0]

        definition = glossary['excerpt'] || glossary['definition']

        if glossary.key?('link')
          rendered_link = Liquid::Template.parse(glossary['link']).render(context).strip
          link = "<a class='terminology-link' href='#{rendered_link}'> [Learn more]</a>"
          definition = "#{definition.strip}#{link}".strip
        end

        tooltip = "<span class='terminology-tooltip'>#{definition.strip}</span>"

        "<span class='terminology'>#{@text || @term}#{tooltip}</span>"
      end

      private

      SYNTAX = /^(\w+?|".+?")(?:\s+(\w+|".+"))?$/
    end
  end
end

Liquid::Template.register_tag('term', Jekyll::HomeAssistant::TerminologyTooltip)
