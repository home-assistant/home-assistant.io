---
title: "Search for a regex pattern: regex_search"
function_name: "regex_search"
description: "Searches for a regular expression pattern anywhere in a string."
available_as:
  - filter
category: regex
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - regex_match
  - regex_replace
  - regex_findall
  - regex_findall_index
  - search
---

The `regex_search` template filter searches for a regular expression (regex) pattern anywhere in a string. A regular expression is a special text pattern that describes what you are looking for, such as "a sequence of digits" or "the word error". It returns `true` if the pattern is found anywhere in the string, and `false` otherwise.

This is useful when you need to check whether some text contains a particular pattern, regardless of where it appears. For example, you might want to check if a sensor's state contains a number, see if an error message mentions a specific keyword, or test whether a device's firmware version string includes a certain format. Unlike [`regex_match`](/template-functions/regex_match/), which only checks the beginning of the string, `regex_search` scans the entire string.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "Temperature is 23.5 degrees" | regex_search("\\d+\\.\\d+") }}'
type: boolean
output: "true"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
regex_search(
    value: str,
    find: str = "",
    ignorecase: bool = False,
) -> bool
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to search within for the regex pattern.
  required: true
  type: string
find:
  description: >
    The regular expression pattern to search for anywhere in the string.
  required: true
  type: string
ignorecase:
  description: >
    Set to `true` to make the search case-insensitive.
  required: false
  default: "false"
  type: boolean
{% endfunction_parameters %}

## Case-insensitive searching

Set `ignorecase` to `true` to find matches regardless of upper or lowercase letters.

{% example %}
template: |
  {{ "Error: Device Offline" | regex_search("error", ignorecase=true) }}
type: boolean
output: "true"
{% endexample %}

## Good to know

- Returns `true` or `false`, not the matched text. Use [`regex_findall`](/template-functions/regex_findall/) to extract the match.
- Matches anywhere in the string. Use [`regex_match`](/template-functions/regex_match/) to require a match at the start.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check if a sensor value contains a number

Test whether a sensor state that returns text includes a numeric value.

{% example %}
template: '{{ states("sensor.status_message") | regex_search("\\d+") }}'
type: boolean
output: "true"
{% endexample %}

### Filter entities by pattern in state

Use `regex_search` in a condition to check if a sensor's state mentions a specific keyword.

{% example %}
template: |
  {% if states("sensor.weather_report")
     | regex_search("rain|storm|thunder", ignorecase=true) %}
    Bad weather expected
  {% else %}
    Weather looks fine
  {% endif %}
type: string
output: "Bad weather expected"
{% endexample %}

### Check for a version number format

Verify that a firmware version string contains a semantic version pattern.

{% example %}
template: '{{ "Firmware v2.4.1-beta" | regex_search("v\\d+\\.\\d+\\.\\d+") }}'
type: boolean
output: "true"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
