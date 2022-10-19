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

### Connect to your meter

The best way to get this data is directly from your electricity meter that sits between your house and the grid. In certain countries these meters contain standardized ways of reading out the information locally.

#### Connect using a P1 port

The P1 port is a standardized port in the Netherlands, Belgium and Luxembourg. A P1 reader can connect to this port and receive real-time information.

We have worked with creator [Marcel Zuidwijk](https://www.zuidwijk.com) to develop [SlimmeLezer+](https://www.zuidwijk.com/product/slimmelezer-plus/). It's an affordable P1 reader powered by [ESPHome](https://esphome.io) that will seamlessly integrate this information in Home Assistant. It is being sold on [his website](https://www.zuidwijk.com/product/slimmelezer-plus/) and the firmware is open source [on GitHub](https://github.com/zuidwijk/dsmr).

![Photo of SlimmeLezer attached to a smart electricity meter](/images/docs/energy/slimmelezer.jpg)

#### Connect via Zigbee Energy Profile

The Zigbee Energy Profile is a wireless energy standard to provide real-time information about electricity usage. This standard is available in some meters in the US, UK and Australia. This is not "normal" Zigbee as implemented by Home Assistant but requires special certified hardware.

One such option with a local API is the [Rainforest EAGLE-200](/integrations/rainforest_eagle/).

#### Connect using a TIC port

TIC (*Téléinformation Client*) is a standardized port on Enedis (France energy distributor) electricity meters, such as [Linky](https://fr.wikipedia.org/wiki/Linky).

Multiple devices can plug into the TIC port. Some are able to draw enough energy from the energy meter, others have to be wired to a power source.

Wireless:
* Zigbee: Zlinky_TIC from [LiXee](https://lixee.fr/), with an open-source firmware.
* Direct Atome from [Total](https://www.totalenergies.fr/particuliers/nos-services/mieux-consommer/consolive) (requires a 2€/month subscription, has [an integration](https://www.home-assistant.io/integrations/atome/)
* WiFi: DIY via esphome and the [teleinfo component](https://esphome.io/components/sensor/teleinfo.html)

Wired: either build your own optocoupler-based circuit to connect the TIC output to a serial port, or buy an adapter:
* DIN Rail to USB from [LiXee](https://lixee.fr/produits/30-tic-din-3770014375070.html)

To decode the serial output, you can use:
* [teleinfo2mqtt](https://github.com/fmartinou/teleinfo2mqtt)
* This [former HomeAssistant Pull Request](https://github.com/home-assistant/core/pull/14200) to integrate directly into HomeAssistant.

Note that the TIC output has two modes: a "historical" one, which is usually the default for backwards-compatibility, and a "standard" one with more and more frequent information. Changing mode can be done free of charge if you have a Linky meter by calling your electricity provider and asking them to order a F185 prestation from Enedis.

#### Reading the meter via a pulse counter

Many meters, including older ones, have an LED that will flash whenever energy passes through it. For example, each flash is a 1/1000th kWh. By monitoring the time between flashes it’s possible to determine the energy consumption.

We have developed [Home Assistant Glow](https://github.com/klaasnicolaas/home-assistant-glow), an open source solution powered by ESPHome's [pulse meter sensor](https://esphome.io/components/sensor/pulse_meter.html). You put it on top of the activity LED of your electricity meter and it will bring your consumption into Home Assistant.

![Photo of Home Assistant Glow attached to an electricity meter](/images/docs/energy/home-assistant-glow.jpg)

### Using a CT clamp sensor

CT clamp sensors measure your energy usage by looking at the current passing through an electrical wire. This makes it possible to calculate the energy usage. In Home Assistant we have support for off-the-shelf CT clamp sensors and you can build your own.

The off-the-shelf solution that we advise is the [Shelly EM](https://shop.shelly.cloud/shelly-em-2-x-120a-clamp-wifi-smart-home-automation?tracking=A7FsiPIfUWsFpnfKHa8SRyUYLXjr2hPq). The device has a local API, updates are pushed to Home Assistant and it has a high quality integration.

You can build your own using ESPHome's [CT Clamp Current sensor](https://esphome.io/components/sensor/ct_clamp.html) or energy meter sensors like the [ATM90E32](https://esphome.io/components/sensor/atm90e32.html). For the DIY route, check out [this video by digiblur](https://www.youtube.com/watch?v=n2XZzciz0s4) to get started.

_Attention! Installing CT clamp sensor devices requires opening your electrical cabinet. This work should be done by someone familiar with electrical wiring. Your qualified installer will know how to do this._

### Data provided by your energy provider

Some energy providers will provide you real-time information about your usage and have this data integrated into Home Assistant.

### Troubleshooting ###

If you are unable to select your energy sensor in the grid consumption drop-down, make sure that its value is being recorded in the Recorder settings.

[Energy integrations](/integrations/#energy)

_Disclaimer: Some links on this page are affiliate links helping support the Home Assistant project._
