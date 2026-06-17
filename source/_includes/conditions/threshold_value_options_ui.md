{% comment %}
Reusable "Options in the UI" block for entity conditions that test a reading
against the threshold-mapping schema.

Parameters:
  reading            quantity noun, e.g. "humidity"
  value_short        Number-entry phrasing, e.g. "a fixed percentage (0–100)"
  has_unit           set (to anything) to add a "Unit" row (requires unit_label,
                     unit_options_code, unit_default)
  unit_label         Unit label. For example: "temperature unit", "energy unit".
  unit_options_code  inline-code list of allowed units, e.g. "`°C` or `°F`"
  unit_default       Default unit. For example: "°C"
{% endcomment %}
{% options_ui %}
Threshold type:
  description: |
    The {{ include.reading }} level the entity has to meet for the condition to pass. **Above** and **Below** are exclusive: a reading equal to the threshold does not pass. **In range** is exclusive at both bounds. **Outside range** is inclusive: a reading equal to either bound passes. Choose **Number** to enter {{ include.value_short }}, or **Entity** to use a sensor or number helper as a dynamic threshold.
{% if include.has_unit %}
Unit:
  description: The {{ include.unit_label }} to use for threshold comparison. Accepts {{ include.unit_options_code }}. Required when using numerical thresholds (not required when using entity references).
  default: {{ include.unit_default }}
{% endif %}
Condition passes if:
  description: |
    When multiple entities are targeted, controls how results combine:

    - **Any**: The condition passes if at least one targeted entity meets the threshold (default).
    - **All**: The condition passes only when every targeted entity meets the threshold.
{% endoptions_ui %}
