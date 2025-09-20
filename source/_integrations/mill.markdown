---
title: Mill
description: Instructions on how to integrate Mill heater into Home Assistant.
ha_category:
  - Climate
ha_release: 0.81
ha_iot_class: Local Polling
ha_codeowners:
  - '@danielhiversen'
ha_domain: mill
ha_config_flow: true
ha_platforms:
  - climate
  - number
  - sensor
ha_integration_type: integration
---

Integrates Mill heater into Home Assistant.

{% include integrations/config_flow.md %}

You can configure it for cloud access or local access.
Local access requires Generation 3 heaters (Sold from Autumn 2021).
A number entity can configure the maximum power of the heaters.


## Actions

This cloud integration supports an action to set the temperature for the room connected to heater in the Mill app:

`mill.set_room_temperature`

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `room_name` | no | String with room name.
| `away_temp` | yes | Integer with temperature
| `comfort_temp` | yes | Integer with temperature
| `sleep_temp` | yes | Integer with temperature
