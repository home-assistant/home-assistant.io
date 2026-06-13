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

The **Green Planet Energy** {% term integration %} provides real-time electricity pricing data from [Green Planet Energy](https://www.greenplanet.energy/), a German renewable energy provider. It fetches 15-minute electricity prices and exposes various sensors for energy monitoring and optimization. Use it to shift your power consumption to cheaper hours and make the most of a dynamic electricity tariff.

## Prerequisites

You don't need an account with Green Planet Energy to set up this integration. However, it is most useful if you are a customer with a dynamic electricity tariff. No credentials are required during setup.

{% include integrations/config_flow.md %}

## Supported functionality

### Entities

The **Green Planet Energy** integration provides the following sensor entities.

#### Sensors

- **Current price**: The current electricity price in EUR/kWh.
- **Highest price today**: The highest electricity price for the current day in EUR/kWh.
- **Highest price time**: The timestamp when today's highest price occurs.
- **Lowest price day (06:00–18:00)**: The lowest electricity price during daytime hours in EUR/kWh.
- **Lowest price day time (06:00–18:00)**: The timestamp when the lowest daytime price occurs.
- **Lowest price night (18:00–06:00)**: The lowest electricity price during nighttime hours in EUR/kWh.
- **Lowest price night time (18:00–06:00)**: The timestamp when the lowest nighttime price occurs.

## Actions

{% include integrations/green_planet_energy_actions.html %}

## Examples

### Show upcoming prices as a chart

You can use the `get_prices` action together with a [template sensor](/integrations/template/) to create a sensor that holds the upcoming price data as an attribute. This makes it easy to display a price chart on your dashboard.

Add the following to your {% term "`configuration.yaml`" %} file. After you save your changes, restart Home Assistant or reload your template configuration to apply them.

{% raw %}

```yaml
template:
  - triggers:
      - trigger: time_pattern
        minutes: "/15"
    actions:
      - action: green_planet_energy.get_prices
        data:
          hours: 6
        response_variable: result
    sensor:
      - name: "Green Planet Energy next 6 hours"
        state: "{{ result.prices | length }}"
        unit_of_measurement: "slots"
        attributes:
          prices: "{{ result.prices }}"
          hours_requested: "{{ result.hours_requested }}"
```

{% endraw %}

## Known limitations

- Prices are bare market prices and do not include energy taxes, grid fees, or other surcharges charged by your energy provider.
- Price slots beyond today and tomorrow are not available and are omitted from the `get_prices` response.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

## Disclaimer

This integration is a third-party community project and is not affiliated with or endorsed by Green Planet Energy eG.
