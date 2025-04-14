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

{% include energy/ct_clamp.md %}

Note: you have to create a 2 helpers to separate between "Energy going in to the battery" and "Energy coming out of the battery". This is best done by making template sensors with the following code (this one is for energy flowing in your battery):
```
{% if states('sensor.name_of_your_sensor')|float(0) >= 0 %}
  {{ states('sensor.name_of_your_sensor') }}
{% else %}
  {{ 0 }}
{% endif %}
```
For each of these helpers you'll create a additional sensor to calculate the sum. (use the integral function for this)
