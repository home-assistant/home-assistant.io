---
title: "Merge dictionaries: combine"
function_name: "combine"
description: "Merges multiple dictionaries into one."
available_as:
  - function
  - filter
category: collection
return_type: dict
limited: true
since: "2022.10"
related_functions:
  - to_json
  - from_json
  - merge_response
---

The `combine` template function merges multiple dictionaries into a single dictionary. When the same key appears in more than one dictionary, the value from the last dictionary wins. This lets you build up complex data structures by combining smaller pieces.

This is useful when you need to assemble data from multiple sources into a single dictionary. For example, you might want to combine default settings with overrides, merge attributes from several {% term entities %} into one payload, or build up a notification data dictionary from multiple parts. The optional `recursive` parameter enables deep merging, where nested dictionaries are merged rather than replaced, which is helpful when working with deeply structured data.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ combine({"a": 1}, {"b": 2}, {"c": 3}) }}'
type: dict
output: "{'a': 1, 'b': 2, 'c': 3}"

---
filter: '{{ {"a": 1} | combine({"b": 2}) }}'
type: dict
output: "{'a': 1, 'b': 2}"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
combine(
    *args: dict,
    recursive: bool = False,
) -> dict
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
args:
  description: >
    One or more dictionaries to merge. When keys overlap, later dictionaries take precedence.
  required: true
  type: map
recursive:
  description: >
    If `true`, nested dictionaries are merged recursively instead of being replaced. Defaults to `false`.
  required: false
  default: "false"
  type: boolean
{% endfunction_parameters %}

## Key overlap behavior

When the same key appears in multiple dictionaries, the value from the last dictionary wins.

{% example %}
template: '{{ combine({"color": "red", "size": "large"}, {"color": "blue"}) }}'
type: dict
output: "{'color': 'blue', 'size': 'large'}"
{% endexample %}

## Recursive merging

With `recursive=true`, nested dictionaries are merged together instead of one replacing the other.

{% example %}
template: |
  {{
    combine(
      {"settings": {"brightness": 100, "color": "warm"}},
      {"settings": {"color": "cool", "mode": "auto"}},
      recursive=true
    )
  }}
type: dict
output: "{'settings': {'brightness': 100, 'color': 'cool', 'mode': 'auto'}}"
{% endexample %}

## Good to know

- When the same key appears in multiple dictionaries, the value from the later dictionary wins.
- Without `recursive=true`, nested dictionaries are replaced outright, not merged.
- The original dictionaries are not modified; a new dictionary is returned.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Build a notification payload

Combine default notification settings with dynamic content.

{% example %}
action: |
  action:
    - action: notify.mobile
      data: >
        {{
          combine(
            {"title": "Home Assistant", "priority": "normal"},
            {"message": "Front door is " ~ states("binary_sensor.front_door")}
          )
        }}
{% endexample %}

### Merge settings with overrides

Start with default settings and override specific values.

{% example %}
template: |
  {% set defaults = {"mode": "auto", "brightness": 128, "color_temp": 300} %}
  {% set overrides = {"brightness": 255} %}
  {{ combine(defaults, overrides) }}
type: dict
output: "{'mode': 'auto', 'brightness': 255, 'color_temp': 300}"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
