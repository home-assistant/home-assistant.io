---
title: "Integrating your solar panels"
description: "Learn how to add information about your solar panels to Home Assistant home energy management."
---

Gain insight into your energy production by integrating your solar panels into Home Assistant.

If you also set up [the Solar Forecast integration](/integrations/forecast_solar), you will be able to see expected solar production and automate based on planned production.

<img src='/images/docs/energy/solar.png' alt='Graphic showing energy flowing from the solar panels to Home Assistant and back to the grid.' style='border: 0;box-shadow: none; display: block; max-height: 400px; margin: 0 auto;'>

## Hardware

Home Assistant will need to know the amount of energy that is being produced. This can be done in various ways.

### Using a CT clamp sensor

{% include energy/ct_clamp.md %}

### Connecting to your inverter

Some solar inverters have APIs that can be read by Home Assistant.

If you add a power sensor for your solar production, use the **Type of power measurement** setting to tell Home Assistant how your sensor represents the direction of flow. For details, see [Power measurement sign conventions](/docs/energy/faq/#power-measurement-sign-conventions).

### Creating an energy sensor from a power sensor

The energy dashboard tracks energy (kWh). If you only have a sensor that reports instantaneous power (W or kW), use the [Riemann sum integral integration](/integrations/integration/#energy) to turn it into an energy sensor you can add to the dashboard.

[Energy integrations](/integrations/#energy)
