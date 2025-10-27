---
title: Roth Touchline SL
description: Instructions on how to integrate Roth Touchline SL within Home Assistant.
ha_category:
  - Climate
ha_release: 2024.9
ha_iot_class: Cloud Polling
ha_domain: touchline_sl
ha_platforms:
  - climate
ha_integration_type: hub
ha_codeowners:
  - '@jnsgruk'
ha_config_flow: true
---

The **Roth Touchline SL** climate integration enables you to control [Roth Touchline SL](https://www.roth-uk.com/products/control-systems/roth-touchliner-sl-wireless-system) underfloor heating systems.

## Prerequisites

You must have an account registered with the [Roth Touchline SL dashboard](https://roth-touchlinesl.com/login).

{% include integrations/config_flow.md %}

## Entities

The integration will present each Roth Touchline SL zone as a climate entity, which can:

- Display the current temperature
- Display the current humidity
- Display when the zone is being actively heated or cooled.
- Set a target temperature
- Assign to a configured "Global Schedule" using Home Assistant climate entity presets.
