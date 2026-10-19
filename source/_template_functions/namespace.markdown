---
title: "Create a mutable namespace: namespace"
function_name: "namespace"
description: "Creates a mutable namespace object for storing variables across loop scopes in templates."
available_as:
  - function
category: functional
return_type: namespace
limited: true
since: "0.7"
related_functions:
  - range
  - iif
---

When you try to count something inside a `for` loop or track a running total, you quickly hit a wall: variables changed inside the loop do not survive outside of it. The `namespace` template function solves this. It creates a special object whose attributes you can modify from any scope, so your counter, total, or tracker keeps its value after the loop ends.

This is one of the most important functions to understand when writing Home Assistant templates that involve loops. Without `namespace`, you cannot accumulate a total, track a maximum, or build a result inside a `for` loop and use it afterward. You create a namespace with initial values like `namespace(count=0, total=0)`, then modify its attributes with `{% set ns.count = ns.count + 1 %}` inside the loop. The changes persist after the loop ends.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: |
  {% set ns = namespace(counter=0) %}
  {% for i in range(3) %}
    {% set ns.counter = ns.counter + 1 %}
  {% endfor %}
  {{ ns.counter }}
type: integer
output: "3"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
namespace(
    **kwargs: Any,
) -> Namespace
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
kwargs:
  description: >
    Any number of keyword arguments that become attributes on the namespace object. For example, `namespace(total=0, name="")` creates a namespace with a `total` attribute set to `0` and a `name` attribute set to an empty string.
  required: false
  type: any
{% endfunction_parameters %}

## Why namespace is needed

Without a namespace, variables set inside a loop do not persist outside the loop. This is a common source of confusion.

{% example %}
template: |
  {# This does NOT work as expected #}
  {% set count = 0 %}
  {% for i in range(3) %}
    {% set count = count + 1 %}
  {% endfor %}
  {{ count }}
title: Without namespace (broken)
type: integer
output: "0"
{% endexample %}

{% example %}
template: |
  {# This works correctly with namespace #}
  {% set ns = namespace(count=0) %}
  {% for i in range(3) %}
    {% set ns.count = ns.count + 1 %}
  {% endfor %}
  {{ ns.count }}
title: With namespace (correct)
type: integer
output: "3"
{% endexample %}

## Good to know

- Without a namespace, a `{% set %}` inside a loop does not persist outside of it. This is the main reason to reach for this function.
- Access attributes with dot notation (`ns.count`), and update them with `{% set ns.count = ... %}`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Sum energy consumption across entities

Accumulate a total from multiple {% term sensors %} inside a loop.

{% example %}
template: |
  {% set ns = namespace(total=0) %}
  {% for entity in states.sensor
    | selectattr("attributes.device_class", "eq", "energy")
    | list %}
    {% set ns.total = ns.total + entity.state | float(0) %}
  {% endfor %}
  {{ ns.total | round(1) }} kWh
type: string
output: "47.3 kWh"
{% endexample %}

### Find the hottest room

Track the maximum temperature and which room it belongs to.

{% example %}
template: |
  {% set ns = namespace(max_temp=-999, room="unknown") %}
  {% for sensor in states.sensor
    | selectattr("attributes.device_class", "eq", "temperature")
    | list %}
    {% if sensor.state | float(0) > ns.max_temp %}
      {% set ns.max_temp = sensor.state | float(0) %}
      {% set ns.room = sensor.name %}
    {% endif %}
  {% endfor %}
  {{ ns.room }}: {{ ns.max_temp }}°C
type: string
output: "Kitchen: 23.5°C"
{% endexample %}

### Build a comma-separated list of active lights

Collect names of lights that are on into a single string.

{% example %}
template: |
  {% set ns = namespace(names=[]) %}
  {% for light in states.light | selectattr("state", "eq", "on") | list %}
    {% set ns.names = ns.names + [light.name] %}
  {% endfor %}
  {{ ns.names | join(", ") }}
type: string
output: "Living Room, Kitchen, Hallway"
{% endexample %}

### Count entities matching a condition

Count how many doors are currently open using a namespace counter.

{% example %}
template: |
  {% set ns = namespace(open=0) %}
  {% for entity in states.binary_sensor
    | selectattr("attributes.device_class", "eq", "door")
    | selectattr("state", "eq", "on")
    | list %}
    {% set ns.open = ns.open + 1 %}
  {% endfor %}
  {{ ns.open }} door{{ "s" if ns.open != 1 }} open
type: string
output: "2 doors open"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
