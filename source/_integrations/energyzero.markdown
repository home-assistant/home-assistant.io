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
from EnergyZero to gain insight into the price trend of the day and
to adjust your consumption accordingly.

Partners who are a reseller from EnergyZero:

- [ANWB Energie](https://www.anwb.nl/huis/energie/anwb-energie)
- [Energie van Ons](https://www.energie.vanons.org)
- [GroeneStroomLokaal](https://www.groenestroomlokaal.nl)
- [Mijndomein Energie](https://www.mijndomein.nl/energie)
- [SamSam](https://www.samsam.nu)
- [ZonderGas](https://www.zondergas.nu)

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Electricity price interval:
  description: "Select **Hourly** (the default) for electricity prices per hour or **Quarter-hourly** for prices per 15 minutes."
{% endconfiguration_basic %}

The selected interval applies to today's and tomorrow's market and all-in electricity prices and their sensors. Changing this option automatically reloads the integration. Gas prices and the polling interval are unaffected.

The [Get energy prices action](/actions/energyzero.get_energy_prices/) has its own **Price type** and **Interval** options. It defaults to hourly market prices, regardless of the interval selected here.

## Use cases

Use the [energy dashboard](/energy) to track costs with these sensors:

- **Current all-in price**: Electricity costs based on EnergyZero's all-in prices
- **Current market price**: Only the market component of your electricity costs
- **Current hour**: Gas costs based on the gas market price

To show prices in a dashboard chart, use one of the actions with a [template sensor](#prices-sensor-with-response-data).

## Data updates

The integration will poll the EnergyZero API every 10 minutes to update the data in Home Assistant.

## Known limitations

Market prices include VAT but exclude energy tax and purchase costs. Gas sensors provide market prices only.

The all-in electricity sensors use EnergyZero's rates. If your contract uses different rates, you can calculate your own price with a [template sensor](#all-in-price-sensor). There is no option to configure contract rates in the integration.

## Sensors

The EnergyZero integration creates several sensor entities for both gas and electricity prices.

### Electricity market price

Every day around **14:00 UTC time**, the new electricity prices are published for the following day.

The market electricity sensors provide:

- **Current market price** and **Next market price**
- **Average market price** for the day
- **Minimum market price** for the day
- **Maximum market price** for the day
- **Highest market price time**
- **Lowest market price time**
- **Market percentage of maximum**
- **Market periods priced equal or lower**

The **Current market price** sensor shows the price for the current electricity price period. The **Next market price** sensor shows the price one hour or 15 minutes ahead, depending on the selected **Electricity price interval**.

The **Market periods priced equal or lower** sensor counts today's price periods priced at or below the current market price. It reports a count without units.

Existing market sensors keep their entity IDs, so your automations and templates continue to work with the renamed sensors.

### All-in electricity price

The integration also provides five sensors for the all-in electricity prices from EnergyZero, including VAT:

- **Current all-in price**
- **Next all-in price**
- **Average all-in price** for the day
- **Minimum all-in price** for the day
- **Maximum all-in price** for the day

The current and next prices follow the same interval as the market sensors. Both sets of sensors appear on the **Electricity price** device.

### Gas market price

For the dynamic gas prices, only entities are created that display the
`current` and `next hour` price because the price is always fixed for
24 hours; new prices are published every morning at **05:00 UTC time**.

{% include integrations/actions.md %}

## Templates

You can optionally create template sensors to display the prices in a chart or to calculate an electricity price using your own contract rates.

### Prices sensor with response data

To use the response data from the actions, you can create a template sensor that updates every hour.

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

### All-in price sensor

For EnergyZero's all-in price, use **Current all-in price** directly. If your contract uses different rates, this optional template adds your energy tax and purchase costs to **Current market price**.

Before using the template:

- Replace both `PUT_HERE_THE_PRICE` values with your rates per kWh, including VAT.
- Use your **Current market price** entity ID as the base to avoid adding costs twice.
- Choose a `unique_id` that is not already used by another template sensor.

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

## Removing the integration

This integration follows standard integration removal steps. If you also use the template sensors, you need to remove them manually.

{% include integrations/remove_device_service.md %}
