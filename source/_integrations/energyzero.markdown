---
title: EnergyZero
description: Instructions on how to integrate EnergyZero within Home Assistant.
ha_category:
  - Energy
ha_release: 2023.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@klaasnicolaas'
ha_domain: energyzero
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The **EnergyZero** {% term integration %} integrates the [EnergyZero](https://www.energyzero.nl/) API platform with Home Assistant.

The integration makes it possible to retrieve the dynamic energy/gas prices
from EnergyZero in order to gain insight into the price trend of the day and
to adjust your consumption accordingly.

Partners who are a reseller from EnergyZero:

- [ANWB Energie](https://www.anwb.nl/huis/energie/anwb-energie)
- [Energie van Ons](https://www.energie.vanons.org)
- [GroeneStroomLokaal](https://www.groenestroomlokaal.nl)
- [Mijndomein Energie](https://www.mijndomein.nl/energie)
- [SamSam](https://www.samsam.nu)
- [ZonderGas](https://www.zondergas.nu)

{% include integrations/config_flow.md %}

## Use cases

With the [energy dashboard](/energy) you can use the `current hour` price entity to calculate how much the electricity or gas has cost each hour based on the prices from EnergyZero. Or use one of the actions in combination with a [template sensor](#prices-sensor-with-response-data) to show the prices for the next 24 hours in a chart on your dashboard.

## Data updates

The integration will poll the EnergyZero API every 10 minutes to update the data in Home Assistant.

## Known limitations

The prices retrieved via the API are bare prices including VAT, however an energy company also charges other rates such as **energy tax** and **purchase costs**. The integration has no configuration option to add these values, but you could create a [template sensor](#all-in-price-sensor) for this.

## Sensors

The EnergyZero integration creates a number of sensor entities for both gas and electricity prices.

### Energy market price

Every day around **14:00 UTC time**, the new prices are published for the following day.

- The `current` and `next hour` electricity market price
- Average electricity price of the day
- Lowest energy price
- Highest energy price
- Time of day when the price is highest
- Time of day when the price is at its lowest
- Percentage of the current price compared to the maximum price

### Gas market price

For the dynamic gas prices, only entities are created that display the
`current` and `next hour` price because the price is always fixed for
24 hours; new prices are published every morning at **05:00 UTC time**.

## Actions

The energy and gas prices are exposed using [actions](/docs/scripts/perform-actions/). The actions populate [Response Data](/docs/scripts/perform-actions#use-templates-to-handle-response-data) with price data.

### Action `energyzero.get_gas_prices`

Fetches the gas prices. The `config_entry` value be found using the **Actions** tab in the **Developer Tools**, selecting the desired entity and then switching to YAML.

| Data attribute | Optional | Description                                          | Example                          |
| -------------- | -------- | ---------------------------------------------------- | -------------------------------- |
| `config_entry` | no       | Config entry ID to use.                              | 1b4a46c6cba0677bbfb5a8c53e8618b0 |
| `incl_vat`     | no       | Defines whether the prices include or exclude VAT.   | false                            |
| `start`        | yes      | Start time to get prices. Defaults to today 00:00:00 | 2023-01-01 00:00:00              |
| `end`          | yes      | End time to get prices. Defaults to today 00:00:00   | 2023-01-01 00:00:00              |

#### Response data

The response data is a dictionary with the gas timestamps and prices as string and float values.

{% raw %}

```json
{
  "prices": [
    {
      "timestamp": "2023-09-25 03:00:00+00:00",
      "price": 1.1
    },
    {
      "timestamp": "2023-09-25 04:00:00+00:00",
      "price": 1.05
    }
  ]
}

```

{% endraw %}

### Action `energyzero.get_energy_prices`

Fetches the energy prices. The `config_entry` value be found using the **Actions** tab in the **Developer Tools**, selecting the desired entity and then switching to YAML.

| Data attribute | Optional | Description                                          | Example                          |
| -------------- | -------- | ---------------------------------------------------- | -------------------------------- |
| `config_entry` | no       | Config entry ID to use.                              | 1b4a46c6cba0677bbfb5a8c53e8618b0 |
| `incl_vat`     | no       | Defines whether the prices include or exclude VAT.   | false                            |
| `start`        | yes      | Start time to get prices. Defaults to today 00:00:00 | 2023-01-01 00:00:00              |
| `end`          | yes      | End time to get prices. Defaults to today 00:00:00   | 2023-01-01 00:00:00              |

#### Response data

The response data is a dictionary with the energy timestamps and prices as string and float values.

{% raw %}

```json
{
  "prices": [
    {
      "timestamp": "2023-09-25 03:00:00+00:00",
      "price": 0.05
    },
    {
      "timestamp": "2023-09-25 04:00:00+00:00",
      "price": 0.12
    }
  ]
}
```

{% endraw %}

## Templates

Create template sensors to display the prices in a chart or to calculate the all-in hour price.

### Prices sensor with response data

To use the response data from the actions, you can create a template sensor that updates every hour.

{% raw %}

```yaml
template:
  - trigger:
      - trigger: time_pattern
        hours: "*"
    action:
      - action: energyzero.get_energy_prices
        response_variable: prices
        data:
          config_entry: 1b4a46c6cba0677bbfb5a8c53e8618b0
          incl_vat: true
    sensor:
      - name: Energy prices
        device_class: timestamp
        state: "{{ now() }}"
        attributes:
          prices: '{{ prices }}'
```

{% endraw %}

### All-in price sensor

To calculate the all-in hour price, you can create a template sensor that calculates the price based on the current price, energy tax, and purchase costs.

{% raw %}

```yaml
template:
  - sensor:
      - name: EnergyZero all-in current price
        unique_id: allin_current_price
        icon: mdi:cash
        unit_of_measurement: "€/kWh"
        state_class: measurement
        state: >
          {% set energy_tax = PUT_HERE_THE_PRICE %}
          {% set purch_costs = PUT_HERE_THE_PRICE %}
          {% set current_price = states('sensor.energyzero_today_energy_current_hour_price') | float(0) %}
          {{ (current_price + energy_tax + purch_costs) | round(2) }}
```

{% endraw %}

## Removing the integration

This integration follows standard integration removal steps. If you also use the template sensors, you need to remove them manually.

{% include integrations/remove_device_service.md %}
