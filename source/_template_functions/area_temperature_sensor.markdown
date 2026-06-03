---
title: "Get the temperature sensor of an area: area_temperature_sensor"
function_name: "area_temperature_sensor"
description: "Returns the entity ID of the temperature sensor associated with a given area."
available_as:
  - function
  - filter
category: area
return_type: string
limited: true
since: "2026.07"
related_functions:
  - area_devices
  - area_entities
  - area_humidity_sensor
  - area_id
  - area_name
  - areas
---

The `area_temperature_sensor` template function returns the entity ID of the temperature sensor that belongs to a given {% term area %}. You can specify the area by its name or by its internal ID.

This is useful when you need to get the temperature of an area in a predictable manner. For example, you might want to iterate over all areas and perform an action based on each area's temperature. Rather than specifying the temperature sensor for each area manually, you can just use this template instead.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ area_temperature_sensor("Living Room") }}'
type: string
output: "sensor.temperature_living_room"

---
filter: '{{ "Living Room" | area_temperature_sensor }}'
type: string
output: "sensor.temperature_living_room"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
area_temperature_sensor(
    area_name_or_id: str,
) -> str | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
area_name_or_id:
  description: >
    The name or ID of the area. You can find area IDs in {% my areas title="**Settings** > **Areas, labels & zones**" %}.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns None if the supplied area is neither a valid name nor ID.
- Also returns None if no temperature sensor is configured for an area.
- The function returns the entity ID of the temperature sensor, not the temperature directly.
- You can use the [`states`](/template-functions/states/) for that.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Get the temperature of an area directly

Combine `area_temperature_sensor` with [`states`](/template-functions/states/).

{% example %}
template: '{{ "Living Room" | area_temperature_sensor | states }}'
type: string
output: "20.0"
{% endexample %}

### Get the temperature in each room

Iterate over all areas using [`areas`](/template-functions/areas/), filter for areas without a temperature sensor, and then get an area's name using [`area_name`](/template-functions/area_name/).

{% example %}
template: |
  {%- for area in areas() %}
    {%- set temperature_sensor = area | area_temperature_sensor %}
    {%- if temperature_sensor != None %}
  {{ area | area_name }}: {{ temperature_sensor | states }}
    {%- endif %}
  {%- endfor %}
type: string
output: |
Living Room: 20.0
Kitchen: 25.0
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
