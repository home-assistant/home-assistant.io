---
title: "Strip HTML tags: striptags"
function_name: "striptags"
description: "Removes all HTML/XML tags from a string, leaving only the text content."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - escape
  - replace
  - trim
---

The `striptags` filter removes all HTML and XML tags from a string, leaving only the plain text content. It also normalizes whitespace by collapsing multiple spaces into one and trimming the result.
This is useful when you receive HTML-formatted content from a {% term sensor %} or external source and need only the plain text. For example, some weather services or RSS feed {% term sensors %} provide descriptions with HTML markup, and you might want to strip the tags before displaying the content in a notification or on a dashboard card.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "<p>Hello <b>World</b></p>" | striptags }}'
type: string
output: Hello World
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
striptags(
    value: str,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string from which to remove all HTML/XML tags. Whitespace is normalized in the result.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Whitespace is normalized: runs of spaces, tabs, and newlines are collapsed into single spaces, and the result is trimmed.
- Only tags are removed. HTML entities like `&amp;` or `&nbsp;` remain as-is. Combine with [`replace`](/template-functions/replace/) if you need to decode them.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Extract plain text from an HTML sensor

Strip HTML from a sensor that provides formatted content.

{% example %}
template: '{{ states.sensor.news_headline.attributes.description | striptags }}'
type: string
output: "Breaking news: severe weather warning issued for the area."
{% endexample %}

### Clean up HTML content for a notification

Remove HTML tags from a message before sending it as a plain text notification.

{% example %}
template: |
  {{
    "<h1>Alert</h1><p>Motion detected in the <em>backyard</em>.</p>"
    | striptags
  }}
type: string
output: "Alert Motion detected in the backyard."
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
