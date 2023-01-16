---
title: CO2 Signal
description: Instructions on how to use CO2Signal data within Home Assistant
ha_category:
  - Environment
ha_release: 0.87
ha_iot_class: Cloud Polling
ha_domain: co2signal
ha_platforms:
  - diagnostics
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

The `co2signal` sensor platform queries the [CO2Signal](https://www.co2signal.com/) API for the CO2 intensity of a specific region. Data can be collected for your home, a specific latitude/longitude or by country code. This API uses the same data as <https://www.electricitymap.org>. Not all countries/regions in the world are supported so please consult this website to check local availability.

## Prerequisites

To configure and use this integration, you need to obtain a [free API key from CO2Signal](https://www.co2signal.com/).

{% include integrations/config_flow.md %}

## Sensor Types

When configured, the platform will create two sensors for each configured location: the carbon intensity expressed in `gCO2eq/kWh` and a percentage how much the grid relies on fossil fuels for production.
