---
title: "Parse a version string: version"
function_name: "version"
description: "Converts a string into a version object that supports comparison operators."
available_as:
  - function
  - filter
category: functional
return_type: AwesomeVersion
limited: true
since: "2023.4"
related_functions:
  - states
---

The `version` template function converts a string into a version object that can be compared with other version objects. Instead of comparing version strings as plain text (where `9.0` would incorrectly sort after `10.0`), version objects understand semantic versioning and compare correctly.

This is useful when you have {% term devices %} or software that report their firmware or software version as a {% term sensor %} value. For example, you might want to check if a device's firmware is outdated, trigger an {% term automation %} when a new version is detected, or filter a list of devices by their version number. The version object handles common version formats like `1.2.3`, `2024.1.0`, and `1.0.0-beta`.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ version("2.1.0") > version("2.0.0") }}'
type: boolean
output: "true"

---
filter: '{{ "2.1.0" | version > "2.0.0" | version }}'
type: boolean
output: "true"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
version(
    value: str,
) -> AwesomeVersion
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The version string to parse. Supports common formats like `1.2.3`, `2024.1.0`, or `1.0-beta`.
  required: true
  type: string
{% endfunction_parameters %}

## Comparing versions

Version objects support all comparison operators. This is much safer than comparing version strings directly, because string comparison would consider `9.0` greater than `10.0`.

{% example %}
template: |
  {{ version("10.0") > version("9.0") }}
title: Correct version comparison
type: boolean
output: "true"
{% endexample %}

{% example %}
template: |
  {{ "10.0" > "9.0" }}
title: Incorrect string comparison
type: boolean
output: "false"
{% endexample %}

## Good to know

- Comparing two version objects returns a boolean. Comparing a version object with a plain string raises an error, so convert both sides first.
- Version parsing is lenient. Unusual formats may parse in ways you do not expect, so test your comparisons against real values.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check if firmware is up to date

Compare a device's current firmware version against the minimum required version.

{% example %}
template: |
  {% set current = states("sensor.device_firmware") | version %}
  {% set required = version("3.2.0") %}
  {% if current >= required %}
    Firmware is up to date
  {% else %}
    Firmware update required
  {% endif %}
type: string
output: "Firmware is up to date"
{% endexample %}

### Notify on version change

Detect whether a software version has increased, which could indicate an update was installed.

{% example %}
template: |
  {{ version("2024.4.0") > version("2024.3.1") }}
title: Check for newer version
type: boolean
output: "true"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
