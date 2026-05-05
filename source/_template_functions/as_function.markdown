---
title: "Turn a macro into a function: as_function"
function_name: "as_function"
description: "Turns a template macro into a reusable function you can pass to map, select, and reject."
available_as:
  - function
  - filter
category: functional
return_type: callable
limited: true
since: "2024.11"
related_functions:
  - apply
  - iif
---

The `as_function` template function takes a template macro and turns it into a reusable function that produces a value. A macro on its own can only output text, which limits what you can do with its result. Wrapping it with `as_function` gives you a proper function you can pass to [`map`](/template-functions/map/), [`select`](/template-functions/select/), [`reject`](/template-functions/reject/), or store in a variable for later use.

You reach for `as_function` when you've written a piece of reusable logic (usually in a macro) and want to run it across a list of values, or use it as a custom test. For most templates, built-in filters and functions are enough. The macro you wrap must take a special `returns` argument. Inside the macro, you call `returns(value)` to say "this is what the function should hand back".

{% include template_functions/usage.md %}

{% template_function_usage %}
function: |
  {% macro macro_double(value, returns) %}
    {{ returns(value * 2) }}
  {% endmacro %}
  {{ as_function(macro_double)(5) }}
type: integer
output: "10"

---
filter: |
  {% macro macro_double(value, returns) %}
    {{ returns(value * 2) }}
  {% endmacro %}
  {{ macro_double | as_function }}
type: callable
output: "<function double>"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
as_function(
    macro: Macro,
) -> Callable
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
macro:
  description: >
    A template macro that takes a `returns` argument. Inside the macro, call `returns(value)` with whatever you want the resulting function to hand back.
  required: true
  type: any
{% endfunction_parameters %}

## Writing a compatible macro

The macro must accept a `returns` parameter. Call `returns()` with the value you want the function to produce. The macro name is conventionally prefixed with `macro_`; this prefix is stripped from the resulting function's name.

{% example %}
template: |
  {% macro macro_add_ten(value, returns) %}
    {{ returns(value + 10) }}
  {% endmacro %}
  {% set add_ten = as_function(macro_add_ten) %}
  {{ add_ten(5) }}
title: Basic usage
type: integer
output: "15"
{% endexample %}

## Using with map

Once converted, the function works seamlessly with [`map`](/template-functions/map/) to transform lists.

{% example %}
template: |
  {% macro macro_format_temp(value, returns) %}
    {{ returns(value | round(1) ~ "°C") }}
  {% endmacro %}
  {% set format_temp = as_function(macro_format_temp) %}
  {{ [21.456, 19.8, 22.123] | map("apply", format_temp) | list }}
title: Format temperatures
type: list
output: "['21.5°C', '19.8°C', '22.1°C']"
{% endexample %}

## Good to know

- The macro must include a `returns` parameter and end by calling `returns(value)`. Without that call, the function produces `None`.
- The conventional `macro_` name prefix is stripped from the resulting function, so `macro_double` becomes `double`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Custom filter for select

Create a function that tests whether a value is within a range, then use it with [`select`](/template-functions/select/) to filter a list.

{% example %}
template: |
  {% macro macro_in_range(value, low, high, returns) %}
    {{ returns(low <= value <= high) }}
  {% endmacro %}
  {% set in_range = as_function(macro_in_range) %}
  {{ [15, 22, 30, 18, 25] | select("apply", in_range, 20, 26) | list }}
type: list
output: "[22, 25]"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
