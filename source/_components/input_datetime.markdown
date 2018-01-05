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

{% configuration %}
  input_datetime:
    description: Alias for the datetime input. Multiple entries are allowed.
    required: true
    type: map
    keys:
      name:
        description: Friendly name of the datetime input.
        required: false
        type: String
      has_time:
        description: Set to `true` if the input should have a time. At least one `has_time` or `has_date` must be defined.
        required: false
        type: Boolean
        default: false
      has_date:
        description: Set to `true` if the input should have a date. At least one `has_time` or `has_date` must be defined.
        required: false
        type: Boolean
        default: false
      initial:
        description: Set the initial value of this input, depending on `has_time` and `has_date`.
        required: false
        type: datetime | time | date
        default: 1970-01-01 00:00 | 1970-01-01 | 00:00
{% endconfiguration %}

### {% linkable_title Attributes %}

A datetime input entity's state exports several attributes that can be useful in automations and templates.

| Attribute | Description |
| --------- | ----------- |
| `has_time` | `true` if this entity has a time.
| `has_date` | `true` if this entity has a date.
| `year`<br>`month`<br>`day` | The year, month and day of the date.<br>(only availabel if `has_date: true`)
| `hour`<br>`minute`<br>`second` | The hour, minute and second of the time.<br>(only available if `has_time: true`)
| `timestamp` | A timestamp representing the time held in the input.<br>If `has_date: true`, this is the UNIX timestamp of the date / time held by the input. Otherwise if only `has_time: true`, this is the number of seconds since midnight representing the time held by the input.

### {% linkable_title Restore State %}

This component supports the `restore_state` function which restores the state value after Home Assistant has started to the value it has been before Home Assistant stopped. The use this feature please make sure that the [`recorder`](/components/recorder/) component is enabled and your entity does not have and initial value. Additional information and a list of components that support this feature can be found here [recorder/#restore-state](/components/recorder/#restore-state).
