---
title: "Average (arithmetic mean): average"
function_name: "average"
description: "Calculates the arithmetic mean of a list of values."
available_as:
  - function
  - filter
category: math
return_type: float
limited: true
since: "2023.4"
related_functions:
  - median
  - statistical_mode
  - min
  - max
  - expand
---

The `average` template function calculates the arithmetic mean of a collection of values. Give it a list of numbers and it returns their average. This is the same as adding all the values together and dividing by how many there are, but without having to do that math yourself.

This is useful whenever you have multiple {% term sensors %} measuring the same thing and want a single combined value. For example, you might have temperature sensors in the living room, bedroom, and kitchen, and want to know the average temperature across your home. Or you might want to average humidity readings from several rooms to decide whether to turn on a dehumidifier. You can also use it to smooth out fluctuating sensor readings or calculate average energy usage over a set of {% term devices %}.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ average(21.5, 22.0, 19.8) }}'
type: float
output: "21.1"

---
filter: '{{ [21.5, 22.0, 19.8] | average }}'
type: float
output: "21.1"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
average(
    *args: list | float,
    default: Any = None,
) -> float
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
values:
  description: >
    The values to average. Can be a list or multiple separate arguments. All values must be numeric.
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
    | average(default=0)
  }}
type: float
output: "0"
{% endexample %}

## Good to know

- An empty list raises an error unless you supply a default.
- All items must be numeric. Convert state strings with [`float`](/template-functions/float/) before averaging.
- This calculates the arithmetic mean. For the middle value, use [`median`](/template-functions/median/); for the most common value, use [`statistical_mode`](/template-functions/statistical_mode/).

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Average of sensor values

Calculate the average temperature across multiple rooms by passing each sensor value as a separate argument.

{% example %}
template: |
  {{
    average(
      states("sensor.living_room_temperature") | float,
      states("sensor.bedroom_temperature") | float,
      states("sensor.kitchen_temperature") | float
    )
  }}
type: float
output: "21.4"
{% endexample %}

### Average across a group of entities

If you have a {% term group %} of temperature sensors, you can expand the group and average all their values in one expression.

{% example %}
template: |
  {{
    expand("group.indoor_temperatures")
    | map(attribute="state")
    | map("float")
    | average
  }}
type: float
output: "21.4"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
