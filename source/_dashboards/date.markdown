---
type: card
title: "Date card"
sidebar_label: Date
description: "The Date card shows the current date in a variety of formats and sizes."
related:
  - docs: /docs/configuration/basic/
    title: Set your time zone
---

The Date card shows the current date in a variety of formats, sizes, and time zones. It pairs well with the [Clock card](/dashboards/clock/) on dashboards used as a daily overview or wall-mounted display.

<p class='img'>
<img src='/images/dashboards/date_card_large.png' alt='Screenshot of the date card'>
Screenshot of the date card
</p>

All options for this card can be configured via the user interface.

{% include dashboard/edit_dashboard.md %}

## Card settings

{% configuration %}
title:
  description: Adds a title to the top of the card.
  type: string
  required: false
date_size:
  description: Adjusts the size of the text, allowing a wider range of use with different types of dashboards. Defaults to small.
  type: list
  required: false
  default: small
  keys:
    small:
      description: Small date size.
    medium:
      description: Medium date size.
    large:
      description: Large date size.
date_format:
  description: "Selects and orders the parts of the date that are shown. If left empty, the card shows the weekday, day, and month, for example Monday 10 August. See [Formatting the date](#formatting-the-date) for the available parts."
  type: list
  required: false
no_background:
  description: Removes the background of the date card.
  type: boolean
  required: false
  default: false
time_zone:
  description: Changes the time zone used for the date on a per-card level. Defaults to the user profile setting.
  type: string
  required: false
{% endconfiguration %}

### Formatting the date

Use `date_format` to choose which parts of the date are shown, and in what order. Add one or more of the following parts:

- Weekday:
  - `weekday-short`: Short weekday name, for example Mon.
  - `weekday-long`: Full weekday name, for example Monday.
- Day:
  - `day-numeric`: Day of the month, for example 5.
  - `day-2-digit`: Day of the month with a leading zero, for example 05.
- Month:
  - `month-short`: Short month name, for example Aug.
  - `month-long`: Full month name, for example August.
  - `month-numeric`: Month number, for example 8.
  - `month-2-digit`: Month number with a leading zero, for example 08.
- Year:
  - `year-2-digit`: Last two digits of the year, for example 26.
  - `year-numeric`: Full year, for example 2026.
- Separator:
  - `separator-dash`: Adds a dash (`-`) between parts.
  - `separator-slash`: Adds a slash (`/`) between parts.
  - `separator-dot`: Adds a dot (`.`) between parts.
  - `separator-new-line`: Starts a new line.

The parts are shown in the order you add them. A space is automatically added between two parts that aren't separators, so you only need to add a separator when you want different punctuation, such as a slash-separated date.

### Examples

Basic example:

```yaml
type: date
```

<p class='img'>
<img src='/images/dashboards/date_card_default.png' alt='Screenshot of the basic date card'>
Screenshot of the basic date card
</p>

A larger date card with a title, for a tablet or wall-mounted dashboard:

```yaml
type: date
title: Today
date_size: large
```

<p class='img'>
<img src='/images/dashboards/date_card_large.png' alt='Screenshot of a large date card with a title'>
Screenshot of a large date card with a title
</p>

A date card formatted as day/month/year:

```yaml
type: date
date_format:
  - day-2-digit
  - separator-slash
  - month-2-digit
  - separator-slash
  - year-numeric
```

<p class='img'>
<img src='/images/dashboards/date_card_format_dmy.png' alt='Screenshot of a date card showing a day/month/year formatted date'>
Screenshot of a date card showing a day/month/year formatted date
</p>

A date card without a background, showing a different time zone:

```yaml
type: date
title: Tokyo
time_zone: Asia/Tokyo
no_background: true
```

<p class='img'>
<img src='/images/dashboards/date_card_tokyo.png' alt='Screenshot of a date card without a background, showing the date in Tokyo'>
Screenshot of a date card without a background, showing the date in Tokyo
</p>
