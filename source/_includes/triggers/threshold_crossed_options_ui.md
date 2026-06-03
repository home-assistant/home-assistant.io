{% comment %}
Reusable "Options in the UI" block for "crossed threshold" entity triggers that
use the threshold-mapping schema.

Parameters:
  unit_phrase_ui     value-entry phrasing, e.g. "a fixed percentage (0–100%)"
  has_unit           set (to anything) to add a "Unit" row (requires unit_label,
                     unit_options_code, unit_default)
  unit_label         unit-kind label, e.g. "temperature unit", "energy unit"
  unit_options_code  inline-code list of allowed units, e.g. "`°C` or `°F`"
  unit_default       default unit, e.g. "°C"
{% endcomment %}
{% options_ui %}
Threshold type:
  description: |
    Controls which threshold crossings fire the trigger:

    - **Above** (exclusive): fires when the reading crosses to strictly above the threshold. A reading equal to the threshold does not trigger a crossing.
    - **Below** (exclusive): fires when the reading crosses to strictly below the threshold. A reading equal to the threshold does not trigger a crossing.
    - **In range** (exclusive): fires when the reading crosses into the range. A reading equal to either bound is not considered inside the range.
    - **Outside range** (inclusive): fires when the reading crosses out of the range. A reading equal to either bound is considered outside the range.

    For each mode you can enter {{ include.unit_phrase_ui }} or reference a sensor entity or a [number helper](/integrations/input_number/) entity.
{% if include.has_unit %}
Unit:
  description: The {{ include.unit_label }} to use for threshold comparison. Accepts {{ include.unit_options_code }}. Required when using numerical thresholds (not required when using entity references). Default is `{{ include.unit_default }}`.
{% endif %}
Trigger when:
  description: |
    When multiple entities are targeted, controls when the trigger fires:

    - **Each**: fires every time any targeted entity crosses the threshold.
    - **First**: fires only on the first crossing.
    - **All**: fires only after every targeted entity crosses the threshold.

    This corresponds to the `behavior` field in YAML. Default is **Each**.
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Useful to avoid triggering on brief fluctuations. For example, set it to `0:05:00` to fire only after the reading has stayed past the threshold for 5 minutes. Default is `0` (fires immediately).
{% endoptions_ui %}
