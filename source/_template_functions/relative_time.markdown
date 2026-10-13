---
title: "Relative time (deprecated): relative_time"
function_name: "relative_time"
description: "Returns a human-readable string describing how long ago a datetime was."
available_as:
  - function
  - filter
category: datetime
return_type: string
limited: false
since: "0.7"
deprecated_in_favor_of: "time_since"
related_functions:
  - time_since
  - time_until
  - now
  - as_datetime
---

The `relative_time` template function returns a human-readable string describing how long ago a {% term datetime %} occurred. Give it a datetime in the past, and it returns something like "2 hours" or "3 days".

This function has been deprecated in favor of [`time_since`](/template-functions/time_since/), which provides the same functionality with the added ability to control precision. You should use [`time_since`](/template-functions/time_since/) for all new {% term templates %}. `relative_time` remains available for backward compatibility, but may be removed in a future release.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ relative_time(states.binary_sensor.front_door.last_changed) }}'
type: string
output: "2 hours"

---
filter: '{{ states.binary_sensor.front_door.last_changed | relative_time }}'
type: string
output: "2 hours"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
relative_time(
    value: datetime,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    A datetime object representing a point in the past. The function calculates the time elapsed between this datetime and now.
  required: true
  type: datetime
{% endfunction_parameters %}

## Migrating to time_since

Replace `relative_time` with [`time_since`](/template-functions/time_since/) in your templates. The basic usage is identical:

{% example %}
template: '{{ time_since(states.binary_sensor.front_door.last_changed) }}'
title: Using time_since instead
type: string
output: "2 hours"
{% endexample %}

The advantage of [`time_since`](/template-functions/time_since/) is the optional precision parameter, which lets you control how many time components to include in the output:

{% example %}
template: '{{ time_since(states.binary_sensor.front_door.last_changed, 2) }}'
title: time_since with precision
type: string
output: "2 hours 30 minutes"
{% endexample %}

## Good to know

- Deprecated. Use [`time_since`](/template-functions/time_since/) for new templates, which supports a precision argument.
- Only returns the largest time unit. `"2 hours"` is given, not `"2 hours 15 minutes"`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Show how long ago something happened

Display the elapsed time since a sensor last changed {% term state %}.

{% example %}
template: |
  {{
    "Last updated "
    ~ relative_time(states.sensor.temperature.last_changed) ~ " ago"
  }}
type: string
output: "Last updated 45 minutes ago"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
