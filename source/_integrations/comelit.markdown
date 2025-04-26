---
title: Comelit SimpleHome
description: Instructions on how to integrate Comelit SimpleHome home automation devices into Home Assistant.
ha_category:
  - Alarm
  - Climate
  - Cover
  - Humidifier
  - Light
  - Sensor
  - Switch
ha_release: '2023.9'
ha_domain: comelit
ha_config_flow: true
ha_codeowners:
  - '@chemelli74'
ha_iot_class: Local Polling
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - climate
  - cover
  - diagnostics
  - humidifier
  - light
  - sensor
  - switch
ha_integration_type: hub
---

The **Comelit SimpleHome** {% term integration %} allows you to control your [Comelit home automation devices](https://comelitgroup.it/installatore/offerta/home-building-automation/).

## Supported devices

There is support for the following devices within Home Assistant:

- **Comelit Serial Bridge**
- **Comelit VEDO System**

{% include integrations/config_flow.md %}

{% configuration_basic %}
  host:
    description: The IP address of the Comelit SmartHome device.
  port:
    description: The TCP port of the Comelit SmartHome device. The default is port 80 (standard for HTTP).
  pin:
    description: The PIN of the Comelit SmartHome device.
  type:
    description: The type of Comelit SmartHome device.
    keys:
      bridge:
        description: Comelit Serial Bridge.
      vedo:
        description: Comelit VEDO System.
{% endconfiguration_basic %}

## Data updates

This integration {% term polling polls %} data from the device every 5 seconds by default.

## Supported functionality

The **Comelit SimpleHome** {% term integration %} provides the following entities:

### Comelit Serial Bridge

- Climate
- Cover
- Dehumidifier
- Humidifier
- Light
- Sensor - power consumption
- Switch - irrigation and sockets (other)

### Comelit VEDO System

- Alarm control panel - per area
- Binary sensor - per zone presence detection
- Sensor - per zone status

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
