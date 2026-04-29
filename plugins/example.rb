require 'cgi'
require 'safe_yaml'
require_relative 'terminology_helpers'

module Jekyll
  class ExampleBlock < Liquid::Raw
    INPUT_TYPES = {
      'action' => { label: 'Action', language: 'yaml', icon: 'mdi:play-circle-outline' },
      'automation' => { label: 'Automation', language: 'yaml', icon: 'mdi:robot-happy' },
      'condition' => { label: 'Condition', language: 'yaml', icon: 'mdi:help-circle-outline' },
      'script' => { label: 'Script', language: 'yaml', icon: 'mdi:script-text-outline' },
      'template' => { label: 'Template', language: 'template', icon: 'mdi:code-braces' },
      'trigger' => { label: 'Trigger', language: 'yaml', icon: 'mdi:flash-outline' }
    }

    ARROW_SVG = '<div class="template-example-arrow"><svg viewBox="0 0 16 16"><path d="M8 3v7.5M4 7l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'

    include Jekyll::TerminologyHelpers

    def render(context)
      vars = SafeYAML.load(@body)
      return '' unless vars.is_a?(Hash)

      input_type = INPUT_TYPES.keys.find { |t| vars.key?(t) }
      input_content = input_type ? vars[input_type].to_s.strip : nil
      output_content = vars['output']&.to_s&.strip
      result_type = vars['type']&.to_s&.strip
      title = vars['title']&.to_s&.strip

      has_input = input_type && input_content && !input_content.empty?
      has_output = output_content && !output_content.empty?
      return '' unless has_input || has_output

      html = ['<div class="template-example">']
      html.concat(render_input(input_type, input_content, title, context)) if has_input
      html << "  #{ARROW_SVG}" if has_input && has_output
      html.concat(render_output(output_content, result_type, context)) if has_output
      html << '</div>'
      html.join("\n")
    end

    private

    def render_input(input_type, input_content, title, context)
      type_info = INPUT_TYPES[input_type]
      icon = "<iconify-icon inline icon='#{type_info[:icon]}'></iconify-icon> "
      label = "#{icon}#{render_term(type_info[:label], context)}"
      label = "#{label}: #{title}" if title
      language = type_info[:language]
      [
        '  <div class="template-example-input">',
        "    <span class=\"template-example-label\">#{label}</span>",
        "    <pre class=\"language-#{language}\"><code class=\"language-#{language}\">#{CGI.escapeHTML(input_content)}</code></pre>",
        '  </div>'
      ]
    end

    def render_output(output_content, result_type, context)
      label_icon = "<iconify-icon inline icon='mdi:arrow-collapse-right'></iconify-icon>"
      label = result_type ? "#{label_icon} Result (#{render_term(result_type, context)})" : "#{label_icon} Result"
      [
        '  <div class="template-example-output">',
        "    <span class=\"template-example-label\">#{label}</span>",
        "    <pre><code>#{CGI.escapeHTML(output_content)}</code></pre>",
        '  </div>'
      ]
    end
  end
end

Liquid::Template.register_tag('example', Jekyll::ExampleBlock)
