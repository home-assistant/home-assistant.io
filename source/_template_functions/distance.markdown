---
title: "Calculate distance: distance"
function_name: "distance"
description: "Calculates the distance in kilometers between two points or from home."
available_as:
  - function
category: state
return_type: float
limited: false
since: "0.7"
related_functions:
  - closest
  - states
---

The `distance` template function calculates the distance in kilometers between two locations. If you only provide one location, it calculates the distance from your home to that point. Locations can be specified as {% term entity %} IDs (for entities with GPS coordinates), {% term zone %} names, or latitude/longitude pairs.

This is useful for proximity-based {% term automations %}. You could send a {% term notification %} when someone is within a certain distance of home, calculate driving distances between family members, or determine how far away an entity is from a specific zone. The result is a number in kilometers that you can use in {% term conditions %} and comparisons.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ distance("device_tracker.phone") }}'
type: float
output: 5.2
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
distance(
    *args: str | State | float,
) -> float | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
args:
  description: >
    One or two locations. A location is either a text identifier (an entity ID with GPS data, a zone name, or a state object) or two numbers in a row for latitude and longitude. Examples of valid calls: `distance("device_tracker.phone")` (distance from home to the entity), `distance(52.5, 13.4)` (distance from home to a lat/lon point), `distance("device_tracker.a", "device_tracker.b")` (distance between two entities), `distance("device_tracker.phone", 52.5, 13.4)` (distance between an entity and a lat/lon point).
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Returns `None` when any location lacks GPS coordinates, so guard your comparisons for missing data.
- The result is always in kilometers, regardless of the unit system configured in Home Assistant.
- With a single location argument, distance is measured from your Home Assistant home location.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Distance from home

Calculate how far a device tracker is from home.

{% example %}
template: '{{ distance("device_tracker.phone") | round(1) }}'
type: float
output: 5.2
{% endexample %}

### Distance between two entities

Calculate the distance between two people.

{% example %}
template: |
  {{
    distance("device_tracker.phone_a",
    "device_tracker.phone_b") | round(1)
  }}
type: float
output: 12.7
{% endexample %}

### Distance using coordinates

Calculate the distance from home to a specific latitude/longitude.

{% example %}
template: '{{ distance(52.5, 13.4) | round(1) }}'
type: float
output: 847.3
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
