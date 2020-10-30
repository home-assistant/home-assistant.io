---
title: Interlogix UltraSync Hub
description: Instructions on how to integrate your Interlogix UltraSync Hub within Home Assistant.
ha_category:
  - Alarm
logo: informix.png
ha_iot_class: Local Polling
ha_release: 0.119
ha_config_flow: true
ha_codeowners:
  - '@caronc'
ha_domain: ultrasync
---

The `ultrasync` platform will allow you to monitor and control your Interlogix UltraSync Hub from within Home Assistant and setup automation.

## Configuration

Go to the integrations page in your configuration and click on new integration -> UltraSync.

**Note**: You can only be logged into the ZeroWire/UltraSync hub with the same user once; a subsequent login with the same user logs out the other. Since Home Assistant (HA) actively polls and maintains a login session to this Hub, it can prevent you from being able to log into at the same time elsewhere (via it's website). It is strongly recommended that you create a second user account on your Hub dedicated for just HA.

## Sensor

This component will create these sensors:
- `area01_state`: The Area 1 State
- `area02_state`: The Area 2 State (*if in use*)
- `area03_state`: The Area 2 State (*if in use*)
- `area04_state`: The Area 2 State (*if in use*)

## Event Automation

When an Zone or Sensor changes it's state an event usable for automation is triggered on the Home Assistant Bus.

Possible events are:

- `ultrasync_sensor_update`

The event includes the sensor no, name, and new status it changed to.

Example automation to send a Telegram message on a completed download:
{% raw %}

```yaml
- alias: House Movement
  trigger:
    platform: event
    event_type: ultrasync_sensor_update
  action:
    service: notify.apprise
    data:
      title: "Sensor activated!"
      message: "{{trigger.event.data.name}} has new status {{trigger.event.data.status}}"
```

{% endraw %}

## Services

Available services:

- `stay`: Set alarm scene to Stay Mode
- `away`: Set alarm scene to Away Mode (fully activate Alarm)
- `disarm`: Disarm the alarm
