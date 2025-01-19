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

### Rooms

Any room thermostats (there can be 0, 1 or 2) are represented as **Climate** devices. They will report the thermostat's `temperature` (setpoint, target temperature) and `current_temperature` and the setpoint can be changed.

{% include integrations/config_flow.md %}

The hub does not have to be in the same network as HA, but must be reachable via port 80/HTTP.

The above configuration can also be adjusted later via
{% my integrations title="**Settings** > **Devices & services**" %},
select "Intergas InComfort/Intouch Lan2RF gateway" and click {% icon "mdi:dots-vertical" %} and select **Reconfigure**.

{% important %}

Some older room thermostats might report the wrong setpoint when the setpoint is manually changed on the room thermostat. If you encounter this behavior, you can enable the `Legacy setpoint handling` option.

{% endimportant %}

{% include integrations/option_flow.md %}

### Sensors for diagnostics

Note that **all** sensors are disabled by default.

- **Sensors**
  - Boiler Pressure: Indicates the boilers pressure.
  - Boiler Temperature: Indicates the central heating temperature.
  - Boiler Tap temperature: Indicates the tap water temperature.
- **Binary sensors**
  - Boiler Burner: Indicates if the burner is on.
  - Boiler Fault: Indicates if there is a problem. The fault code is set as an attribute.
  - Boiler Hot water tap: Indicates if the hot water tap is running.
  - Boiler Pump: Indicate the pump is running for cental heating.

## Automation

To send an alert if the CV pressure is too low or too high, consider the following example:

{% raw %}

```yaml
- alias: "Low CV Pressure Alert"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.boiler_pressure
      below: 1.0
  actions:
    - action: notify.pushbullet_notifier
      data:
        title: "Warning: Low CH Pressure"
        message: >-
          {{ trigger.to_state.attributes.friendly_name }}
          is low, {{ trigger.to_state.state }} bar.
```

{% endraw %}

Other properties are available via each device's attributes.
