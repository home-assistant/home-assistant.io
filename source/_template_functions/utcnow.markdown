---
title: "Current UTC date and time: utcnow"
function_name: "utcnow"
description: "Returns the current date and time in UTC."
available_as:
  - function
category: datetime
return_type: datetime
limited: false
since: "0.7"
related_functions:
  - now
  - as_timestamp
  - as_local
  - today_at
---

The `utcnow` template function returns the current date and time in UTC (Coordinated Universal Time). It gives you a full {% term datetime %} object representing the present moment in the UTC time zone, regardless of your local time zone setting.

When you need to compare times across time zones, store timestamps in a universal format, or perform calculations that should not be affected by daylight saving time changes, `utcnow()` is the right choice. It is also useful when interacting with external services that expect UTC timestamps. Like [`now`](/template-functions/now/), using `utcnow()` in a template causes it to be re-evaluated at the start of every new minute, keeping time-dependent values up to date automatically.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ utcnow() }}'
type: datetime
output: "2024-03-15 13:30:00.123456+00:00"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
utcnow() -> datetime
```

## Working with the result

`utcnow()` returns a {% term datetime %} object. You can access individual components and format the output, just like with [`now`](/template-functions/now/).

{% example %}
template: |
  The UTC time is {{ utcnow().hour }}:{{ utcnow().minute }}
  Today is day {{ utcnow().day }} of month {{ utcnow().month }}
type: string
output: |
  The UTC time is 13:30
  Today is day 15 of month 3
{% endexample %}

### Formatting with strftime

You can format the date and time in any way you like using Python's `strftime` method.

{% example %}
template: '{{ utcnow().strftime("%Y-%m-%dT%H:%M:%SZ") }}'
type: string
output: "2024-03-15T13:30:00Z"
{% endexample %}

## Good to know

- Templates that reference `utcnow()` are re-evaluated at the start of every minute, the same as [`now`](/template-functions/now/).
- The returned datetime is time zone aware and always in UTC, so adding a [`timedelta`](/template-functions/timedelta/) or subtracting from a local datetime works without conversion.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Calculate the UTC offset

Compare [`now`](/template-functions/now/) with `utcnow()` to determine your current UTC offset in hours.

{% example %}
template: '{{ ((now() - utcnow()).total_seconds() / 3600) | round(0) | int }}'
type: integer
output: "1"
{% endexample %}

### ISO 8601 formatted UTC timestamp

Create a standard ISO 8601 timestamp string, useful for logging or sending to external APIs.

{% example %}
template: '{{ utcnow().isoformat() }}'
type: string
output: "2024-03-15T13:30:00.123456+00:00"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
