---
title: Gree Climate
description: Instructions on how to integrate Gree Smart devices within Home Assistant.
ha_category:
  - Climate
ha_release: 0.117
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@cmroche'
ha_domain: gree
ha_platforms:
  - climate
  - switch
ha_integration_type: integration
---

The Gree integration allows you to control a [Gree Smart HVAC](https://global.gree.com/) in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Climate](#climate)
- [Switch](#switch)

{% include integrations/config_flow.md %}

{% important %}
Devices must first be bound to WiFi using the Gree+ app, or app provided by the device manufacturer. It is not possible to connect devices to WiFi using this integration at the current time.
{% endimportant %}

## Supported models

Any Gree Smart device working with the Gree+ app should be supported, including non-Gree branded devices such some sold by:

- Trane
- Innova
- Cooper & Hunter
- Proklima
- Tadiran
- Heiwa
- Ekokai
- Lessar

## Climate

The `gree` climate platform integrates Gree HVAC systems into Home Assistant, enabling control of setting the following parameters:

- [`set_hvac_mode`](/integrations/climate/#action-climateset_hvac_mode)
- [`target temperature`](/integrations/climate#action-climateset_temperature)
- [`turn on/off`](/integrations/climate#action-climateturn_on)
- [`fan mode`](/integrations/climate#action-climateset_fan_mode)
- [`swing mode`](/integrations/climate#action-climateset_swing_mode)
- [`set_preset_mode`](/integrations/climate#action-climateset_preset_mode)

{% note %}
Preset mode **Away** represents Gree's "8°C heating mode."
{% endnote %}

## Switch

Gree devices expose multiple switches to control various features:

- Light Panel, turns the front panel light on/off.
- Quiet Mode, enables/disables the quiet mode feature.
- Xtra Fan, enables/disables extra fan mode to help remove moisture from coils.
