---
title: "Convert to title case: title"
function_name: "title"
description: "Converts a string to title case, capitalizing the first letter of each word."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - capitalize
  - lower
  - upper
---

The `title` filter converts a string to title case, where the first letter of each word is capitalized and the rest are lowered.
This is useful when you want to present text in a polished, headline-like format. For example, you might want to format a room name or {% term device %} name nicely for a notification or a dashboard display, turning values like `living room light` into `Living Room Light`.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "living room light" | title }}'
type: string
output: Living Room Light
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
title(
    value: str,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to convert to title case. The first letter of each word is capitalized.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Words are split on any non-letter character, so names like `"o'brien"` become `"O'Brien"` and values with numbers may capitalize unexpectedly.
- Every word is capitalized, including short words like "of", "the", and "in". This is not the same as English title-case conventions.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Format an entity name for display

Turn a raw entity name into a nicely formatted title for a notification.

{% example %}
template: '{{ "front door sensor" | title ~ " is active" }}'
type: string
output: "Front Door Sensor is active"
{% endexample %}

### Create a friendly room name

Format a room name for use in a dashboard card heading.

{% example %}
template: '{{ "guest bedroom" | title }}'
type: string
output: Guest Bedroom
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
