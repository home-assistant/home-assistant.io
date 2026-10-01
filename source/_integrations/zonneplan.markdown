---
title: Zonneplan
description: Get electricity and gas prices from Zonneplan in Home Assistant.
ha_category:
  - Energy
ha_release: "2026.10"
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@erwindouna'
ha_domain: zonneplan
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: hub
---

The **Zonneplan** {% term integration %} lets you retrieve electricity and gas price information from [Zonneplan](https://www.zonneplan.nl/), a Dutch provider of dynamic energy contracts and energy services, including home batteries and EV charge points.
This integration currently provides electricity and gas price entities, your electricity and gas usage and costs for the current month, and the status of your Zonneplan home battery.

## Prerequisites

To use this integration, you need an active Zonneplan account.

{% include integrations/config_flow.md %}

During setup, you are asked for the email address linked to your Zonneplan account. Zonneplan then sends a one-time password to that email address, which you need to enter to complete the setup.

## Data updates

The Zonneplan integration retrieves data from the Zonneplan cloud API on a regular interval: prices and usage every 15 minutes, and the status of each home battery every 5 minutes.

## Supported functionality

### Sensors

The following sensors are provided by this integration:

- **Current electricity price**: The electricity price for the current hour.
- **Next hour electricity price**: The electricity price for the next hour.
- **Current electricity tariff group**: How Zonneplan classifies the price of the current hour: Low, Normal, or High.
- **Current sustainability score**: Zonneplan's score, from 0 to 100%, for how sustainable the electricity supplied in the current hour is.
- **Lowest electricity price today**: The lowest electricity price for today.
- **Highest electricity price today**: The highest electricity price for today.
- **Lowest electricity price tomorrow**: The lowest electricity price for tomorrow, once published (typically around 13:00 CET/CEST).
- **Highest electricity price tomorrow**: The highest electricity price for tomorrow, once published (typically around 13:00 CET/CEST).
- **Electricity prices tomorrow status**: Indicates whether tomorrow's electricity prices are already `available`, or still `incoming`.
- **Gas price daily**: The gas price for today.
- **Electricity used this month**: The electricity you used from the grid so far this month, in kWh.
- **Electricity returned this month**: The electricity you returned to the grid so far this month, in kWh.
- **Gas used this month**: The gas you used so far this month, in m³.
- **Electricity cost this month**: The electricity delivery costs so far this month, including tax.
- **Gas cost this month**: The gas delivery costs so far this month, including tax.

The **Electricity price low today start time** and **Electricity price low today end time** sensors mark the block of consecutive hours around today's lowest price. The matching **tomorrow** sensors do the same for tomorrow, once its prices are published. This lets you build automations that act on the entire block of cheap hours instead of a single hour.

### Binary sensors

- **Electricity price low**: On while the current hour falls in today's block of cheapest hours, the same block as the low price start and end time sensors. Off at all other hours. The state updates at the start of every hour.

#### Home battery

If your account has a Zonneplan home battery, the integration adds a device for each battery with these binary sensors:

- **Home optimization active**: On while home optimization is actively steering the battery.
- **Grid congestion**: On while grid congestion is limiting the battery.
- **Load balancing overload**: On while dynamic load balancing is limiting the battery to prevent overloading your grid connection.
- **Backup power active**: On while the battery supplies backup power to your home.

## Known limitations

The integration does not yet expose entities for Zonneplan EV charge points or solar panels. For home batteries, only the binary sensors listed above are available.

Zonneplan receives usage data from your grid operator a day or more after the fact, so the monthly usage and cost sensors lag behind, and a day's values can still change afterwards. They stay unknown until the month has data. Because of this delay, these sensors are not suitable for the energy dashboard.

## Removing the integration

{% include integrations/remove_device_service.md %}
