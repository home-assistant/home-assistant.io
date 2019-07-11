---
title: "Input Datetime"
description: "Instructions on how to integrate the Input Datetime integration into Home Assistant."
logo: home-assistant.png
ha_category:
  - Automation
ha_release: 0.55
ha_qa_scale: internal
---

The `input_datetime` integration allows the user to define date and time values
that can be controlled via the frontend and can be used within automations and
templates.

To add three datetime inputs to your installation,
one with both date and time, and one with date or time each,
add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
input_datetime:
  both_date_and_time:
    name: Input with both date and time
    has_    has_time: true
  only_date:
    name: Input with only date
    has_    has_time: false
  only_time:
    name: Input with only time
    has_    has_time: true
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
        type: boolean
        default: false
      has_date:
        description: Set to `true` if the input should have a date. At least one `has_time` or `has_date` must be defined.
        required: false
        type: boolean
        default: false
      initial:
        description: Set the initial value of this input, depending on `has_time` and `has_date`.
        required: false
        type: datetime | time | date
        default: 1970-01-01 00:00 | 1970-01-01 | 00:00
{% endconfiguration %}

### Attributes

A datetime input entity's state exports several attributes that can be useful in
automations and templates.

| Attribute | Description |
| ----- | ----- |
| `has_time` | `true` if this entity has a time.
| `has_date` | `true` if this entity has a date.
| `year`<br>`month`<br>`day` | The year, month and day of the date.<br>(only available if `has_| `hour`<br>`minute`<br>`second` | The hour, minute and second of the time.<br>(only available if `has_time: true`)
| `timestamp` | A timestamp representing the time held in the input.<br>If `has_
### Restore State

This integration will automatically restore the state it had prior to Home
Assistant stopping as long as your entity does **not** have a set value for
`initial`.  To disable this feature, set a valid value for `initial`.

### Services

This integration provides a service to modify the state of the `input_datetime`.

| Service | Data | Description |
| ----- | ----- | ----- |
| `set_datetime` | `time` | This can be used to dynamically set the time.
| `set_datetime` | `date` | This can be used to dynamically set the date.

## Automation Examples

The following example shows the usage of the `input_datetime` as a trigger in an
automation (note that you will need a
[time sensor](/components/sensor.time_date/) elsewhere in your configuration):

{% raw %}
```yaml
# Example configuration.yaml entry
# Turns on bedroom light at the time specified.
automation:
  trigger:
    platform: template
    value_template: "{{ states('sensor.time') == (state_attr('input_datetime.bedroom_alarm_clock_time', 'timestamp') | int | timestamp_custom('%H:%M', False)) }}"
  action:
    service: light.turn_on
    entity_id: light.bedroom
```
{% endraw %}

To dynamically set the `input_datetime` you can call
`input_datetime.set_datetime`. The values for `date` and `time` must be in a certain format for the call to be successful.
You can use either `strftime("%Y-%m-%d")`/`strftime("%H:%M:%S")` or `timestamp_custom("%Y-%m-%d", true)`/`timestamp_custom("%H:%M:%S", true)` filter respectively.
The following example can be used in an automation rule:

{% raw %}
```yaml
# Example configuration.yaml entry
# Sets input_datetime to '05:30' when an input_boolean is turned on.
automation:
  trigger:
    platform: state
    entity_id: input_boolean.example
    to: 'on'
  action:
  - service: input_datetime.set_datetime
    entity_id: input_datetime.bedroom_alarm_clock_time
    data:
      time: '05:30:00'
  - service: input_datetime.set_datetime
    entity_id: input_datetime.another_time
    data_template:
      time: '{{ now().strftime("%H:%M:%S") }}'
  - service: input_datetime.set_datetime
    entity_id: input_datetime.another_date
    data_template:
        - service: input_datetime.set_datetime
    data_template:
     entity_id: input_datetime.date_and_time
              {{ now().timestamp() | timestamp_custom("%Y-%m-%d", true) }}
      time: >
        {{ now().timestamp() | timestamp_custom("%H:%M:%S", true) }}
```
{% endraw %}
