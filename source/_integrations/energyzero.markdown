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
ha_quality_scale: platinum
ha_integration_type: integration
---

The EnergyZero integration integrates the [EnergyZero](https://www.energyzero.nl/) API platform with Home Assistant.

The integration makes it possible to retrieve the dynamic energy/gas prices
from EnergyZero in order to gain insight into the price trend of the day and
to adjust your consumption accordingly.

Partners who purchase their energy through EnergyZero:

- [ANWB Energie](https://www.anwb.nl/huis/energie/anwb-energie)
- [Mijndomein Energie](https://www.mijndomein.nl/energie)
- [Energie van Ons](https://www.energie.vanons.org)
- [GroeneStroomLokaal](https://www.groenestroomlokaal.nl)

{% include integrations/config_flow.md %}

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


## Services
The energy and gas prices are exposed using [Service Calls](/docs/scripts/service-calls/). The services populate [Response Data](/docs/scripts/service-calls#use-templates-to-handle-response-data) with price data.


### Service `energyzero.get_gas_prices`
Fetches the gas prices.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `start` | yes | Start moment to get prices from. Defaults to today 00:00:00 | 2023-01-01 00:00:00
| `end` | yes | End moment to get prices from. Defaults to today 00:00:00 | 2023-01-01 00:00:00
| `incl_vat` | yes | Get prices including VAT or without. Defaults to True  | False

### Response data
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

### Service `energyzero.get_energy_prices`
Fetches the energy prices. 

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `start` | yes | Start moment to get prices from. Defaults to today 00:00:00 | 2023-01-01 00:00:00
| `end` | yes | End moment to get prices from. Defaults to today 00:00:00 | 2023-01-01 00:00:00
| `incl_vat` | yes | Get prices including VAT or without. Defaults to True  | False

### Response data
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



### Add response to sensor

The response data can be added to a template sensor:

{% raw %}
```yaml
template:
  - trigger:
      - platform: time_pattern
        hours: "*"
    action:
      - service: energyzero.get_energy_prices
        response_variable: prices
    sensor:
      - name: Energy prices
        device_class: timestamp
        state: "{{ now() }}"
        attributes:
          prices: '{{ prices }}'
```
{% endraw %}
