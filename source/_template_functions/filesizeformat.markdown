---
title: "Format byte size as human-readable: filesizeformat"
function_name: "filesizeformat"
description: "Formats a byte count as a human-readable file size string like 1.2 MB."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - float
  - round
---

The `filesizeformat` filter converts a number of bytes into a human-readable file size string, such as `13.2 kB` or `4.1 MB`. It automatically chooses the appropriate unit (bytes, kB, MB, GB, and larger). By default, it uses decimal (SI) units (1 kB = 1000 bytes), but you can switch to binary units (1 KiB = 1024 bytes) with the `binary` parameter.
This is useful when displaying storage-related information from {% term sensors %}, such as disk usage, download sizes, or memory consumption. For example, a {% term sensor %} might report a value in bytes, and you can use this filter to display it in a more readable format on a dashboard card or in a notification.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ 1234567890 | filesizeformat }}'
type: string
output: "1.2 GB"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
filesizeformat(
    value: int | float,
    binary: bool = False,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The number of bytes to format as a human-readable file size.
  required: true
  type: integer
binary:
  description: >
    If `true`, uses binary units (KiB, MiB, GiB) where 1 KiB = 1024 bytes. If `false` (the default), uses decimal units (kB, MB, GB) where 1 kB = 1000 bytes.
  required: false
  default: "false"
  type: boolean
{% endfunction_parameters %}

## Using binary units

Set `binary` to `true` to use binary (IEC) units instead of decimal (SI) units.

{% example %}
template: '{{ 1048576 | filesizeformat(binary=true) }}'
title: Display as binary file size
type: string
output: "1.0 MiB"
{% endexample %}

## Good to know

- The default is decimal units (1 kB = 1000 bytes), not binary. Pass `binary=true` for KiB/MiB/GiB.
- The input must be a number of bytes. Convert state strings with [`int`](/template-functions/int/) or [`float`](/template-functions/float/) first.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Display disk usage from a sensor

Format a disk usage sensor value that reports bytes into a readable size.

{% example %}
template: '{{ states("sensor.disk_used") | int | filesizeformat }}'
type: string
output: "42.3 GB"
{% endexample %}

### Show download size in a notification

Format a file size for display in a notification message.

{% example %}
template: |
  {{
    "Update available: "
    ~ (states("sensor.update_size") | int | filesizeformat)
  }}
type: string
output: "Update available: 156.2 MB"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
