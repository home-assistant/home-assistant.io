---
title: "Test if string contains pattern: search"
function_name: "search"
description: "Template test that checks if a string contains a regular expression pattern anywhere."
available_as:
  - test
category: regex
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - match
  - regex_search
  - regex_match
---

The `search` template test checks whether a string contains a regular expression (regex) pattern anywhere within it. A regular expression is a special text pattern that lets you describe what you are looking for, such as "any number" or "the word offline". As a template test, it is used with the `is` keyword, making your templates read like natural language.

This is useful in conditions and {% jinja %}{% if %}{% endjinja %} blocks where you want to check if a value contains a certain pattern. For example, you might test whether a sensor's state contains the word "error", whether a notification message includes a phone number, or whether a device attribute mentions a particular model. Unlike the [`match`](/template-functions/match/) test, which only checks the beginning of the string, `search` scans the entire string for the pattern.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if "Temperature is 23.5 degrees" is search("\\d+\\.\\d+") %}
    Contains a decimal number
  {% endif %}
type: string
output: "Contains a decimal number"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
search(
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

## Good to know

- Returns `true` or `false` only. Use [`regex_findall`](/template-functions/regex_findall/) to get the matched substrings.
- Case-sensitive by default. Pass `ignorecase=true` to match regardless of case.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check if a state contains a keyword

Test whether a sensor's state text contains a specific word, regardless of case.

{% example %}
template: |
  {% if states("sensor.system_status") is search("offline", ignorecase=true) %}
    System is offline!
  {% endif %}
type: string
output: "System is offline!"
{% endexample %}

### Filter entities with a pattern in their state

Use the `search` test to find entities whose state contains a particular pattern.

{% example %}
template: |
  {% for entity in states.sensor
    if entity.state is search("error|fault|fail", ignorecase=true) %}
    {{ entity.entity_id }}: {{ entity.state }}
  {% endfor %}
{% endexample %}

### Check for a numeric value in text

Test whether a text-based sensor state includes any number.

{% example %}
template: |
  {% if states("sensor.status_message") is search("\\d+") %}
    Status contains a number
  {% else %}
    Status is text only
  {% endif %}
type: string
output: "Status contains a number"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
