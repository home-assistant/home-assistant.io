---
title: "Get the humidity sensor of an area: area_humidity_sensor"
function_name: "area_humidity_sensor"
description: "Returns the entity ID of the humidity sensor associated with a given area."
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
  - area_id
  - area_name
  - area_temperature_sensor
  - areas
---

The `area_humidity_sensor` template function returns the entity ID of the humidity sensor that belongs to a given {% term area %}. You can specify the area by its name or by its internal ID.

This is useful when you need to get the humidity of an area in a predictable manner. For example, you might want to iterate over all areas and perform an action based on each area's humidity. Rather than specifying the humidity sensor for each area manually, you can just use this template instead.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ area_humidity_sensor("Living Room") }}'
type: string
output: "sensor.humidity_living_room"

---
filter: '{{ "Living Room" | area_humidity_sensor }}'
type: string
output: "sensor.humidity_living_room"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
area_humidity_sensor(
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

- Returns None if the the supplied area is neither a valid name nor ID.
- Also returns None if no humidity sensor is configured for an area.
- The function returns the entity ID of the humidity sensor, not the humidity directly.
- You can use the [`states`](/template-functions/states/) for that.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Get the humidity of an area directly

Combine `area_humidity_sensor` with [`states`](/template-functions/states/).

{% example %}
template: '{{ "Living Room" | area_humidity_sensor | states }}'
type: string
output: "50"
{% endexample %}

### Get the humidity in each room

Iterate over all areas using [`areas`](/template-functions/areas/), filter for areas without a humidity sensor, and then get an area's name using [`area_name`](/template-functions/area_name/).

{% example %}
template: |
  {%- for area in areas() %}
    {%- set humidity_sensor = area | area_humidity_sensor %}
    {%- if humidity_sensor != None %}
  {{ area | area_name }}: {{ humidity_sensor | states }}
    {%- endif %}
  {%- endfor %}
type: string
output: |
Living Room: 50
Kitchen: 55
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
