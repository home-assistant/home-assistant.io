---
title: "Integrating your home batteries"
description: "Learn how to add information about your home batteries to Home Assistant home energy management."
---

A home battery allows homes to store energy when you are either producing more solar power than you're using, or store energy from the grid if the current price is low.

Home Assistant allows you to track how much energy flows from/to your battery.

## Hardware

Home Assistant will need to know the amount of energy flowing from/to your batteries. This data can be tracked in various ways.

### Provided by the battery

Some battery vendors have an API to integrate the data into your Home Assistant instance. An example is [Tesla Powerwall](/integrations/powerwall/).

### Using a CT clamp sensor

CT clamp sensors measure your energy usage by looking at the current passing through an electrical wire. This makes it possible to calculate the energy usage. In Home Assistant we have support for off-the-shelf CT clamp sensors and you can build your own.

The off-the-shelf solution that we advise is the [Shelly EM](https://shop.shelly.cloud/shelly-em-2-x-120a-clamp-wifi-smart-home-automation?tracking=A7FsiPIfUWsFpnfKHa8SRyUYLXjr2hPq). The device has a local API, updates are pushed to Home Assistant and it has a high quality integration.

You can build your own using ESPHome's [CT Clamp Current sensor](https://esphome.io/components/sensor/ct_clamp.html) or energy meter sensors like the [ATM90E32](https://esphome.io/components/sensor/atm90e32.html). For the DIY route, check out [this video by digiblur](https://www.youtube.com/watch?v=n2XZzciz0s4) to get started.

_Attention! Installing CT clamp sensor devices requires opening your electrical cabinet. This work should be done by someone familiar with electrical wiring. Your qualified installer will know how to do this._

_Disclaimer: Some links on this page are affiliate links._
