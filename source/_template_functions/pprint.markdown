---
title: "Pretty-print a value: pprint"
function_name: "pprint"
description: "Pretty-prints a value in a readable format, useful for debugging templates."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - to_json
  - typeof
---

The `pprint` filter formats a value in a human-readable way, making it easier to inspect complex data structures like dictionaries and lists.
This is primarily useful for debugging templates. It helps you understand the structure of data returned by a {% term sensor %} or another template function. If the value is longer than 80 characters, `pprint` spreads it over several lines where it can, for example, between the items of a list or a dictionary. Shorter values stay on one line. A long string without spaces also stays on one line.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ {"name": "Living Room", "temperature": 22.5} | pprint }}'
type: string
output: "{'name': 'Living Room', 'temperature': 22.5}"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
pprint(
    value: Any,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to pretty-print. Works with any data type including dictionaries, lists, strings, and numbers.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- The output is intended for debugging. For structured data you plan to use elsewhere, use [`to_json`](/template-functions/to_json/).
- The keys of a dictionary are sorted alphabetically.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Inspect entity attributes

View all attributes of an entity in a readable format for debugging.

{% example %}
template: '{{ state_attr("climate.living_room", "hvac_modes") | pprint }}'
type: string
output: "['off', 'heat', 'cool', 'auto']"
{% endexample %}

### Debug a complex data structure

Pretty-print a nested dictionary to understand its structure.

{% example %}
template: |
  {{
    {"rooms": {"living_room": {"temp": 22}, "bedroom": {"temp": 19}}}
    | pprint
  }}
type: string
output: "{'rooms': {'bedroom': {'temp': 19}, 'living_room': {'temp': 22}}}"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
