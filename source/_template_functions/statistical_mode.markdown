---
title: "Statistical mode: statistical_mode"
function_name: "statistical_mode"
description: "Returns the most commonly occurring value in a list of values."
available_as:
  - function
  - filter
category: math
return_type: float
limited: true
since: "2023.4"
related_functions:
  - average
  - median
  - min
  - max
  - expand
---

The `statistical_mode` template function returns the most commonly occurring value in a collection. Give it a list of values and it returns the one that appears most often. If multiple values share the highest frequency, it returns the first one encountered.

This is useful when you want to find the most frequent reading from a set of {% term sensors %} rather than a numeric average. For example, if several motion sensors each report a room as either "occupied" or "empty", the mode tells you what the majority of sensors agree on. It also works with numeric values, such as finding the most common brightness setting across a group of lights.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ statistical_mode(21, 22, 21, 23, 21) }}'
type: float
output: "21"

---
filter: '{{ [21, 22, 21, 23, 21] | statistical_mode }}'
type: float
output: "21"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
statistical_mode(
    *args: list | float,
    default: Any = None,
) -> float
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
values:
  description: >
    The values to find the mode of. Can be a list or multiple separate arguments.
  required: true
  type: list
default:
  description: >
    Value to return if the calculation fails (for example, if the list is empty). If not provided, an error is raised instead.
  required: false
  type: any
{% endfunction_parameters %}

## Using a default value

If the list might be empty or contain invalid values, provide a default to avoid errors. This prevents your {% term template %} from breaking when a sensor is temporarily unavailable.

{% example %}
template: |
  {{
    [states("sensor.maybe_broken") | float(none)]
    | reject("none")
    | list
    | statistical_mode(default=0)
  }}
type: float
output: "0"
{% endexample %}

## Good to know

- When multiple values are tied for the highest frequency, the first one encountered wins.
- Works with any hashable type, not only numbers. Strings like `"on"` and `"off"` are valid inputs too.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Most common temperature reading

Find the most frequently reported temperature across multiple sensors.

{% example %}
template: |
  {{
    statistical_mode(
      states("sensor.living_room_temperature") | float,
      states("sensor.bedroom_temperature") | float,
      states("sensor.kitchen_temperature") | float,
      states("sensor.hallway_temperature") | float
    )
  }}
type: float
output: "21.0"
{% endexample %}

### Mode across a group of entities

If you have a {% term group %} of sensors, you can expand the group and find the most common value in one expression.

{% example %}
template: |
  {{
    expand("sensor.indoor_temperatures")
    | map(attribute="state")
    | map("float")
    | statistical_mode
  }}
type: float
output: "21.0"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
