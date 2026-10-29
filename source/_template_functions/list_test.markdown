---
title: "Test if list: list"
function_name: "list"
description: "Tests whether a value is a list."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "2023.11"
related_functions:
  - list
  - tuple_test
  - set_test
  - typeof
---

The `list` test checks whether a value is a list. It returns `true` for lists and `false` for everything else, including tuples, sets, dictionaries, and strings.

Jinja has no built-in test for lists. Without this test, you would need a long check like `value is iterable and value is not string and value is not mapping`, and that check would still match tuples and sets. This test is useful when a value might be a single item or a list, for example an entity attribute, and you need to handle each case differently.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if [1, 2, 3] is list %}
    It is a list
  {% endif %}
type: string
output: "It is a list"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
list(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value is a list.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Only real lists pass. Tuples, sets, dictionaries, and strings do not. To test for those, use the [`tuple`](https://www.home-assistant.io/template-functions/tuple_test/) and [`set`](https://www.home-assistant.io/template-functions/set_test/) tests, or the [`mapping`](https://www.home-assistant.io/template-functions/mapping/) test for dictionaries.
- To accept any collection of values, use the [`iterable`](https://www.home-assistant.io/template-functions/iterable/) test. Strings are iterable too, so combine it with `is not string` if you want to exclude them.
- To convert a value to a list, use the [`list`](https://www.home-assistant.io/template-functions/list/) filter.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Distinguish a list from other values

Check whether a value is a list rather than a tuple, string, or dictionary.

{% example %}
template: |
  {{ [1, 2, 3] is list }}
  {{ (1, 2, 3) is list }}
  {{ "abc" is list }}
  {{ {"a": 1} is list }}
type: boolean
output: |
  true
  false
  false
  false
{% endexample %}

### Handle a single item or a list

Wrap a value in a list only when it is not already one, so the rest of your template can always treat it as a list.

{% example %}
template: |
  {% set value = "light.kitchen" %}
  {% set entities = value if value is list else [value] %}
  {{ entities | count }}
type: integer
output: 1
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
