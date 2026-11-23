---
type: card
title: "Date card"
sidebar_label: Date
description: "The date card shows the current date in a variety of formats and sizes."
related:
  - docs: /docs/configuration/basic/
    title: Set your time zone
---

The date card shows the current date in a variety of formats, sizes, and time zones. It pairs well with the [Clock card](/dashboards/clock/) on dashboards used as a daily overview or wall-mounted display.

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
  description: "Sets how the date is shown, either as a preset or as a list of date parts. If left empty, the card shows the weekday, day, and month, for example Monday 10 August. See [Formatting the date](#formatting-the-date) for the available presets and parts."
  type: [string, list]
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

Use `date_format` to choose how the date is shown. Set it to one of the following presets, which follow your language's date format:

- `short`: A short numeric date, for example 8/10/26.
- `medium`: A date with the abbreviated month name, for example Aug 10, 2026.
- `long`: A date with the full month name, for example August 10, 2026.
- `full`: A date with the weekday and full month name, for example Monday, August 10, 2026.
- `iso`: An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date, always year-month-day, for example 2026-08-10.

The examples above are in English (United States). Other languages order and punctuate the presets in their own way, except `iso`, which is always the same.

For a custom format, set `date_format` to a list of the parts you want to show, in the order you want them. Choose from the following parts:

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
  - `separator-comma`: Adds a comma and a space (`, `) between parts.
  - `separator-new-line`: Starts a new line.

The parts are shown in the order you add them. A space is automatically added between two parts that aren't separators, so you only need to add a separator when you want different punctuation, such as a slash-separated date.

In the card editor, choose **Custom** to build your own format. If a preset was selected, the custom format starts from that preset's parts.

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

A date card using the full date preset:

```yaml
type: date
date_format: full
```

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
