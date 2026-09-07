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

The `energyzero.get_energy_prices` action always returns hourly prices, regardless of this option.

## Use cases

With the [energy dashboard](/energy) you can use the **Current all-in price** electricity sensor to track electricity costs using the all-in prices provided by EnergyZero. Use **Current market price** if you only want to track the market component of your electricity costs. For gas, use the **Current hour** sensor to track costs based on the gas market price. Or use one of the actions in combination with a [template sensor](#prices-sensor-with-response-data) to show the prices for the next 24 hours in a chart on your dashboard.

## Data updates

The integration will poll the EnergyZero API every 10 minutes to update the data in Home Assistant.

## Known limitations

Market prices include VAT but exclude energy tax and purchase costs. The all-in electricity sensors use the all-in prices provided by EnergyZero. The integration does not let you configure your own contract rates. If you need to use different rates, you can create a [template sensor](#all-in-price-sensor) based on the market price. Gas sensors provide market prices only.

## Sensors

The EnergyZero integration creates several sensor entities for both gas and electricity prices.

### Energy market price

Every day around **14:00 UTC time**, the new electricity prices are published for the following day.

The market electricity sensors include VAT and provide:

- **Current market price** and **Next market price**
- **Average market price** for the day
- **Minimum market price** for the day
- **Maximum market price** for the day
- **Highest market price time**
- **Lowest market price time**
- **Market percentage of maximum**
- **Market periods priced equal or lower**

The **Current market price** sensor shows the price for the current electricity price period. The **Next market price** sensor shows the price one hour or 15 minutes ahead, depending on the selected **Electricity price interval**.

The **Market periods priced equal or lower** sensor counts today's price periods priced at or below the current electricity price. It reports a count without units. Each period lasts one hour or 15 minutes, depending on the selected **Electricity price interval**.

Existing market sensors keep their entity IDs, so you do not need to update your automations or templates when their names change.

### All-in electricity price

The integration also provides five sensors for the all-in electricity prices from EnergyZero, including VAT:

- **Current all-in price**
- **Next all-in price**
- **Average all-in price** for the day
- **Minimum all-in price** for the day
- **Maximum all-in price** for the day

The **Current all-in price** sensor shows the price for the current electricity price period. The **Next all-in price** sensor shows the price one hour or 15 minutes ahead, depending on the selected **Electricity price interval**. Both market and all-in sensors use the same interval and appear on the **Electricity price** device.

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

Use the **Current all-in price** sensor for the all-in electricity price provided by EnergyZero. If your contract uses different rates, the following optional template adds your own energy tax and purchase costs to **Current market price**. Enter both additional rates per kWh, including VAT. Use the market sensor as the base to avoid adding these costs twice. The existing market sensor entity ID used in this example remains unchanged.

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
