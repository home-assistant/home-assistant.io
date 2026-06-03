---
title: "Get all areas: areas"
function_name: "areas"
description: "Returns a list of all area IDs in your Home Assistant instance."
available_as:
  - function
category: area
return_type: list
limited: true
since: "2021.11"
related_functions:
  - area_devices
  - area_entities
  - area_humidity_sensor
  - area_id
  - area_name
  - area_temperature_sensor
---

The `areas` template function returns a list of all {% term area %} IDs in your Home Assistant instance. Each area you've created in Home Assistant has a unique ID, and this function gives you all of them.

This is useful when you want to loop through every area in your home and do something with it. For example, you could check all areas for motion, count how many rooms have lights on, or build a dynamic dashboard that adapts to your areas. Since areas can be added or removed at any time, using `areas()` ensures your {% term templates %} always reflect your current setup.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ areas() }}'
type: list
output: |
  [
    "living_room",
    "kitchen",
    "bedroom",
    "hallway",
  ]
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
areas() -> list[str]
```

## Good to know

- Returns area IDs, not human-readable names. Pair with [`area_name`](/template-functions/area_name/) to get names for display.
- The list is unordered. Apply [`| sort`](/template-functions/sort/) if you need a consistent order.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count how many areas you have

A convenient way to see how many areas are set up in your Home Assistant instance.

{% example %}
template: '{{ areas() | count }}'
type: integer
output: "4"
{% endexample %}

### Check if any area has motion

Loop through all areas and check if any has an active motion {% term sensor %}.

{% example %}
template: |
  {% for area_id in areas() %}
    {% if area_entities(area_id)
        | select("match", "binary_sensor.")
        | select("is_state", "on")
        | list
        | count > 0 %}
      Motion in {{ area_name(area_id) }}!
    {% endif %}
  {% endfor %}
{% endexample %}

### Count lights on per room

Build a summary of how many lights are on in each area. This loops through all areas and counts the active lights in each one.

{% example %}
template: |
  {% for id in areas() %}
    {% set lights = area_entities(id)
      | select("match", "light.")
      | select("is_state", "on")
      | list %}
    {% if lights | count > 0 %}
      {{ area_name(id) }}: {{ lights | count }} lights on
    {% endif %}
  {% endfor %}
type: string
output: |
  Living Room: 3 lights on
  Kitchen: 1 lights on
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
