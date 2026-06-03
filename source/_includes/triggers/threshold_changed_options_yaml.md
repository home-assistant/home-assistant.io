{% comment %}
Reusable "Options in YAML" block for "changed" entity triggers that use the
threshold-mapping schema.

Parameters:
  reading             quantity noun, e.g. "humidity", "temperature"
  unit_phrase_yaml    literal-value phrasing, e.g. "literal percentage 0–100"
  has_unit            set (to anything) to add unit_of_measurement guidance + example
                      (requires unit_label, unit_options_code, unit_default,
                      unit_example_entity, unit_example_value)
  unit_label          unit-kind label, e.g. "temperature unit", "energy unit"
  unit_options_code   inline-code list of allowed units, e.g. "`°C` or `°F`"
  unit_default        default unit used in the example, e.g. "°C"
  unit_example_entity entity reference used in the example, e.g.
                      "input_number.comfort_temperature_min"
  unit_example_value  literal number used in the example, e.g. "24"
{% endcomment %}
{% options_yaml %}
threshold:
  description: |
    A mapping that defines which kind of change fires the trigger:

    - `type: any`: Fires on any {{ include.reading }} change (no additional keys needed).
    - `type: above` (exclusive): Sets a minimum. Fires when the reading is strictly above `value`. A reading equal to `value` does not fire the trigger. Provide `value` with a `number` key (for a {{ include.unit_phrase_yaml }}) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: below` (exclusive): Sets a maximum. Fires when the reading is strictly below `value`. A reading equal to `value` does not fire the trigger. Provide `value` with a `number` key (for a {{ include.unit_phrase_yaml }}) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: between` (exclusive): Defines a range. Fires when the reading is strictly between `value_min` and `value_max`. Readings equal to either bound do not fire the trigger. Provide `value_min` and `value_max`, each with a `number` key (for a {{ include.unit_phrase_yaml }}) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: outside` (inclusive): Defines an outside-range. Fires when the reading is at or below `value_min`, or at or above `value_max`. Readings equal to either bound fire the trigger. Provide `value_min` and `value_max`, each with a `number` key (for a {{ include.unit_phrase_yaml }}) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
{% if include.has_unit %}

    When using the `number` key, you must also include `unit_of_measurement` to specify the {{ include.unit_label }} ({{ include.unit_options_code }}). When using the `entity` key, the unit is taken from the entity itself, or assumed to be the system {{ include.unit_label }} if the entity has no unit.

    For example:

    ```yaml
    threshold:
      type: outside
      value_min:
        entity: {{ include.unit_example_entity }}
      value_max:
        number: {{ include.unit_example_value }}
        unit_of_measurement: {{ include.unit_default }}
    ```

    A `sensor` or `number` entity's current value is used as the threshold, which lets you compare two {{ include.reading }} readings dynamically.
{% endif %}
  required: true
  type: map
{% endoptions_yaml %}
