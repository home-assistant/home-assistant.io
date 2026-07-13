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

The **Input Datetime** {% term integration %} lets you create a date and time {% term helper %}: an entity that stores a date, a time, or both, which you can set yourself. Because the value is not tied to a physical device, you can use it as an adjustable date or time setting for your automations, scripts, and dashboards. For example, you can create a date and time helper to store a wake-up time, a target date, or the moment an automation should run.

On a dashboard, a date and time helper appears as a date picker, a time picker, or both. Each time the value changes, Home Assistant records a new {% term state %}, which you can use in your automations and templates. Your automations and scripts can also change the value, which makes a date and time helper a convenient way to share a setting between the UI and your automations.

The preferred way to create a date and time helper is through the user interface.

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}, and select **Create helper**.
2. Select **{% my config_flow_start domain="input_datetime" title="Date and/or time" %}**.

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

## Attributes

A datetime input entity's state exports several attributes that can be useful in
automations and templates.

| Attribute                  | Description                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `has_time`                 | `true` if this entity has a time.                                                            |
| `has_date`                 | `true` if this entity has a date.                                                            |
| `year`<br>`month`<br>`day` | The year, month and day of the date.<br>(only available if `has_date: true`)                 |
| `timestamp`                | A timestamp representing the time held in the input.<br>(only available if `has_time: true`) |

## Restore state

If you set a valid value for `initial`, this integration will start with the state set to that value. Otherwise, it will restore the state it had before Home Assistant stopping.

{% include integrations/actions.md %}

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
`input_datetime.set_datetime`. The values for `date`, `time` and/or `datetime` must be in a certain format for the call to be successful. See the [Set input datetime value](/actions/input_datetime.set_datetime/) action for the expected formats.
If you have a `datetime` object, you can use its `timestamp` method. Or, if you have a timestamp, you can just use it directly.

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

## Troubleshooting

### The Date and/or time helper option is missing from the user interface

#### Symptom

When you go to **{% my helpers title="Settings > Devices & services > Helpers" %}** to add a helper, the **Date and/or time** option is not listed.

#### Description

Date and time helpers are provided through [`default_config:`](/integrations/default_config/), which is part of your {% term "`configuration.yaml`" %} by default. If you removed `default_config:`, the option is no longer available.

#### Resolution

1. Add `input_datetime:` to your {% term "`configuration.yaml`" %}.
2. Restart Home Assistant.
3. After the restart, create your date and time helpers from the user interface.
