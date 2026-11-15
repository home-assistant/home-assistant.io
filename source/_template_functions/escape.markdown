---
title: "Escape HTML characters: escape"
function_name: "escape"
description: "Escapes HTML special characters in a string so they display as literal text."
available_as:
  - filter
aliases:
  - e
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - forceescape
  - safe
  - striptags
---

The `escape` filter converts HTML special characters (`&`, `<`, `>`, `"`, `'`) into their HTML entity equivalents so they are displayed as literal text instead of being interpreted as HTML. This filter is also available under the alias `e`.
This is important when displaying user-provided or dynamic text in contexts where HTML is rendered, such as Markdown cards or notification messages. For example, if a {% term sensor %} state contains characters like `<` or `&`, escaping ensures they appear correctly instead of being treated as HTML markup.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "<b>Hello</b> & welcome" | escape }}'
type: string
output: "&lt;b&gt;Hello&lt;/b&gt; &amp; welcome"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
escape(
    value: str,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to escape. Characters `&`, `<`, `>`, `"`, and `'` are replaced with their HTML entity equivalents.
  required: true
  type: string
{% endfunction_parameters %}

## Using the e alias

The `escape` filter can also be used with its shorter alias `e`.

{% example %}
template: '{{ "Tom & Jerry" | e }}'
title: Using the e alias
type: string
output: "Tom &amp; Jerry"
{% endexample %}

## Good to know

- Only the five HTML-special characters are replaced. Other characters like accented letters or emoji pass through unchanged.
- The result is marked as safe HTML, so a later [`safe`](/template-functions/safe/) or escape call will not double-escape it.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Safely display a sensor value containing special characters

Escape a sensor state so that any special characters are rendered literally in a Markdown card.

{% example %}
template: '{{ states("sensor.device_status") | escape }}'
type: string
output: "Running &lt;OK&gt;"
{% endexample %}

### Escape dynamic content in a notification

Ensure that user-provided text does not break HTML formatting in a notification message.

{% example %}
template: |
  The device reported: {{ states("sensor.error_message") | escape }}
type: string
output: "The device reported: Error code &lt;5&gt; &amp; retry"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
