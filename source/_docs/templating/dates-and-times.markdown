---
title: "Working with dates and times"
description: "Read, format, compare, and calculate with dates and times in your templates."
related:
  - docs: /template-functions/now/
    title: "`now` function"
  - docs: /template-functions/strptime/
    title: "`strptime` function"
  - docs: /template-functions/timestamp_custom/
    title: "`timestamp_custom` filter"
  - docs: /template-functions/time_since/
    title: "`time_since` function"
  - docs: /template-functions/#datetime
    title: All date and time functions
  - url: https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes
    title: Python strftime format codes
---

Dates and times come up constantly in Home Assistant templates. "How long ago did the door open?" "Is it past sunset?" "How many days until my next bin collection?" This page gathers the tools and patterns you need, in one place.

If you only need the current moment, start with `now()`. If you're converting or formatting, jump to the [formatting section](#formatting-with-strftime). If you're working with a timestamp from a sensor, head to the [conversion section](#converting-between-types).

## Getting the current time

### now() and utcnow()

[`now()`](/template-functions/now/) returns the current date and time in your configured time zone. [`utcnow()`](/template-functions/utcnow/) returns it in UTC.

{% example %}
template: |
  Local: {{ now() }}
  UTC:   {{ utcnow() }}
output: |
  Local: 2026-04-04 14:30:00.123456+02:00
  UTC:   2026-04-04 12:30:00.123456+00:00
{% endexample %}

{% important %}
Templates that use `now()` or `utcnow()` re-run once per minute. This is how clock-based templates stay current. If you need something to refresh more often, base it on a state change instead.
{% endimportant %}

### today_at

[`today_at`](/template-functions/today_at/) gives you a specific time on the current day, handy for "is it past bedtime?" checks.

{% example %}
template: |
  {{ today_at('22:00') }}
output: "2026-04-04 22:00:00+02:00"
{% endexample %}

## Accessing parts of a datetime

Once you have a datetime, you can pull out individual parts with dots.

{% example %}
template: |
  Year:    {{ now().year }}
  Month:   {{ now().month }}
  Day:     {{ now().day }}
  Hour:    {{ now().hour }}
  Minute:  {{ now().minute }}
  Weekday: {{ now().weekday() }}
output: |
  Year:    2026
  Month:   4
  Day:     4
  Hour:    14
  Minute:  30
  Weekday: 5
{% endexample %}

`weekday()` is `0` for Monday through `6` for Sunday. If you prefer the other convention, `isoweekday()` gives you `1` for Monday through `7` for Sunday.

## Formatting with strftime

`strftime` turns a datetime into text, shaped the way you want. This is the single most useful method for displaying dates and times.

{% example %}
template: |
  24-hour:      {{ now().strftime('%H:%M') }}
  12-hour:      {{ now().strftime('%I:%M %p') }}
  Weekday:      {{ now().strftime('%A') }}
  Short date:   {{ now().strftime('%Y-%m-%d') }}
  Long date:    {{ now().strftime('%A, %B %-d, %Y') }}
  Sentence:     {{ now().strftime('It is %A at %H:%M') }}
output: |
  24-hour:      14:30
  12-hour:      02:30 PM
  Weekday:      Saturday
  Short date:   2026-04-04
  Long date:    Saturday, April 4, 2026
  Sentence:     It is Saturday at 14:30
{% endexample %}

### Common format codes

Here are the ones you will use most often:

- `%Y`: four-digit year (for example, `2026`)
- `%m`: zero-padded month (for example, `04`)
- `%d`: zero-padded day (for example, `04`)
- `%-d`: day without leading zero (for example, `4`)
- `%H`: hour in 24-hour format (for example, `14`)
- `%M`: minute (for example, `30`)
- `%S`: second (for example, `00`)
- `%I`: hour in 12-hour format (for example, `02`)
- `%p`: `AM` or `PM`
- `%A`: full weekday name (for example, `Saturday`)
- `%a`: short weekday name (for example, `Sat`)
- `%B`: full month name (for example, `April`)
- `%b`: short month name (for example, `Apr`)

The Python documentation has the [full list of format codes](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes) if you need something unusual.

## Parsing text into a datetime with strptime

[`strptime`](/template-functions/strptime/) is the reverse of `strftime`. It takes a piece of text and a format string, and gives you back a datetime.

{% example %}
template: |
  {% set event = strptime('2026-12-25 10:30', '%Y-%m-%d %H:%M') %}
  {{ event }}
output: "2026-12-25 10:30:00"
{% endexample %}

See the [`strptime`](/template-functions/strptime/) reference for the full signature.

## Converting between types

Sensors, APIs, and MQTT messages deliver timestamps in many different shapes. These functions convert between them.

### UNIX timestamp to datetime

A **UNIX timestamp** is the number of seconds since January 1, 1970. Many APIs use them.

{% example %}
template: |
  {% set ts = 1710510600 %}
  Local: {{ ts | timestamp_local }}
  UTC:   {{ ts | timestamp_utc }}
  Custom: {{ ts | timestamp_custom('%H:%M on %B %d') }}
output: |
  Local: 2024-03-15 14:30:00+01:00
  UTC:   2024-03-15 13:30:00+00:00
  Custom: 14:30 on March 15
{% endexample %}

See [`timestamp_local`](/template-functions/timestamp_local/), [`timestamp_utc`](/template-functions/timestamp_utc/), and [`timestamp_custom`](/template-functions/timestamp_custom/).

### Datetime to UNIX timestamp

Use [`as_timestamp`](/template-functions/as_timestamp/):

{% example %}
template: "{{ as_timestamp(now()) | int }}"
output: "1743768600"
{% endexample %}

### Text to datetime

[`as_datetime`](/template-functions/as_datetime/) is a forgiving version of [`strptime`](/template-functions/strptime/) that tries to figure out common formats on its own.

{% example %}
template: |
  {{ as_datetime('2026-04-04 14:30:00') }}
output: "2026-04-04 14:30:00+02:00"
{% endexample %}

## Time differences

When you subtract two datetimes, you get a **timedelta** that represents the duration between them. Timedeltas support their own calculations and methods.

### How long ago did something happen?

Every state has a `last_changed` timestamp. Subtract it from `now()` to get a timedelta.

{% example %}
template: |
  {% set since = now() - states.binary_sensor.front_door.last_changed %}
  Total seconds: {{ since.total_seconds() | int }}
  Total minutes: {{ (since.total_seconds() / 60) | int }}
output: |
  Total seconds: 900
  Total minutes: 15
{% endexample %}

For a human-readable version, reach for [`time_since`](/template-functions/time_since/) instead:

{% example %}
template: |
  {{ time_since(states.binary_sensor.front_door.last_changed) }} ago
output: "15 minutes ago"
{% endexample %}

If you already have a timedelta object and want to display it in a readable format, use [`timedelta_string`](/template-functions/timedelta_string/):

{% example %}
template: |
  {% set open_for = trigger.to_state.last_changed - trigger.from_state.last_changed %}
  Open for {{ timedelta_string(open_for, 2) }}
output: "Open for 15 minutes 30 seconds"
{% endexample %}

### Is it more than X minutes?

A common pattern: trigger an alert when something has been in a state too long.

{% example %}
template: |
  {{
    (now() - states.binary_sensor.front_door.last_changed)
    .total_seconds() > 600
  }}
output: "True (when the door has been in its state for more than 10 minutes)"
{% endexample %}

### Counting down to a future date

[`time_until`](/template-functions/time_until/) turns a future datetime into a human-readable duration.

{% example %}
template: |
  {% set birthday = strptime('2026-12-25', '%Y-%m-%d') %}
  Christmas: {{ time_until(birthday) }}
output: "Christmas: 8 months"
{% endexample %}

## Time zones

Home Assistant stores state timestamps (`last_changed`, `last_updated`) in your configured time zone. `now()` also returns your local time zone. `utcnow()` returns UTC.

If you need to compare datetimes, both sides need to be in the same time zone. [`as_datetime`](/template-functions/as_datetime/) and [`strptime`](/template-functions/strptime/) return datetimes without a time zone by default. Apply the matching conversion before comparing, or stick to [`timestamp_local`](/template-functions/timestamp_local/) and [`timestamp_utc`](/template-functions/timestamp_utc/) which handle this for you.

## Common gotchas

- **Text comparison vs time comparison.** Comparing date-looking text with `<` or `>` compares alphabetically, not chronologically. Convert both sides to datetimes first.
- **[`timestamp_custom`](/template-functions/timestamp_custom/) is not the only option.** For datetime values (like `now()`), use `.strftime(...)` directly. [`timestamp_custom`](/template-functions/timestamp_custom/) is specifically for UNIX timestamps.
- **Templates using `now()` re-run every minute.** Don't use it for things that should update more often.
- **Subtraction gives you a timedelta, not seconds.** Call `.total_seconds()` on the result when you need a number.
- **`.replace(hour=..., minute=...)` can be wrong around daylight saving time.** Replacing the hour field on a timezone-aware datetime can land in a skipped or repeated local hour, which silently produces the wrong absolute time. Prefer [`today_at('HH:MM')`](#today_at) for "today at a specific local time", and add or subtract full days with `timedelta(days=1)` only when you accept 24 exact hours, not one calendar day.

## Next steps

- See the [full list of date and time functions](/template-functions/#datetime) in the reference.
- For common date/time recipes, see [Common template patterns](/docs/templating/patterns/).
- The [Python methods](/docs/templating/python-methods/) page covers `.strftime()`, `.weekday()`, and similar datetime methods.
