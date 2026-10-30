---
title: "Test if tuple: tuple"
function_name: "tuple"
description: "Tests whether a value is a tuple."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "2023.11"
related_functions:
  - tuple
  - typeof
---

The `tuple` test checks whether a value is a tuple, a fixed sequence of values such as a pair of coordinates. It returns `true` for tuples and `false` for everything else, including lists, sets, dictionaries, and strings.

Jinja has no built-in test for tuples. Some values in Home Assistant are tuples, and a tuple behaves differently from a list: it cannot be changed after it is created, and it can be used as a dictionary key. This test lets you check the type before you rely on that behavior.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if (1, 2, 3) is tuple %}
    It is a tuple
  {% endif %}
type: string
output: "It is a tuple"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
tuple(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value is a tuple.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Only real tuples pass. Lists, sets, dictionaries, and strings do not. To inspect the type of another value, use [`typeof`](/template-functions/typeof/).
- To convert a value to a tuple, use the [`tuple`](https://www.home-assistant.io/template-functions/tuple/) function.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Distinguish a tuple from other values

Check whether a value is a tuple rather than a list, set, or string.

{% example %}
template: |
  {{ (52.5, 13.4) is tuple }}
  {{ [52.5, 13.4] is tuple }}
  {{ set([52.5, 13.4]) is tuple }}
  {{ "52.5, 13.4" is tuple }}
type: boolean
output: |
  true
  false
  false
  false
{% endexample %}

### Use a value only if it is a tuple

Read the parts of a coordinate pair after you confirm that it is a tuple.

{% example %}
template: |
  {% set coords = tuple([52.5, 13.4]) %}
  {% if coords is tuple %}
    Latitude {{ coords[0] }}, longitude {{ coords[1] }}
  {% endif %}
type: string
output: "Latitude 52.5, longitude 13.4"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
