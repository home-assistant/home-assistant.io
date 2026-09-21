---
title: "Group items by attribute: groupby"
function_name: "groupby"
description: "Groups a list of items by a common attribute, producing a list of (grouper, list) pairs."
available_as:
  - filter
category: collection
return_type: list
limited: true
since: "0.7"
related_functions:
  - sort
  - selectattr
  - map
  - unique
---

The `groupby` filter groups items in a list by a common attribute, producing a list of `(grouper, list)` pairs where `grouper` is the attribute value and `list` contains all items that share that value.

This is extremely useful when you want to organize {% term entities %} by a shared property. For example, you can group lights by their area, sensors by their state, or devices by their manufacturer. The result lets you iterate over each group and display or process the items together. It works especially well with [`expand`](/template-functions/expand/) to organize large collections of entities into meaningful categories.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: |
  {% for state, entities in expand("light.home_lights") | groupby("state") %}
    {{ state }}: {{ entities | map(attribute="entity_id") | join(", ") }}
  {% endfor %}
type: string
output: |
  off: light.bedroom, light.garage
  on: light.kitchen, light.living_room
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
groupby(
    value: list,
    attribute: str,
    default: Any = None,
) -> list[tuple]
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The list of items to group.
  required: true
  type: list
attribute:
  description: >
    The attribute to group by. Supports dotted notation for nested attributes (for example, `attributes.device_class`).
  required: true
  type: string
default:
  description: >
    The default value to use for items that do not have the specified attribute. If not provided, items without the attribute are excluded.
  required: false
  type: any
{% endfunction_parameters %}

## Grouping with dotted attributes

Use dotted notation to group by nested attributes.

{% example %}
template: |
  {% for device_class, entities in expand("sensor.home_sensors")
    | groupby("attributes.device_class") %}
    {{ device_class }}: {{ entities | length }} sensors
  {% endfor %}
title: Group sensors by device class
type: string
output: |
  humidity: 3 sensors
  temperature: 5 sensors
{% endexample %}

## Default value for missing attributes

Use the `default` parameter to include items that lack the grouping attribute.

{% example %}
template: |
  {% for area, entities in expand("light.home_lights")
    | groupby("attributes.area", default="Unknown") %}
    {{ area }}: {{ entities | map(attribute="entity_id") | join(", ") }}
  {% endfor %}
type: string
output: |
  Kitchen: light.kitchen_ceiling, light.kitchen_counter
  Living room: light.living_room_main
  Unknown: light.unnamed_bulb
{% endexample %}

## Good to know

- The input must be sorted by the grouping attribute already. This filter only groups adjacent items with matching values.
- Items without the attribute are dropped unless you supply a `default`.
- Returns a list of `(grouper, items)` tuples, which you unpack in a `for` loop.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Group entities by state

Group all entities in a group by their current state value.

{% example %}
template: |
  {% for state, entities in expand("light.home_lights") | groupby("state") %}
    {{ state | upper }}: {{ entities | map(attribute="name") | join(", ") }}
  {% endfor %}
type: string
output: |
  OFF: Bedroom light, Garage light
  ON: Kitchen light, Living room light
{% endexample %}

### Count entities per group

Show a summary of how many entities are in each group.

{% example %}
template: |
  {% for state, entities in expand("light.home_lights") | groupby("state") %}
    {{ entities | length }} light(s) are {{ state }}
  {% endfor %}
type: string
output: |
  2 light(s) are off
  2 light(s) are on
{% endexample %}

### Group sensors by area and find averages

Group temperature sensors by their area and calculate the average for each.

{% example %}
template: |
  {% for area, sensors in expand("sensor.temperature_sensors")
    | groupby("attributes.area") %}
    {{ area }}: {{ sensors | map(attribute="state") | map("float")
       | average | round(1) }}°C
  {% endfor %}
type: string
output: |
  Bedroom: 19.8°C
  Kitchen: 22.1°C
  Living room: 21.3°C
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
