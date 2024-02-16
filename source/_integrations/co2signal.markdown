---
title: Electricity Maps
description: Instructions on how to use the Electricity Maps (formerly known as CO2Signal) data within Home Assistant
ha_category:
  - Climate
  - Energy
  - Environment
ha_release: 0.87
ha_iot_class: Cloud Polling
ha_domain: co2signal
ha_platforms:
  - diagnostics
  - sensor
ha_config_flow: true
ha_integration_type: service
ha_codeowners:
  - '@jpbede'
  - '@VIKTORVAV99'
---

The `Electricity Maps` sensor platform (formerly known as CO2Signal) queries the [Electricity Maps](https://www.electricitymaps.com/) API for the CO2 intensity of a specific region. Data can be collected for your home by using the latitude/longitude or a country code. This API uses the same data as <https://app.electricitymaps.com>. Not all countries/regions in the world are supported, so please consult the app to check local availability.

## Prerequisites

To configure and use this integration, you need to obtain a free API key from Electricity Maps by signing up to the Free Tier product on the [Electricity Maps API Portal](https://electricitymaps.com/free-tier).

{% include integrations/config_flow.md %}

## Sensor types

When configured, the platform will create two sensors for each configured location: the carbon intensity expressed in `gCO2eq/kWh` and a percentage of how much the grid relies on fossil fuels for production.
