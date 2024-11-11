---
title: Input Datetime
description: Instructions on how to integrate the Input Datetime integration into Home Assistant.
ha_category:
  - Automation
  - Helper
ha_release: 0.55
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_datetime
ha_integration_type: helper
---

The `input_datetime` integration allows the user to define date and time values
that can be controlled via the frontend and can be used within automations and
templates.

The preferred way to configure input datetime is via the user interface at **{% my helpers title="Settings > Devices & services > Helpers" %}**. Click the add button and then choose the **{% my config_flow_start domain="input_datetime" title="Date and/or time" %}** option.

To be able to add **{% my helpers title="Helpers" %}** via the user interface you should have `default_config:` in your {% term "`configuration.yaml`" %}, it should already be there by default unless you removed it.
If you removed `default_config:` from your configuration, you must add `input_datetime:` to your {% term "`configuration.yaml`" %} first, then you can use the UI.

`input_datetime` can also be configured via YAML. To add three datetime inputs to your installation,
one with both date and time, and one with date or time each,
add the following lines to your {% term "`configuration.yaml`" %}:

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
        type: string
      has_time:
        description: Set to `true` if the input should have a time. At least one of `has_time` or `has_date` must be defined.
        required: false
        type: boolean
        default: false
      has_date:
        description: Set to `true` if the input should have a date. At least one of `has_time` or `has_date` must be defined.
        required: false
        type: boolean
        default: false
      icon:
        description: Icon to display in front of the input element in the frontend.
        required: false
        type: icon
      initial:
        description: Set the initial value of this input, depending on `has_time` and `has_date`.
        required: false
        type: [datetime, time, date]
        default: <today> 00:00 | 00:00 | <today>
{% endconfiguration %}

### Attributes

A datetime input entity's state exports several attributes that can be useful in
automations and templates.

| Attribute                  | Description                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `has_time`                 | `true` if this entity has a time.                                                            |
| `has_date`                 | `true` if this entity has a date.                                                            |
| `year`<br>`month`<br>`day` | The year, month and day of the date.<br>(only available if `has_date: true`)                 |
| `timestamp`                | A timestamp representing the time held in the input.<br>(only available if `has_time: true`) |

### Restore state

If you set a valid value for `initial`, this integration will start with the state set to that value. Otherwise, it will restore the state it had prior to Home Assistant stopping.

### Actions

Available actions: `input_datetime.set_datetime` and `input_datetime.reload`.

#### input_datetime.set_datetime

| Data attribute | Format String       | Description                                                                      |
| -------------- | ------------------- | -------------------------------------------------------------------------------- |
| `date`         | `%Y-%m-%d`          | This can be used to dynamically set the date.                                    |
| `time`         | `%H:%M:%S`          | This can be used to dynamically set the time.                                    |
| `datetime`     | `%Y-%m-%d %H:%M:%S` | This can be used to dynamically set both the date & time.                        |
| `timestamp`    | N/A                 | This can be used to dynamically set both the date & time using a UNIX timestamp. |

To set both the date and time in the same call, use `date` and `time` together, or use `datetime` or `timestamp` by itself. Using `datetime` or `timestamp` has the advantage that both can be set using one template.

#### input_datetime.reload

`input_datetime.reload` action allows one to reload `input_datetime`'s configuration without restarting Home Assistant itself.

## Examples

The following example shows the usage of the `input_datetime` as a trigger in an
automation:

```yaml
# Example configuration.yaml entry
# Turns on bedroom light at the time specified.
automation:
  triggers:
    - trigger: time
      at: input_datetime.bedroom_alarm_clock_time
  actions:
    - action: light.turn_on
      target:
        entity_id: light.bedroom
```

To dynamically set the `input_datetime` you can call
`input_datetime.set_datetime`. The values for `date`, `time` and/or `datetime` must be in a certain format for the call to be successful. (See action description above.)
If you have a `datetime` object you can use its `timestamp` method. Of if you have a timestamp you can just use it directly.

{% raw %}

```yaml
# Sets time to 05:30:00
- action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.XXX
  data:
    time: "05:30:00"
# Sets time to time from datetime object
- action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.XXX
  data:
    time: "{{ now().strftime('%H:%M:%S') }}"
# Sets date to 2020-08-24
- action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.XXX
  data:
    date: "2020-08-24"
# Sets date to date from datetime object
- action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.XXX
  data:
    date: "{{ now().strftime('%Y-%m-%d') }}"
# Sets date and time to 2020-08-25 05:30:00
- action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.XXX
  data:
    datetime: "2020-08-25 05:30:00"
# Sets date and time from datetime object
- action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.XXX
  data:
    datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"
# Sets date and/or time from UNIX timestamp
# This can be used whether the input_datetime has just a date,
# or just a time, or has both
- action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.XXX
  data:
    timestamp: "{{ now().timestamp() }}"
```

{% endraw %}
