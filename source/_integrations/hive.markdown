---
title: "Hive"
description: "Instructions on how to integrate Hive devices with Home Assistant."
logo: hive.png
ha_category:
  - Hub
  - Binary Sensor
  - Climate
  - Light
  - Sensor
  - Switch
ha_release: 0.59
ha_iot_class: Cloud Polling
---

The `hive` integration is the main integration to set up and integrate all supported Hive devices. Once configured with the minimum required details it will detect and add all your Hive devices into Home Assistant, including support for multizone heating.

This integration uses the unofficial API used in the official Hive website [https://my.hivehome.com](https://my.hivehome.com), and you will need to use the same Username and Password you use on the Hive website to configure this Hive integration in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#Binary-Sensor)
- [Climate](#Climate)
- [Light](#Light)
- [Sensor](#Sensor)
- [Switch](#Switch)
- [Water Heater](#Water-Heater)

To add your Hive devices into your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
hive:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Your username from [https://my.hivehome.com](https://my.hivehome.com).
  required: true
  type: string
password:
  description: Your password from [https://my.hivehome.com](https://my.hivehome.com).
  required: true
  type: string
scan_interval:
  description: The time in minutes between Hive API calls
  required: false
  type: integer
  default: 2
{% endconfiguration %}

## Binary Sensor

The `hive` binary sensor integration integrates your Hive sensors into Home Assistant.

The platform supports the following Hive products:

- Hive Window or Door Sensor
- Hive Motion Sensor

## Climate

The `hive` climate platform integrates your Hive thermostat into Home Assistant, enabling control of setting the **mode** and setting the **target temperature**.

A short boost for Hive Heating can be set by using the **Boost** preset, this will turn on the boost feature for 30 minutes at 0.5 degrees higher than the current temperature.

The platform supports the following Hive products:

- Hive Active Heating
- Hive Multizone

## Light

The `hive` light platform integrates your Hive lights into Home Assistant, enabling control of various settings, depending on the model light.

The platform supports the following Hive products:

- Hive Active Light Dimmable
- Hive Active Light Cool to Warm White
- Hive Active Light Color Changing

## Sensor

The `hive` sensor integration exposes Hive data as a sensor.

The platform exposes the following sensors:

- Hive Hub Online Status
- Hive Outside Temperature

## Switch

The `hive` switch platform integrates your Hive plugs into Home Assistant, enabling control of your devices.

The platform supports the following Hive products:

- Hive Active Plug

## Water Heater

The `hive` water heater platform integrates your Hive hot water into Home Assistant, enabling control of setting the **mode**.

The platform supports the following Hive products:

- Hot Water Control
