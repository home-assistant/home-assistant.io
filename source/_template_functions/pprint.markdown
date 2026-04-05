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
This is primarily useful for debugging templates. When you are trying to understand the structure of data returned by a {% term sensor %} or another template function, piping the value through `pprint` displays it in a nicely formatted, indented layout. This makes it much easier to read than the default single-line representation.

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
    verbose: bool = False,
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
verbose:
  description: >
    If `true`, includes additional type information in the output. Defaults to `false`.
  required: false
  default: "false"
  type: boolean
{% endfunction_parameters %}

## Good to know

- The output is intended for debugging. For structured data you plan to use elsewhere, use [`to_json`](/template-functions/to_json/).
- With `verbose=true`, the output also includes the Python type name, which can help identify unexpected types.

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
