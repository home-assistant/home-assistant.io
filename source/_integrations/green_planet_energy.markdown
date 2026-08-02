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

{% include integrations/actions.md %}

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

- Price slots beyond today and tomorrow are not available and are omitted from the `get_prices` response.



## Examples

### Find the cheapest time for your dishwasher

Your dishwasher needs 3.5 hours to run. This example shows how to create sensors that display when the cheapest 3.5-hour window occurs during the night.

Add the following to your {% term "`configuration.yaml`" %} file:
{% include integrations/restart_ha_after_config_inclusion.md %}

{% raw %}

```yaml
template:
  - triggers:
      - trigger: time_pattern
        hours: "*"
    actions:
      - action: green_planet_energy.get_cheapest_duration
        data:
          entity_id: sensor.green_planet_energy_current_price
          duration: 3.5
          time_range: night
        response_variable: cheapest
    sensor:
      - name: "Cheapest 3.5-hour start time"
        state: "{{ cheapest.start_time }}"
        device_class: timestamp
        attributes:
          average_price: "{{ cheapest.average_price }}"
          hours_until_start: "{{ cheapest.hours_until_start }}"
          duration: "{{ cheapest.duration }}"
          time_range: "{{ cheapest.time_range }}"

      - name: "Cheapest 3.5-hour time until start"
        state: "{{ cheapest.hours_until_start }}"
        unit_of_measurement: "h"
        state_class: measurement

      - name: "Cheapest 3.5-hour average price"
        state: "{{ cheapest.average_price }}"
        unit_of_measurement: "€/kWh"
        state_class: measurement
```

{% endraw %}

This creates three sensors:

- `sensor.cheapest_3_5h_start_time`: Shows when to start your dishwasher.
- `sensor.cheapest_3_5h_hours_until`: Shows how many hours until the optimal time.
- `sensor.cheapest_3_5h_average_price`: Shows the average price during that period.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

## Disclaimer

This integration is a third-party community project and is not affiliated with or endorsed by Green Planet Energy eG.
