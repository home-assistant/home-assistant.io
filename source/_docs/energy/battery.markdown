---
title: "Integrating your home batteries"
description: "Learn how to add information about your home batteries to Home Assistant home energy management."
---

A home battery allows homes to store energy when you are either producing more solar power than you're using, or store energy from the grid if the current price is low.

Home Assistant allows you to track how much energy flows from/to your battery.

## Battery capacity

When configuring a battery in the energy dashboard, you can specify its usable capacity. Home Assistant uses this capacity to weight the combined state of charge when you have multiple batteries of different sizes.

- Select **Enter manually** to enter the usable capacity in kWh.
- Select **Use a sensor** to choose a **Battery capacity sensor** that reports usable capacity in Wh, kWh, or MWh. Home Assistant uses the sensor's current reading and updates the capacity when it changes.

Choose a sensor that reports total usable capacity, rather than remaining energy or lifetime charged energy.

## Hardware

Home Assistant will need to know the amount of energy flowing from/to your batteries. This data can be tracked in various ways.

### Provided by the battery

Some battery vendors have an API to integrate the data into your Home Assistant instance. An example is [Tesla Powerwall](/integrations/powerwall/).

### Using a CT clamp sensor

{% include energy/ct_clamp.md %}
