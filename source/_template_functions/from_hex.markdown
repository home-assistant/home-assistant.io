---
title: "Decode hex string to bytes: from_hex"
function_name: "from_hex"
description: "Decodes a hexadecimal string into bytes."
available_as:
  - filter
category: encoding
return_type: bytes
limited: true
since: "2023.4"
related_functions:
  - pack
  - unpack
  - base64_decode
---

The `from_hex` filter converts a hexadecimal string into a bytes object. Each pair of hex characters in the input string is converted to a single byte. For example, "48656c6c6f" decodes to the bytes representing "Hello".

This is useful when working with IoT {% term devices %} and protocols that represent binary data as hex strings. Many BLE (Bluetooth Low Energy) {% term sensors %}, Zigbee devices, and serial protocols report their data as hexadecimal strings. The `from_hex` filter converts these hex strings into bytes that you can then process further with [`unpack`](/template-functions/unpack/) to extract numeric values, or decode to a text string.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "48656c6c6f" | from_hex }}'
type: bytes
output: "b'Hello'"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
value | from_hex() -> bytes
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The hexadecimal string to decode. Must contain an even number of hex characters (0-9, a-f, A-F).
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- The input must have an even number of hex characters. Odd-length strings raise an error.
- The result is raw bytes. Pipe to [`string`](/template-functions/string/) for text, or [`unpack`](/template-functions/unpack/) for numeric values.
- A `0x` prefix on the input raises an error; strip it first.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Decode a hex sensor value to an integer

Convert a hex string from a sensor into an integer using [`unpack`](/template-functions/unpack/).

{% example %}
template: '{{ "04d2" | from_hex | unpack(">H") }}'
type: integer
output: "1234"
{% endexample %}

### Decode hex to a text string

Convert a hex-encoded string to readable text by decoding the resulting bytes.

{% example %}
template: '{{ "486f6d65" | from_hex | string }}'
type: string
output: "Home"
{% endexample %}

### Process BLE advertisement data

Extract a temperature value from a BLE sensor that reports data as a hex string. The first two bytes (4 hex characters) contain the temperature as a big-endian signed short.

{% example %}
template: |
  {% set hex_data = states("sensor.ble_advertisement") %}
  {{ hex_data[:4] | from_hex | unpack(">h") / 100 }}
type: float
output: "21.5"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
