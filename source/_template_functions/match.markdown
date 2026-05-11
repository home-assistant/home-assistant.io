---
title: "Test if string matches pattern: match"
function_name: "match"
description: "Template test that checks if a string matches a regular expression at the beginning."
available_as:
  - test
category: regex
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - search
  - regex_match
  - regex_search
---

The `match` template test checks whether a string matches a regular expression (regex) pattern at the beginning. A regular expression is a special text pattern that lets you describe what you are looking for, such as "starts with a number" or "begins with the word sensor". As a template test, it is used with the `is` keyword, making your templates read more naturally.

This is useful in conditions and {% jinja %}{% if %}{% endjinja %} blocks where you want to check if a value starts with a certain pattern. For example, you might test whether an entity ID begins with a particular domain, or whether a sensor value starts with a specific prefix. Because it is a test rather than a filter, it fits naturally into conditional expressions. It checks only the beginning of the string; use the [`search`](/template-functions/search/) test to look for a pattern anywhere.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if "light.living_room" is match("light\\.") %}
    It's a light entity
  {% endif %}
type: string
output: "It's a light entity"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
match(
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

## Match vs search test

The `match` test only checks the **beginning** of the string. Use the [`search`](/template-functions/search/) test to find a pattern **anywhere** in the string.

{% example %}
template: |
  {{ "Room: Living Room" is match("Living") }}
  {{ "Room: Living Room" is search("Living") }}
title: "match checks the start, search checks anywhere"
type: boolean
output: |
  false
  true
{% endexample %}

## Good to know

- Only checks the start of the string. Use [`search`](/template-functions/search/) when the pattern can appear anywhere.
- A literal dot (`.`) in the pattern must be escaped with a backslash, since `.` matches any character in regex.
- Case-sensitive by default. Pass `ignorecase=true` to match regardless of case.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Filter entities by domain in a loop

Use `match` inside a loop to select only entities from a specific domain.

{% example %}
template: |
  {% for entity in states if entity.entity_id is match("binary_sensor\\.") %}
    {{ entity.entity_id }}
  {% endfor %}
{% endexample %}

### Conditional automation based on entity pattern

Check if a triggering entity belongs to a specific domain using the `match` test in a condition.

{% example %}
template: |
  {% if trigger.entity_id is match("sensor\\.temperature_") %}
    Temperature sensor triggered: {{ trigger.entity_id }}
  {% endif %}
type: string
output: "Temperature sensor triggered: sensor.temperature_living_room"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
