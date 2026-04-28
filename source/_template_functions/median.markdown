---
title: "Statistical median: median"
function_name: "median"
description: "Calculates the statistical median (middle value) of a list of values."
available_as:
  - function
  - filter
category: math
return_type: float
limited: true
since: "2023.4"
related_functions:
  - average
  - statistical_mode
  - min
  - max
  - expand
---

The `median` template function calculates the statistical median of a collection of values. Give it a list of numbers and it returns the middle value when they are sorted. If the list has an even number of elements, it returns the average of the two middle values.

This is useful when you want a representative value from multiple {% term sensors %} that is less affected by outliers than [`average`](/template-functions/average/). For example, if you have five temperature sensors and one is reading incorrectly high, the median will ignore that outlier and give you a more accurate picture of the actual temperature. It works well for any situation where a single extreme value should not skew the result.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ median(21.5, 22.0, 19.8) }}'
type: float
output: "21.5"

---
filter: '{{ [21.5, 22.0, 19.8] | median }}'
type: float
output: "21.5"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
median(
    *args: list | float,
    default: Any = None,
) -> float
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
values:
  description: >
    The values to find the median of. Can be a list or multiple separate arguments. All values must be numeric.
  required: true
  type: list
default:
  description: >
    Value to return if the calculation fails (for example, if the list is empty or contains non-numeric values). If not provided, an error is raised instead.
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
    | median(default=0)
  }}
type: float
output: "0"
{% endexample %}

## Good to know

- An empty list raises an error unless you supply a default.
- With an even number of values, the result is the average of the two middle values.
- Less sensitive to outliers than [`average`](/template-functions/average/), which makes it better for noisy sensor data.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Median of sensor values

Calculate the median temperature across multiple rooms.

{% example %}
template: |
  {{
    median(
      states("sensor.living_room_temperature") | float,
      states("sensor.bedroom_temperature") | float,
      states("sensor.kitchen_temperature") | float
    )
  }}
type: float
output: "21.5"
{% endexample %}

### Median across a group of entities

If you have a {% term group %} of temperature sensors, you can expand the group and find the median of all their values in one expression.

{% example %}
template: |
  {{
    expand("group.indoor_temperatures")
    | map(attribute="state")
    | map("float")
    | median
  }}
type: float
output: "21.5"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
