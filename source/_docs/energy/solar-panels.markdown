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

CT clamp sensors measure the instantaneous current passing through an electrical wire. To translate this into electrical power (W) you also need a voltage measurement, because Power = Current x Voltage.

In Home Assistant we have support for off-the-shelf CT clamp sensors and you can build your own with ESPHome's [CT Clamp Current sensor](https://esphome.io/components/sensor/ct_clamp.html).

The off-the-shelf solution that we advice is the [Shelly EM](https://shop.shelly.cloud/shelly-em-2-x-120a-clamp-wifi-smart-home-automation?tracking=A7FsiPIfUWsFpnfKHa8SRyUYLXjr2hPq). The device has a local API, updates are pushed to Home Assistant and it has a high quality integration.

_Attention! Installing CT clamp sensor devices requires opening your electrical cabinet. This work should be done by someone familiar with electrical wiring. Your qualified installer will know how to do this._

### Connecting to your inverter

Some solar inverters have APIs that can be read by Home Assistant.

[Energy integrations](/integrations/#energy)
