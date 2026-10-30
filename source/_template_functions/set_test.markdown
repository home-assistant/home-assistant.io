---
title: "Test if set: set"
function_name: "set"
description: "Tests whether a value is a set."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "2023.11"
related_functions:
  - set
  - typeof
---

The `set` test checks whether a value is a set, an unordered collection of unique values. It returns `true` for sets and `false` for everything else, including lists, tuples, dictionaries, and strings.

Jinja has no built-in test for sets, and templates have no literal syntax for them. You create a set with the [`set`](https://www.home-assistant.io/template-functions/set/) function, and some values that Home Assistant returns are sets, for example the identifiers and connections of a device. This test lets you check the type before you use set-specific features like removing duplicates or comparing collections.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if set([1, 2, 3]) is set %}
    It is a set
  {% endif %}
type: string
output: "It is a set"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
set(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value is a set.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Only real sets pass. Lists, tuples, dictionaries, and strings do not. To test for those, use the [`list`](https://www.home-assistant.io/template-functions/list_test/) and [`tuple`](https://www.home-assistant.io/template-functions/tuple_test/) tests.
- A set has no fixed order, and it holds each value only once.
- To convert a value to a set, use the [`set`](https://www.home-assistant.io/template-functions/set/) function.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Distinguish a set from other values

Check whether a value is a set rather than a list, tuple, or string.

{% example %}
template: |
  {{ set([1, 2, 2, 3]) is set }}
  {{ [1, 2, 3] is set }}
  {{ (1, 2, 3) is set }}
  {{ "abc" is set }}
type: boolean
output: |
  true
  false
  false
  false
{% endexample %}

### Convert to a set only when needed

Convert a list to a set to remove duplicates, but leave existing sets as they are.

{% example %}
template: |
  {% set values = [1, 2, 2, 3] %}
  {% set unique = values if values is set else set(values) %}
  {{ unique | count }}
type: integer
output: 3
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
