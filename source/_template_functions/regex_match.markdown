---
title: "Match a regex pattern: regex_match"
function_name: "regex_match"
description: "Tests if a string matches a regular expression pattern at the beginning."
available_as:
  - filter
category: regex
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - regex_search
  - regex_replace
  - regex_findall
  - regex_findall_index
  - match
---

The `regex_match` template filter tests whether a string matches a regular expression (regex) pattern at the beginning of the string. A regular expression is a special text pattern that lets you describe what you are looking for, for example "any number" or "a word followed by a space". It returns `true` if the beginning of the string matches the pattern, and `false` otherwise.

This is useful when you need to check whether a sensor value, entity ID, or other text starts with a specific pattern. For example, you might want to verify that a sensor value looks like a valid IP address, check if an entity ID starts with a certain prefix, or validate that an input follows an expected format. Because it only checks from the start of the string, use [`regex_search`](/template-functions/regex_search/) if you need to find a pattern anywhere in the text.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "light.living_room" | regex_match("light\\.") }}'
type: boolean
output: "true"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
regex_match(
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
    The string to test against the regex pattern.
  required: true
  type: string
find:
  description: >
    The regular expression pattern to match at the beginning of the string.
  required: true
  type: string
ignorecase:
  description: >
    Set to `true` to make the match case-insensitive.
  required: false
  default: "false"
  type: boolean
{% endfunction_parameters %}

## Match vs search

`regex_match` only checks if the pattern matches at the **beginning** of the string. If you need to find a pattern **anywhere** in the string, use [`regex_search`](/template-functions/regex_search/) instead.

{% example %}
template: |
  {{ "Room: Living Room" | regex_match("Living") }}
  {{ "Room: Living Room" | regex_search("Living") }}
title: "match checks the start, search checks anywhere"
type: boolean
output: |
  false
  true
{% endexample %}

## Case-insensitive matching

Set `ignorecase` to `true` to match regardless of upper or lowercase letters.

{% example %}
template: '{{ "Light.living_room" | regex_match("light", ignorecase=true) }}'
type: boolean
output: "true"
{% endexample %}

## Good to know

- Only checks the start of the string. Use [`regex_search`](/template-functions/regex_search/) to match anywhere.
- A literal dot (`.`) must be escaped as `\.` because `.` matches any character in regex.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check if an entity ID belongs to a domain

Verify that an entity ID starts with a specific domain prefix.

{% example %}
template: |
  {% set entity = "sensor.outdoor_temperature" %}
  {% if entity | regex_match("sensor\\.") %}
    This is a sensor entity
  {% endif %}
type: string
output: "This is a sensor entity"
{% endexample %}

### Validate a sensor value format

Check if a sensor value looks like a valid number with optional decimal point.

{% example %}
template: '{{ states("sensor.temperature") | regex_match("^-?\\d+\\.?\\d*$") }}'
type: boolean
output: "true"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
