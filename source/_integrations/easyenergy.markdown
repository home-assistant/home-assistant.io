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

In terms of electricity you get two separate services, easyEnergy uses separate
prices for electricity that you use (buy) or return (sell).

- The `current` and `next hour` electricity market price
- Average electricity price of the day
- Lowest energy price
- Highest energy price
- Time of day when the price is highest
- Time of day when the price is at its lowest
- Percentage of the current price compared to the maximum price

In addition, the usage price service has an entity that counts the hours with a price equal to or lower than the current usage price. The return price service has an entity that counts the hours with a price equal to or higher than the current return price. With this information, you could switch devices during the cheapest hours of the day, as illustrated in the graph below.

<p class='img'>
  <img src='/images/integrations/easyenergy/pricegraph.png' alt='Screenshot showing energy price graph.'>
  Example showing the energy price graph.
</p>

#### Gas market price

For the dynamic gas prices, only entities are created that display the
`current` and `next hour` price because the price is always fixed for
24 hours.

{% include integrations/actions.md %}

## Use cases

With the [energy dashboard](/energy) you can use the `current hour` price entity to calculate how much the electricity or gas has cost each hour based on the prices from easyEnergy. Or use one of the actions in combination with a [template sensor](#prices-sensor-with-response-data) to show the prices for today in a chart on your dashboard.

## easyEnergy automation examples

### Automation: Send a notification when the energy price is low

Use the current hour price sensor to send a notification when the energy price drops below your chosen threshold. In this example, the threshold is `0.15 €/kWh`.

```yaml
automation:
  - alias: "Notify when the energy price is low"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.easyenergy_today_energy_usage_current_hour_price
        below: 0.15
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          title: "Low energy price"
          message: "The current energy price is {{ trigger.to_state.state }} €/kWh."
```

### Automation: Start a dishwasher when the energy price is low

Use the current hour price sensor to start a dishwasher when the energy price drops below your chosen threshold. In this example, the threshold is `0.15 €/kWh`.

```yaml
automation:
  - alias: "Start dishwasher when energy price is low"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.easyenergy_today_energy_usage_current_hour_price
        below: 0.15
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.dishwasher
```

## Templates

Create template sensors to display the prices in a chart or to calculate the all-in hour price.

### Prices sensor with response data

To use the response data from the actions, you can create a template sensor that updates every hour. This example retrieves today's all-in electricity usage prices at quarter-hour intervals. Replace `YOUR_CONFIG_ENTRY_ID` with your easyEnergy configuration entry ID.

```yaml
template:
  - triggers:
      - trigger: time_pattern
        minutes: "0"
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

To calculate the all-in hour price, you can create a template sensor that calculates the price based on the current price, energy tax, and purchase costs.

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
          {% set current_price =
            states('sensor.easyenergy_today_energy_usage_current_hour_price')
            | float(0) %}
          {{ (current_price + energy_tax + purch_costs) | round(2) }}
```

## Data updates

The integration will poll the easyEnergy API every 10 minutes to update the data in Home Assistant.

Electricity prices for the following day and gas prices are published daily. You can retrieve published prices for a specific date using the actions.

## Known limitations

The sensor prices are bare prices including VAT, however an energy company also charges other rates such as energy tax and purchase costs. The integration has no configuration option to add these values, but you could create a [template sensor](#all-in-price-sensor) for this.

## Troubleshooting

{% details "Prices for tomorrow are unavailable" %}

**Symptom:** An action cannot retrieve tomorrow's prices.

**Description:** Prices for the requested date may not have been published yet. See [data updates](#data-updates).

**Resolution:**
Wait until easyEnergy has published the prices, then run the action again with `start` and `end` set to the date you want to retrieve.

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
