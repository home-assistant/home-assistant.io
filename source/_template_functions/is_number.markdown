---
title: "Test if value is numeric: is_number"
function_name: "is_number"
description: "Tests whether a value can be converted to a finite number."
available_as:
  - function
  - filter
  - test
category: type
return_type: boolean
limited: true
since: "2021.12"
related_functions:
  - float
  - int
  - has_value
  - typeof
---

The `is_number` template function tests whether a value can be converted to a valid, finite floating-point number. It returns `true` if the value is numeric and `false` otherwise. Values like `infinity` and `NaN` are not considered numbers and return `false`.

This is a safety check you should use before performing math on values that might not be numeric. {% term Entity %} states in Home Assistant can be `unavailable`, `unknown`, or other non-numeric strings at any time. Trying to do math on these values without checking first causes errors. By testing with `is_number` first, you can branch your logic to handle numeric and non-numeric cases separately. It is also useful as a template test in {% jinja %}{% if %}{% endjinja %} blocks.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ is_number("21.5") }}'
type: boolean
output: "true"

---
filter: '{{ states("sensor.temperature") | is_number }}'
type: boolean
output: "true"

---
test: |
  {% if states("sensor.temperature") is is_number %}
    It is a number!
  {% endif %}
type: string
output: "It is a number!"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
is_number(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value can be converted to a finite float. Returns `false` for non-numeric strings, `None`, `infinity`, and `NaN`.
  required: true
  type: any
{% endfunction_parameters %}

## What counts as a number

The function attempts to convert the value to a float. If the conversion succeeds and the result is a finite number (not `infinity` or `NaN`), it returns `true`.

{% example %}
template: |
  {{ is_number(42) }}
  {{ is_number("21.5") }}
  {{ is_number("unavailable") }}
  {{ is_number("inf") }}
title: Various inputs
type: boolean
output: |
  true
  true
  false
  false
{% endexample %}

## Good to know

- Returns `false` for `unavailable`, `unknown`, `infinity`, and `NaN`, which catches common unsafe cases for math.
- Booleans pass this test because Python treats `True` and `False` as `1` and `0`.
- Numeric strings like `"21.5"` pass. This checks convertibility, not the current type.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Guard a calculation

Only perform math if the sensor value is actually a number.

{% example %}
template: |
  {% if states("sensor.power_usage") | is_number %}
    {{ states("sensor.power_usage") | float * 0.25 }}
  {% else %}
    Sensor is not reporting a number
  {% endif %}
type: string
output: "62.5"
{% endexample %}

### Filter a list to only numeric values

When working with multiple {% term sensors %}, filter out any that are not reporting numbers before calculating an average.

{% example %}
template: |
  {{
    ["21.5", "unavailable", "19.8", "unknown"]
    | select("is_number")
    | map("float")
    | list
    | average
  }}
type: float
output: "20.65"
{% endexample %}

### Use in an automation condition

Only proceed if the sensor is reporting a valid number.

{% example %}
automation: |
  condition:
    - condition: template
      value_template: >
        {{ states("sensor.wind_speed") | is_number }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
