---
title: "Encode to base64: base64_encode"
function_name: "base64_encode"
description: "Encodes a string or bytes to a base64 string."
available_as:
  - filter
category: encoding
return_type: string
limited: false
since: "0.117"
related_functions:
  - base64_decode
---

The `base64_encode` filter converts a string or bytes value into its base64-encoded representation. Base64 encoding transforms binary data into a text format that uses only printable ASCII characters, making it safe to include in places that only support text.

This is useful when you need to send binary data or credentials through text-only channels. For example, some REST APIs require authentication headers to be base64-encoded, certain MQTT payloads need binary data encoded as text, or you might need to embed image data in a notification. The filter accepts both strings and raw bytes, encoding them into a standard base64 string.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "Hello, World!" | base64_encode }}'
type: string
output: "SGVsbG8sIFdvcmxkIQ=="
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
value | base64_encode() -> str
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The string or bytes value to encode. Strings are first converted to UTF-8 bytes before encoding.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Strings are encoded as UTF-8 before being base64-encoded.
- The result includes `=` padding characters when the input length is not a multiple of three.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Create a basic auth header

Build an HTTP Basic Authentication header by base64-encoding credentials.

{% example %}
template: '{{ ("username:password") | base64_encode }}'
type: string
output: "dXNlcm5hbWU6cGFzc3dvcmQ="
{% endexample %}

### Encode sensor data for transmission

Encode a sensor value for inclusion in a base64-only payload.

{% example %}
template: '{{ states("sensor.temperature") | base64_encode }}'
type: string
output: "MjEuNQ=="
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
