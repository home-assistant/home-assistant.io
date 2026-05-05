---
title: "Cycle through values: cycler"
function_name: "cycler"
description: "Creates an object that cycles through a list of values. Useful for alternating between values in a loop."
available_as:
  - function
category: functional
return_type: cycler
limited: true
since: "0.7"
related_functions:
  - range
  - joiner
---

The `cycler` template function creates an object that cycles through a sequence of values. You initialize it with the values you want to cycle through, then call `.next()` each iteration to advance to the next value. The `.current` property holds the current value, and the `.reset()` method returns to the beginning.

This can be handy when you need to alternate between values in a loop. For example, you could alternate between two labels, rotate through a set of icons, or cycle through status indicators. While less commonly used in typical Home Assistant templates, it can simplify patterns where you need repeating sequences.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: |
  {% set cycle = cycler("odd", "even") %}
  {% for i in range(4) %}
    {{ cycle.next() }}
  {% endfor %}
type: string
output: |
  odd
  even
  odd
  even
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
cycler(
    *items: Any,
) -> Cycler
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
items:
  description: >
    Two or more values to cycle through. The cycler advances to the next value each time `.next()` is called and wraps around when it reaches the end.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Needs at least two values. Calling it with one item or none raises an error.
- `.current` peeks at the current value without advancing; `.next()` moves to the next one.
- The cycler is tied to the template run. A fresh call to the template starts from the first value again.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Alternate labels in a list

Cycle through labels while iterating over items.

{% example %}
template: |
  {% set priority = cycler("high", "medium", "low") %}
  {% set rooms = ["Living Room", "Kitchen", "Bedroom"] %}
  {% for room in rooms %}
    {{ room }}: {{ priority.next() }}
  {% endfor %}
type: string
output: |
  Living Room: high
  Kitchen: medium
  Bedroom: low
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
