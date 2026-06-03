{% comment %}
Reusable "Options in YAML" block for "crossed threshold" entity triggers that
use the threshold-mapping schema. The `behavior` and `for` field descriptions
are identical across the whole family. Suited to unitless members (humidity,
brightness, battery); members with a unit (temperature, energy, etc.) get an
added unit_of_measurement note in the threshold description.

Parameters:
  reading             quantity noun, e.g. "humidity", "temperature"
  unit_phrase_yaml    literal-value phrasing, e.g. "literal percentage 0–100"
  example_value       value used in the inline example (unitless members), e.g. "70"
  has_unit            set (to anything) for unit_of_measurement note + a unit-style
                      example (requires unit_label, unit_options_code, unit_default,
                      unit_example_entity, unit_example_value)
  unit_label          unit-kind label, e.g. "temperature unit", "energy unit"
  unit_options_code   inline-code list of allowed units, e.g. "`°C` or `°F`"
  unit_default        default unit used in the example, e.g. "°C"
  unit_example_entity entity reference used in the example, e.g.
                      "input_number.max_comfort_temperature"
  unit_example_value  literal number used in the example, e.g. "18"
{% endcomment %}
{% options_yaml %}
threshold:
  description: |
    A mapping that defines the threshold crossing that fires the trigger:

    - `type: above` (exclusive): Sets a minimum. Fires when the reading crosses to strictly above `value`. A reading equal to `value` does not trigger a crossing. Provide `value` with a `number` key (for a {{ include.unit_phrase_yaml }}) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: below` (exclusive): Sets a maximum. Fires when the reading crosses to strictly below `value`. A reading equal to `value` does not trigger a crossing. Provide `value` with a `number` key (for a {{ include.unit_phrase_yaml }}) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: between` (exclusive): Defines a range. Fires when the reading crosses into the range. A reading equal to either bound is not inside the range. Provide `value_min` and `value_max`, each with a `number` key (for a {{ include.unit_phrase_yaml }}) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: outside` (inclusive): Defines an outside-range. Fires when the reading crosses out of the range. A reading equal to either bound is outside the range. Provide `value_min` and `value_max`, each with a `number` key (for a {{ include.unit_phrase_yaml }}) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).

{% if include.has_unit %}

    When using the `number` key, you must also include `unit_of_measurement` to specify the {{ include.unit_label }} ({{ include.unit_options_code }}). When using the `entity` key, the unit is taken from the entity itself, or assumed to be the system {{ include.unit_label }} if the entity has no unit.

    For example:

    ```yaml
    threshold:
      type: between
      value_min:
        number: {{ include.unit_example_value }}
        unit_of_measurement: {{ include.unit_default }}
      value_max:
        entity: {{ include.unit_example_entity }}
    ```

    A `sensor` or `number` entity's current value is used as the threshold, which lets you compare two {{ include.reading }} readings dynamically.
{% else %}

    For example:

    ```yaml
    threshold:
      type: above
      value:
        number: {{ include.example_value }}
    ```
{% endif %}
  required: true
  type: map
behavior:
  description: |
    When multiple entities are targeted, controls when the trigger fires:

    - `any` (**Each** in the UI, default): fires every time any targeted entity crosses the threshold.
    - `first` (**First** in the UI): fires only on the first threshold crossing.
    - `last` (**All** in the UI): fires only after every targeted entity crosses the threshold.
  required: false
  type: string
  default: any
for:
  description: |
    How long the reading must remain past the threshold before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` fires only after the reading has stayed past the threshold for 5 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}
