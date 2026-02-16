---
title: Green Planet Energy
description: Instructions on how to integrate Green Planet Energy dynamic electricity pricing into Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2026.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@petschni'
ha_domain: green_planet_energy
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

The **Green Planet Energy** {% term integration %} provides real-time electricity pricing data from Green Planet Energy, a German renewable energy provider. It fetches hourly electricity prices and provides various sensors for energy optimization and monitoring. It visualizes the prices so that you can adapt your power consumption and shift it to cheaper hours.

## Prerequisites

You don't need to have an account with Green Planet Energy for this integration to work. However, the integration will probably only make sense if you are their customer with a dynamic energy tariff. For the setup, no additional information is required.

{% include integrations/config_flow.md %}

## Sensors

The **Green Planet Energy** integration provides the following sensors.

### Current price

- **Current price**: The current electricity price in EUR/kWh

### Statistics

- **Highest price today**: The highest electricity price for the current day
- **Lowest price day**: The lowest electricity price during day hours (6:00-18:00)
- **Lowest price night**: The lowest electricity price during night hours (18:00-6:00)

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

## Disclaimer

This plugin is third-party and not offered by Green Planet Energy eG.
