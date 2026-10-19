---
title: "Decode from base64: base64_decode"
function_name: "base64_decode"
description: "Decodes a base64-encoded string."
available_as:
  - filter
category: encoding
return_type: string
limited: false
since: "0.117"
related_functions:
  - base64_encode
---

The `base64_decode` filter takes a base64-encoded string and decodes it back to its original form. By default, it returns a UTF-8 string, but you can set the encoding to `none` to get raw bytes instead.

This is useful when you receive base64-encoded data from external services or {% term sensors %}. For example, some MQTT messages include base64-encoded payloads, certain APIs return data in base64 format, or you might receive encoded credentials that need to be decoded. The optional `encoding` parameter lets you control how the decoded bytes are interpreted. Set it to `none` when working with binary data that is not a text string.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "SGVsbG8sIFdvcmxkIQ==" | base64_decode }}'
type: string
output: "Hello, World!"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
value | base64_decode(
    encoding: str | None = "utf-8",
) -> str | bytes
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The base64-encoded string to decode.
  required: true
  type: string
encoding:
  description: >
    The character encoding to use when converting the decoded bytes to a string. Defaults to `utf-8`. Set to `none` to return raw bytes instead of a string.
  required: false
  default: '"utf-8"'
  type: string
{% endfunction_parameters %}

## Decoding to raw bytes

Set `encoding` to `none` to get the raw bytes instead of a string. This is useful when the encoded data is not text.

{% example %}
template: '{{ "AQIDBA==" | base64_decode(encoding=none) }}'
type: bytes
output: "b'\\x01\\x02\\x03\\x04'"
{% endexample %}

## Good to know

- By default, the decoded bytes are interpreted as UTF-8. Non-UTF-8 binary data raises an error unless you pass `encoding=none`.
- Setting `encoding=none` returns raw bytes, which display with a `b'...'` prefix and cannot be concatenated with strings directly.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Decode an MQTT payload

Decode a base64-encoded message received from an MQTT topic.

{% example %}
template: '{{ states("sensor.mqtt_encoded") | base64_decode }}'
type: string
output: "Temperature: 21.5C"
{% endexample %}

### Decode and parse JSON

Decode a base64 string that contains JSON data, then parse it.

{% example %}
template: |
  {% set decoded = "eyJ0ZW1wIjogMjEuNX0=" | base64_decode %}
  {{ decoded | from_json }}
type: dict
output: "{'temp': 21.5}"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
