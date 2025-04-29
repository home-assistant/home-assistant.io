---
title: easyEnergy
description: Instructions on how to integrate easyEnergy within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2023.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@klaasnicolaas'
ha_domain: easyenergy
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The **easyEnergy** {% term integration %} integrates the [easyEnergy](https://www.easyenergy.com) API platform with Home Assistant.

The integration makes it possible to retrieve the dynamic energy/gas prices
from easyEnergy in order to gain insight into the price trend of the day and
to adjust your consumption accordingly.

Companies that use the data from easyEnergy:

- [NieuweStroom](https://nieuwestroom.nl)

{% include integrations/config_flow.md %}

## Use cases

With the [energy dashboard](/energy) you can use the `current hour` price entity to calculate how much the electricity or gas has cost each hour based on the prices from easyEnergy. Or use one of the actions in combination with a [template sensor](#prices-sensor-with-response-data) to show the prices for the next 24 hours in a chart on your dashboard.

## Data updates

The integration will poll the easyEnergy API every 10 minutes to update the data in Home Assistant.

## Known limitations

The prices retrieved via the API are bare prices including VAT, however an energy company also charges other rates such as **energy tax** and **purchase costs**. The integration has no configuration option to add these values, but you could create a [template sensor](#all-in-price-sensor) for this.

## Sensors

The easyEnergy integration creates a number of sensor entities for both gas
and electricity prices.

### Energy market prices

In terms of electricity you get two separate services, easyEnergy uses separate
prices for electricity that you use (buy) or return (sell). Every day around
**14:00 UTC time**, the new prices are published for the following day.

- The `current` and `next hour` electricity market price
- Average electricity price of the day
- Lowest energy price
- Highest energy price
- Time of day when the price is highest
- Time of day when the price is at its lowest
- Percentage of the current price compared to the maximum price
- Number of hours with the current price higher or lower

Entities with the number of hours indicate how many hours there are with a price
**above** or **below** the current hourly price. If we take the graph below as an example
and it is 00:30, then there are 8 hours below the current price and 4 hours above the
current price. With this information, you could switch devices at the X cheapest number
of hours during the day.

<p class='img'>
  <img src='/images/integrations/easyenergy/pricegraph.png' alt='Screenshot showing energy price graph.'>
  Example showing the energy price graph.
</p>

### Gas market price

For the dynamic gas prices, only entities are created that display the
`current` and `next hour` price because the price is always fixed for
24 hours; new prices are published every morning at **05:00 UTC time**.

## Actions

The energy and gas prices are exposed using [actions](/docs/scripts/perform-actions/). The actions populate [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data) with price data.

### Action `easyenergy.get_gas_prices`

Fetches the hourly prices for gas.

| Data attribute | Optional | Description                                          | Example                          |
| -------------- | -------- | ---------------------------------------------------- | -------------------------------- |
| `config_entry` | no       | Config entry ID to use.                              | 013713c172577bada2874a32dbe44feb |
| `incl_vat`     | no       | Defines whether the prices include or exclude VAT.   | False                            |
| `start`        | yes      | Start time to get prices. Defaults to today 00:00:00 | 2023-01-01 00:00:00              |
| `end`          | yes      | End time to get prices. Defaults to today 00:00:00   | 2023-01-01 00:00:00              |

#### Response data

The response data is a dictionary with the gas timestamps and prices as string and float values.

```json
{
  "prices": [
    {
      "timestamp": "2023-12-09 03:00:00+00:00",
      "price": 0.46914
    },
    {
      "timestamp": "2023-12-09 04:00:00+00:00",
      "price": 0.46914
    }
  ]
}
```

### Action `easyenergy.get_energy_usage_prices`

Fetches the hourly prices for energy that you use (buy).

| Data attribute | Optional | Description                                          | Example                          |
| -------------- | -------- | ---------------------------------------------------- | -------------------------------- |
| `config_entry` | no       | Config entry ID to use.                              | 013713c172577bada2874a32dbe44feb |
| `incl_vat`     | no       | Defines whether the prices include or exclude VAT.   | False                            |
| `start`        | yes      | Start time to get prices. Defaults to today 00:00:00 | 2023-01-01 00:00:00              |
| `end`          | yes      | End time to get prices. Defaults to today 00:00:00   | 2023-01-01 00:00:00              | 

#### Response data

The response data is a dictionary with the energy timestamps as strings and prices as float values.

```json
{
  "prices": [
    {
      "timestamp": "2023-12-09 03:00:00+00:00",
      "price": 0.08418
    },
    {
      "timestamp": "2023-12-09 04:00:00+00:00",
      "price": 0.08758
    }
  ]
}
```

### Action `easyenergy.get_energy_return_prices`

Fetches the hourly prices for energy that you return (sell).

| Data attribute | Optional | Description                                             | Example                          |
| -------------- | -------- | ------------------------------------------------------- | -------------------------------- |
| `config_entry` | no       | Config entry ID to use.                                 | 013713c172577bada2874a32dbe44feb |
| `start`        | yes      | Start time to get prices. Defaults to today 00:00:00    | 2023-01-01 00:00:00              |
| `end`          | yes      | End time to get prices from. Defaults to today 00:00:00 | 2023-01-01 00:00:00              |

#### Response data

The response data is a dictionary with the energy timestamps as strings and prices as float values.

```json
{
  "prices": [
    {
      "timestamp": "2023-12-09 03:00:00+00:00",
      "price": 0.06957
    },
    {
      "timestamp": "2023-12-09 04:00:00+00:00",
      "price": 0.07238
    }
  ]
}
```

## Templates

Create template sensors to display the prices in a chart or to calculate the all-in hour price.

### Prices sensor with response data

To use the response data from the actions, you can create a template sensor that updates every hour.

{% raw %}

```yaml
template:
  - triggers:
      - trigger: time_pattern
        seconds: "*"
    actions:
      - action: easyenergy.get_energy_usage_prices
        response_variable: prices
        data:
          config_entry: 013713c172577bada2874a32dbe44feb
          incl_vat: true
    sensor:
      - name: Energy prices
        device_class: timestamp
        state: "{{ now() }}"
        attributes:
          prices: "{{ prices }}"
```

{% endraw %}

### All-in price sensor

To calculate the all-in hour price, you can create a template sensor that calculates the price based on the current price, energy tax, and purchase costs.

{% raw %}

```yaml
template:
  - sensor:
      - name: easyEnergy all-in current price
        unique_id: allin_current_price
        icon: mdi:cash
        unit_of_measurement: "€/kWh"
        state_class: measurement
        state: >
          {% set energy_tax = PUT_HERE_THE_PRICE %}
          {% set purch_costs = PUT_HERE_THE_PRICE %}
          {% set current_price = states('sensor.easyenergy_today_energy_usage_current_hour_price') | float(0) %}
          {{ (current_price + energy_tax + purch_costs) | round(2) }}
```

{% endraw %}

## Removing the integration

This integration follows standard integration removal steps. If you also use the template sensors, you need to remove them manually.

{% include integrations/remove_device_service.md %}
