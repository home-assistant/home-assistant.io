---
title: "Get object attribute: attr"
function_name: "attr"
description: "Reads an attribute from an object when the attribute name comes from a variable."
available_as:
  - filter
category: collection
return_type: any
limited: true
since: "0.7"
related_functions:
  - state_attr
  - device_attr
  - map
---

The `attr` filter reads an attribute from an object by name, the same way a dot does. Writing `foo | attr("bar")` is exactly like writing `foo.bar`. The difference is that with `attr`, the attribute name can come from a variable or be built at the moment the template runs, instead of being written into the template as fixed text.

This is useful when you don't know in advance which attribute you need to read. You might store an attribute name in a variable and look it up on a state object, or loop over a list of attribute names and read each one in turn. For most everyday templates, a regular dot (`states.sensor.temperature.state`) is simpler and should be preferred.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ states.sensor.temperature | attr("state") }}'
type: string
output: "21.5"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
attr(
    value: Any,
    name: str,
) -> Any
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The object to read from. Most often a state object like `states.sensor.temperature`.
  required: true
  type: any
name:
  description: >
    The attribute to read, as text. Common values include `state`, `entity_id`, `last_changed`, `last_updated`, or any attribute your entity reports (for example, `brightness` on a light or `temperature` on a climate entity).
  required: true
  type: string
{% endfunction_parameters %}

## Using a variable name

Use a variable to decide which attribute to read from an object at runtime.

{% example %}
template: |
  {% set field = "state" %}
  {{ states.sensor.temperature | attr(field) }}
type: string
output: "21.5"
{% endexample %}

## Good to know

- This reads object attributes, not entity state attributes. For entity attributes, use [`state_attr`](/template-functions/state_attr/) instead.
- When the attribute does not exist, it produces an undefined value, which pairs well with [`| default(value)`](/template-functions/default/).

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Access entity attributes dynamically

Retrieve different attributes from an entity state object based on a variable.

{% example %}
template: |
  {% set prop = "last_changed" %}
  {{ states.light.living_room | attr(prop) }}
type: string
output: "2026-04-03 10:15:00+00:00"
{% endexample %}

### Iterate over multiple attributes

Loop over a list of attribute names and retrieve each one from a state object.

{% example %}
template: |
  {% set fields = ["entity_id", "state"] %}
  {% for field in fields %}
    {{ field }}: {{ states.sensor.temperature | attr(field) }}
  {% endfor %}
type: string
output: |
  entity_id: sensor.temperature
  state: 21.5
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
