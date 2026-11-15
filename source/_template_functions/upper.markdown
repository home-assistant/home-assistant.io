---
title: "Convert to uppercase: upper"
function_name: "upper"
description: "Converts all characters in a string to uppercase."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - lower
  - capitalize
  - title
---

The `upper` filter converts all characters in a string to uppercase.
This is useful when you need to display text in all capitals for emphasis, or when normalizing text for comparison purposes. For example, you might want to display a status message in uppercase on a dashboard, or convert a value to uppercase before comparing it against a known constant.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "hello world" | upper }}'
type: string
output: HELLO WORLD
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
upper(
    value: str,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to convert to uppercase.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Non-letter characters like digits and punctuation pass through unchanged.
- For case-insensitive comparisons, convert both sides with the same filter ([`upper`](/template-functions/upper/) or [`lower`](/template-functions/lower/)) rather than mixing them.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Display a status label in uppercase

Show a sensor state in all capitals for a prominent display.

{% example %}
template: '{{ states("sensor.alarm_status") | upper }}'
type: string
output: ARMED
{% endexample %}

### Normalize text for comparison

Convert to uppercase to ensure a case-insensitive match.

{% example %}
template: |
  {% if states("sensor.mode") | upper == "AUTO" %}
    System is in automatic mode
  {% endif %}
type: string
output: "System is in automatic mode"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
