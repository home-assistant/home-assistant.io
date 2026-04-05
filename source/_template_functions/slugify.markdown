---
title: "Convert to slug format: slugify"
function_name: "slugify"
description: "Converts a string to a slug format with an optional separator character."
available_as:
  - function
  - filter
category: strings
return_type: string
limited: true
since: "0.117"
related_functions:
  - urlencode
  - ordinal
---

The `slugify` template function converts a string into a slug format, which is a URL-friendly, lowercase version of the text with special characters removed and spaces replaced by a separator. By default it uses underscores as the separator, but you can choose any character you like, such as a hyphen.

Slugs are the format Home Assistant uses for {% term entity %} IDs, so this function is handy whenever you need to build or match entity IDs dynamically. For example, you might want to turn a room name from a sensor into an entity ID format, or create consistent naming for use in {% term automations %} and {% term scripts %}. It is also useful when generating filenames or identifiers that should not contain spaces or special characters.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ slugify("Hello World!") }}'
type: string
output: hello_world

---
filter: '{{ "Hello World!" | slugify }}'
type: string
output: hello_world
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
slugify(
    value: str,
    separator: str = "_",
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to convert into a slug. Special characters are removed, spaces are replaced by the separator, and the result is lowercased.
  required: true
  type: string
separator:
  description: >
    The character to use between words. Defaults to an underscore (`_`).
  required: false
  default: '"_"'
  type: string
{% endfunction_parameters %}

## Using a custom separator

You can use a hyphen or any other character as the separator instead of the default underscore.

{% example %}
template: '{{ slugify("Living Room Light", "-") }}'
title: Using a hyphen separator
type: string
output: living-room-light
{% endexample %}

## Good to know

- The default separator is an underscore, which matches the Home Assistant entity ID format.
- The result is always lowercase, regardless of the input case.
- Accented characters are stripped to plain ASCII equivalents where possible.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Build an entity ID from a room name

Turn a human-readable room name into an entity ID format that can be used to look up {% term entities %}.

{% example %}
template: '{{ "light." ~ slugify("Kitchen Ceiling") }}'
type: string
output: light.kitchen_ceiling
{% endexample %}

### Create a consistent identifier from user input

When processing input from a text helper or other source, convert it to a clean slug for use in templates.

{% example %}
template: |
  {% set room = states("input_text.room_name") %}
  sensor.temperature_{{ slugify(room) }}
type: string
output: sensor.temperature_living_room
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
