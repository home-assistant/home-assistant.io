---
title: "Frequently Asked Questions about home energy management"
description: "Home Energy Management is a vast topic and not everything might be clear. This page tries to clarify a couple of things."
---

## Energy vs Power

It's a common mistake to take Power as an Energy value, but the two are not alike.

[Energy](https://en.wikipedia.org/wiki/Energy) is a quantitative measurement of what it takes to produce work (e.g. heat water) while [Power](https://en.wikipedia.org/wiki/Electric_power) measures the speed at which energy is transferred.

Electrical Power is measured in Watts (W) and Electrical Energy is measured in kiloWatt-hour (kWh).

Think of this in a parallel to speed and distance: Power is the speed you are going and Energy is the distance driven.

Therefore Energy (kiloWatt-hour) is not an average of the Power you are consuming over a given period of time (the unit of the average power would be Watt or kiloWatt again). Energy is the integral (mathematical operation) of the Power function.

This difference is very important as you need to use the proper entities in our Energy Panel.

## Creating an Energy Sensor out of a Power Sensor

Since in Home Assistant, we don't deal with Power functions but with samples of the power being used, we can't do the integral (mathematical operation) directly and get the true amount of energy consumed/produced.

That said, if you can sample Power values fast enough (every few seconds) you can reliably measure energy transferred through mathematic approximations called [Riemann Sum](https://en.wikipedia.org/wiki/Riemann_sum). Home Assistant provides this mathematical operation through the [integration](/integrations/integration/#energy).

## Split consumption by tariffs

If you are using a 3rd party device (e.g. not reading directly from your utility meter device or from the utility provider cloud service) you need HA to split your energy measurements into 2 (or more) tariffs, in order to track these energy consumptions separately.

To accomplish such, you can use [the utility_meter integration](/integrations/utility_meter/). With this integration, you define as many tariffs as required (in accordance with your utility provider contract) and HA will be able to differentiate energy consumptions in each of the tariffs. Please note that each utility provider has its own time schedules for peak and off-peak and you are required to create an automation that switches the utility_meter entity from one tariff to the other.

## The Energy panel is not visible

If you do not see the Energy panel in the sidebar, make sure you have not removed [`default_config:`](/integrations/default_config/) from your `configuration.yaml`. If you have, you will need to add the `energy:` integration manually.

