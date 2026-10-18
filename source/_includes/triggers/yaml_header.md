## Using this trigger in YAML

If you work directly in YAML, or you want to know exactly what Home Assistant does under the hood, this section has the technical reference. It lists the field names you use in YAML, their types, and which ones are required.
{%- assign top_level_triggers = "lg_netcast.turn_on,samsungtv.turn_on,webostv.turn_on,zwave_js.event,zwave_js.value_updated" | split: "," -%}
{%- if page.trigger contains "." -%}
{%- unless top_level_triggers contains page.trigger %}

In YAML, use `target` to choose what the trigger monitors. Put all other settings of the trigger under `options`, not at the top level next to `trigger` and `target`.
{%- endunless -%}
{%- endif %}

{%- assign trigger_domain = page.trigger | split: "." | first -%}
{%- case page.trigger -%}
  {%- when "device" -%}{%- assign trigger_data_anchor = "device-triggers" -%}
  {%- when "event" -%}{%- assign trigger_data_anchor = "event-triggers" -%}
  {%- when "geo_location" -%}{%- assign trigger_data_anchor = "geolocation-triggers" -%}
  {%- when "homeassistant" -%}{%- assign trigger_data_anchor = "home-assistant-triggers" -%}
  {%- when "mqtt" -%}{%- assign trigger_data_anchor = "mqtt-triggers" -%}
  {%- when "numeric_state" -%}{%- assign trigger_data_anchor = "numeric-state-triggers" -%}
  {%- when "state" -%}{%- assign trigger_data_anchor = "state-triggers" -%}
  {%- when "tag" -%}{%- assign trigger_data_anchor = "tag-triggers" -%}
  {%- when "time" -%}{%- assign trigger_data_anchor = "time-triggers" -%}
  {%- when "time_pattern" -%}{%- assign trigger_data_anchor = "time-pattern-triggers" -%}
  {%- else -%}
    {%- if trigger_domain == "calendar" -%}
      {%- assign trigger_data_anchor = "calendar-triggers" -%}
    {%- else -%}
      {%- assign trigger_data_anchor = "trigger-properties" -%}
    {%- endif -%}
{%- endcase %}

When this trigger starts an automation, it passes data about what happened to the automation. You can use this trigger data in the templates of your conditions and actions. To see which data is available, refer to [Trigger data in templates](/docs/automation/trigger-data/#{{ trigger_data_anchor }}).
