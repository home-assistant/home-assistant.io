---
title: "Test if iterable: iterable"
function_name: "iterable"
description: "Tests whether a value is iterable."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - sequence
  - mapping
  - list
  - typeof
---

The `iterable` test checks whether a value can be iterated over. It returns `true` for lists, tuples, strings, dictionaries, generators, and other iterable types. It returns `false` for non-iterable types like numbers, booleans, and `None`.

This is useful when you need to verify that a value can be looped over with {% jinja %}{% for %}{% endjinja %} before attempting to do so. Some {% term entity %} attributes might be a list in some cases and a single value in others. Testing with `iterable` prevents errors when the value turns out not to be something you can loop over.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if [1, 2, 3] is iterable %}
    It is iterable
  {% endif %}
type: string
output: "It is iterable"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
iterable(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value can be iterated over.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Strings pass this test because they are iterable character by character.
- Use [`sequence`](/template-functions/sequence/) if you want to exclude dictionaries or use [`mapping`](/template-functions/mapping/) to match only dictionaries.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check various types

Lists, strings, and dictionaries are iterable. Numbers and booleans are not.

{% example %}
template: |
  {{ [1, 2] is iterable }}
  {{ "hello" is iterable }}
  {{ 42 is iterable }}
type: boolean
output: |
  true
  true
  false
{% endexample %}

### Guard a loop

Only attempt to iterate over an attribute if it is actually iterable.

{% example %}
template: |
  {% set items = state_attr("sensor.device", "features") %}
  {% if items is iterable %}
    {% for item in items %}
      - {{ item }}
    {% endfor %}
  {% else %}
    No features available
  {% endif %}
type: string
output: |
    - wifi
    - bluetooth
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
