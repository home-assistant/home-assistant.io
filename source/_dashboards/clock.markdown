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

{% configuration_basic %}
Title:
  description: Adds a title to the top of the card
Clock Size:
  description: Adjusts the size of the text allowing a wider range of use with different types of dashboards. Defaults to small.
Display Seconds:
  description: Shows seconds alongside the clock, providing the time format is in a 12-hour format.
Time Format:
  description: Allows the time format to be changed on a per-card level. Defaults to the user profile setting.
Time Zone:
  description: Change the timezone used for the time on a per-card level. Defaults to the user profile setting.
{% endconfiguration_basic %}

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
