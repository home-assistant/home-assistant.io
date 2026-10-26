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

The `tojson` filter converts a value (like a dictionary, list, string, or number) into a JSON-formatted string. This is the standard `tojson` filter from Jinja. It accepts an optional `indent` parameter to pretty-print the output with indentation.

This filter is useful when you need to produce JSON output for external services or for debugging. If you need more control over the output, use the [`to_json`](/template-functions/to_json/) filter instead. It offers additional options, such as keeping special characters as they are.

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
- The keys of a dictionary are always sorted alphabetically.
- Some characters are escaped: `<`, `>`, `&`, and `'` become `\u003c`, `\u003e`, `\u0026`, and `\u0027`. This makes the output safe to place in HTML text, in a `<script>` element, or in an HTML attribute with single quotes. Double quotes aren't escaped, so don't place the output in an attribute with double quotes.
- Characters outside the ASCII range are escaped too. For example, `°C` becomes `\u00b0C`. To keep these characters as they are, use [`to_json`](/template-functions/to_json/).
- Date and time values and state objects can't be converted. They cause an error.

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
