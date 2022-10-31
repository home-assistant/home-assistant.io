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

If you have a smart water meter that is wirelessly connected to your electricity meter, the following integration could be of help:

- [P1 Monitor](/integrations/p1_monitor) 
- [Toon](/integrations/toon)

Alternatively, the following shops sell ESPHome-based devices, that use a proximity sensor to detect a rotating magnet in your water meter and use that pulse to count each liter of water used.


- [S0tool](https://huizebruin.github.io/s0tool/) ("Made for ESPHome" approved)
- [Waterlezer dongle](https://smart-stuff.nl/product/esphome-waterlezer-dongle/) (Dutch)
- [Slimme Watermeter Gateway](https://smartgateways.nl/product/slimme-watermeter-gateway/) (Dutch)
- [watermeterkit.nl](https://watermeterkit.nl/) (Dutch)

Or, maybe you like to build one yourself? Pieter Brinkman has quite a [nice blog article on how to creator your own water sensor](https://www.pieterbrinkman.com/2022/02/02/build-a-cheap-water-usage-sensor-using-esphome-home-assistant-and-a-proximity-sensor/).

For any of the above-listed options, make sure it actually works with the type of water meter you have before getting one.
