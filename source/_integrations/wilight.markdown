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
ha_integration_type: hub
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

The fan uses the standard [fan actions](/integrations/fan/#actions). You can set the speed percentage, set the direction, toggle the fan, turn it off, or turn it on. WiLight fans have three speed levels: 33%, 66%, and 100%. If you set an intermediate percentage, Home Assistant uses the next higher WiLight speed level. Setting the speed to 0% turns the fan off.

## Irrigation

The **WiLight** {% term integration %} allows you to control your Irrigation from within Home Assistant. This is exposed via switches in Home Assistant.
There are two switch types for Irrigation: `watering switch` and `pause switch`.
A `watering switch` can turn on and off the irrigation valve, while the `pause switch` can disable / enable the action of a `watering switch`.
`Triggers` activate (turn on) the `watering switch` (irrigation valve) at the programmed time. The trigger can be set to run on a day of the week or only once (today).

{% include integrations/actions.md %}

The watering switch and pause switch also use the standard [switch actions](/integrations/switch/#actions).

Trigger rules:
- String with 8 decimal characters ("0" to "9").
- The first three characters (String[0,3]) represent an integer from 0 to 127, which corresponds to Bitfield of: 1 - Sunday, 2 - Monday, 4 - Tuesday, 8 - Wednesday, 16 - Thursday, 32 - Friday and 64 - Saturday. Setting zero, trigger is only valid for today.
- String[3,5] represents the hour of trigger, from 0 to 23.
- String[5,7] represents the minute of trigger, from 0 to 59.
- String[7,8] represents the enable trigger, 0 - disabled, 1- enabled.
