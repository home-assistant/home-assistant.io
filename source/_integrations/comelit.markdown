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

The Comelit SimpleHome integration allows you to control your [Comelit home automation devices](https://comelitgroup.it/installatore/offerta/domotica-e-smart-home).

There is support for the following platform types within Home Assistant:

- **Comelit Serial Bridge** - allows local control for light, cover, irrigation, climate, humidifier/dehumidifier and "other" devices; creates power sensors.
- **Comelit VEDO System** - allows local control of the alarm system.

{% include integrations/config_flow.md %}

## Alarm control panel

The integration will create an alarm entity for each area. Additionally, it will create a sensor and a presence detection binary sensor for each zone, enhancing monitoring capabilities.
