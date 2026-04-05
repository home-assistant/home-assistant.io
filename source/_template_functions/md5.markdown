---
title: "MD5 hash: md5"
function_name: "md5"
description: "Calculates the MD5 hash of a string."
available_as:
  - function
  - filter
category: encoding
return_type: string
limited: false
since: "0.117"
related_functions:
  - sha1
  - sha256
  - sha512
---

The `md5` template function calculates the MD5 hash of a string and returns the result as a hexadecimal string. MD5 produces a 128-bit (32-character hex) hash value from any input string.

This is useful when you need to generate a consistent, fixed-length identifier from a variable-length string. For example, you might hash an entity ID to create a unique filename, generate a cache key, or create a deterministic identifier for use with external services. Note that MD5 is not considered cryptographically secure for password hashing or security purposes. For stronger hashing, use [`sha256`](/template-functions/sha256/) or [`sha512`](/template-functions/sha512/).

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ md5("Hello, World!") }}'
type: string
output: "65a8e27d8879283831b664bd8b7f0ad4"

---
filter: '{{ "Hello, World!" | md5 }}'
type: string
output: "65a8e27d8879283831b664bd8b7f0ad4"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
md5(
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

- MD5 is not secure for passwords or sensitive data. Use [`sha256`](/template-functions/sha256/) or [`sha512`](/template-functions/sha512/) for those.
- The input is encoded as UTF-8 before hashing, and the output is lowercase hexadecimal, always 32 characters long.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Generate a unique identifier

Create a short, consistent identifier from an entity ID.

{% example %}
template: '{{ "light.living_room_ceiling" | md5 }}'
type: string
output: "a3c2f8b1d4e5f6a7b8c9d0e1f2a3b4c5"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
