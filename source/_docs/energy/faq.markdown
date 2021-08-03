---
title: "Frequently Asked Questions about home energy management"
description: "Home Energy Management is a vast topic and not everything might be clear. This page tries to clarify a couple of things."
---

## Energy vs Power

It's a common mistake to take Power as an Energy value, but the two are not alike.

[Energy](https://en.wikipedia.org/wiki/Energy) is a quantitative measurement of what it takes to produce work (e.g. heat water) while [Power](https://en.wikipedia.org/wiki/Electric_power) measures the speed at which energy is transferred.

Electrical Power is measured in Watts (W) and Electrical Energy is measured in kiloWatt-hour (kWh).

Think of this in a parallel to speed and distance: Power is the speed you are going and Energy is the distance driven.

This difference is very important as you need to use the proper entities in our Energy Panel.

## Creating an Energy Sensor out of a Power Sensor

Energy (kiloWatt-hour) is not an average of the Power you are consuming over a given period of time (that would be kiloWatt/hour). Energy is the integral of the Power function, or in other mathematical terms, it is the area of the graph beneath the power function.

Since in Home Assistant, we don't deal with Power functions but with samples of the power being used, we can't do the integral directly and get the true amount of energy consumed/produced.

That said, if you can sample Power values fast enough (every few seconds) you can reliably measure energy transferred through mathematic approximations called [Riemann Sum](https://en.wikipedia.org/wiki/Riemann_sum). Home Assistant provides this mathematical operation through the [integration](/integrations/integration/#energy).
