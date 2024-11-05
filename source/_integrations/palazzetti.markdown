---
title: Palazzetti
description: Instructions on how to integrate Palazzetti within Home Assistant.
ha_category:
  - Climate
ha_release: 2024.11
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@dotvav'
ha_domain: palazzetti
ha_platforms:
  - climate
ha_integration_type: device
---

The **Palazzetti** {% term integration %} integrates the [Palazzetti](https://palazzettigroup.com/)
stoves equipped with a [Connection Box](https://palazzettigroup.com/research-and-development/app/).
It is accessing the device's local API.

{% include integrations/config_flow.md %}

## Climate

The Palazetti integration offers a climate entity that allows you to read the
room temperature, start and stop the stove, set the target temperature, and set
the fan speed.

### Integration actions

This integration supports the following actions (see [Climate](/integrations/climate/)).

- [`set_temperature`](/integrations/climate/#action-climateset_temperature)
- [`set_hvac_mode`](/integrations/climate/#action-climateset_hvac_mode)
  - `heat` for heating mode
  - `off` to turn the stove off
- [`set_fan_mode`](/integrations/climate/#action-climateset_fan_mode)
  - `Silent` let the stove run in silent mode
  - `1`, `2`, `3`, `4`, `5` increasing fan speeds
  - `High` the highest available fan speed
  - `Auto` let the stove set the optimal fan speed
