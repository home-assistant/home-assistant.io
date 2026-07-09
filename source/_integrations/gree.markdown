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

The **Gree** {% term integration %} allows you to control a [Gree Smart HVAC](https://global.gree.com/) in Home Assistant.

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
- Tosot
- Wilfa

## Climate

The `gree` climate platform integrates Gree HVAC systems into Home Assistant, enabling control of setting the following parameters:

- [`set_hvac_mode`](/integrations/climate/#action-climateset_hvac_mode)
- [`target temperature`](/integrations/climate#action-climateset_temperature)
- [`turn on/off`](/integrations/climate#action-climateturn_on)
- [`fan mode`](/integrations/climate#action-climateset_fan_mode)
- [`swing mode`](/integrations/climate#action-climateset_swing_mode)
- [`swing horizontal mode`](/integrations/climate#action-climateset_swing_horizontal_mode)
- [`set_preset_mode`](/integrations/climate#action-climateset_preset_mode)

{% note %}
Preset mode **Away** represents Gree's "8°C heating mode."
{% endnote %}

### Swing modes

Both the vertical and horizontal airflow directions can be controlled independently, with granular position control.

{% important %}
The vertical swing mode values changed in Home Assistant 2026.x. If you have automations or scripts that use the old values (`off`, `vertical`, `horizontal`, or `both`), you will need to update them to use the new values listed below.
{% endimportant %}

The vertical swing mode controls the up/down airflow direction and supports the following positions:

- `default`: device default position
- `full_swing`: full vertical sweep
- `fixed_upper`: fixed at the upper position
- `fixed_upper_middle`: fixed at the upper-middle position
- `fixed_middle`: fixed at the middle position
- `fixed_lower_middle`: fixed at the lower-middle position
- `fixed_lower`: fixed at the lower position
- `swing_upper`: oscillates in the upper range
- `swing_upper_middle`: oscillates in the upper-middle range
- `swing_middle`: oscillates in the middle range
- `swing_lower_middle`: oscillates in the lower-middle range
- `swing_lower`: oscillates in the lower range

The horizontal swing mode controls the left/right airflow direction and supports the following positions:

- `default`: device default position
- `full_swing`: full horizontal sweep
- `left`: fixed at the left position
- `left_center`: fixed at the left-center position
- `center`: fixed at the center position
- `right_center`: fixed at the right-center position
- `right`: fixed at the right position

## Switch

Gree devices expose multiple switches to control various features:

- **Panel light**: turns the front panel light on/off.
- **Quiet mode**: enables/disables the quiet mode feature.
- **Xtra fan**: enables/disables extra fan mode to help remove moisture from coils.
