---
title: "SHA1 hash: sha1"
function_name: "sha1"
description: "Calculates the SHA1 hash of a string."
available_as:
  - function
  - filter
category: encoding
return_type: string
limited: false
since: "0.117"
related_functions:
  - md5
  - sha256
  - sha512
---

The `sha1` template function calculates the SHA1 hash of a string and returns the result as a hexadecimal string. SHA1 produces a 160-bit (40-character hex) hash value from any input string.

This is useful when you need a longer hash than MD5 for generating identifiers or checksums. SHA1 provides a 40-character hex output compared to MD5's 32 characters. Like MD5, it is not recommended for security-sensitive purposes. For cryptographic use cases, prefer [`sha256`](/template-functions/sha256/) or [`sha512`](/template-functions/sha512/).

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ sha1("Hello, World!") }}'
type: string
output: "0a0a9f2a6772942557ab5355d76af442f8f65e01"

---
filter: '{{ "Hello, World!" | sha1 }}'
type: string
output: "0a0a9f2a6772942557ab5355d76af442f8f65e01"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
sha1(
    value: str,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to hash. The string is encoded to UTF-8 before hashing.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- SHA1 is no longer considered secure for cryptographic use. Prefer [`sha256`](/template-functions/sha256/) or [`sha512`](/template-functions/sha512/) for anything sensitive.
- The result is always a 40-character lowercase hexadecimal string.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Generate a unique identifier

Create a consistent identifier from a combination of entity ID and date.

{% example %}
template: '{{ sha1("sensor.temperature_" ~ now().date() | string) }}'
type: string
output: "b2e5f8a1c3d4e6f7a8b9c0d1e2f3a4b5c6d7e8f9"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
