---
title: "Unpack bytes to value: unpack"
function_name: "unpack"
description: "Unpacks bytes into a value using a Python struct format string."
available_as:
  - function
  - filter
category: encoding
return_type: any
limited: true
since: "2023.4"
related_functions:
  - pack
  - from_hex
  - base64_decode
---

The `unpack` template function converts bytes into a native Python value using a struct format string. This is the reverse of [`pack`](/template-functions/pack/) and works like Python's `struct.unpack_from` function, extracting a single value from a byte sequence according to the specified format.

This function is primarily useful for IoT and low-level device communication. Many IoT {% term devices %} send data as raw bytes that need to be interpreted according to a specific format. For example, a Bluetooth {% term sensor %} might send temperature as a 16-bit big-endian integer, or an MQTT-connected microcontroller might report values in a packed binary format. The optional `offset` parameter lets you skip bytes at the beginning of the data, which is useful when the value you need is not at the start of the byte sequence. The format strings follow [Python's struct module syntax](https://docs.python.org/3/library/struct.html#format-characters).

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ unpack(b"\x04\xd2", ">H") }}'
type: integer
output: "1234"

---
filter: '{{ b"\x04\xd2" | unpack(">H") }}'
type: integer
output: "1234"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
unpack(
    value: bytes,
    format_string: str,
    offset: int = 0,
) -> Any | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The bytes object to unpack. Must contain enough bytes for the specified format string.
  required: true
  type: string
format_string:
  description: >
    A Python struct format string that describes how to interpret the bytes. Common formats include `>H` (big-endian unsigned short), `<i` (little-endian signed int), `>f` (big-endian float). See the [Python struct documentation](https://docs.python.org/3/library/struct.html#format-characters) for all options.
  required: true
  type: string
offset:
  description: >
    The number of bytes to skip from the beginning of the data before unpacking. Defaults to `0` (start at the beginning).
  required: false
  default: "0"
  type: integer
{% endfunction_parameters %}

## Using an offset

When the value you need is embedded within a larger byte sequence, use the `offset` parameter to skip to the right position.

{% example %}
template: '{{ b"\x00\x00\x04\xd2" | unpack(">H", offset=2) }}'
type: integer
output: "1234"
{% endexample %}

## Good to know

- Only unpacks a single value. If your format string describes multiple fields, only the first is returned. Call `unpack` multiple times with different offsets when you need all of them.
- The byte sequence must contain enough bytes for the format string starting at `offset`, otherwise the function returns `None`.
- Format strings follow [Python's struct module syntax](https://docs.python.org/3/library/struct.html#format-characters), where `<` and `>` set little-endian or big-endian byte order.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Decode a BLE sensor reading

Decode a temperature value from a Bluetooth Low Energy sensor that sends data as base64-encoded big-endian bytes.

{% example %}
template: |
  {% set raw = states("sensor.ble_raw") | base64_decode(encoding=none) %}
  {{ raw | unpack(">h") / 100 }}
type: float
output: "21.5"
{% endexample %}

### Decode a hex-encoded sensor value

Combine [`from_hex`](/template-functions/from_hex/) with `unpack` to decode a hex string containing a packed integer.

{% example %}
template: '{{ "04d2" | from_hex | unpack(">H") }}'
type: integer
output: "1234"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
