---
title: Alarm Clock
description: Instructions on how to integrate alarm clocks into Home Assistant.
ha_category:
  - Automation
  - Helper
ha_release: 2024.6
ha_quality_scale: internal
ha_domain: alarm_clock
ha_integration_type: helper
---

The `alarm_clock` integration aims to simplify the use of alarm clocks in Home Assistant.
Alarm clocks can be used to trigger events at a specific time of day.
They can be set to repeat on specific days of the week, or only once.
Alarm clocks can be created as a helper and can be utilized by integrations, such as smart alarm clocks.

When an alarm clock starts, changes, finishes, or gets canceled, the corresponding events are fired.
Listening these events allows you to set your smart wake up light directly form home assistant, or gradually turn up the lights in your bedroom when it's time to wake up.

## Configuration

The preferred way to configure alarm clock helpers is via the user interface at **{% my helpers title="Settings > Devices & Services > Helpers" %}** and click the add button; next choose the {% my config_flow_start domain=page.ha_domain title=page.title %} option.

To be able to add Helpers via the user interface you should have `default_config:` in your {% term "`configuration.yaml`" %}, it should already be there by default unless you removed it. If you removed `default_config:` from your configuration, you must add `timer:` to your `configuration.yaml` first, then you can use the UI.

Alarm clocks can also be configured via configuration.yaml:
To add an alarm clock to your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
alarm_clock:
  work:
    alarm_time: "08:00:00",
    repeat_days: ["mon", "tue", "wed", "thu", "fri"]
```

{% configuration %}
"[alias]":
  description: Alias for the alarm clock. Multiple entries are allowed.
  required: true
  type: map
  keys:
    name:
      description: Friendly name of the timer.
      required: false
      type: string
    icon:
      description: Set a custom icon for the entity.
      required: false
      type: icon
    alarm_time:
      description: Time of day to trigger the alarm.
      required: true
      type: time
    repeat_days:
      description: When set to an array of days, the alarm will repeat on those days unless turned off. If left empty, the alarm will trigger once and then turn off automatically.
      required: false
      type: list
      default: []
{% endconfiguration %}

Pick an icon from [Material Design Icons](https://pictogrammers.com/library/mdi/) to use for your alarm clock and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance`, or  `mdi:motorbike`.

## Possible states

| State | Description |
| ----- | ----------- |
| `on` | The alarm clock is turned on and will trigger at the next possible time. |
| `off` | The alarm clock is turned off and will not trigger. |

## Events

|           Event | Description |
| --------------- | ----------- |
| `alarm_clock.started` | Fired when the alarm clock is turned on |
| `alarm_clock.finished` | Fired when the alarm clock triggers |
| `alarm_clock.cancelled` | Fired when the alarm clock is canceled |
| `alarm_clock.changed` | Fired when the alarm clock's time is changed |

## Services

### Service `alarm_clock.turn_on`

Turn on the alarm clock. If a new `alarm_time` is provided, this will update the time of the alarm.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `alarm_clock.alarm0`. |
| `alarm_time`           |      yes | Alarm time in `hh:mm:ss` format. |

### Service `alarm_clock.turn_off`

Turn off the alarm clock.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `alarm_clock.alarm0`. |

### Service `alarm_clock.reload`

Reload `alarm_clock`'s configuration without restarting Home Assistant itself. This service takes no service data attributes.

### Use the service

Navigate to **Developer Tools** -> **Services** and select the `alarm_clock.turn_on` service, then click the **Fill Example Data** button. Now change the `entity_id` and `alarm_time` and click **Call Service** button.

## Examples

Gradually turn on the bedroom lights when the alarm is triggered.

```yaml
mode: single
trigger:
  - platform: event
    event_type: alarm_clock.finished
condition: []
action:
  - service: light.turn_on
    metadata: {}
    data:
      brightness_pct: 1
    target:
      entity_id: light.bedroom_lights
  - service: light.turn_on
    metadata: {}
    data:
      transition: 600
      brightness_pct: 100
    target:
      entity_id: light.bedroom_lights
```
