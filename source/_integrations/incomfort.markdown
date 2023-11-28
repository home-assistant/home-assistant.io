---
title: Intergas InComfort/Intouch Lan2RF gateway
description: Instructions on how to integrate an Intergas Lan2RF gateway with Home Assistant.
ha_category:
  - Binary Sensor
  - Climate
  - Sensor
  - Water Heater
ha_release: 0.93
ha_iot_class: Local Polling
ha_codeowners:
  - '@zxdavb'
ha_domain: incomfort
ha_platforms:
  - binary_sensor
  - climate
  - sensor
  - water_heater
ha_integration_type: integration
---

The `incomfort` integration links Home Assistant with your Intergas Lan2RF gateway, including the boiler and any room thermostats attached to it.

It uses the [incomfort](https://pypi.org/project/incomfort-client/) client library.

### Boiler

The boiler is represented as a **Water Heater** device. It will report the boiler's `state` and `current_temperature`. The gateway does not expose any means to directly control the boiler or change its configuration.

Note that the `current_temperature` will switch between the CV (circulating volume) and Tap temperatures according to the current operating mode of the boiler.  If the boiler is neither pumping nor tapping, it will be reported as the higher of the two.

In addition, there is a **Sensor** for each of CV pressure, CV temperature, and Tap temperature, and a **Binary Sensor** that will be `on` if there is a fault with the boiler (the fault code will be a state attribute).

### Rooms

Any room thermostats (there can be 0, 1 or 2) are represented as **Climate** devices. They will report the thermostat's `temperature` (setpoint, target temperature) and `current_temperature` and the setpoint can be changed.

## Configuration

To set up this integration, add one of the following to your `configuration.yaml` file:

The hub does not have to be in the same network as HA, but must be reachable via port 80/HTTP.

### Older gateways

Older gateways do not require user authentication:

```yaml
# Example configuration.yaml entry, older firmware with no user credentials
incomfort:
  host: IP_ADDRESS
```

### Newer gateways

Alternatively, if a **username** & **password** is printed on the back of the gateway:

```yaml
# Example configuration.yaml entry, newer firmware with user credentials
incomfort:
  host: IP_ADDRESS
  username: USERNAME
  password: PASSWORD
```

{% configuration %}
host:
  description: The hostname/IP address of the Lan2RF gateway.
  required: true
  type: string
username:
  description: "The username of the Lan2RF gateway, if any. Most likely: `admin`."
  required: inclusive
  type: string
password:
  description: "The password of the Lan2RF gateway, if any. Most likely: `intergas`."
  required: inclusive
  type: string
{% endconfiguration %}

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
  - service: notify.pushbullet_notifier
    data:
      title: "Warning: Low CH Pressure"
      message: >-
        {{ trigger.to_state.attributes.friendly_name }}
        is low, {{ trigger.to_state.state }} bar.
```

{% endraw %}

Other properties are available via each device's attributes.
