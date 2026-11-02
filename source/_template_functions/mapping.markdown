---
title: "Test if mapping: mapping"
function_name: "mapping"
description: "Tests whether a value is a mapping (dictionary)."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - iterable
  - sequence
  - from_json
  - typeof
---

The `mapping` test checks whether a value is a mapping type, such as a Python dictionary. It returns `true` if the value supports key-value access and `false` for lists, strings, numbers, and other types.

This is useful when working with {% term entity %} attributes or parsed JSON data that might be either a dictionary or a list. For example, some API responses return a dictionary for a single result and a list for multiple results. Testing with `mapping` lets you handle both cases correctly in your template.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if {"key": "value"} is mapping %}
    It is a mapping
  {% endif %}
type: string
output: "It is a mapping"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
mapping(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value is a mapping (dictionary) type.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Only dictionary-like values pass. Lists, tuples, and strings do not, even though they may look similar.
- Use this to guard key access: dictionary access on a non-mapping raises an error.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check various types

Dictionaries are mappings, but lists and strings are not.

{% example %}
template: |
  {{ {"a": 1} is mapping }}
  {{ [1, 2, 3] is mapping }}
  {{ "hello" is mapping }}
type: boolean
output: |
  true
  false
  false
{% endexample %}

### Handle parsed JSON data

When parsing JSON that could be a dictionary or a list, check the type before accessing keys.

{% example %}
template: |
  {% set data = '{"status": "ok"}' | from_json %}
  {% if data is mapping %}
    Status: {{ data.status }}
  {% else %}
    Unexpected format
  {% endif %}
type: string
output: "Status: ok"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
