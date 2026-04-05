---
title: "Convert to float: float"
function_name: "float"
description: "Converts a value to a floating-point number, with an optional default if conversion fails."
available_as:
  - function
  - filter
category: type
return_type: float
limited: true
since: "0.7"
related_functions:
  - int
  - is_number
  - round
  - bool
---

The `float` template function converts a value to a floating-point number. If the value cannot be converted, it returns the default you provide instead of raising an error. This "forgiving" behavior makes it safe to use with {% term sensor %} values that might sometimes be `unavailable` or `unknown`.

In Home Assistant, all {% term entity %} states are stored as strings, even when they represent numbers. This means that `states("sensor.temperature")` returns `21.5` (a string), not `21.5` (a number). Before you can do any math with a state value, such as comparing it to a threshold, adding values together, or using it in a calculation, you must convert it to a number first. The `float` function (or filter) is the standard way to do this.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ float("21.5") }}'
type: float
output: "21.5"

---
filter: '{{ states("sensor.temperature") | float }}'
type: float
output: "21.5"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
float(
    value: Any,
    default: Any = _SENTINEL,
) -> float | Any
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to convert to a float. Strings that represent numbers (like `21.5`) are converted. Non-numeric values raise an error unless a default is provided.
  required: true
  type: any
default:
  description: >
    Value to return if the conversion fails. If not provided, an error is raised on invalid input. It is strongly recommended to always provide a default.
  required: false
  type: any
{% endfunction_parameters %}

## Using a default value

Since {% term sensor %} states can be `unavailable` or `unknown`, always provide a default to prevent your {% term template %} from breaking.

{% example %}
template: '{{ states("sensor.temperature") | float(0) }}'
title: Safe conversion with default
type: float
output: "21.5"
{% endexample %}

If the sensor state were `unavailable`, this would return `0` instead of raising an error.

## Why conversion is needed

All entity states in Home Assistant are strings. Without conversion, comparisons and math produce unexpected results or errors:

{% example %}
template: '{{ states("sensor.temperature") | float > 25 }}'
title: Compare a sensor value to a threshold
type: boolean
output: "false"
{% endexample %}

## Good to know

- Without a default, conversion failures raise an error that can break your template. Always pass a default when reading from entity states.
- The default is returned when the input is `None`, `unavailable`, `unknown`, or any value that cannot be converted.
- The default does not have to be a number. Passing a string like `"unknown"` is valid when you want a readable fallback.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Calculate a temperature difference

Calculate the difference between indoor and outdoor temperatures.

{% example %}
template: |
  {{
    (states("sensor.indoor_temperature") | float(0))
    - (states("sensor.outdoor_temperature") | float(0))
  }}
type: float
output: "5.3"
{% endexample %}

### Use in an automation {% term trigger %}

Trigger when the power usage exceeds a threshold. The `float` filter ensures the string state is compared as a number.

{% example %}
automation: |
  trigger:
    - trigger: template
      value_template: >
        {{ states("sensor.power_usage") | float(0) > 3000 }}
{% endexample %}

### Convert with a fallback in a notification

Send a {% term notification %} that includes a sensor value, using a readable fallback if the sensor is unavailable.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          The humidity is
          {{ states("sensor.humidity") | float("unknown") }}%
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
