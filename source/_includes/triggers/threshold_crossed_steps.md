{% comment %}
Reusable "To use ... in an automation" steps for entity triggers that use the
threshold-mapping schema and fire when a reading crosses a threshold. Used by
humidity.crossed_threshold; reusable by climate.target_humidity_crossed_threshold,
light.brightness_crossed_threshold, battery.level_crossed, and similar.

Parameters:
  title           UI display name, e.g. "Relative humidity crossed threshold"
  sensor          sensor noun, e.g. "humidity sensor"
  areas           example areas, e.g. "bathroom or basement"
  unit_phrase_ui  value-entry phrasing, e.g. "a fixed percentage (0–100%)"
  has_unit        set (to anything) to add a "Unit" step (requires unit_label, unit_options)
  unit_label      unit-kind label, e.g. "temperature unit", "energy unit"
  unit_options    bare list of allowed units for prose, e.g. "°C or °F"
{% endcomment %}
To use **{{ include.title }}** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your {{ include.sensor }} is in (like your {{ include.areas }}). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **{{ include.title }}**.
6. Under **Threshold type**, configure the zone the reading must enter for the trigger to fire:
   - Select **Above** or **Below** and enter a value to fire when the reading crosses that level.
   - Select **In range** and enter a lower and upper bound to fire when the reading enters the range from outside.
   - Select **Outside range** and enter a lower and upper bound to fire when the reading leaves the range (crosses past either bound).
   - For each option, you can enter {{ include.unit_phrase_ui }}, pick a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
{%- if include.has_unit %}
7. Under **Unit**, select the {{ include.unit_label }} ({{ include.unit_options }}) to use for the threshold comparison.
{%- endif %}
8. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple entities are targeted.
9. Under **For at least**, set how long the reading must stay past the threshold before the trigger fires. Leave it at zero to fire immediately.
10. Select **Save**.
