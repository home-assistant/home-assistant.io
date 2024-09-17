---
title: Intergas InComfort/Intouch Lan2RF gateway
description: Instructions on how to integrate an Intergas Lan2RF gateway with Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Sensor
  - Water heater
ha_release: 0.93
ha_iot_class: Local Polling
ha_codeowners:
  - '@jbouwh'
ha_domain: incomfort
ha_platforms:
  - binary_sensor
  - climate
  - sensor
  - water_heater
ha_integration_type: integration
ha_config_flow: true
---

The `incomfort` {% term integration %} links Home Assistant with your Intergas Lan2RF gateway, including the boiler and any room thermostats attached to it.

It uses the [incomfort](https://pypi.org/project/incomfort-client/) client library.

### Boiler

The boiler is represented as a **Water heater** device. It will report the boiler's `state` and `current_temperature`. The gateway does not expose any means to directly control the boiler or change its configuration.

Note that the `current_temperature` will switch between the CV (circulating volume) and Tap temperatures according to the current operating mode of the boiler.  If the boiler is neither pumping nor tapping, it will be reported as the higher of the two.

In addition, there is a **Sensor** for each of CV pressure, CV temperature, and Tap temperature, and a **Binary sensor** that will be `on` if there is a fault with the boiler (the fault code will be a state attribute).

### Rooms

Any room thermostats (there can be 0, 1 or 2) are represented as **Climate** devices. They will report the thermostat's `temperature` (setpoint, target temperature) and `current_temperature` and the setpoint can be changed.

{% include integrations/config_flow.md %}

The hub does not have to be in the same network as HA, but must be reachable via port 80/HTTP.

## Automation

To send an alert if the CV pressure is too low or too high, consider the following example:

{% raw %}

```yaml
- alias: "Low CV Pressure Alert"
  trigger:
    platform: numeric_state
    entity_id: sensor.cv_pressure
    below: 1.0
  action:
  - action: notify.pushbullet_notifier
    data:
      title: "Warning: Low CH Pressure"
      message: >-
        {{ trigger.to_state.attributes.friendly_name }}
        is low, {{ trigger.to_state.state }} bar.
```

{% endraw %}

Other properties are available via each device's attributes.
