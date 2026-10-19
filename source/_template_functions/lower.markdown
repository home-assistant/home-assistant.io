---
title: "Convert to lowercase: lower"
function_name: "lower"
description: "Converts all characters in a string to lowercase."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - upper
  - capitalize
  - title
---

The `lower` filter converts all characters in a string to lowercase.
This is useful when you need to normalize text for comparison or display. For example, {% term sensor %} states may come in mixed case like `On` or `OFF`, and converting to lowercase lets you compare them consistently. It is also handy for formatting text before using it in entity IDs or other contexts that expect lowercase values.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "Hello WORLD" | lower }}'
type: string
output: hello world
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
lower(
    value: str,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to convert to lowercase.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Entity states in Home Assistant are already lowercase (for example, `on`, `off`, `heating`), so this filter is most useful for attributes, user input, or text from external sources.
- Non-letter characters like digits and punctuation pass through unchanged.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Normalize a state for comparison

Convert a sensor state to lowercase so comparisons work regardless of how the value is capitalized.

{% example %}
template: |
  {% if states("sensor.status") | lower == "online" %}
    Device is online
  {% else %}
    Device is offline
  {% endif %}
type: string
output: "Device is online"
{% endexample %}

### Format text for display

Ensure a label is consistently lowercase for a clean look on a dashboard.

{% example %}
template: '{{ "MOTION DETECTED" | lower }}'
type: string
output: motion detected
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
