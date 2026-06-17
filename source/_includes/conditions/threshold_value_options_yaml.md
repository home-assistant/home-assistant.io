{% comment %}
Reusable "Options in YAML" block for entity conditions that test a reading
against the threshold-mapping schema. The `behavior` description is shared
across the family. Unitless members (humidity, brightness, counter) get the
per-type "Provide value..." guidance; members with a unit (temperature, energy,
etc.) get the unit_of_measurement guidance and a unit-style example instead.

Parameters:
  reading             Quantity noun. For example: "humidity", "temperature".
  range_note          Parenthetical range for above/below (unitless). For example: "0–100".
  number_final        Closing number guidance (unitless). For example: "a percentage value (0–100)".
  has_unit            Set (to anything) for unit_of_measurement guidance and example.
                      Requires unit_default, unit_example_entity, and unit_example_value.
  unit_default        Default unit used in the example. For example: "°C".
  unit_example_entity Entity reference used in the example. For example:
                      "input_number.comfort_temperature_min".
  unit_example_value  Literal number used in the example. For example: "22".
  threshold_required  "true" or "false" for the threshold field. Default "false".
{% endcomment %}
{% options_yaml %}
threshold:
  description: |
    The {{ include.reading }} level the entity has to meet for the condition to pass:

    - `type: above` (exclusive): Sets a minimum. The reading must be strictly above the threshold to pass.{% unless include.has_unit %} Provide `value` with a `number` key ({{ include.range_note }}) or an `entity` key.{% endunless %}
    - `type: below` (exclusive): Sets a maximum. The reading must be strictly below the threshold to pass.{% unless include.has_unit %} Provide `value` with a `number` key ({{ include.range_note }}) or an `entity` key.{% endunless %}
    - `type: between` (exclusive): Defines a range. The reading must be strictly between both bounds to pass.{% unless include.has_unit %} Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.{% endunless %}
    - `type: outside` (inclusive): Defines an outside-range. The reading must be at or beyond either bound to pass.{% unless include.has_unit %} Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.{% endunless %}
{% if include.has_unit %}

    For `type: above` and `type: below`, use `value` with either `number` and `unit_of_measurement`, or `entity`. For `type: between` and `type: outside`, use `value_min` and `value_max`, each with either `number` and `unit_of_measurement`, or `entity`. For example:

    ```yaml
    threshold:
      type: between
      value_min:
        entity: {{ include.unit_example_entity }}
      value_max:
        number: {{ include.unit_example_value }}
        unit_of_measurement: {{ include.unit_default }}
    ```

    When using an `entity`, its current reading is used as the threshold at the moment the condition is evaluated, which lets you compare two {{ include.reading }} readings dynamically.
{% else %}

    For the `number` key, use {{ include.number_final }}. For the `entity` key, use an `input_number`, `number`, or `sensor` entity.
{% endif %}
  required: {{ include.threshold_required | default: "false" }}
  type: map
behavior:
  description: |
    When multiple entities are targeted, controls how results combine:

    - `any`: The condition passes if at least one targeted entity meets the threshold.
    - `all`: The condition passes only when every targeted entity meets the threshold.
  required: false
  type: string
  default: any
{% endoptions_yaml %}
