{% comment %}
Reusable "Options in YAML" block for "changed" entity triggers that use the
threshold-mapping schema.

Parameters:
  reading           quantity noun, e.g. "humidity"
  unit_phrase_yaml  literal-value phrasing, e.g. "literal percentage 0–100"
  has_unit          set (to anything) to add the temperature unit_of_measurement note
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

    When using the `number` key, you must also include `unit_of_measurement` to specify the temperature unit (`°C` or `°F`). When using the `entity` key, the unit is taken from the entity itself, or assumed to be the system temperature unit if the entity has no unit.

    For example:

    ```yaml
    threshold:
      type: outside
      value_min:
        entity: input_number.comfort_temperature_min
      value_max:
        number: 24
        unit_of_measurement: °C
    ```

    A `sensor` or `number` entity's current value is used as the threshold, which lets you compare two temperature readings dynamically.
{% endif %}
  required: true
  type: map
{% endoptions_yaml %}
