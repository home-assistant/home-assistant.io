---
title: Wireless Sensor Tags
description: Instructions on how to integrate your Wireless Tags sensors within Home Assistant.
ha_category:
  - Binary sensor
  - Hub
  - Sensor
  - Switch
ha_iot_class: Cloud Push
ha_release: 0.68
ha_domain: wirelesstag
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_codeowners:
  - '@sergeymaysak'
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Wireless Sensor Tags** {% term integration %} allows you to integrate your [wirelesstag.net](https://wirelesstag.net/) sensors tags in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)
- [Switch](#switch)

## Configuration

To enable tags set up with your [wirelesstag.net](https://wirelesstag.net/) account, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
wirelesstag:
  username: you@example.com
  password: secret
```

{% configuration %}
username:
  description: Username for your wirelesstag.net account.
  required: true
  type: string
password:
  description: Password for your wirelesstag.net account.
  required: true
  type: string
{% endconfiguration %}

## Binary sensor

To enable the binary sensor platform for your tags, set up with your [wirelesstag.net](https://wirelesstag.net/) account. Add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: wirelesstag
    monitored_conditions:
      - presence
      - door
      - battery
```

{% configuration %}
monitored_conditions:
  description: The conditions types to monitor.
  required: true
  type: list
  keys:
    presence:
      description: On means in range, Off means out of range.
    motion:
      description: On when a movement was detected, Off when clear.
    door:
      description: On when a door is open, Off when the door is closed.
    cold:
      description: On means temperature become too cold, Off means normal.
    heat:
      description: On means hot, Off means normal.
    dry:
      description: On means too dry (humidity), Off means normal.
    wet:
      description: On means too wet (humidity), Off means normal.
    light:
      description: On means light detected, Off means no light.
    moisture:
      description: On means moisture detected (wet), Off means no moisture (dry).
    battery:
      description: On means tag battery is low, Off means normal.
{% endconfiguration %}

## Sensor

To enable the sensor platform for your tags, set up with your [wirelesstag.net](https://wirelesstag.net/) account. Add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: wirelesstag
    monitored_conditions:
      - temperature
      - humidity
```

{% configuration %}
monitored_conditions:
  description: The metrics types to monitor.
  required: true
  type: list
  keys:
    temperature:
      description: Value is in Celsius or Fahrenheit (according to your settings at Tag Manager).
    humidity:
      description: "Humidity level in %."
    moisture:
      description: "Water level/soil moisture in % (applicable for Water Tag only)."
    light:
      description: Brightness in lux (if supported by tag).
    ambient_temperature:
      description: If your device is Outdoor Probe with ambient temperature - use this sensor.
{% endconfiguration %}

## Switch

To enable the switch platform for your tags, set up with your [wirelesstag.net](https://wirelesstag.net/) account. Add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: wirelesstag
    monitored_conditions:
      - motion
      - humidity
```

{% configuration %}
monitored_conditions:
  description: The metrics types to control.
  required: true
  type: list
  keys:
    temperature:
      description: Control arm/disarm temperature monitoring.
    humidity:
      description: Control arm/disarm humidity monitoring.
    motion:
      description: Control arm/disarm motion and door open/close events monitoring.
    light:
      description: Control monitoring of light changes.
    moisture:
      description: Control monitoring of water level/soil moisture for water sensor.
{% endconfiguration %}

Arm/Disarm of motion switch is required to receive motion and door binary sensors events.
Others are only needed if you want to receive push notifications from tags on a specific range of changes in temperature, humidity, light or moisture.
