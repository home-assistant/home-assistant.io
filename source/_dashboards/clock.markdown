---
type: card
title: "Clock card"
sidebar_label: Clock
description: "The Clock card shows the current time in a variety of formats and sizes."
related:
  - docs: /docs/frontend/#user--or-browser-dependent-settings
    title: Setup your time format and timezone
---

The Clock card shows the current time in a variety of formats, sizes and time zones.

<p class='img'>
<img src='/images/dashboards/clock_card_large.png' alt='Screenshot of the clock card'>
Screenshot of the clock card
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

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
analog_options:
  description: When using the analog clock style, this allows the user to configure the appearance of the clock.
  type: map
  required: false
  keys:
    border:
      description: Shows a border around the clock face. Defaults to false.
      type: boolean
      required: false
      default: false
    ticks:
      description: Shows ticks (indices) on the clock face. Defaults to hour.
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

<p class='img'>
<img src='/images/dashboards/clock_card_default.png' alt='Screenshot of the basic clock card'>
Screenshot of the basic clock card
</p>

Example of a larger clock card for tablet dashboards:

```yaml
type: clock
clock_size: large
time_format: "12"
show_seconds: true
```

<p class='img'>
<img src='/images/dashboards/clock_card_large.png' alt='Screenshot of a large sized, 12 hour clock card showing am/pm and seconds'>
Screenshot of a large sized, 12 hour clock card showing am/pm and seconds
</p>

A medium-sized clock card better suited for desktop dashboards:

```yaml
type: clock
clock_size: medium
time_format: "12"
show_seconds: false
```

<p class='img'>
<img src='/images/dashboards/clock_card_medium.png' alt='Screenshot of a medium sized, 12 hour clock showing am/pm'>
Screenshot of a medium sized, 12 hour clock showing am/pm
</p>

A medium-sized, 24 hour clock using the London timezone with a title

```yaml
type: clock
clock_size: medium
time_zone: Europe/London
title: London 💂

```

<p class='img'>
<img src='/images/dashboards/clock_card_london.png' alt='Screenshot of a medium sized, 24 hour clock showing seconds based in London along with a title'>
Screenshot of a medium sized, 24 hour clock showing seconds based in London along with a title
</p>

A medium-sized, 12 hour clock using the New York timezone with a title

```yaml
type: clock
clock_size: medium
time_format: "12"
time_zone: America/New_York
title: New York 🦅

```

<p class='img'>
<img src='/images/dashboards/clock_card_new_york.png' alt='Screenshot of a medium sized, 12 hour clock showing am/pm and seconds based in New York along with a title'>
Screenshot of a medium sized, 12 hour clock showing am/pm and seconds based in New York along with a title
</p>

Analog clock with no border and hour ticks:

```yaml
type: clock
clock_style: analog
clock_size: medium
analog_options:
  border: false
  ticks: hour
```

<p class='img'>
<img src='/images/dashboards/clock_card_analog_hour_ticks.png' alt='Screenshot of a medium sized, analog clock and hour ticks'>
Screenshot of a medium sized, analog clock and hour ticks
</p>

Analog clock with border and minute ticks showing seconds:

```yaml
type: clock
clock_style: analog
clock_size: medium
show_seconds: true
analog_options:
  border: true
  ticks: minute
```

<p class='img'>
<img src='/images/dashboards/clock_card_analog_minute_ticks_border.png' alt='Screenshot of a medium sized, analog clock and minute ticks showing seconds'>
Screenshot of a medium sized, analog clock and minute ticks showing seconds
</p>

Analog clock with a title, no ticks and border with seconds:

```yaml
type: clock
clock_style: analog
clock_size: medium
show_seconds: true
analog_options:
  border: true
  ticks: none
title: Mountain Time
```

<p class='img'>
<img src='/images/dashboards/clock_card_analog_no_ticks_border_title_mountain_time.png' alt='Screenshot of a medium sized, analog clock with a title, no ticks and border showing seconds'>
Screenshot of a medium sized, analog clock with a title, no ticks and border showing seconds
</p>
