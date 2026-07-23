---
title: "Replace occurrences in a string: replace"
function_name: "replace"
description: "Replaces all occurrences of a substring with another string."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - regex_replace
  - trim
  - striptags
---

The `replace` filter replaces all occurrences of a substring within a string with a new value. You can optionally limit the number of replacements.
This is useful when you need to clean up or transform text from {% term sensors %} and other sources. For example, you might want to remove units from a sensor value, replace underscores with spaces for a friendlier display name, or substitute specific words in a message before sending a notification.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "Hello World" | replace("World", "Home Assistant") }}'
type: string
output: Hello Home Assistant
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
replace(
    value: str,
    old: str,
    new: str,
    count: int | None = None,
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
old:
  description: >
    The substring to search for.
  required: true
  type: string
new:
  description: >
    The string to replace each occurrence with.
  required: true
  type: string
count:
  description: >
    The maximum number of replacements to make. If not provided, all occurrences are replaced.
  required: false
  type: integer
{% endfunction_parameters %}

## Limiting the number of replacements

Pass a `count` to only replace the first N occurrences.

{% example %}
template: '{{ "a-b-c-d" | replace("-", " ", 2) }}'
title: Replace only the first two hyphens
type: string
output: "a b c-d"
{% endexample %}

## Good to know

- Replaces every occurrence by default. Pass a `count` to limit the number of replacements.
- Only matches literal text. For patterns, use [`regex_replace`](/template-functions/regex_replace/).
- Case-sensitive. `"ON"` does not match `"on"`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Make an entity ID more readable

Replace underscores with spaces to create a friendly name from an entity ID.

{% example %}
template: '{{ "living_room_temperature" | replace("_", " ") | title }}'
type: string
output: Living Room Temperature
{% endexample %}

### Remove unwanted text from a sensor value

Strip a unit suffix from a sensor state so it can be processed as a number.

{% example %}
template: '{{ "23.5 °C" | replace(" °C", "") | float }}'
type: float
output: "23.5"
{% endexample %}

### Clean up a notification message

Replace placeholder text in a message template.

{% example %}
template: '{{ "Welcome home, {name}!" | replace("{name}", "Alice") }}'
type: string
output: "Welcome home, Alice!"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
