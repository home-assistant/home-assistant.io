---
title: Interlogix UltraSync Hub
description: Instructions on how to integrate your Interlogix UltraSync Hub within Home Assistant.
ha_category:
  - Alarm
ha_iot_class: Local Polling
ha_release: 0.119
ha_config_flow: true
ha_codeowners:
  - '@caronc'
ha_domain: ultrasync
---

The `ultrasync` platform will allow you to monitor and control your Interlogix and/or ComNav NX-595E UltraSync Hub from within Home Assistant and setup automation.

## Configuration

Go to the integrations page in your configuration and click on new integration -> UltraSync.

**Note**: You can only be logged into the ZeroWire/UltraSync hub with the same user once; a subsequent login with the same user logs out the other. Since Home Assistant (HA) actively polls and maintains a login session to this Hub, it can prevent you from being able to log into at the same time elsewhere (via it's website). It is strongly recommended that you create a second user account on your Hub dedicated for just HA.

## Sensor

This component will create these sensors in the format of `{ultrasync_hubname}_{sensor}`;  The below example assumes you accept the default name of `UltraSync` (which is still represented in lowercase):
- `ultrasync_area1state`: The Area 1 State
- `ultrasync_area2state`: The Area 2 State
- `ultrasync_area3state`: The Area 3 State
- `ultrasync_area4state`: The Area 4 State

There are several states each sensor can be at, but usually they will be one of the following: `Unknown`, `Ready`, `Not Ready`, `Armed Stay`, and `Armed Away`.  The `Unknown` state is assigned to sensors that are not reporting; they usually sit in the spots of the Area's you're not monitoring.

## Event Automation

When an Zone or Sensor changes it's state an event usable for automation is triggered on the Home Assistant Bus.

Possible events are:

- `ultrasync_sensor_update`: The event includes the sensor no, name, and new status it changed to.
- `ultrasync_area_update`: The event includes the area no, name, and new status it changed to (if it did). **Note**: Area's are sent periodic heartbeats in which case the state will not change at all.

Example automation to send a message via [Apprise](https://www.home-assistant.io/integrations/apprise/) on a sensor change in your home:
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

As an example you may want to `arm` your alarm in `stay` mode each night and disarm it in the morning like so:
{% raw %}

```yaml
# Alarm Activation
- alias: Activate Nightly Alarm
  trigger:
    platform: time
    at: "23:00:00"
  action:
    service: ultrasync.stay

# Alarm Deactivation
- alias: Disarm Nightly Alarm
  trigger:
    platform: time
    at: "06:00:00"
  action:
    service: ultrasync.disarm
```

{% endraw %}
