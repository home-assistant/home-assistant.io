---
title: WiLight
description: Instructions on how to integrate WiLight devices into Home Assistant.
ha_category:
  - Cover
  - Fan
  - Light
ha_release: 0.115
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@leofig-rj'
ha_domain: wilight
ha_quality_scale: silver
ha_ssdp: true
ha_platforms:
  - cover
  - fan
  - light
---

The `wilight` integration is to integrate [WiLight](http://www.wilight.com.br) devices with Home Assistant.

There is currently support for the following device types within Home Assistant:

- Cover (WiLight model C-103).
- Fan (WiLight model V-104).
- Light (WiLight model I-100, I-102 and I-107).

{% include integrations/config_flow.md %}

## Fan

The `wilight` integration allows you to control your Fans from within Home Assistant.

### Services

There are several services which can be used for automations and control of the fan:

| Service | Description |
| --------- | ----------- |
| `set_percentage` | Calling this service sets the fan speed (entity_id and percentage are required parameters). Percentage must be in the range 0-100, percentage = 0 turns off the fan. There are three speed levels 33%, 66% and 100%. Adjusting to intermediate levels goes to the next higher level.
| `set_direction` | Calling this service will set the fan direction (entity_id and direction are required parameters, and direction must be one of the following: forward or reverse). Calling this service will turn the fan on.
| `toggle` | Calling this service will toggle the fan between on and off states (entity_id is required).
| `turn_off` | Calling this service will turn the fan off (entity_id is required).
| `turn_on` | Calling this service will turn the fan on and set the speed and direction to the last used ones (defaults to high and forward, entity_id is required).
