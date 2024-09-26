---
title: Flipr
description: Instructions on how to integrate your Flipr device within Home Assistant.
ha_category:
  - Sensor
ha_release: 2021.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@cnico'
ha_domain: flipr
ha_platforms:
  - binary_sensor
  - select
  - sensor
  - switch
ha_integration_type: integration
---

[Go flipr](https://www.goflipr.com) company sells smart pool monitor and management devices. The Flipr and Flipr Hub devices publish data to the cloud via Wi-Fi and SigFox.
This {% term integration %} gives you access on Home Assistant to the information measured by your Flipr with the same data as the vendor's smartphone application.
This {% term integration %} gives you also access to the Flipr Hub to control your pool equipments like pump, heater, light, etc.

There is currently support for the following device types within Home Assistant:

- [Flipr](#flipr)
- [Hub](#hub)

## Prerequisites

You will need to use the standalone app for this device to register a username and password.

- [Google](https://play.google.com/store/apps/details?id=com.goflipr.flipr)
- [Apple](https://apps.apple.com/fr/app/flipr/id1225898851)

{% include integrations/config_flow.md %}

## Flipr

Flipr sends data like pH, chlorine or temperature to a cloud server on a regular basis in order to monitor your pool.

There is currently support for the following information within Home Assistant via **sensors** and **binary_sensors** :

## Entities

### Sensors

- **Chlorine**: the chlorine level
- **pH**: the pH level of the water
- **Water temperature**: the temperature of the water
- **Red OX**: the redox level of the water in mV
- **Last measure date**: the date of the last measure taken by the flipr
- **Battery level**: the battery level of the flipr in percentage

### Binary sensors

- **pH Status**: an indicator if the pH level is normal, too low, or too high
- **Chlorine status**: an indicator if the chlorine level is normal, too low, or too high

## Hub

The Hub lets you handle your equipment (pump, heater, light, etc.) from Home Assistant and all of the automation you can imagine.

- **Turn on/off** the switch inside the Hub and automatically set the Hub in manual mode.
- **Choose** the mode of the Hub between auto, planning and manual.

## Actions

The cloud data is polled every 15 minutes. If you want to force a refresh of the data, you can use the `homeassistant.update_entity` action.

## Tips

It is recommended that you create your own card with the following sensors where \[fliprid\] is the id of your flipr:

- `sensor.flipr_[fliprid]_chlorine`
- `sensor.flipr_[fliprid]_ph`
- `sensor.flipr_[fliprid]_red_ox`
- `sensor.flipr_[fliprid]_water_temp`
- `sensor.flipr_[fliprid]_last_measured`
- `sensor.flipr_[fliprid]_battery_level`

Leave `binary_sensor.flipr_[fliprid]_ph_status` and `binary_sensor.flipr_[fliprid]_chlorine_status` as badges.
