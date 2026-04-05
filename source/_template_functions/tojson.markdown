---
title: "Serialize to JSON: tojson"
function_name: "tojson"
description: "Serializes a value to a JSON-formatted string."
available_as:
  - filter
category: type
return_type: string
limited: true
since: "0.7"
related_functions:
  - to_json
  - from_json
---

The `tojson` filter converts a Python object (like a dictionary, list, string, or number) into a JSON-formatted string. This is a Home Assistant override of the standard `tojson` filter. It accepts an optional `indent` parameter to pretty-print the output with indentation.

This filter is useful when you need to produce JSON output for external services or for debugging. If you need more control over the serialization (such as sorting keys or controlling ASCII escaping), consider using the [`to_json`](/template-functions/to_json/) filter instead, which offers additional options.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ {"temperature": 21.5, "unit": "C"} | tojson }}'
type: string
output: '{"temperature": 21.5, "unit": "C"}'
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
value | tojson(
    indent: int | None = None,
) -> str
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
indent:
  description: >
    Number of spaces to use for indentation when pretty-printing. When set to `none` (the default), the output is compact with no extra whitespace.
  required: false
  default: "none"
  type: integer
{% endfunction_parameters %}

## Pretty-printed output

Use the `indent` parameter to format the JSON with indentation for readability.

{% example %}
template: |
  {{ {"name": "Living Room", "temperature": 21.5} | tojson(indent=2) }}
title: Pretty-print with 2-space indent
type: string
output: |
  {
    "name": "Living Room",
    "temperature": 21.5
  }
{% endexample %}

## Good to know

- The default output includes a space after each comma and colon, unlike [`to_json`](/template-functions/to_json/), which produces a compact string.
- If you need sorted keys or control over ASCII escaping, use [`to_json`](/template-functions/to_json/) instead.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Send a JSON payload via MQTT

Build a dictionary from {% term sensor %} values and serialize it for an MQTT publish action.

{% example %}
action: |
  action:
    - action: mqtt.publish
      data:
        topic: "home/sensors"
        payload: >
          {{
            {
              "temperature": states("sensor.temperature") | float,
              "humidity": states("sensor.humidity") | float
            } | tojson
          }}
{% endexample %}

### Serialize a list

Convert a list of values to a JSON array string.

{% example %}
template: '{{ ["on", "off", "on"] | tojson }}'
type: string
output: '["on", "off", "on"]'
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
