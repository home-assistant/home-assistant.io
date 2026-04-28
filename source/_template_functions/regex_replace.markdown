---
title: "Replace using a regex pattern: regex_replace"
function_name: "regex_replace"
description: "Replaces all occurrences of a regular expression pattern in a string."
available_as:
  - filter
category: regex
return_type: string
limited: true
since: "0.7"
related_functions:
  - regex_match
  - regex_search
  - regex_findall
  - regex_findall_index
---

The `regex_replace` template filter replaces all occurrences of a regular expression (regex) pattern in a string with a replacement value. A regular expression is a special text pattern that describes what you are looking for; `regex_replace` finds every part of the string that matches and swaps it out. This works like a find-and-replace tool, but with the power of patterns instead of fixed text.

This is useful when you need to clean up or transform text from {% term sensors %} and other sources. For example, you might want to strip unwanted characters from a sensor value, reformat a phone number, remove units from a measurement string so you can convert it to a number, or clean up device names for display on a dashboard.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "Hello 123 World 456" | regex_replace("\\d+", "N") }}'
type: string
output: Hello N World N
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
regex_replace(
    value: str,
    find: str = "",
    replace: str = "",
    ignorecase: bool = False,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string in which to perform the replacement.
  required: true
  type: string
find:
  description: >
    The regular expression pattern to search for. All matches will be replaced.
  required: true
  type: string
replace:
  description: >
    The string to replace each match with. Can be empty to remove matches entirely.
  required: true
  type: string
ignorecase:
  description: >
    Set to `true` to make the pattern matching case-insensitive.
  required: false
  default: "false"
  type: boolean
{% endfunction_parameters %}

## Removing matched text

Pass an empty string as the replacement to remove all matches from the string.

{% example %}
template: '{{ "Temperature: 23.5 C" | regex_replace("[^0-9.]", "") }}'
title: Strip everything except numbers and dots
type: string
output: "23.5"
{% endexample %}

## Case-insensitive replacement

Set `ignorecase` to `true` to match and replace regardless of upper or lowercase letters.

{% example %}
template: |
  {{
    "Error: DEVICE offline"
    | regex_replace("error", "Warning", ignorecase=true)
  }}
type: string
output: "Warning: DEVICE offline"
{% endexample %}

## Good to know

- Replaces every occurrence, not just the first one.
- Backreferences in the replacement use `\1`, `\2`, and so on, to refer to capturing groups from the pattern.
- Passing an empty replacement deletes every match from the string.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Strip units from a sensor value

Remove non-numeric characters from a sensor state so you can use it as a number.

{% example %}
template: |
  {{ states("sensor.wind_speed") | regex_replace("[^0-9.]", "") | float }}
type: float
output: "15.3"
{% endexample %}

### Clean up a device name for display

Remove unwanted prefixes or suffixes from a device name.

{% example %}
template: |
  {{
    "MQTT - Living Room Sensor [v2]"
    | regex_replace("^MQTT - ", "")
    | regex_replace("\\s*\\[.*\\]$", "")
  }}
type: string
output: Living Room Sensor
{% endexample %}

### Mask sensitive information

Replace digits in a phone number or account number for display purposes.

{% example %}
template: '{{ "+1-555-123-4567" | regex_replace("\\d(?=\\d{4})", "*") }}'
type: string
output: "+*-***-***-4567"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
