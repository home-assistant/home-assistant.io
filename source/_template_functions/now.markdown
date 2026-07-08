---
title: "Current local date and time: now"
function_name: "now"
description: "Returns the current date and time in your local time zone."
available_as:
  - function
category: datetime
return_type: datetime
limited: false
since: "0.7"
related_functions:
  - utcnow
  - today_at
  - as_timestamp
  - time_since
---

The `now` template function returns the current date and time in your local time zone. It gives you a full date and time object that you can use to make decisions, format for display, or calculate time differences.

Many {% term automations %} and {% term templates %} need to know what time it is right now. You might want to send a different greeting in the morning versus the evening, only turn on lights after sunset, check if it's a weekday before triggering your work routine, or display how long ago something happened. `now()` is your starting point for all of these. From the result, you can pull out the current hour, minute, day, month, day of the week, and more. Using `now()` in a template also causes it to be re-evaluated at the start of every new minute, so time-dependent values stay up to date automatically.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ now() }}'
type: datetime
output: "2024-03-15 14:30:00.123456+01:00"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
now() -> datetime
```

## Working with the result

`now()` returns a {% term datetime %} object. You can access individual components and format the output:

{% example %}
template: |
  The time is {{ now().hour }}:{{ now().minute }}
  Today is day {{ now().day }} of month {{ now().month }}
type: string
output: |
  The time is 14:30
  Today is day 15 of month 3
{% endexample %}

### Formatting with strftime

You can format the date and time in any way you like using Python's `strftime` method.

{% example %}
template: '{{ now().strftime("%H:%M") }}'
type: string
output: "14:30"
{% endexample %}

{% example %}
template: '{{ now().strftime("%A, %B %d") }}'
type: string
output: "Friday, March 15"
{% endexample %}

## Good to know

- Templates using `now()` re-evaluate once per minute, not continuously. Second-level precision in conditions won't react immediately.
- The returned datetime is timezone-aware and uses the Home Assistant configured time zone. Use [`utcnow()`](/template-functions/utcnow/) when you need UTC.
- `weekday()` returns 0 for Monday through 6 for Sunday, not starting at 1.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check if it's a weekday

Use this in a {% term condition %} to only run {% term automations %} on weekdays. The `weekday()` method returns 0 for Monday through 6 for Sunday.

{% example %}
template: '{{ now().weekday() < 5 }}'
type: boolean
output: "true"
{% endexample %}

### Only run between certain hours

Limit an {% term automation %} to only run during daytime hours.

{% example %}
automation: |
  condition:
    - condition: template
      value_template: >
        {{ 8 <= now().hour < 22 }}
{% endexample %}

### Calculate seconds since an event

Find out how many seconds have passed since the front door last changed {% term state %}. Useful for checking if something happened recently.

{% example %}
template: |
  {{
    (now() - states.binary_sensor.front_door.last_changed)
    .total_seconds() | int
  }}
type: integer
output: "3847"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
