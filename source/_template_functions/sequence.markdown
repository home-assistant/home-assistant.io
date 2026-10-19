---
title: "Test if sequence: sequence"
function_name: "sequence"
description: "Tests whether a value is a sequence (list, tuple, or string)."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - iterable
  - mapping
  - list
  - typeof
---

The `sequence` test checks whether a value is a sequence type, which includes lists, tuples, and strings. Unlike the [`iterable`](/template-functions/iterable/) test, it returns `false` for dictionaries and generators. Unlike [`mapping`](/template-functions/mapping/), it returns `false` for dictionaries.

This is useful when you need to distinguish between sequences (ordered, indexed collections) and mappings (key-value collections). For example, when processing {% term entity %} attributes that could be either a list or a dictionary, testing with `sequence` (and confirming the value is not a [`mapping`](/template-functions/mapping/)) lets you determine the correct way to access the data.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if [1, 2, 3] is sequence %}
    It is a sequence
  {% endif %}
type: string
output: "It is a sequence"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
sequence(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value is a sequence (list, tuple, or string).
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Dictionaries pass this test in Jinja, so pair with `is not mapping` when you need to exclude them.
- Strings pass as sequences because they behave like sequences of characters.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check various types

Lists and strings are sequences, but dictionaries and numbers are not.

{% example %}
template: |
  {{ [1, 2, 3] is sequence }}
  {{ "hello" is sequence }}
  {{ {"a": 1} is sequence }}
  {{ 42 is sequence }}
type: boolean
output: |
  true
  true
  true
  false
{% endexample %}

### Determine how to process data

Check whether an attribute is a list-like sequence before indexing into it.

{% example %}
template: |
  {% set data = state_attr("sensor.forecast", "list") %}
  {% if data is sequence and data is not mapping %}
    First item: {{ data[0] }}
  {% endif %}
type: string
output: "First item: sunny"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
