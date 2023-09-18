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

## Service `energyzero.get_prices`

The energy and gas prices are exposed using [Service Calls](/docs/scripts/service-calls/). This service populates [Response Data](/docs/scripts/service-calls#use-templates-to-handle-response-data) with price data.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `type` | no | The type of prices to get. Must be 'all', 'gas', or 'energy' | all
| `start` | yes | Start datetime to get prices from. Defaults to today 00:00:00 | 2023-01-01 00:00:00
| `end` | yes | End datetime to get prices from. Defaults to today 00:00:00 | 2023-01-01 00:00:00
| `incl_btw` | yes | Get prices including BTW (VAT) or without  | False


### Response
The response data is a dictionary with the gas and/or energy prices as timestamp/float dictionary

{% raw %}
```json
{
  "energy": {
    "2023-01-01 00:00:00+00:00": 0.7502560835
  },
  "gas": {
    "2023-01-01 00:00:00+00:00": 1.233123
  }
}
```
{% endraw %}

#### Add response to sensor

The response data can be added to a sensor in order to create price graphs. First, setup an automation that puts the prices into an event. Then create a template sensor that puts the event data in it's attributes.

##### Price automation
{% raw %}
```yaml
prices_script:
  sequence:
  - service: energyzero.get_prices
    data:
      type: all
    response_variable: prices
  - event: prices
    event_data:
      prices: '{{ prices }}'
```
{% endraw %}

##### Price template sensor
{% raw %}
```yaml
template:
  - trigger:
    - platform: event
      event_type: prices
    sensor:
    - name: Energyzero prices
      device_class: timestamp
      state: "{{ now() }}"
      attributes:
        prices: "{{ trigger.event.data }}"
```
{% endraw %}

