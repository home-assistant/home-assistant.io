---
title: "Integrating your gas usage"
description: "Learn how to add information about your gas usage to Home Assistant home energy management."
---

Some homes are connected to gas. Gas is being used to heat water, cook and heat up the home.

Home Assistant allows you to track your gas usage and easily compare it against your energy usage for the same period of time.

## Hardware

Home Assistant will need to know the amount of gas that is being consumed.

### Connect to your meter

The best way to get this data is directly from your gas meter that sits between your house and the grid. In certain countries these meters contain standardized ways of reading out the information locally or provide this information via the electricity meter.

#### Connect using a P1 port

The P1 port is a standardized port on electricity meters in the Netherlands, Belgium and Luxembourg which also provides gas consumption information. A P1 reader can connect to this port and receive real-time information.

We have worked with creator [Marcel Zuidwijk](https://www.zuidwijk.com) to develop [SlimmeLezer+](https://www.zuidwijk.com/product/slimmelezer-plus/). It's an affordable P1 reader powered by [ESPHome](https://esphome.io) that will seamlessly integrate this information in Home Assistant. It is being sold on [his website](https://www.zuidwijk.com/product/slimmelezer-plus/) and the firmware is open source [on GitHub](https://github.com/zuidwijk/dsmr).

![Photo of SlimmeLezer attached to a smart electricity meter](/images/docs/energy/slimmelezer.jpg)

#### Read the gas meter using an AI-on-the-edge-device

[AI-on-the-edge-device](https://github.com/jomjol/AI-on-the-edge-device) is a project running on an ESP32-CAM and can be fully integrated into Home Assistant using the Home Assistant Discovery Functionality of MQTT. It digitalizes your gas/water/electricity meter display and provides its data in various ways.

![Photo of the AI-on-the-edge-device Workflow](/images/docs/energy/ai-on-the-edge-device.jpg)

#### Read the gas meter using a magnetometer

[Diaphragm/bellows gas meters](https://en.wikipedia.org/wiki/Gas_meter#Diaphragm/bellows_meters) are the most common type of gas meter, seen in almost all residential installations, and their movement can frequently be observed with a magnetometer. The [QMC5883L](https://esphome.io/components/sensor/qmc5883l/) and [HMC5883L](https://esphome.io/components/sensor/hmc5883l/) are common and inexpensive options that ESPHome supports. A project that makes it easy to use these magnetometers and calibrate them is [this water-gas-meter project on GitHub](https://github.com/tronikos/esphome-magnetometer-water-gas-meter).

#### Reading the meter wirelessly via RTL-SDR

{% include energy/rtl_sdr.md %}

#### Read the gas meter using a reed switch

Some diaphragm gas meters include a rotating magnet that can be detected externally. If your meter exposes this magnetic pulse, a reed switch or magnetic sensor can be used to count rotations and calculate gas consumption.

Community DIY projects such as [Zigbee Gas Counter for nRF52840](https://github.com/IgnacioHR/ZigbeeGasCounterNCS) use this approach to build a battery-powered Zigbee gas counter that works with Zigbee2MQTT and Home Assistant. The device keeps an internal cumulative counter, which helps avoid data loss if Home Assistant or the Zigbee coordinator is temporarily unavailable.
