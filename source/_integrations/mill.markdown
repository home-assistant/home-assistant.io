---
title: Mill
description: Instructions on how to integrate Mill heater into Home Assistant.
ha_category:
  - Climate
ha_release: 0.81
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@danielhiversen'
ha_domain: mill
ha_config_flow: true
---

Integrates Mill heater into Home Assistant.

To add Mill to your installation, go to Configuration >> Integrations in the UI and enable the Mill integration.


## Component services

This platform supports a service to set the temperature for the room connected to heater in the Mill app:

`mill.set_room_temperature`


| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `room_name` | no | String with room name.
| `away_temp` | yes | Integer with temperature
| `comfort_temp` | yes | Integer with temperature
| `sleep_temp` | yes | Integer with temperature
