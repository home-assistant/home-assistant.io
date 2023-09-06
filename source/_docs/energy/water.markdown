---
title: "Integrating your water usage"
description: "Learn how to add information about your water usage to Home Assistant home energy management."
---

Home Assistant allows you to track your water usage in the home energy management too.

Although water is not strictly "energy", it is still a valuable resource to track and monitor as it is often tightly coupled with energy usage (like gas). Additionally, it can help you reduce your ecological footprint by using less water. 

## Hardware

Home Assistant will need to know the amount of water that is being consumed in order to be able to track it. Several hardware options are available to do this.

We have the following integrations available for existing products that can provide information about water usage:

- [Flo](/integrations/flo)
- [Flume](/integrations/flume)
- [HomeWizard Energy](/integrations/homewizard)

Alternatively, the following shops sell ESPHome-based devices, that use a proximity sensor to detect a rotating magnet in your water meter and use that pulse to count each liter of water used.

- [S0tool](https://huizebruin.github.io/s0tool/) ("Made for ESPHome" approved)
- [Waterlezer dongle](https://smart-stuff.nl/product/esphome-waterlezer-dongle/) (Dutch)
- [Slimme Watermeter Gateway](https://smartgateways.nl/product/slimme-watermeter-gateway/) (Dutch)
- [watermeterkit.nl](https://watermeterkit.nl/) (Dutch)

Maybe you like to build one yourself?
 - Pieter Brinkman has quite a [nice blog article on how to create your own water sensor](https://www.pieterbrinkman.com/2022/02/02/build-a-cheap-water-usage-sensor-using-esphome-home-assistant-and-a-proximity-sensor/) using ESPHome, or [build a water meter](https://www.ztatz.nl/p1-monitor-watermeter/) that works with the [P1 Monitor](/integrations/p1_monitor) integration.
 - [AI-on-the-edge-device](https://github.com/jomjol/AI-on-the-edge-device) is a project running on an ESP32-CAM and can be fully integrated into Home Assistant using the Home Assistant Discovery Functionality of MQTT. It digitalizes your gas/water/electricity meter display and provides its data in various ways.![Photo of the AI-on-the-edge-device Workflow](/images/docs/energy/ai-on-the-edge-device.jpg)
 - [watermeter](https://github.com/nohn/watermeter) running classic OCR and statistical pattern recognition on any system supporting Docker

If you manually integrate your sensors, for example, using the [MQTT](/integrations/mqtt) or [RESTful](/integrations/rest) integrations: Make sure you set and provide the `device_class`, `state_class`, and `unit_of_measurement` for those sensors.

For any of the above-listed options, make sure it actually works with the type of water meter you have before getting one.
