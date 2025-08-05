---
title: Green Planet Energy
description: Instructions on how to integrate Green Planet Energy dynamic electricity pricing into Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2025.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@petschni'
ha_domain: green_planet_energy
ha_platforms:
  - sensor
ha_integration_type: service
---

The **Green Planet Energy** {% term integration %} provides real-time electricity pricing data from Green Planet Energy, a German renewable energy provider. It fetches hourly electricity prices and provides various sensors for energy optimization and monitoring. It was written for the purpose to visualize the prices so that you can adopt your power consumption and shift it to cheaper hours.

## Prerequisites

You need to be a Green Planet Energy customer with a dynamic pricing tariff to use this integration.

{% include integrations/config_flow.md %}

## Sensors

The **Green Planet Energy** integration provides the following sensors.

### Current price

- **Current price**: The current electricity price in EUR/kWh

### Hourly prices

- **Price XX:00**: Hourly electricity prices for each hour of the day (00:00 to 23:00)

### Statistics

- **Highest price today**: The highest electricity price for the current day
- **Lowest price day**: The lowest electricity price during day hours (6:00-18:00)
- **Lowest price night**: The lowest electricity price during night hours (18:00-6:00)
- **Price chart 24h**: 24-hour price chart data

## Examples

### Apex chart

You can visualize the electricity prices using the ApexCharts card:

````yaml
type: custom:apexcharts-card
header:
  title: Electricity prices - 24 hours
  show: true
graph_span: 24h
span:
  start: day
now:
  show: true
  label: Now
series:
  - entity: sensor.gpe_price_chart_24h
    type: column
    attribute: chart_data
    data_generator: |
      return entity.attributes.chart_data.map((entry) => {
        return [new Date(entry.datetime).getTime(), entry.price];
      });