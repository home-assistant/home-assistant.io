---
title: "Parse JSON string: from_json"
function_name: "from_json"
description: "Parses a JSON string into a Python object."
available_as:
  - filter
category: collection
return_type: any
limited: true
since: "0.7"
related_functions:
  - to_json
  - combine
---

The `from_json` filter takes a JSON-formatted string and parses it into a Python object (dictionary, list, string, number, or boolean). This is the opposite of [`to_json`](/template-functions/to_json/), which converts an object into a JSON string.

This is essential when working with data received from external services. Many integrations store JSON data as strings in {% term entity %} states or attributes. For example, MQTT messages, REST sensor responses, and webhook payloads often arrive as JSON strings that you need to parse before you can access individual values. Once parsed, you can use standard dictionary and list operations to extract the data you need. The optional [`default`](/template-functions/default/) parameter lets you provide a fallback value if the JSON is invalid, preventing errors in your {% term templates %}.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ ''{"temperature": 21.5, "humidity": 45}'' | from_json }}'
type: dict
output: "{'temperature': 21.5, 'humidity': 45}"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
value | from_json(
    default: Any = <raises error>,
) -> Any
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
default:
  description: >
    Value to return if the JSON string is invalid or cannot be parsed. If not provided, an error is raised on invalid input.
  required: false
  type: any
{% endfunction_parameters %}

## Using a default value

If the input might not be valid JSON, provide a default to avoid errors.

{% example %}
template: '{{ "not valid json" | from_json(default={}) }}'
type: dict
output: "{}"
{% endexample %}

## Good to know

- Without a default, invalid JSON raises an error that can break your template.
- JSON uses double quotes only. Single-quoted strings like `'{"a": 1}'` need to wrap a string that itself uses double quotes inside.
- Returns the matching Python type: an object becomes a dict, an array becomes a list, `null` becomes `None`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Parse an MQTT message

Extract a value from a JSON-formatted MQTT sensor payload.

{% example %}
template: |
  {% set payload = states("sensor.mqtt_sensor") | from_json %}
  Temperature: {{ payload.temperature }}
  Humidity: {{ payload.humidity }}
type: string
output: |
  Temperature: 21.5
  Humidity: 45
{% endexample %}

### Parse a REST sensor response

Access nested data from a REST API response stored as a JSON string.

{% example %}
template: |
  {% set data = states("sensor.api_response") | from_json %}
  {{ data.results | map(attribute="name") | list }}
type: list
output: '["Item A", "Item B", "Item C"]'
{% endexample %}

### Safe parsing with a default

When processing data that might not always be valid JSON, use a default to keep your {% term template %} working.

{% example %}
template: |
  {% set data = states("sensor.maybe_json")
     | from_json(default={"status": "unknown"}) %}
  Status: {{ data.status }}
type: string
output: "Status: unknown"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
