---
title: "Get all floors: floors"
function_name: "floors"
description: "Returns a list of all floor IDs in your Home Assistant instance."
available_as:
  - function
category: floor
return_type: list
limited: true
since: "2024.1"
related_functions:
  - floor_id
  - floor_name
  - floor_areas
  - floor_entities
  - areas
---

The `floors` template function returns a list of all {% term floor %} IDs in your Home Assistant instance. Each floor you've created in Home Assistant has a unique ID, and this function gives you all of them.

This is useful when you want to loop through every floor in your home and do something with it. For example, you could check which floors have lights on, count how many {% term areas %} are on each floor, or build a summary of activity across your entire home. Since floors can be added or removed at any time, using `floors()` ensures your {% term templates %} always reflect your current setup.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ floors() }}'
type: list
output: |
  [
    "ground_floor",
    "first_floor",
    "basement",
  ]
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
floors() -> list[str]
```

## Good to know

- Returns floor IDs, not names. Pair with [`floor_name`](/template-functions/floor_name/) to display names.
- The order is not guaranteed, so sort before display if you need a stable ordering.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count how many floors you have

A convenient way to see how many floors are set up in your Home Assistant instance.

{% example %}
template: '{{ floors() | count }}'
type: integer
output: "3"
{% endexample %}

### List all floor names

Loop through all floors and display their names using [`floor_name`](/template-functions/floor_name/).

{% example %}
template: |
  {% for floor_id in floors() %}
    {{ floor_name(floor_id) }}
  {% endfor %}
type: string
output: |
  Ground Floor
  First Floor
  Basement
{% endexample %}

### Count lights on per floor

Build a summary of how many lights are on across each floor. This loops through all floors, gathers the {% term entities %} on each one using [`floor_entities`](/template-functions/floor_entities/), and counts the active lights.

{% example %}
template: |
  {% for id in floors() %}
    {% set lights = floor_entities(id)
      | select("match", "light.")
      | select("is_state", "on")
      | list %}
    {% if lights | count > 0 %}
      {{ floor_name(id) }}: {{ lights | count }} lights on
    {% endif %}
  {% endfor %}
type: string
output: |
  Ground Floor: 5 lights on
  First Floor: 2 lights on
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
