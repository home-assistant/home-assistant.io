---
title: "Immediate if (ternary): iif"
function_name: "iif"
description: "Shorthand for basic if/else logic in a single expression."
available_as:
  - function
  - filter
category: functional
return_type: any
limited: true
since: "2021.12"
related_functions:
  - is_state
  - states
---

The `iif` template function is a shorthand for if/else logic. Give it a condition and two values, and it returns the first when true, the second when false. Think of it as asking a yes/no question: _"Is this true? If yes, give me this. If no, give me that."_

In many places throughout Home Assistant, you'll want to change what is displayed or sent based on the current {% term state %} of something. Maybe you want a {% term notification %} to say _"The garage is open"_ or _"The garage is closed"_ depending on the actual state. Or you want to set a light brightness to 100 when you're home and 30 when you're away. Or show _"Armed"_ or _"Disarmed"_ on your dashboard. All of these are choices between two values based on a condition, and `iif` is designed exactly for that.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ iif(states("sensor.temperature") | float > 25, "warm", "cool") }}'
type: string
output: warm

---
filter: '{{ is_state("binary_sensor.front_door", "on") | iif("open", "closed") }}'
type: string
output: open
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
iif(
    condition: Any,
    if_true: Any = True,
    if_false: Any = False,
    if_none: Any = None,
) -> Any
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
condition:
  description: >
    The value to evaluate as a boolean. Truthy values return `if_true`, falsy values return `if_false`.
  required: true
  type: any
if_true:
  description: Value to return when the condition is truthy.
  required: false
  default: "True"
  type: any
if_false:
  description: Value to return when the condition is falsy.
  required: false
  default: "False"
  type: any
if_none:
  description: >
    Value to return when the condition is `None`. If not provided, `None` is treated as falsy and `if_false` is returned.
  required: false
  type: any
{% endfunction_parameters %}

## Compared to an if block

`iif` replaces a multi-line {% jinja %}{% if %}{% endjinja %} block with a single expression. These two {% term templates %} produce the same result:

{% example %}
template: |
  {% if is_state("binary_sensor.front_door", "on") %}
    open
  {% else %}
    closed
  {% endif %}
title: Using an if block
type: string
output: open
{% endexample %}

{% example %}
template: |
  {{ is_state("binary_sensor.front_door", "on") | iif("open", "closed") }}
title: Using iif
type: string
output: open
{% endexample %}

Use `iif` when you need to choose between two values. For more complex logic with multiple branches, use {% jinja %}{% if %}{% endjinja %} / {% jinja %}{% elif %}{% endjinja %} / {% jinja %}{% else %}{% endjinja %} instead.

## Good to know

- All arguments are evaluated, even the branch that is not returned. Use an `if`/`else` block when one branch could raise an error.
- `None` is only handled separately when you pass `if_none`. Otherwise it is treated as falsy.
- Values like `0`, empty strings, and empty lists are falsy, so they return `if_false`, not `if_none`.

{% include template_functions/try_it.md %}

## Caveats

### All arguments are always evaluated

Unlike an {% jinja %}{% if %}{% endjinja %} block, `iif` evaluates _all_ its arguments before deciding which one to return. This means both the `if_true` and `if_false` values are computed regardless of the condition.

In practice, this is rarely a problem since most arguments are plain strings or numbers. But be aware of it if your arguments contain expressions that could fail:

{% example %}
template: |
  {{
    has_value("sensor.temperature")
    | iif(
        states("sensor.temperature") | float,
        "unavailable"
      )
  }}
title: This may cause an error
{% endexample %}

In this case, use an {% jinja %}{% if %}{% endjinja %} block instead:

{% example %}
template: |
  {% if has_value("sensor.temperature") %}
    {{ states("sensor.temperature") | float }}
  {% else %}
    unavailable
  {% endif %}
title: Safer alternative
{% endexample %}

### None vs other falsy values

Values like `0`, empty strings, and `false` are all falsy. They return the `if_false` value, not the `if_none` value. Only a literal `None` triggers the `if_none` parameter. If you need to distinguish between `0` and `None`, you must use the `if_none` parameter.

{% include template_functions/more_examples.md %}

### Dynamic notification message

Send a notification that adapts its message based on the state of the garage door.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          The garage door is
          {{ is_state("cover.garage", "open") | iif("open", "closed") }}.
          {{
            is_state("cover.garage", "open")
            | iif("You might want to close it.", "")
          }}
{% endexample %}

### Handling None values

By default, `None` is treated as falsy and returns the `if_false` value. Use the third argument to handle `None` separately. This is useful when a sensor attribute might not exist.

{% example %}
template: |
  {{
    state_attr("sensor.weather", "temperature")
    | iif("has temp", "no temp", "sensor unavailable")
  }}
{% endexample %}

This returns:
- `has temp` when the attribute has a truthy value (like `21.5`)
- `no temp` when the attribute is a falsy value (like `0`)
- `sensor unavailable` when the attribute is `None` (does not exist)

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
