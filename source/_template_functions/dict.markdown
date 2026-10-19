---
title: "Create a dictionary: dict"
function_name: "dict"
description: "Creates a dictionary from keyword arguments."
available_as:
  - function
category: functional
return_type: dict
limited: true
since: "0.7"
related_functions:
  - combine
  - to_json
  - from_json
---

The `dict` template function creates a dictionary (also known as a mapping) from keyword arguments. Each keyword becomes a key in the dictionary, and its value becomes the corresponding value. This is equivalent to Python's `dict()` constructor and provides a clean way to create dictionaries inline in your templates.

This is useful when you need to build a dictionary on the fly, for example when constructing data payloads for {% term actions %}, passing structured data to scripts, or creating lookup tables. While you can also create dictionaries using the `{"key": "value"}` literal syntax, the `dict()` function can be easier to read when you have many keys or want to avoid quoting key names.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ dict(name="Living Room", brightness=255, color="warm") }}'
type: dict
output: "{'name': 'Living Room', 'brightness': 255, 'color': 'warm'}"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
dict(
    **kwargs: Any,
) -> dict
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
kwargs:
  description: >
    Any number of keyword arguments. Each keyword becomes a key in the resulting dictionary, and its argument becomes the corresponding value.
  required: false
  type: any
{% endfunction_parameters %}

## Good to know

- Only accepts keyword arguments. Keys that contain spaces, dashes, or reserved words cannot be created with this function. Use literal syntax `{"my key": value}` instead.
- Keys are always strings, even though they look like identifiers in the call.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Build action data

Create a dictionary to pass as data to an {% term action %} call.

{% example %}
action: |
  action:
    - action: notify.mobile
      data: >
        {{
          dict(
            title="Alert",
            message="Motion detected in " ~ states("sensor.room"),
            priority="high"
          )
        }}
{% endexample %}

### Create a lookup table

Build a mapping from keys to values for quick lookups.

{% example %}
template: |
  {% set icons = dict(
    clear="☀️",
    cloudy="☁️",
    rainy="🌧️"
  ) %}
  {{ icons.get(states("weather.home"), "❓") }}
type: string
output: "☀️"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
