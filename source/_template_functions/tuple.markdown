---
title: "Convert to tuple: tuple"
function_name: "tuple"
description: "Converts an iterable to a tuple."
available_as:
  - function
category: collection
return_type: tuple
limited: true
since: "2023.1"
related_functions:
  - set
  - flatten
---

The `tuple` template function converts a collection (like a list) into a tuple. A tuple is similar to a list but is immutable, meaning its contents cannot be changed after creation. This can be useful when you need a hashable, fixed sequence of values.

Tuples are useful in specific situations where you need an immutable sequence. For example, some template operations or comparisons work better with tuples, and tuples can be used as dictionary keys because they are hashable (unlike lists). In most day-to-day Home Assistant {% term templates %}, lists work fine, but `tuple` is available when you need this specific data type.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ tuple([1, 2, 3]) }}'
type: tuple
output: "(1, 2, 3)"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
tuple(
    value: list,
) -> tuple
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The collection to convert to a tuple. Can be a list, set, or any other collection.
  required: true
  type: list
{% endfunction_parameters %}

## Good to know

- Tuples are immutable. Once created, you cannot append to or modify them. Use a list if you need to change items later.
- Most Home Assistant template work does not need tuples. Reach for them when you need a hashable value to use as a dictionary key or set member.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Convert a list of coordinates to a tuple

Create a fixed coordinate pair from a list.

{% example %}
template: '{{ tuple([52.5, 13.4]) }}'
type: tuple
output: "(52.5, 13.4)"
{% endexample %}

### Use a tuple for comparison

Tuples can be compared directly, which is useful for checking if a set of values matches an expected combination.

{% example %}
template: '{{ tuple([1, 2, 3]) == tuple([1, 2, 3]) }}'
type: boolean
output: "true"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
