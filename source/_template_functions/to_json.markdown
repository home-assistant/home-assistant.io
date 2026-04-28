---
title: "Serialize to JSON: to_json"
function_name: "to_json"
description: "Serializes a value to a JSON string."
available_as:
  - filter
category: collection
return_type: string
limited: true
since: "0.7"
related_functions:
  - from_json
  - combine
---

The `to_json` filter converts a Python object (like a dictionary, list, string, or number) into a JSON-formatted string. This is the opposite of [`from_json`](/template-functions/from_json/), which parses a JSON string back into an object.

This is essential when you need to send structured data to external services. Many integrations like MQTT, REST, and webhooks expect JSON-formatted payloads. For example, you might build a dictionary with sensor data and convert it to JSON for an MQTT publish, or format a payload for a REST API call. The optional parameters let you control the output format: `pretty_print` adds indentation for readability, `sort_keys` orders the keys alphabetically, and `ensure_ascii` escapes non-ASCII characters.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ {"temperature": 21.5, "humidity": 45} | to_json }}'
type: string
output: '{"temperature":21.5,"humidity":45}'
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
value | to_json(
    ensure_ascii: bool = False,
    pretty_print: bool = False,
    sort_keys: bool = False,
) -> str
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
ensure_ascii:
  description: >
    If `true`, all non-ASCII characters are escaped in the output. Defaults to `false`, which allows Unicode characters to pass through unchanged.
  required: false
  default: "false"
  type: boolean
pretty_print:
  description: >
    If `true`, the output is formatted with indentation for readability. Useful for debugging or displaying structured data.
  required: false
  default: "false"
  type: boolean
sort_keys:
  description: >
    If `true`, dictionary keys are sorted alphabetically in the output.
  required: false
  default: "false"
  type: boolean
{% endfunction_parameters %}

## Pretty-printed output

Use `pretty_print` to format the JSON with indentation, making it easier to read in logs or on dashboards.

{% example %}
template: |
  {{
    {"name": "Living Room", "temperature": 21.5}
    | to_json(pretty_print=true)
  }}
type: string
output: |
  {
    "name": "Living Room",
    "temperature": 21.5
  }
{% endexample %}

## Good to know

- The output has no spaces between keys and values by default, which is ideal for MQTT or API payloads but less readable. Turn on `pretty_print` for debugging.
- Values that are not JSON-serializable (like datetime objects) raise an error. Convert them to strings or numbers first.
- Dictionary keys are preserved in their original order unless you set `sort_keys=true`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Publish sensor data via MQTT

Build a JSON payload from sensor values and publish it to an MQTT topic.

{% example %}
action: |
  action:
    - action: mqtt.publish
      data:
        topic: "home/sensors/living_room"
        payload: >
          {{
            {
              "temperature": states("sensor.living_room_temperature") | float,
              "humidity": states("sensor.living_room_humidity") | float,
              "timestamp": now() | as_timestamp | int
            } | to_json
          }}
{% endexample %}

### Send data to a REST API

Format a dictionary as JSON for a RESTful notification or webhook.

{% example %}
action: |
  action:
    - action: rest_command.send_data
      data:
        payload: >
          {{
            {
              "event": "door_opened",
              "entity": "binary_sensor.front_door",
              "state": states("binary_sensor.front_door")
            } | to_json
          }}
{% endexample %}

### Sort keys for consistent output

Use `sort_keys` when you need deterministic output, for example when comparing JSON strings.

{% example %}
template: '{{ {"z": 1, "a": 2, "m": 3} | to_json(sort_keys=true) }}'
type: string
output: '{"a":2,"m":3,"z":1}'
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
