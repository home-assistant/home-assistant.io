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
ha_release: TODO
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

## {% linkable_title Automation Examples %}

TBD
