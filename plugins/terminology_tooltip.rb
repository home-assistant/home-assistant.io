module Jekyll
  module HomeAssistant
    class TerminologyTooltip < Liquid::Tag

      def initialize(tag_name, args, tokens)
        super
        if args.strip =~ SYNTAX
          @term = Regexp.last_match(1)
          @text = Regexp.last_match(2)
        else
          raise SyntaxError, <<~MSG
            Syntax error in tag 'term' while parsing the following options:

            #{args}

            Valid syntax:
              {% term <term> [<text>] %}
          MSG
        end
      end

      def render(context)
        @term.gsub!(/\"/, "")
        entries = context.registers[:site].data["glossary"].select do |entry|
          entry.key?("term") and (@term.casecmp(entry["term"]).zero? or (entry.key?("aliases") and entry["aliases"].any?{ |s| s.casecmp(@term)==0 }))
        end

        raise ArgumentError, "Term #{@term} was not found in the glossary" if entries.length == 0
        raise ArgumentError, "Term #{@term} is in the glossary multiple times" if entries.length > 1
        raise ArgumentError, "Term #{@term} is missing a definition" unless entries[0].key?("definition")
        glossary = entries[0]

        definition = glossary["excerpt"] || glossary["definition"]
        
        if glossary.key?("link")
          rendered_link = Liquid::Template.parse(glossary["link"]).render(context).strip
          link = "<small><a class='terminology-link' href='#{rendered_link}'>[Learn more]</a></small>"
        end

        tooltip = "<span class='terminology-tooltip'>#{definition}#{link || ""}</span>"

        "<span class='terminology'>#{@text || @term}#{tooltip}</span>"
      end

      private

      SYNTAX = %r!^(\w+?|".+?")(?:\s+(\w+|".+"))?$!.freeze

    end
  end
end

Liquid::Template.register_tag('term', Jekyll::HomeAssistant::TerminologyTooltip)
