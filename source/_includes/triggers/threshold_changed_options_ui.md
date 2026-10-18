{% comment %}
Reusable "Options in the UI" block for "changed" entity triggers that use the
threshold-mapping schema.

Parameters:
  unit_phrase_ui     Value-entry phrasing. For example: "a fixed percentage (0–100%)".
  has_unit           Set (to anything) to add a "Unit" row. Requires unit_label,
                     unit_options_code, and unit_default.
  unit_label         Unit label. For example: "temperature unit", "energy unit".
  unit_options_code  Inline code list of allowed units. For example: "`°C` or `°F`".
  unit_default       Optional. Default unit shown in the UI. For example: "°C".
{% endcomment %}
{% options_ui %}
Threshold type:
  description: |
    Controls which changes fire the trigger:

    - **Any change**: fires on any change, regardless of direction or new value.
    - **Above** or **Below** (exclusive): fires only when the new reading is strictly above or below the threshold. A reading equal to the threshold does not fire the trigger.
    - **In range** (inclusive): fires when the new reading is between the two bounds. A reading equal to either bound fires the trigger.
    - **Outside range** (exclusive): fires when the new reading is below the lower bound or above the upper bound. A reading equal to either bound does not fire the trigger.

    For each mode you can enter {{ include.unit_phrase_ui }} or reference a sensor entity or a [number helper](/integrations/input_number/) entity.
{% if include.has_unit %}
Unit:
  description: The {{ include.unit_label }} to use for threshold comparison. Accepts {{ include.unit_options_code }}. Required when using numerical thresholds (not required when using entity references).{% if include.unit_default %} Default is `{{ include.unit_default }}`.{% endif %}
{% endif %}
{% endoptions_ui %}
