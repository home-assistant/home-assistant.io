---
title: "Format timestamp as local time: timestamp_local"
function_name: "timestamp_local"
description: "Formats a UNIX timestamp as a local datetime string."
available_as:
  - filter
category: datetime
return_type: string
limited: true
since: "0.7"
related_functions:
  - timestamp_utc
  - timestamp_custom
  - as_timestamp
  - as_local
---

The `timestamp_local` filter formats a UNIX timestamp as a datetime string in your local time zone. It returns the date and time in the standard ISO-like format, automatically converting from UTC to the time zone configured in Home Assistant.

This is a quick way to turn a UNIX timestamp into a readable local date and time without needing to specify a format string. If you need a custom format, use [`timestamp_custom`](/template-functions/timestamp_custom/) instead. If you want the UTC representation, use [`timestamp_utc`](/template-functions/timestamp_utc/). This filter is particularly useful for displaying sensor attributes or API responses that provide times as UNIX timestamps.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ 1710510600 | timestamp_local }}'
type: string
output: "2024-03-15 14:30:00+01:00"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
value | timestamp_local(
    default: Any = None,
) -> str | Any
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
default:
  description: >
    Value to return if the formatting fails. If not provided, an error is raised on invalid input.
  required: false
  type: any
{% endfunction_parameters %}

## Using a default value

If the input might not be a valid timestamp, provide a default to avoid errors.

{% example %}
template: '{{ "invalid" | float(0) | timestamp_local(default="unknown") }}'
type: string
output: "unknown"
{% endexample %}

## Good to know

- The input must be a UNIX timestamp (a number of seconds). Pass a datetime object through [`as_timestamp`](/template-functions/as_timestamp/) first.
- The result is a string, not a datetime object. To do datetime math, use [`as_local`](/template-functions/as_local/) instead.
- Without a `default`, the filter raises an error for non-numeric inputs.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Display a sensor's last changed time

Convert the last changed timestamp of an entity to a readable local time string.

{% example %}
template: |
  {{ as_timestamp(states.sensor.temperature.last_changed) | timestamp_local }}
type: string
output: "2024-03-15 14:30:00+01:00"
{% endexample %}

### Show the current time as a formatted string

Convert the current UNIX timestamp to a local datetime string.

{% example %}
template: '{{ as_timestamp(now()) | timestamp_local }}'
type: string
output: "2024-03-15 14:30:00+01:00"
{% endexample %}

### Use in a notification

Include a formatted local timestamp in a {% term notification %} message.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          Motion detected at
          {{
            as_timestamp(states.binary_sensor.motion.last_changed)
            | timestamp_local
          }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
