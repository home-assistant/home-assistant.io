---
title: "Integrating your electricity grid"
description: "Learn how to add information about your electricity grid to Home Assistant home energy management."
---

Energy management is all about knowing how much energy you’re consuming, where it’s coming from and where it’s going.

Almost all houses are connected to the electricity grid which provides the energy your home will need. The energy usage is being tracked by your energy meter and is billed to you by your energy provider. Energy prices can differ based on a schedule or change according to market price.

<img src='/images/docs/energy/grid.png' alt='Graphic showing energy flowing from the grid to Home Assistant.' style='border: 0;box-shadow: none; display: block; max-height: 400px; margin: 0 auto;'>

## Tariffs

It has become popular for energy utilities to split the price of energy based on time of the day; this is done in order to incentivise consumers to shift their power needs towards times where the grid has lower loads. These periods of time are commonly referred to as Peak and Off Peak, exactly because they match periods of time where everyone is consuming energy (Peak) and periods of time where the energy is abundant but no one is using it (Off Peak). Therefore Peak energy is more expensive then Off Peak energy.

If you want to split energy usage into multiple tariffs, [read this](/docs/energy/faq/#split-consumption-by-tariffs).

## Hardware

Home Assistant will need to know the amount of energy flowing through your meter. This data can be tracked in various ways.

### Using a CT clamp sensor

CT clamp sensors measure the instantaneous current passing through an electrical wire. To translate this into electrical power (Wh) you also need a voltage measurement, because Power = Current x Voltage.

In Home Assistant we have support for off-the-shelf CT clamp sensors and you can build your own with ESPHome's [CT Clamp Current sensor](https://esphome.io/components/sensor/ct_clamp.html).

The off-the-shelf solution that we advice is the [Shelly EM](https://shop.shelly.cloud/shelly-em-2-x-120a-clamp-wifi-smart-home-automation?tracking=A7FsiPIfUWsFpnfKHa8SRyUYLXjr2hPq). The device has a local API, updates are pushed to Home Assistant and it has a high quality integration.

In case of three-phase electrical systems, attention should be drawn to the fact that the current measurement of a given phase is matched to the voltage of the same phase, otherwise the power measurements will be incorrect.

_Attention! Installing CT clamp sensor devices requires opening your electrical cabinet. This work should be done by someone familiar with electrical wiring. Your qualified installer will know how to do this._

### Connect to your meter

The best way to get this data is directly from your electricity meter that sits between your house and the grid. In certain countries these meters contain standardized ways of reading out the information locally.

#### Connect using a P1 port

The P1 port is a standardized port in the Netherlands, Belgium and Luxembourg. A P1 reader can connect to this port and receive real-time information.

We have worked with creator [Marcel Zuidwijk](https://www.zuidwijk.com) to develop [SlimmeLezer](https://www.slimmelezer.nl). It's an affordable P1 reader powered by [ESPHome](https://esphome.io) that will seamlessly integrate this information in Home Assistant. It is being sold on [his website](https://www.slimmelezer.nl) and the firmware is open source [on GitHub](https://github.com/zuidwijk/dsmr).

![Photo of SlimmeLezer attached to a smart electricity meter](/images/docs/energy/slimmelezer.jpg)

#### Reading the meter via a pulse counter

Many meters, including older ones, have an LED that will flash whenever energy passes through it. For example, each flash is a 1/1000th kWh. By monitoring the time between flashes it’s possible to determine the energy consumption.

We have developed [Home Assistant Glow](https://github.com/klaasnicolaas/home-assistant-glow), an open source solution powered by ESPHome's [pulse meter sensor](https://esphome.io/components/sensor/pulse_meter.html).

![Photo of Home Assistant Glow attached to an electricity meter](/images/docs/energy/home-assistant-glow.jpg)

### Data provided by your energy provider

Some energy providers will provide you real-time information about your usage and have this data integrated into Home Assistant.

[Energy integrations](/integrations/#energy)

_Disclaimer: Some links on this page are affiliate links._
