---
title: Zonneplan
description: Instructions on how to integrate Zonneplan within Home Assistant.
ha_category:
  - Energy
ha_release: 2026.10
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@erwindouna'
ha_domain: zonneplan
ha_platforms:
  - sensor
ha_integration_type: hub
---

The Zonneplan {% term integration %} allows you to retrieve electricity and gas price information from [Zonneplan](https://www.zonneplan.nl/), a Dutch dynamic energy contract provider, energy supplier, batteries and EV charge points.
The integration is under active development and features will be expanded gradually.

## Prerequisites

To use this integration, you need an active Zonneplan account.

{% include integrations/config_flow.md %}

During setup, you are asked for the email address linked to your Zonneplan account. Zonneplan then sends a one-time password to that email address, which you need to enter to complete the setup.

## Data updates

The Zonneplan integration retrieves data from the Zonneplan cloud API on a regular interval, every 15 minutes.

## Supported functionality

### Sensors

The following sensors are provided by this integration:

- **Current electricity price**: The electricity price for the current hour.
- **Lowest electricity price today**: The lowest electricity price for today.
- **Highest electricity price today**: The highest electricity price for today.
- **Lowest electricity price tomorrow**: The lowest electricity price for tomorrow, once available at 13:00 CET.
- **Highest electricity price tomorrow**: The highest electricity price for tomorrow, once available at 13:00 CET.
- **Electricity prices tomorrow status**: Indicates whether tomorrow's electricity prices are already `available`, or still `incoming`.
- **Gas price daily**: The gas price for today.

The lowest and highest electricity price sensors also expose a `start` and `end` timestamp attribute, marking the block of consecutive hours around that day's extreme price. This lets you build automations that act on the entire block of cheap or expensive hours instead of a single hour.

## Known limitations

Zonneplan also offers home batteries and EV charge points as part of its product line, but this integration does not yet expose entities for them. Only electricity and gas price data is currently supported.

{% include integrations/remove_device_service.md %}
