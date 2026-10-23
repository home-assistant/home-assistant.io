---
title: "Mark as safe HTML: safe"
function_name: "safe"
description: "Marks a string as safe HTML. In Home Assistant, the output stays the same."
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

The `safe` filter marks a string as safe HTML. Some template engines escape HTML characters automatically, and safe text is skipped.

Home Assistant doesn't escape template output. Characters like `<` and `>` stay as they are, with or without `safe`. So in Home Assistant, `safe` doesn't change the output. The filter exists for compatibility with Jinja, the template engine that Home Assistant uses. You can include HTML markup, such as bold text or line breaks, without it.

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
    The string to mark as safe.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Home Assistant doesn't escape template output, so the result is the same with or without `safe`.
- Use [`forceescape`](/template-functions/forceescape/) downstream to re-escape a value that was marked safe.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Include HTML formatting in a notification

Mark a string as safe to include bold text in an HTML notification. The output is the same without `safe`.

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

Include an HTML line break in your template output. The output is the same without `safe`.

{% example %}
template: '{{ ("Temperature: 22°C<br>Humidity: 65%") | safe }}'
type: string
output: "Temperature: 22°C<br>Humidity: 65%"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
