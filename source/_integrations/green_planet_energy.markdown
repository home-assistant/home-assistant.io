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

## Actions

The integration provides the following actions.

### Action: Get cheapest duration

The `green_planet_energy.get_cheapest_duration` action allows you to find the cheapest time window for any duration between 0.5 and 24 hours.

In YAML, refer to this action as `green_planet_energy.get_cheapest_duration`.

{% example %}
action: |
  action: green_planet_energy.get_cheapest_duration
  data:
    entity_id: sensor.green_planet_energy_current_price
    duration: 3.5
    time_range: night
{% endexample %}

#### Options in YAML

{% configuration %}
entity_id:
  description: Green Planet Energy sensor entity used to identify the integration instance.
  required: true
  type: string
duration:
  description: Duration in hours for which to find the cheapest time window.
  required: true
  type: float
time_range:
  description: Time range to search within.
  required: false
  type: string
{% endconfiguration %}

Accepted values for `duration` are from `0.5` up to `24`.
Accepted values for `time_range` are `full_day`, `day`, or `night`. The default is `full_day`.

#### Response data

The action returns the following information:

```json
{
  "duration": 3.5,
  "average_price": 0.2543,
  "start_time": "2026-02-22T01:00:00+01:00",
  "hours_until_start": 5.2,
  "time_range": "night"
}
```

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

This plugin is third-party and not offered by Green Planet Energy eG.
