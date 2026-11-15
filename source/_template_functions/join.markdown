---
title: "Join a list into a string: join"
function_name: "join"
description: "Joins a list of values into a single string with a separator between each element."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - flatten
  - set
---

The `join` filter concatenates a list of values into a single string, placing a separator between each element. You can also join a specific attribute of a list of objects.
This is useful whenever you need to turn a list of items into a readable string. For example, you might want to list the names of {% term entities %} that are currently on, build a comma-separated summary for a notification, or join a list of room names for display on a dashboard.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ ["living room", "kitchen", "bedroom"] | join(", ") }}'
type: string
output: "living room, kitchen, bedroom"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
join(
    value: list,
    separator: str = "",
    attribute: str | None = None,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The list of values to join into a string. Each element is converted to a string before joining.
  required: true
  type: list
separator:
  description: >
    The string to place between each element. Defaults to an empty string (no separator).
  required: false
  default: '""'
  type: string
attribute:
  description: >
    If the list contains objects, join by this attribute instead of the object itself.
  required: false
  type: string
{% endfunction_parameters %}

## Joining without a separator

By default, elements are concatenated directly with no separator between them.

{% example %}
template: '{{ ["a", "b", "c"] | join }}'
title: Concatenate letters
type: string
output: abc
{% endexample %}

## Good to know

- The default separator is an empty string, so without an argument the items are concatenated directly.
- Each item is converted to a string automatically, so you can join numbers, booleans, and other types.
- Every item must be concrete. Iterables produced by [`select`](/template-functions/select/) or [`selectattr`](/template-functions/selectattr/) need no conversion, but generators should be materialized first.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### List active lights in a notification

Build a human-readable list of lights that are currently on.

{% example %}
template: |
  {% set lights = ["Living room", "Kitchen", "Porch"] %}
  Lights on: {{ lights | join(", ") }}
type: string
output: "Lights on: Living room, Kitchen, Porch"
{% endexample %}

### Build a path from parts

Join path segments together with a separator.

{% example %}
template: '{{ ["home", "user", "config"] | join("/") }}'
type: string
output: home/user/config
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
