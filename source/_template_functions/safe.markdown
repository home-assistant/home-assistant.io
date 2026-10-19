---
title: "Mark as safe HTML: safe"
function_name: "safe"
description: "Marks a string as safe HTML so it will not be escaped when rendered."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - escape
  - forceescape
  - striptags
---

The `safe` filter marks a string as safe HTML, which means it will not be automatically escaped when rendered in an HTML context. Without this filter, HTML characters like `<` and `>` would be converted to their entity equivalents to prevent accidental HTML injection.
This is useful when you intentionally want to include HTML markup in your output. For example, you might want to include bold text, links, or line breaks in a Markdown card or an HTML notification message. Use this filter with care and only on content you trust, since it bypasses the automatic escaping that protects against malformed or unexpected HTML.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "<b>Important</b> message" | safe }}'
type: string
output: "<b>Important</b> message"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
safe(
    value: str,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to mark as safe. It will not be escaped when rendered in an HTML context.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Only apply this to content you trust. Untrusted input marked safe can inject HTML.
- Use [`forceescape`](/template-functions/forceescape/) downstream to re-escape a value that was marked safe.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Include HTML formatting in a notification

Mark a string as safe to include bold text in an HTML notification.

{% example %}
template: |
  {{
    ("<b>Alert:</b> Motion detected in the "
    ~ states("sensor.last_motion_room")) | safe
  }}
type: string
output: "<b>Alert:</b> Motion detected in the living room"
{% endexample %}

### Add a line break in output

Include an HTML line break in your template output.

{% example %}
template: '{{ ("Temperature: 22°C<br>Humidity: 65%") | safe }}'
type: string
output: "Temperature: 22°C<br>Humidity: 65%"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
