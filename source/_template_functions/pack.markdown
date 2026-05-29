---
title: "Pack value to bytes: pack"
function_name: "pack"
description: "Packs a value into bytes using a Python struct format string."
available_as:
  - function
  - filter
category: encoding
return_type: bytes
limited: true
since: "2023.4"
related_functions:
  - unpack
  - from_hex
  - base64_encode
---

The `pack` template function converts a value into a bytes object using a Python struct format string. This is the same as Python's `struct.pack` function, allowing you to convert numbers and other values into their binary representations according to a specified format.

This function is primarily useful for IoT and low-level device communication. Many IoT {% term devices %} communicate using binary protocols where you need to send data in a specific byte format. For example, you might need to send a temperature value as a big-endian 16-bit integer to a Bluetooth device, or pack a command byte sequence for an MQTT-connected microcontroller. The format strings follow [Python's struct module syntax](https://docs.python.org/3/library/struct.html#format-characters).

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ pack(1234, ">H") }}'
type: bytes
output: "b''\\x04\\xd2''"

---
filter: '{{ 1234 | pack(">H") }}'
type: bytes
output: "b''\\x04\\xd2''"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
pack(
    value: Any,
    format_string: str,
) -> bytes | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to pack into bytes. The type must match what the format string expects (for example, an integer for `>H`).
  required: true
  type: any
format_string:
  description: >
    A Python struct format string that describes the byte layout. Common formats include `>H` (big-endian unsigned short), `<i` (little-endian signed int), `>f` (big-endian float). See the [Python struct documentation](https://docs.python.org/3/library/struct.html#format-characters) for all options.
  required: true
  type: string
{% endfunction_parameters %}

## Common format strings

Here are the format strings you will reach for most often. The `>` prefix means big-endian (most significant byte first) and `<` means little-endian (least significant byte first).

- `>B`: big-endian unsigned byte (1 byte)
- `>H`: big-endian unsigned short (2 bytes)
- `>I`: big-endian unsigned int (4 bytes)
- `>f`: big-endian float (4 bytes)
- `<H`: little-endian unsigned short (2 bytes)
- `<i`: little-endian signed int (4 bytes)

## Good to know

- The value type must match the format specifier, or packing fails. `>H` expects an integer between 0 and 65535.
- Endianness matters. `>` is big-endian (network order) and `<` is little-endian.
- Returns raw bytes. For transmission over text channels, combine with [`base64_encode`](/template-functions/base64_encode/).

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Pack a temperature for a BLE device

Pack a temperature reading as a big-endian 16-bit integer for transmission to a Bluetooth Low Energy device.

{% example %}
template: |
  {{
    states("sensor.temperature") | float | round(0) | int
    | pack(">H") | base64_encode
  }}
type: string
output: "ABU="
{% endexample %}

### Pack a float value

Pack a floating-point number into its binary representation.

{% example %}
template: '{{ 3.14 | pack(">f") }}'
type: bytes
output: "b'@H\\xf5\\xc3'"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
