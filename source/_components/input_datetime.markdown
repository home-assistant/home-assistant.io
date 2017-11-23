---
layout: page
title: "Input Datetime"
description: "Instructions how to integrate the Input Datetime component into Home Assistant."
date: 2017-09-14 16:01
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
ha_release: 0.55
---

The `input_datetime` component allows the user to define date and time values that can be controlled via the frontend and can be used within automations and templates.

To add three datetime inputs to your installation, one with both date and time, and one with date or time each, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
input_datetime:
  both_date_and_time:
    name: Input with both date and time
    has_date: true
    has_time: true
  only_date:
    name: Input with only date
    has_date: true
    has_time: false
  only_time:
    name: Input with only time
    has_date: false
    has_time: true
```

Configuration variables:

- **[alias]** (*Required*): Alias for the datetime input. Multiple entries are allowed.
  - **name** (*Optional*): Friendly name of the datetime input.
  - **has_time** (*Optional*): Set to `true` if this input should have time. Defaults to `false`.
  - **has_date** (*Optional*): Set to `true` if this input should have a date. Defaults to `false`.
  - **initial** (*Optional*): Set the initial value of this input. Defaults to '1970-01-01 00:00'. If has_time is `false` this must be just a date (e.g.: '1970-01-01'). If has_date is `false` this must be just a time (e.g.: '15:16').

A datetime input entity's state exports several attributes that can be useful in automations and templates:

- **has_time**: `true` if this entity has time.
- **has_date**: `true` if this entity has a date.
- **year**, **month**, **day** (Only available if *has_date* is true): The year, month and day of the date.
- **hour**, **minute**, **second** (Only available if *has_time* is true): The hour, minute and second of the time.
- **timestamp**: A timestamp representing the time held in the input. If *has_date* is true, this is the UNIX timestamp of the date / time held by the input. Otherwise (i.e., if only *has_time* is true) the number of seconds since midnight representing the time held by the input.
