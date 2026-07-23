---
title: "Get dictionary key/value pairs: items"
function_name: "items"
description: "Returns the key/value pairs from a dictionary as a list of tuples."
available_as:
  - filter
category: collection
return_type: list
limited: true
since: "0.7"
related_functions:
  - dictsort
  - map
  - combine
---

The `items` filter returns the key/value pairs from a dictionary as a list of `(key, value)` tuples. This makes it possible to iterate over a dictionary's entries in a template, accessing both the key and the value in each iteration.

This is useful when you need to loop over the attributes of an {% term entity %} or any other dictionary structure. For example, you might want to display all attributes of a {% term sensor %} along with their values, process configuration options stored as a dictionary, or transform a dictionary into another format. It converts a dictionary into a format that works with the template `for` loop unpacking.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ {"a": 1, "b": 2, "c": 3} | items | list }}'
type: list
output: "[('a', 1), ('b', 2), ('c', 3)]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
items(
    value: dict,
) -> list[tuple]
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The dictionary to extract key/value pairs from.
  required: true
  type: map
{% endfunction_parameters %}

## Good to know

- Returns an iterable of `(key, value)` tuples, not a list. Wrap with [`| list`](/template-functions/list/) when counting or reusing.
- Order depends on how the dictionary was built. Use [`dictsort`](/template-functions/dictsort/) for a guaranteed sort order.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Display all entity attributes

Iterate over all attributes of a sensor and display them.

{% example %}
template: |
  {% for key, value in state_attr("climate.living_room", "hvac_modes")
    | default({}) | items %}
    {{ key }}: {{ value }}
  {% endfor %}
type: string
output: ""
{% endexample %}

### Iterate over a configuration dictionary

Loop over a dictionary of settings and display each one.

{% example %}
template: |
  {% set config = {"mode": "heat", "target_temp": 22, "fan": "auto"} %}
  {% for key, value in config | items %}
    {{ key }} = {{ value }}
  {% endfor %}
type: string
output: |
  mode = heat
  target_temp = 22
  fan = auto
{% endexample %}

### Filter dictionary entries

Combine `items` with [`selectattr`](/template-functions/selectattr/) or conditional logic to filter dictionary entries.

{% example %}
template: |
  {% set temps = {"kitchen": 22.5, "bedroom": 19.8, "living_room": 21.3} %}
  {% for room, temp in temps | dictsort %}
    {% if temp > 20 %}
      {{ room }}: {{ temp }}°C
    {% endif %}
  {% endfor %}
type: string
output: |
  kitchen: 22.5°C
  living_room: 21.3°C
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
