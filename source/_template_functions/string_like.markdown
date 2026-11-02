---
title: "Test if string-like: string_like"
function_name: "string_like"
description: "Tests whether a value is a string, bytes, or bytearray."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "2023.11"
related_functions:
  - string
  - iterable
  - sequence
  - typeof
---

The `string_like` test checks whether a value is a string or a string-like object. It returns `true` for strings, bytes, and bytearrays, and `false` for everything else, including lists, numbers, and dictionaries.

The built-in [`string`](/template-functions/string_test/) test only matches text strings. Strings, bytes, and bytearrays are all iterable, so the [`iterable`](/template-functions/iterable/) test returns `true` for them as well. Use `string_like` when you want to tell these text-like values apart from collections, such as lists and tuples.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if "hello" is string_like %}
    It is string-like
  {% endif %}
type: string
output: "It is string-like"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
string_like(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value is a string, bytes, or bytearray.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Strings, bytes, and bytearrays pass. The built-in [`string`](https://www.home-assistant.io/template-functions/string_test/) test only passes for strings.
- Numbers, lists, tuples, sets, and dictionaries do not pass.
- To find collections only, combine this test with `iterable`: `value is iterable and value is not string_like`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Distinguish text-like values from other values

Check whether a value is a string or bytes rather than a list or number.

{% example %}
template: |
  {{ "abc" is string_like }}
  {{ ("616263" | from_hex) is string_like }}
  {{ [1, 2, 3] is string_like }}
  {{ 42 is string_like }}
type: boolean
output: |
  true
  true
  false
  false
{% endexample %}

### Find collections but not text

Strings are iterable, so `iterable` alone also matches them. Exclude them with `is not string_like`.

{% example %}
template: |
  {{ "abc" is iterable and "abc" is not string_like }}
  {{ [1, 2, 3] is iterable and [1, 2, 3] is not string_like }}
type: boolean
output: |
  false
  true
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
