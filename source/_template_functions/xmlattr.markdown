---
title: "Convert dictionary to HTML attributes: xmlattr"
function_name: "xmlattr"
description: "Converts a dictionary into an XML/HTML attribute string."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - to_json
  - escape
  - safe
---

The `xmlattr` filter converts a dictionary into a string of XML/HTML attributes. Each key-value pair becomes an attribute in `key="value"` format, with values automatically escaped. Keys with `None` or `undefined` values are omitted.
This is useful when dynamically building HTML elements with variable attributes. For example, you might want to generate an HTML tag with attributes that come from {% term sensor %} data or template variables. By default, a leading space is added before the attributes so you can place the result directly after a tag name.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ {"class": "alert", "id": "msg1"} | xmlattr }}'
type: string
output: ' class="alert" id="msg1"'
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
xmlattr(
    value: dict,
    autospace: bool = True,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    A dictionary of attribute names and values to convert into an HTML/XML attribute string. Keys with `None` values are omitted.
  required: true
  type: map
autospace:
  description: >
    If `true`, a leading space is added before the first attribute. This lets you append the result directly after a tag name without worrying about spacing. Defaults to `true`.
  required: false
  default: "true"
  type: boolean
{% endfunction_parameters %}

## Good to know

- Keys whose value is `None` or undefined are skipped, so you can build attribute dictionaries conditionally without extra template logic.
- Values are HTML-escaped automatically, making the result safe to drop directly into a tag.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Build an HTML element with dynamic attributes

Generate an HTML tag with attributes set from template variables.

{% example %}
template: |
  {% set attrs = {"style": "color: red", "title": "Warning"} %}
  <span{{ attrs | xmlattr }}>Alert</span>
type: string
output: '<span style="color: red" title="Warning">Alert</span>'
{% endexample %}

### Create a link with dynamic attributes

Build an anchor tag with attributes from a dictionary.

{% example %}
template: |
  {% set link_attrs = {"href": "https://www.home-assistant.io",
                       "target": "_blank"} %}
  <a{{ link_attrs | xmlattr }}>Home Assistant</a>
type: string
output: |-
  <a href="https://www.home-assistant.io" target="_blank">Home Assistant</a>
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
