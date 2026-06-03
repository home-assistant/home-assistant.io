{% comment %}
Reusable "To use ... in an automation" steps for entity triggers that use the
threshold-mapping schema (type: any/above/below/between/outside) and fire on a
"changed" event. Used by humidity.changed; reusable by climate.target_humidity_changed,
light.brightness_changed, battery.level_changed, and similar.

Parameters:
  title           UI display name, e.g. "Relative humidity changed"
  sensor          sensor noun, e.g. "humidity sensor"
  areas           example areas, e.g. "bathroom or bedroom"
  unit_phrase_ui  value-entry phrasing, e.g. "a fixed percentage (0–100%)"
  has_unit        set (to anything) to add a "Unit" step (requires unit_label, unit_options)
  unit_label      unit-kind label, e.g. "temperature unit", "energy unit"
  unit_options    bare list of allowed units for prose, e.g. "°C or °F"
{% endcomment %}
To use **{{ include.title }}** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your {{ include.sensor }} is in (like your {{ include.areas }}). You can also select a device, a specific entity, or a label. When you target multiple entities (via area, label, or multiple entity selections), the trigger fires whenever any of them changes.
5. From the triggers shown for that target, select **{{ include.title }}**.
6. Under **Threshold type**, configure what kind of change fires the trigger:
   - Select **Any change** to fire on any change, regardless of direction or new value.
   - Select **Above** or **Below** and enter a value to fire only when the new reading is above or below that value.
   - Select **In range** and enter a lower and upper bound to fire only when the new reading falls inside the range.
   - Select **Outside range** and enter a lower and upper bound to fire only when the new reading is outside the range.
   - For each option, you can enter {{ include.unit_phrase_ui }}, pick a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
{%- if include.has_unit %}
7. Under **Unit**, select the {{ include.unit_label }} ({{ include.unit_options }}) to use for the threshold comparison.
{%- endif %}
8. Select **Save**.
