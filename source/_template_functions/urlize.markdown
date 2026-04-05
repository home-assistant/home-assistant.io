---
title: "Convert URLs to HTML links: urlize"
function_name: "urlize"
description: "Converts plain text URLs into HTML links."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - urlencode
  - escape
---

The `urlize` filter finds plain text URLs in a string and converts them into HTML anchor (`<a>`) tags. It recognizes URLs starting with `http://`, `https://`, and `www.`.
This is useful when you have text that contains URLs and you want to turn them into links in an HTML context, such as a Markdown card or an HTML notification. For example, a {% term sensor %} might report a URL as plain text, and you can use this filter to turn it into a real link.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "Visit https://www.home-assistant.io for more info" | urlize }}'
type: string
output: 'Visit <a href="https://www.home-assistant.io" rel="noopener">https://www.home-assistant.io</a> for more info'
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
urlize(
    value: str,
    trim_url_limit: int | None = None,
    nofollow: bool = False,
    target: str | None = None,
    rel: str | None = None,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string in which to find and convert URLs into HTML links.
  required: true
  type: string
trim_url_limit:
  description: >
    If set, the displayed URL text is shortened to this many characters. The link itself is not affected.
  required: false
  type: integer
nofollow:
  description: >
    If `true`, adds `rel="nofollow"` to the generated links. Defaults to `false`.
  required: false
  default: "false"
  type: boolean
target:
  description: >
    Sets the `target` attribute on the generated links (for example, `_blank` to open in a new tab).
  required: false
  type: string
rel:
  description: >
    Sets a custom `rel` attribute on the generated links.
  required: false
  type: string
{% endfunction_parameters %}

## Shortening long URLs

Use `trim_url_limit` to shorten the displayed URL text while keeping the full link.

{% example %}
template: |
  {{
    "See https://www.example.com/docs/templating/"
    | urlize(trim_url_limit=30)
  }}
title: Shorten displayed URL text
type: string
output: |-
  See <a href="https://www.example.com/docs/templating/"
  rel="noopener">https://www.example.com/docs...</a>
{% endexample %}

## Good to know

- Only URLs starting with `http://`, `https://`, or `www.` are recognized. Protocols like `ftp://` or bare domains are left as plain text.
- The output contains HTML. Use it in contexts that render HTML, like Markdown cards or HTML-capable notifications.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Turn a sensor URL into a link

Convert a URL reported by a sensor into a real link for a Markdown card.

{% example %}
template: '{{ states("sensor.update_url") | urlize(target="_blank") }}'
type: string
output: |-
  <a href="https://example.com/update" rel="noopener"
  target="_blank">https://example.com/update</a>
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
