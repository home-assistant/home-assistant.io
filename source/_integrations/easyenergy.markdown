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
from easyEnergy to gain insight into the price trend of the day and
to adjust your consumption accordingly.

Companies that use the data from easyEnergy:

- [NieuweStroom](https://nieuwestroom.nl)

{% include integrations/config_flow.md %}

## Supported functionality

### Sensors

The easyEnergy integration creates several sensor entities for both gas
and electricity prices.

#### Energy market prices

easyEnergy provides separate prices for electricity that you use (buy) and return (sell).

- The `current hour` and `next hour` electricity market price
- Average electricity price of the day
- Lowest energy price
- Highest energy price
- Time of day when the price is highest
- Time of day when the price is at its lowest
- Percentage of the current price compared to the maximum price

For electricity usage, an additional sensor counts the hours with a price equal to or lower than the current usage price. For electricity return, an additional sensor counts the hours with a price equal to or higher than the current return price. With this information, you could switch devices during the cheapest hours of the day, as illustrated in the graph below.

<p class='img'>
  <img src='/images/integrations/easyenergy/pricegraph.png' alt='Screenshot showing energy price graph.'>
  Example showing the energy price graph.
</p>

#### Gas market price

For the dynamic gas prices, only entities are created that display the
`current hour` and `next hour` price because the price is always fixed for
24 hours.

{% include integrations/actions.md %}

## Use cases

With the [energy dashboard](/energy) you can use the `current hour` price entity to calculate how much the electricity or gas has cost each hour based on the prices from easyEnergy. Or use one of the actions in combination with a [template sensor](#prices-sensor-with-response-data) to show the prices for today in a chart on your dashboard.

## easyEnergy automation examples

These blueprints use the **Current hour** sensor on the easyEnergy **Energy market price - Usage** device. Set your price threshold in EUR/kWh; the sensor price includes VAT but excludes energy tax and purchase costs. Both blueprints run when the price crosses below the threshold. They do not run immediately if you enable them while the price is already below it. They can also run when price data becomes available again with a value below the threshold.

### Automation: Send a notification when the energy price is low

Receive a notification when the electricity usage price drops below your chosen threshold. Select your easyEnergy price sensor and a notification entity when creating the automation. The message includes the current price.

{% blueprint_example blueprint="easyenergy_low_price_notification.yaml" %}

### Automation: Start a dishwasher when the energy price is low

Turn on a switch when the electricity usage price drops below your chosen threshold. For a dishwasher, choose a switch that starts its program; switching on the power supply alone may not start a cycle. You can also use this blueprint for another device controlled by a switch. The switch remains on when prices rise.

{% blueprint_example blueprint="easyenergy_low_price_switch.yaml" %}

## Templates

Create template sensors to display the prices in a chart or to calculate the all-in hour price.

### Prices sensor with response data

To use the response data from the actions, you can create a template sensor that updates every hour. This example retrieves today's all-in electricity usage prices at quarter-hour intervals. Replace `YOUR_CONFIG_ENTRY_ID` with your easyEnergy configuration entry ID.

```yaml
template:
  - triggers:
      - trigger: time_pattern
        minutes: 0
    actions:
      - action: easyenergy.get_energy_usage_prices
        response_variable: prices
        data:
          config_entry: YOUR_CONFIG_ENTRY_ID
          incl_vat: true
          granularity: quarter
          price_type: invoice
    sensor:
      - name: Energy prices
        device_class: timestamp
        state: "{{ now() }}"
        attributes:
          prices: "{{ prices }}"
```

### All-in price sensor

Create an all-in electricity price sensor by adding your energy tax and purchase costs to the current easyEnergy usage price.

{% blueprint_example blueprint="easyenergy/easyenergy_all_in_price_sensor.yaml" %}

## Data updates

The integration will {% term polling poll %} the easyEnergy API every 10 minutes to update the data in Home Assistant.

Electricity prices for the following day and gas prices are published daily. You can retrieve published prices for a specific date using the actions.

## Known limitations

The sensor prices are bare prices including VAT, however an energy company also charges other rates such as energy tax and purchase costs. The integration has no configuration option to add these values, but you could create a [template sensor](#all-in-price-sensor) for this.

## Troubleshooting

{% details "Prices for tomorrow are unavailable" %}

**Symptom:** An action cannot retrieve tomorrow's prices.

**Description:** Prices for the requested date may not have been published yet. See [data updates](#data-updates).

**Resolution:**
Wait until easyEnergy has published the prices, then run the action again with `start` and `end` set to the same date in `YYYY-MM-DD` format. In YAML, quote the date values to keep them as strings.

{% enddetails %}

{% details "The prices do not match my energy bill" %}

**Symptom:** The price shown by Home Assistant is lower than the price charged by the energy company.

**Description:** The sensor prices exclude the additional costs described under [known limitations](#known-limitations).

**Resolution:**
Create a template sensor that adds these extra costs to the current price. See the [all-in price sensor](#all-in-price-sensor) example.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal steps. If you also use the template sensors, you need to remove them manually.

{% include integrations/remove_device_service.md %}
