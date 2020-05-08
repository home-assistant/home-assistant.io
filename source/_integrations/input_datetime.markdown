---
title: Input Datetime
description: Instructions on how to integrate the Input Datetime integration into Home Assistant.
ha_category:
  - Automation
ha_release: 0.55
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_datetime
---

The `input_datetime` integration allows the user to define date and time values
that can be controlled via the frontend and can be used within automations and
templates.

The preferred way to configure input datetime is via the user interface at **Configuration** -> **Helpers**. Click the add button and then choose the **Date and/or time** option.

`input_datetime` can also be configured via YAML. To add three datetime inputs to your installation,
one with both date and time, and one with date or time each,
add the following lines to your `configuration.yaml`:

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
        description: Set to `true` if the input should have a time. At least one `has_time` or `has_date` must be defined.
        required: false
        type: boolean
        default: false
      has_date:
        description: Set to `true` if the input should have a date. At least one `has_time` or `has_date` must be defined.
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
        default: 1970-01-01 00:00 | 00:00 | 1970-01-01
{% endconfiguration %}

### Attributes

A datetime input entity's state exports several attributes that can be useful in
automations and templates.

| Attribute | Description |
| ----- | ----- |
| `has_time` | `true` if this entity has a time.
| `has_date` | `true` if this entity has a date.
| `year`<br>`month`<br>`day` | The year, month and day of the date.<br>(only available if `has_date: true`)
| `timestamp` | A timestamp representing the time held in the input.<br>(only available if `has_time: true`)

### Restore State

If you set a valid value for `initial` this integration will start with state set to that value. Otherwise, it will restore the state it had prior to Home Assistant stopping.

### Services

Available service: `input_datetime.set_datetime` and `input_datetime.reload`.

Service data attribute | Format String | Description
-|-|-
`date` | `%Y-%m-%d` | This can be used to dynamically set the date.
`time` | `%H:%M:%S` | This can be used to dynamically set the time.
`datetime` | `%Y-%m-%d %H:%M:%S` | This can be used to dynamically set both the date & time.

To set both the date and time in the same call, use `date` and `time` together, or use `datetime` by itself. Using `datetime` has the advantage that both can be set using one template.

`input_dateteime.reload` service allows one to reload `input_datetime`'s configuration without restarting Home Assistant itself.

## Automation Examples

The following example shows the usage of the `input_datetime` as a trigger in an
automation (note that you will need a
[time sensor](/integrations/time_date) elsewhere in your configuration):

{% raw %}
```yaml
# Example configuration.yaml entry
# Turns on bedroom light at the time specified.
automation:
  trigger:
    platform: template
    value_template: "{{ states('sensor.time') == (state_attr('input_datetime.bedroom_alarm_clock_time', 'timestamp') | int | timestamp_custom('%H:%M', True)) }}"
  action:
    service: light.turn_on
    entity_id: light.bedroom
```
{% endraw %}

To dynamically set the `input_datetime` you can call
`input_datetime.set_datetime`. The values for `date` and `time` must be in a certain format for the call to be successful. (See service description above.)
If you have a `datetime` object you can use its `strftime` method. Of if you have a timestamp you can use the `timestamp_custom` filter.
The following example shows the different methods in an automation rule:

{% raw %}
```yaml
# Example configuration.yaml entry
# Shows different ways to set input_datetime when an input_boolean is turned on
automation:
  trigger:
    platform: state
    entity_id: input_boolean.example
    to: 'on'
  action:
  # Sets time to '05:30:00
  - service: input_datetime.set_datetime
    entity_id: input_datetime.bedroom_alarm_clock_time
    data:
      time: '05:30:00'
   # Sets time to time from datetime object (current time in this example)
  - service: input_datetime.set_datetime
    entity_id: input_datetime.another_time
    data_template:
      time: "{{ now().strftime('%H:%M:%S') }}"
  # Sets date to date from timestamp (current date in this example)
  - service: input_datetime.set_datetime
    entity_id: input_datetime.another_date
    data_template:
      date: "{{ as_timestamp(now())|timestamp_custom('%Y-%m-%d') }}"
  # Sets date and time to date and time from datetime object (current date and time in this example)
  - service: input_datetime.set_datetime
    entity_id: input_datetime.date_and_time
    data_template:
      datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"
  # Sets date and time to date and time from timestamp (current date and time in this example)
  - service: input_datetime.set_datetime
    data_template:
      entity_id: input_datetime.date_and_time
      date: >
        {{ now().timestamp() | timestamp_custom("%Y-%m-%d", true) }}
      time: >
        {{ now().timestamp() | timestamp_custom("%H:%M:%S", true) }}
```
{% endraw %}
