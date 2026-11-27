---
type: card
title: "Clock card"
sidebar_label: Clock
description: "The Clock card shows the current time in a variety of formats and sizes."
related:
  - docs: /docs/configuration/basic/
    title: Set your time zone
---

The Clock card shows the current time in a variety of formats, sizes and time zones.

<p class='img'>
<img src='/images/dashboards/clock_card_large.png' alt='Screenshot of the clock card'>
Screenshot of the clock card
</p>

All options for this card can be configured via the user interface.

{% include dashboard/edit_dashboard.md %}

## Card settings

{% configuration %}
title:
  description: Adds a title to the top of the card
  type: string
  required: false
clock_style:
  description: Allows the clock to be displayed in a digital or analog style. Defaults to digital.
  type: list
  required: false
  default: digital
  keys:
    digital:
      description: Digital clock style.
    analog:
      description: Analog clock style.
clock_size:
  description: Adjusts the size of the text allowing a wider range of use with different types of dashboards. Defaults to small.
  type: list
  required: false
  default: small
  keys:
    small:
      description: Small clock size.
    medium:
      description: Medium clock size.
    large:
      description: Large clock size.
show_seconds:
  description: Shows seconds alongside the clock, providing the time format is in a 12-hour format.
  type: boolean
  required: false
  default: false
no_background:
  description: Removes the background of the clock card.
  type: boolean
  required: false
  default: false
time_format:
  description: Allows the time format to be changed on a per-card level. Defaults to the user profile setting.
  type: string
  required: false
time_zone:
  description: Change the timezone used for the time on a per-card level. Defaults to the user profile setting.
  type: string
  required: false
date_format:
  description: "Shows the date with the time, either as a preset or as a list of date parts. If left empty, no date is shown. See [Formatting the date](/dashboards/date/#formatting-the-date) on the date card page for the available presets and parts."
  type: [string, list]
  required: false
border:
  description: With the analog clock style, shows a border around the clock face.
  type: boolean
  required: false
  default: false
ticks:
  description: With the analog clock style, shows ticks (indices) on the clock face.
  type: list
  required: false
  default: hour
  keys:
    none:
      description: No ticks are shown.
    quarter:
      description: Quarter hour ticks are shown.
    hour:
      description: Hour ticks are shown.
    minute:
      description: Minute ticks are shown.
{% endconfiguration %}

### Examples

Basic example:

```yaml
type: clock
```

{% include dashboard/demo.html demo="clock_default" caption="The basic clock card." %}

Example of a larger clock card for tablet dashboards:

```yaml
type: clock
clock_size: large
time_format: "12"
show_seconds: true
```

{% include dashboard/demo.html demo="clock_large" caption="A large, 12 hour clock card showing am/pm and seconds." %}

A medium-sized clock card better suited for desktop dashboards:

```yaml
type: clock
clock_size: medium
time_format: "12"
show_seconds: false
```

{% include dashboard/demo.html demo="clock_medium" caption="A medium, 12 hour clock showing am/pm." %}

A medium-sized, 24 hour clock using the London timezone with a title

```yaml
type: clock
clock_size: medium
time_zone: Europe/London
title: London 💂

```

{% include dashboard/demo.html demo="clock_london" caption="A medium, 24 hour clock in London, with a title." %}

A medium-sized, 12 hour clock using the New York timezone with a title

```yaml
type: clock
clock_size: medium
time_format: "12"
time_zone: America/New_York
title: New York 🦅

```

{% include dashboard/demo.html demo="clock_new_york" caption="A medium, 12 hour clock in New York showing am/pm, with a title." %}

A medium-sized clock showing the date below the time, using the long date preset:

```yaml
type: clock
clock_size: medium
date_format: long
```

Analog clock with no border and hour ticks:

```yaml
type: clock
clock_style: analog
clock_size: medium
border: false
ticks: hour
```

{% include dashboard/demo.html demo="clock_analog_hour_ticks" caption="A medium, analog clock with hour ticks." %}

Analog clock with border and minute ticks showing seconds:

```yaml
type: clock
clock_style: analog
clock_size: medium
show_seconds: true
border: true
ticks: minute
```

{% include dashboard/demo.html demo="clock_analog_minute_ticks" caption="A medium, analog clock with a border and minute ticks, showing seconds." %}

Analog clock with a title, no ticks and border with seconds:

```yaml
type: clock
clock_style: analog
clock_size: medium
show_seconds: true
border: true
ticks: none
title: Mountain Time
```

{% include dashboard/demo.html demo="clock_analog_no_ticks" caption="A medium, analog clock with a title, a border and no ticks, showing seconds." %}
