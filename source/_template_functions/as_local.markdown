---
title: "Convert to local time zone: as_local"
function_name: "as_local"
description: "Converts a datetime object to your local time zone."
available_as:
  - function
  - filter
category: datetime
return_type: datetime
limited: true
since: "0.7"
related_functions:
  - now
  - utcnow
  - as_datetime
  - as_timestamp
---

The `as_local` template function converts a {% term datetime %} object to your local time zone, as configured in Home Assistant. If you have a datetime in UTC or any other time zone, `as_local` shifts it to your local time so it displays correctly for you.

Many {% term entities %} in Home Assistant store their timestamps in UTC. When you display these values on a dashboard or use them in a {% term notification %}, you usually want to show the time as it appears on your clock, not in UTC. `as_local` handles this conversion. For example, if a sensor reports its last update as 13:30 UTC and you live in CET (UTC+1), `as_local` converts it to 14:30. It also correctly handles daylight saving time changes.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ as_local(utcnow()) }}'
type: datetime
output: "2024-03-15 14:30:00.123456+01:00"

---
filter: '{{ utcnow() | as_local }}'
type: datetime
output: "2024-03-15 14:30:00.123456+01:00"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
as_local(
    value: datetime,
) -> datetime
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The datetime object to convert to the local time zone. Must be a datetime object, not a string. Use [`as_datetime`](/template-functions/as_datetime/) first if you have a string.
  required: true
  type: datetime
{% endfunction_parameters %}

## Converting UTC entity timestamps

Entity attributes like `last_changed` and `last_updated` are stored in UTC. Convert them to local time for display.

{% example %}
template: '{{ states.binary_sensor.front_door.last_changed | as_local }}'
type: datetime
output: "2024-03-15 14:30:00.123456+01:00"
{% endexample %}

## Good to know

- The input must be a datetime object, not a string. Pipe through [`as_datetime`](/template-functions/as_datetime/) first if you have a string.
- Naive datetimes (without time zone info) are treated as UTC before the conversion.
- Daylight saving transitions are handled automatically based on the Home Assistant configured time zone.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Display last changed time in local format

Show when a sensor last changed, formatted in local time.

{% example %}
template: |
  {{ (states.sensor.temperature.last_changed | as_local).strftime("%H:%M") }}
type: string
output: "14:30"
{% endexample %}

### Convert a UTC datetime string to local time

First parse the string with [`as_datetime`](/template-functions/as_datetime/), then convert to local time.

{% example %}
template: '{{ as_datetime("2024-03-15T13:30:00+00:00") | as_local }}'
type: datetime
output: "2024-03-15 14:30:00+01:00"
{% endexample %}

### Show the local time of the next scheduled event

Convert a UTC event time from a {% term sensor %} to your local time zone for display in a notification.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          Next appointment at
          {{
            (as_datetime(states("sensor.next_appointment")) | as_local)
            .strftime("%H:%M")
          }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
