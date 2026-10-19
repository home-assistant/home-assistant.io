---
title: "Capitalize first character: capitalize"
function_name: "capitalize"
description: "Capitalizes the first character of a string and lowercases the rest."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - lower
  - upper
  - title
---

The `capitalize` filter converts the first character of a string to uppercase and makes all remaining characters lowercase.
This is useful when you want to ensure a consistent sentence-case format for display purposes. For example, you might want to normalize a {% term sensor %} state like `OPEN` or `closed` to a cleaner `Open` or `Closed` format for use in notifications or dashboard cards.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "hello WORLD" | capitalize }}'
type: string
output: Hello world
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
capitalize(
    value: str,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to capitalize. The first character is uppercased and the rest are lowercased.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Only the very first character is uppercased. The rest of the string is always lowercased, even if it contained capitals before.
- Multi-word values become sentence case, not title case. Use [`title`](/template-functions/title/) when you want every word capitalized.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Normalize a sensor state for display

Clean up an entity state so it looks presentable in a notification.

{% example %}
template: |
  {{ "The door is " ~ states("binary_sensor.front_door") | capitalize }}
type: string
output: "The door is Off"
{% endexample %}

### Format a name from user input

Normalize a name entered through a text helper to sentence case.

{% example %}
template: '{{ states("input_text.greeting") | capitalize }}'
type: string
output: "Hello world"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
