---
title: "Find closest entity: closest"
function_name: "closest"
description: "Finds the entity closest to a given location, home, or another entity."
available_as:
  - function
  - filter
category: state
return_type: State
limited: false
since: "0.7"
related_functions:
  - distance
  - states
  - expand
---

The `closest` template function finds the {% term entity %} that is geographically closest to a given location. By default, it compares against your home location, but you can also specify coordinates or another entity as the reference point.

This is useful for location-based {% term automations %}. For example, you could find out which family member is closest to home, which store is nearest to your current position, or which of your device trackers is closest to a specific {% term zone %}. The function returns a full state object, so you can access the entity's name, state, attributes, and ID.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ closest(states.device_tracker).name }}'
type: string
output: Phone
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
closest(
    *args: str | State | list,
) -> State | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
args:
  description: >
    Can be called in several ways. With just entities or groups, it finds the closest to home. With coordinates or a zone followed by entities, it finds the closest to that point. Returns a state object, or `None` if no entity has location data.
  required: true
  type: any
{% endfunction_parameters %}

## Different ways to call closest

Find closest to home:

{% example %}
template: '{{ closest(states.device_tracker).name }}'
title: Closest device tracker to home
type: string
output: Phone
{% endexample %}

Find closest to a specific zone:

{% example %}
template: '{{ closest("zone.work", states.device_tracker).name }}'
title: Closest device tracker to work
type: string
output: Tablet
{% endexample %}

Find closest to specific coordinates:

{% example %}
template: '{{ closest(52.5, 13.4, states.device_tracker).name }}'
title: Closest to coordinates
type: string
output: Phone
{% endexample %}

## Good to know

- Returns `None` when no entity has usable GPS coordinates, so check before accessing `.name` or other attributes.
- Only entities with latitude and longitude attributes are considered. Entities without coordinates are silently skipped.
- Returns a full state object, not just an entity ID or name.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Show who is closest to home and their distance

Combine `closest` with [`distance`](/template-functions/distance/) to show both who is nearest and how far away they are.

{% example %}
template: |
  {% set nearest = closest(states.person) %}
  {{ nearest.name }} is closest at
  {{ distance(nearest) | round(1) }} km away
type: string
output: Paulus is closest at 2.3 km away
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
