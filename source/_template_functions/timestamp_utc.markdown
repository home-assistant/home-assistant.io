---
title: "Format timestamp as UTC time: timestamp_utc"
function_name: "timestamp_utc"
description: "Formats a UNIX timestamp as a UTC datetime string."
available_as:
  - filter
category: datetime
return_type: string
limited: true
since: "0.7"
related_functions:
  - timestamp_local
  - timestamp_custom
  - as_timestamp
  - utcnow
---

The `timestamp_utc` filter formats a UNIX timestamp as a datetime string in UTC (Coordinated Universal Time). It returns the date and time in the standard ISO-like format, without any local time zone conversion.

This is useful when you need to display or log times in UTC, share timestamps with external services that expect UTC, or compare times across different time zones without ambiguity. If you want the local time representation instead, use [`timestamp_local`](/template-functions/timestamp_local/). If you need a custom format, use [`timestamp_custom`](/template-functions/timestamp_custom/) with the local_time parameter set to `false`.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ 1710510600 | timestamp_utc }}'
type: string
output: "2024-03-15 13:30:00+00:00"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
value | timestamp_utc(
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
template: '{{ "invalid" | float(0) | timestamp_utc(default="unknown") }}'
type: string
output: "unknown"
{% endexample %}

## Good to know

- The input must be a UNIX timestamp (a number of seconds). Pass a datetime object through [`as_timestamp`](/template-functions/as_timestamp/) first.
- The result is a string, not a datetime object.
- Without a `default`, the filter raises an error for non-numeric inputs.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Display a sensor timestamp in UTC

Convert the last changed timestamp of an entity to a UTC datetime string.

{% example %}
template: |
  {{ as_timestamp(states.sensor.temperature.last_changed) | timestamp_utc }}
type: string
output: "2024-03-15 13:30:00+00:00"
{% endexample %}

### Compare local and UTC representations

Display the same timestamp in both local and UTC format to see the difference.

{% example %}
template: |
  {% set ts = as_timestamp(now()) %}
  Local: {{ ts | timestamp_local }}
  UTC: {{ ts | timestamp_utc }}
type: string
output: |
  Local: 2024-03-15 14:30:00+01:00
  UTC: 2024-03-15 13:30:00+00:00
{% endexample %}

### Log an event time in UTC

Use UTC timestamps in {% term automations %} for consistent logging regardless of time zone.

{% example %}
action: |
  action:
    - action: notify.log
      data:
        message: >
          Event occurred at
          {{ as_timestamp(now()) | timestamp_utc }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
