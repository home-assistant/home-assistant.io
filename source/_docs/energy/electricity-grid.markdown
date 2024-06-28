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

#### Connect to devices that uses Zigbee Smart Energy Standard

[Zigbee Smart Energy Standard](https://csa-iot.org/all-solutions/smart-energy/) is a wireless protocol designed by the CSA (Connectivity Standards Alliance, formerly the Zigbee Alliance) to specifically target industrial and commercial utilities to enable real-time monitoring of energy consumption and actively managing energy consumption at the end-user level. This wireless protocol is supported by some utility meters for monitoring electricity, gas, and water consumption in the US, EU, UK, and Australia.

It is also [referred to “Zigbee SE” or "ZSE" profile in the specification](https://zigbeealliance.org/wp-content/uploads/2019/11/docs-07-5356-19-0zse-zigbee-smart-energy-profile-specification.pdf), and note that it should not be confused with other Zigbee profiles, because Zigbee Smart Energy Profile is not part of the common "Zigbee 3.0" suite of profiles that are supported tHome Assistant's native Zigbee Home Automation integration, (as the Home Assistant's ZHA integration currently only have implemented support for other Zigbee profiles that are specifically made for home automation, lighting or occupancy, and not devices that just use the Zigbee Smart Energy" Profile).

Currently, the only solution we are aware of that can use devices that only support the "Zigbee Smart Energy" profile is Rainforest Automation's EAGLE gateway appliances that can be used via the Rainforest Eagle integration for Home Assistant, (those third-party gateways/bridges/hubs made for reading Australian electricity meters, though it abstracts and translates that protocol to present the data via their custom local API, and is as such not a native Zigbee Smart Energy" integration).

#### Reading the meter via a pulse counter

Many meters, including older ones, have an LED that will flash whenever energy passes through it. For example, each flash is a 1/1000th kWh. By monitoring the time between flashes it’s possible to determine the energy consumption.

We have developed [Home Assistant Glow](https://github.com/klaasnicolaas/home-assistant-glow), an open source solution powered by ESPHome's [pulse meter sensor](https://esphome.io/components/sensor/pulse_meter.html). You put it on top of the activity LED of your electricity meter and it will bring your consumption into Home Assistant.

![Photo of Home Assistant Glow attached to an electricity meter](/images/docs/energy/home-assistant-glow.jpg)

#### Reading the meter via a IEC62056-21

The IEC62056-21 is a common protocol not only for electric meters. It uses an infrared port to read data.
[Aquaticus](https://github.com/aquaticus) has created an [ESPHome component](https://community.home-assistant.io/t/new-iec62056-21-component/555236) for reading this data. [PiggyMeter](https://aquaticus.info/meter.html) is a complete project that allows easy installation.
![Photo of PiggyMeter attached to an electricity meter](https://aquaticus.info/_images/meter_and_probe.png)

#### Using (Smart Message Language) interface

In countries like Germany, SML (Smart Message Language) is used typically. ESPHome's [SML (Smart Message Language)](https://esphome.io/components/sml.html) is one way to integrate it. If you prefer to integrate it via MQTT, [sml2mqtt](https://github.com/spacemanspiff2007/sml2mqtt) is another open source option.

#### Read the meter using an AI-on-the-edge-device

[AI-on-the-edge-device](https://github.com/jomjol/AI-on-the-edge-device) is a project running on an ESP32-CAM and can be fully integrated into Home Assistant using the Home Assistant discovery functionality of MQTT. It digitalizes your gas/water/electricity meter display and provides its data in various ways.

![Photo of the AI-on-the-edge-device Workflow](/images/docs/energy/ai-on-the-edge-device.jpg)

### Using a CT clamp sensor

{% include energy/ct_clamp.md %}

### Data provided by your energy provider

Some energy providers will provide you real-time information about your usage and have this data integrated into Home Assistant.

### Manual integration

If you manually integrate your sensors, for example, using the [MQTT](/integrations/mqtt) or [Template](/integrations/template) integrations: Make sure you set and provide the `device_class`, `state_class`, and `unit_of_measurement` for those sensors.

### Troubleshooting

If you are unable to select your energy sensor in the grid consumption drop-down, make sure that its value is being recorded in the Recorder settings.

[Energy integrations](/integrations/#energy)

_Disclaimer: Some links on this page are affiliate links helping support the Home Assistant project._
