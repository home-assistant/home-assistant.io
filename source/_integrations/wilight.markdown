---
title: WiLight
description: Instructions on how to integrate WiLight devices into Home Assistant.
ha_category:
  - Cover
  - Fan
  - Irrigation
  - Light
  - Switch
ha_release: 0.115
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@leofig-rj'
ha_domain: wilight
ha_ssdp: true
ha_platforms:
  - cover
  - fan
  - light
  - switch
ha_integration_type: integration
---

The **WiLight** {% term integration %} is to integrate [WiLight](http://www.wilight.com.br) devices with Home Assistant.

There is currently support for the following device types within Home Assistant:

- Cover (WiLight model C-103).
- [Fan](#fan) (WiLight model V-104).
- Light (WiLight model I-100, I-102, I-107, I-110 and I-112).
- [Irrigation](#irrigation) / Switch (WiLight model R-105).

{% include integrations/config_flow.md %}

## Fan

The **WiLight** {% term integration %} allows you to control your Fans from within Home Assistant.

### Fan actions

There are several actions which can be used for automations and control of the fan:

| Action | Description |
| --------- | ----------- |
| `set_percentage` | Calling this action sets the fan speed (`entity_id` and `percentage` are required parameters). Percentage must be in the range 0-100, percentage = 0 turns off the fan. There are three speed levels 33%, 66% and 100%. Adjusting to intermediate levels goes to the next higher level.
| `set_direction` | Calling this action will set the fan direction (`entity_id` and `direction` are required parameters, and direction must be one of the following: forward or reverse). Calling this action will turn the fan on.
| `toggle` | Calling this action will toggle the fan between on and off states (`entity_id` is required).
| `turn_off` | Calling this action will turn the fan off (`entity_id` is required).
| `turn_on` | Calling this action will turn the fan on and set the speed and direction to the last used ones (defaults to high and forward, `entity_id` is required).

## Irrigation

The **WiLight** {% term integration %} allows you to control your Irrigation from within Home Assistant. This is exposed via switches in Home Assistant.
There are two switch types for Irrigation: `watering switch` and `pause switch`.
A `watering switch` can turn on and off the irrigation valve, while the `pause switch` can disable / enable the action of a `watering switch`.
`Triggers` activate (turn on) the `watering switch` (irrigation valve) at the programmed time. The trigger can be set to run on a day of the week or only once (today).

### Irrigation actions

There are several actions which can be used for automations and control of the Irrigation:

- For `watering switch`:

| Action | Description |
| --------- | ----------- |
| `turn_off` | Calling this action will turn the irrigation valve off (`entity_id` is required).
| `turn_on` | Calling this action will turn the irrigation valve on (`entity_id` is required).
| `set_watering_time` | Calling this action sets the watering time (`entity_id` and `watering_time` are required parameters), `watering_time` must be in the range 1-1800 seconds.
| `set_trigger` | Calling this action sets the trigger_1, trigger_2, trigger_3 or trigger_4 (`entity_id`, `trigger_index` and `trigger` are required parameters), `trigger_index` must be between 1 and 4 and `trigger` must be according Trigger rules (see below).

- For `pause switch`:

| Action | Description |
| --------- | ----------- |
| `turn_off` | Performing this action will turn the pause switch off, enabling watering switch (`entity_id` is required).
| `turn_on` | Performing this action will turn the pause switch on, disabling watering switch (`entity_id` is required).
| `set_pause_time` | Performing this action sets the pause time (`entity_id` and `pause_time` are required parameters), `pause_time` must be in the range 1-24 hours.

Trigger rules:
- String with 8 decimal characters ("0" to "9").
- The first three characters (String[0,3]) represent an integer from 0 to 127, which corresponds to Bitfield of: 1 - Sunday, 2 - Monday, 4 - Tuesday, 8 - Wednesday, 16 - Thursday, 32 - Friday and 64 - Saturday. Setting zero, trigger is only valid for today.
- String[3,5] represents the hour of trigger, from 0 to 23.
- String[5,7] represents the minute of trigger, from 0 to 59.
- String[7,8] represents the enable trigger, 0 - disabled, 1- enabled.
