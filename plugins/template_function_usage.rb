require 'securerandom'
require_relative 'terminology_helpers'

module Jekyll
  class TemplateFunctionUsageBlock < Liquid::Raw
    USAGE_TYPES = {
      'function' => { label: 'As a function', icon: 'mdi:function' },
      'filter'   => { label: 'As a filter',   icon: 'mdi:filter-outline' },
      'test'     => { label: 'As a test',     icon: 'mdi:test-tube' }
    }

    include Jekyll::TerminologyHelpers

    def render(context)
      # Split on YAML document separator for multiple variants
      documents = @body.split(/^---\s*$/)
      parsed = documents.map { |doc| parse_document(doc.strip) }.compact

      return '' if parsed.empty?

      if parsed.length == 1
        render_single(parsed[0], context)
      else
        render_tabbed(parsed, context)
      end
    end

    private

    def parse_document(text)
      return nil if text.empty?

      vars = SafeYAML.load(text)
      return nil unless vars.is_a?(Hash)

      input_type = USAGE_TYPES.keys.find { |t| vars.key?(t) }
      return nil unless input_type

      {
        input_type: input_type,
        input_content: vars[input_type].to_s.strip,
        output_content: vars['output']&.to_s&.strip,
        result_type: vars['type']&.to_s&.strip
      }
    end

    def render_output(output_content, result_type, has_input, context)
      escaped_output = CGI.escapeHTML(output_content)
      if result_type
        type_term = render_term(result_type, context)
        result_label = "<iconify-icon inline icon='mdi:arrow-collapse-right'></iconify-icon> Result (#{type_term})"
      else
        result_label = "<iconify-icon inline icon='mdi:arrow-collapse-right'></iconify-icon> Result"
      end

      html = []
      if has_input
        html << '<div class="template-example-arrow"><svg viewBox="0 0 16 16"><path d="M8 3v7.5M4 7l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
      end
      html << '<div class="template-example-output">'
      html << "  <span class=\"template-example-label\">#{result_label}</span>"
      html << "  <pre><code>#{escaped_output}</code></pre>"
      html << '</div>'
      html
    end

    def render_single(v, context)
      type_info = USAGE_TYPES[v[:input_type]]
      escaped_input = CGI.escapeHTML(v[:input_content])

      html = ['<div class="template-example">']
      html << '  <div class="template-example-input">'
      html << "    <span class=\"template-example-label\"><iconify-icon inline icon='#{type_info[:icon]}'></iconify-icon> #{render_term(type_info[:label], context)}</span>"
      html << "    <pre class=\"language-template\"><code class=\"language-template\">#{escaped_input}</code></pre>"
      html << '  </div>'

      if v[:output_content] && !v[:output_content].empty?
        html.concat(render_output(v[:output_content], v[:result_type], true, context))
      end

      html << '</div>'
      html.join("\n")
    end

    def render_tabbed(variants, context)
      uuid = "tfu" + SecureRandom.hex(6)

      tab_labels = variants.map.with_index do |v, i|
        type_info = USAGE_TYPES[v[:input_type]]
        checked = i == 0 ? " checked" : ""
        "<label data-tab='#{uuid}-#{i}' class='tfu-tab'><input type='radio' name='#{uuid}'#{checked}><div><iconify-icon inline icon='#{type_info[:icon]}'></iconify-icon> #{type_info[:label]}</div></label>"
      end

      tab_contents = variants.map.with_index do |v, i|
        display = i == 0 ? "block" : "none"
        escaped_input = CGI.escapeHTML(v[:input_content])

        template_label = "<iconify-icon inline icon='mdi:code-braces'></iconify-icon> #{render_term('Template', context)}"
        inner = []
        inner << "<div class=\"template-example-input\"><span class=\"template-example-label\">#{template_label}</span>"
        inner << "<pre class=\"language-template\"><code class=\"language-template\">#{escaped_input}</code></pre></div>"

        if v[:output_content] && !v[:output_content].empty?
          inner.concat(render_output(v[:output_content], v[:result_type], true, context))
        end

        "<div data-panel='#{uuid}-#{i}' class='tabbed-content-block-content' style='display:#{display}'>#{inner.join("\n")}</div>"
      end

      # Tab switching script (once per page)
      script = ""
      unless context['tfu_script_included']
        context['tfu_script_included'] = true
        script = <<~SCRIPT
          <script>
          document.addEventListener('click', function(e) {
            var label = e.target.closest('.tfu-tab');
            if (!label) return;
            var targetId = label.getAttribute('data-tab');
            var container = label.closest('.tabbed-content-block');
            if (!container) return;
            container.querySelectorAll('.tabbed-content-block-content').forEach(function(el) {
              el.style.display = 'none';
            });
            var target = container.querySelector('[data-panel="' + targetId + '"]');
            if (target) target.style.display = 'block';
          });
          </script>
        SCRIPT
      end

      html = []
      html << script unless script.empty?
      html << '<div class="template-example">'
      html << '  <div class="tabbed-content-block">'
      html << "    <div class='tabbed-content-block-tabs'>#{tab_labels.join}</div>"
      html << "    #{tab_contents.join("\n    ")}"
      html << '  </div>'
      html << '</div>'
      html.join("\n")
    end
  end
end

Liquid::Template.register_tag('template_function_usage', Jekyll::TemplateFunctionUsageBlock)
