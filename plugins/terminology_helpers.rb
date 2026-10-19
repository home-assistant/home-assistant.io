module Jekyll
  # Shared helpers for wrapping glossary terms with tooltips.
  # Included by template function Liquid tags that render user-facing labels.
  module TerminologyHelpers
    def render_term(text, context)
      glossary = context.registers[:site].data['glossary']
      return text unless glossary

      entry = glossary.find do |e|
        e.key?('term') && (
          text.casecmp(e['term']).zero? ||
          (e.key?('aliases') && e['aliases'].any? { |a| a.casecmp(text).zero? })
        )
      end

      return text unless entry && entry.key?('definition')

      definition = entry['excerpt'] || entry['definition']

      if entry.key?('link')
        rendered_link = Liquid::Template.parse(entry['link']).render(context).strip
        link = "<a class='terminology-link' href='#{rendered_link}'> [Learn more]</a>"
        definition = "#{definition.strip}#{link}".strip
      end

      tooltip = "<span class='terminology-tooltip'>#{definition.strip}</span>"
      "<span class='terminology'>#{text}#{tooltip}</span>"
    end
  end
end
