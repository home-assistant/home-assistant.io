---
title: "Call a function dynamically: apply"
function_name: "apply"
description: "Calls a function with a value, letting you pass any function into places where a filter is expected."
available_as:
  - function
  - filter
  - test
category: functional
return_type: any
limited: true
since: "2024.11"
related_functions:
  - as_function
  - iif
---

The `apply` template function calls another function with a value as its first argument, plus any extra arguments you give it. It lets you hand a function to places that normally expect a filter or test, like [`map`](/template-functions/map/), [`select`](/template-functions/select/), or [`reject`](/template-functions/reject/).

You reach for `apply` when you want to run a custom function (one you built with [`as_function`](/template-functions/as_function/)) or a built-in function across every item of a list. Most templates don't need it. It comes in handy when you have reusable logic you want to apply to many values without writing a full `for` loop.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ apply(5, float) }}'
type: float
output: "5.0"

---
filter: '{{ 5 | apply(float) }}'
type: float
output: "5.0"

---
test: |
  {% if 5 is apply(lt, 10) %}
    Less than 10
  {% endif %}
type: string
output: "Less than 10"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
apply(
    value: Any,
    fn: Callable,
    *args: Any,
    **kwargs: Any,
) -> Any
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to pass as the first argument to the function (for example, a number from a sensor, or an item from a list).
  required: true
  type: any
fn:
  description: >
    The function to call. Can be any built-in template function, filter, or a macro wrapped with [`as_function`](/template-functions/as_function/).
  required: true
  type: any
args:
  description: >
    Additional positional arguments to pass to the function after the value. For example, `apply(5, float, 0)` calls `float(5, 0)`.
  required: false
  type: any
kwargs:
  description: >
    Additional keyword arguments to pass to the function, written as `name=value` pairs.
  required: false
  type: any
{% endfunction_parameters %}

## Using apply with map

`apply` is most useful when combined with [`map`](/template-functions/map/) to transform lists of values. You pass any function to `map("apply", fn)` and it runs on each item in the list.

{% example %}
template: '{{ [1, 2, 3] | map("apply", float) | list }}'
title: Convert list items to floats
type: list
output: "[1.0, 2.0, 3.0]"
{% endexample %}

## Using apply as a test with select

When used as a test, `apply` lets you filter items using any function as a predicate.

{% example %}
template: '{{ [3, 7, 2, 9, 5] | select("apply", gt, 4) | list }}'
title: Select values greater than 4
type: list
output: "[7, 9, 5]"
{% endexample %}

## Good to know

- Extra arguments are passed after the value, so `apply(5, float, 0)` calls `float(5, 0)` and uses `0` as the default.
- Works with built-in template functions, filters, and macros wrapped with [`as_function`](/template-functions/as_function/), but not arbitrary Python callables.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Apply a custom function across sensor values

Use `apply` with [`as_function`](/template-functions/as_function/) to run a custom macro over a list of values.

{% example %}
template: |
  {% macro macro_celsius_to_f(value, returns) %}
    {{ returns(value * 9 / 5 + 32) }}
  {% endmacro %}
  {% set c_to_f = as_function(macro_celsius_to_f) %}
  {{ [0, 20, 100] | map("apply", c_to_f) | list }}
type: list
output: "[32.0, 68.0, 212.0]"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
