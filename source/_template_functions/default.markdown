---
title: "Set a default value: default"
function_name: "default"
description: "Provides a fallback value if a variable is undefined. Optionally also replaces none, empty, and false values."
available_as:
  - filter
category: type
return_type: any
limited: true
since: "0.7"
related_functions:
  - defined
  - undefined
  - none
  - iif
---

The `default` filter returns a fallback value when the variable it is applied to is undefined. If the optional `boolean` parameter is set to `true`, it also replaces values that are falsy (empty strings, `0`, `false`, `none`, and empty collections). This is one of the most commonly used template filters.

In Home Assistant templates, you frequently work with variables that may or may not exist depending on the context. For instance, {% term trigger %} variables are only available when the {% term automation %} actually runs, and custom variables from {% jinja %}{% set %}{% endjinja %} blocks may be conditionally defined. The `default` filter lets you write robust templates that always produce a usable value, even when some inputs are missing or empty.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ my_variable | default("fallback") }}'
type: string
output: "fallback"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
value | default(
    default_value: Any = "",
    boolean: bool = false,
) -> Any
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
default_value:
  description: >
    The value to return if the input is undefined (or falsy, when `boolean` is `true`). Defaults to an empty string.
  required: false
  default: '""'
  type: any
boolean:
  description: >
    If `true`, the filter also replaces falsy values (`false`, `0`, `none`, empty strings, and empty collections) with the default. If `false` (the default), only undefined variables are replaced.
  required: false
  default: "false"
  type: boolean
{% endfunction_parameters %}

## Handling undefined variables

When a variable has not been defined, the `default` filter returns the fallback value instead of raising an error.

{% example %}
template: '{{ undefined_var | default("no value") }}'
title: Undefined variable gets fallback
type: string
output: "no value"
{% endexample %}

## Replacing falsy values with boolean mode

When `boolean` is set to `true`, the filter also replaces empty strings, `0`, `false`, `none`, and empty lists.

{% example %}
template: '{{ "" | default("empty!", true) }}'
title: Empty string replaced in boolean mode
type: string
output: "empty!"
{% endexample %}

{% example %}
template: '{{ 0 | default(42, true) }}'
title: Zero replaced in boolean mode
type: integer
output: "42"
{% endexample %}

## Good to know

- Without `boolean=true`, the default only kicks in for undefined variables. `None`, empty strings, and `0` pass through unchanged.
- The default value for `default_value` is an empty string, not `None`.
- `default` can't protect a chain of attributes on an undefined value. For example, if `trigger` is undefined, {% raw %}`{{ trigger.to_state.state | default("unknown") }}`{% endraw %} raises an error before `default` runs.
- This does not catch `unavailable` or `unknown` entity states, since those are defined strings. Combine with [`has_value`](/template-functions/has_value/) or [`float`](/template-functions/float/) for those cases.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Safe access to trigger data

{% term Trigger %} variables are only available when the {% term automation %} runs. When you test a template outside an automation, `trigger` is undefined. Reading `trigger.to_state` then raises an error before `default` runs. Some triggers also have no `to_state`, for example, when you select **Run actions**. And when an entity is removed, `to_state` is `none`. This example covers all three cases. `default(none)` turns a missing `to_state` into `none`, so you don't get a warning in the log.

{% example %}
template: |
  {% set to_state = trigger.to_state | default(none)
       if trigger is defined else none %}
  {{ to_state.state if to_state else "unknown" }}
title: Safely access trigger state
type: string
output: "unknown"
{% endexample %}

### Provide a default sensor value

When an entity might not have a specific attribute, provide a sensible default. `state_attr` returns `none` for a missing attribute. Pass `true` as the second argument so `default` also replaces `none`.

{% example %}
template: |
  {{
    state_attr("climate.living_room", "preset_mode")
    | default("none", true)
  }}
type: string
output: "comfort"
{% endexample %}

### Fallbacks for numeric states

`states` always returns text, even for a missing entity. It returns `unknown` in that case, so `default` has nothing to replace. To make sure calculations don't fail, use the default argument of [`float`](/template-functions/float/) or [`int`](/template-functions/int/) instead.

{% example %}
template: |
  {{ states("sensor.temperature") | float(0) + 5 }}
type: float
output: "26.5"
{% endexample %}

### Use in an automation action

Set a notification message with a fallback greeting when the name is not set. An empty text helper has an empty string as its state. Pass `true` as the second argument so `default` also replaces the empty string.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          Hello {{ states("input_text.user_name") | default("friend", true) }}!
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
