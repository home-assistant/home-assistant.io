require 'safe_yaml'
require 'securerandom'
require_relative 'configuration'

# Render a single tabbed fields reference that combines the UI-friendly view
# and the YAML-technical view. The block body is a YAML mapping with two
# top-level keys:
#
#   {% fields %}
#   ui:
#     Transition:
#       description: How long, in seconds, it takes to fade.
#       required: false
#     Brightness:
#       description: ...
#       required: false
#   yaml:
#     transition:
#       description: Duration, in seconds, it takes to fade.
#       type: integer
#     brightness_pct:
#       description: Number indicating percentage...
#       type: integer
#   {% endfields %}
#
# The UI tab is shown by default. The YAML tab reuses the shared
# `render_config_vars` helper from `ConfigurationBlock` and drops
# `required: false` so only required fields carry a badge. The tabbed
# markup reuses the existing `.tabbed-content-block` / `.tfu-tab` classes
# so no new CSS is needed, and the click handler is idempotent so it
# coexists with any other tabbed block on the page.
module Jekyll
  class FieldsBlock < ConfigurationBlock
    TAB_TYPES = {
      'ui'   => { label: 'In the UI',   icon: 'mdi:gesture-tap' },
      'yaml' => { label: 'In YAML',     icon: 'mdi:code-braces' }
    }.freeze

    def render(context)
      contents = Liquid::Block.instance_method(:render).bind_call(self, context)
      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

      vars = SafeYAML.load(contents)
      raise ArgumentError, "fields block must contain a YAML mapping" unless vars.is_a?(Hash)

      ui_fields = vars['ui']
      yaml_fields = vars['yaml']

      tabs = []
      tabs << ['ui',   render_ui_panel(ui_fields, converter)]     if ui_fields.is_a?(Hash)
      tabs << ['yaml', render_yaml_panel(yaml_fields, converter)] if yaml_fields.is_a?(Hash)

      return '' if tabs.empty?

      uuid = "fields" + SecureRandom.hex(6)

      tab_labels = tabs.map.with_index do |(type, _), i|
        info = TAB_TYPES[type]
        checked = i == 0 ? ' checked' : ''
        "<label data-tab='#{uuid}-#{i}' class='tfu-tab'><input type='radio' name='#{uuid}'#{checked}><div><iconify-icon inline icon='#{info[:icon]}'></iconify-icon> #{info[:label]}</div></label>"
      end

      tab_panels = tabs.map.with_index do |(_, content), i|
        display = i == 0 ? 'block' : 'none'
        "<div data-panel='#{uuid}-#{i}' class='tabbed-content-block-content' style='display:#{display}'>#{content}</div>"
      end

      script = ''
      unless context['fields_script_included']
        context['fields_script_included'] = true
        script = tab_switch_script
      end

      html = []
      html << script unless script.empty?
      html << '<div class="fields-block">'
      html << '  <div class="tabbed-content-block">'
      html << "    <div class='tabbed-content-block-tabs'>#{tab_labels.join}</div>"
      html << "    #{tab_panels.join("\n    ")}"
      html << '  </div>'
      html << '</div>'
      html.join("\n")
    end

    private

    # Render the UI tab: friendly labels, required/optional indicator, and
    # description. Emits the same `config-vars basic` structure as the
    # standalone `fields_ui` block so existing CSS applies.
    def render_ui_panel(vars, converter)
      items = vars.map do |key, attr|
        desc = attr['description'].to_s
        raise ArgumentError, "Field '#{key}' is missing a description" if desc.strip.empty?

        required = attr['required']
        label_html = +"<span class='config-vars-label-name'>#{key}</span>"
        if required == true || required == false
          req_klass = required == true ? 'true' : 'false'
          req_text = required == true ? 'Required' : 'Optional'
          label_html << "<span class='config-vars-required'> (<span class='#{req_klass}'>#{req_text}</span>)</span>"
        end

        <<~ITEM
          <div class='config-vars-item'>
            <div class='config-vars-label'>
              #{label_html}
            </div>
            <div class='config-vars-description-and-children'>
              <span class='config-vars-description'>#{converter.convert(desc)}</span>
            </div>
          </div>
        ITEM
      end
      "<div class='config-vars basic'>#{items.join}</div>"
    end

    # Render the YAML tab: technical names, types, required-only markers.
    # Reuses the shared `render_config_vars` helper from ConfigurationBlock
    # so type links and type validation come for free.
    def render_yaml_panel(vars, converter)
      cleaned = {}
      vars.each do |key, attr|
        if attr.is_a?(Hash)
          copy = attr.dup
          copy.delete('required') if copy['required'] == false
          cleaned[key] = copy
        else
          cleaned[key] = attr
        end
      end

      body = render_config_vars(
        vars: cleaned,
        component: '',
        platform: '',
        converter: converter
      )
      %Q(<div class="config-vars">#{body}</div>)
    end

    def tab_switch_script
      <<~SCRIPT
        <script>
        (function () {
          if (window.__fieldsTabsInit) return;
          window.__fieldsTabsInit = true;
          document.addEventListener('click', function (e) {
            var label = e.target.closest('.tfu-tab');
            if (!label) return;
            var targetId = label.getAttribute('data-tab');
            var container = label.closest('.tabbed-content-block');
            if (!container) return;
            container.querySelectorAll('.tabbed-content-block-content').forEach(function (el) {
              el.style.display = 'none';
            });
            var target = container.querySelector('[data-panel="' + targetId + '"]');
            if (target) target.style.display = 'block';
          });
        })();
        </script>
      SCRIPT
    end
  end
end

Liquid::Template.register_tag('fields', Jekyll::FieldsBlock)
