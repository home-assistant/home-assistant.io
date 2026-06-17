{% comment %}
Reusable "To use ... in an automation" steps for entity conditions that test a
reading against the threshold-mapping schema (above/below/in range/outside
range). Used by humidity.is_value; reusable by climate.target_humidity,
light.is_brightness, counter.is_value, and similar.

Parameters:
  title         UI display name. For example: "Relative humidity".
  sensor        Sensor noun. For example: "humidity sensor".
  areas         Example areas. For example: "bedroom or bathroom".
  reading       Quantity noun. For example: "humidity".
  value_long    Number-entry phrasing. For example: "a fixed percentage directly, for example `65` for 65%".
  has_unit      Set (to anything) to add a "Unit" step. Requires unit_label and unit_options.
  unit_label    Unit label. For example: "temperature unit", "energy unit".
  unit_options  Bare list of allowed units for prose. For example: "°C or °F".
{% endcomment %}
To use **{{ include.title }}** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your {{ include.sensor }} is in (like your {{ include.areas }}). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **{{ include.title }}**.
6. Under **Threshold type**, set the {{ include.reading }} level the condition checks against:
   1. Pick whether the reading must be **Above**, **Below**, **In range**, or **Outside range** of the threshold.
   2. Select **Number** or **Entity**:
      - **Number**: Enter {{ include.value_long }}. For **In range** or **Outside range**, enter both a lower and upper bound.
      - **Entity**: Use a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold:
        - Number helper: You can adjust the threshold value without editing the automation. The sensor reading is compared against the number helper's current value.
        - Sensor: Its current reading becomes the threshold and updates automatically as the sensor changes. This is useful for comparing two {{ include.reading }} readings, for example to check whether indoor {{ include.reading }} is higher than outdoor {{ include.reading }}.
        - For **In range** or **Outside range**, you need two entities: one for the lower bound and one for the upper bound (for example, two separate number helpers).
        - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
{%- if include.has_unit %}
7. Under **Unit**, select the {{ include.unit_label }} ({{ include.unit_options }}) to use for the threshold comparison.
{%- endif %}
8. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
9. Select **Save**.
