---
title: "Frequently Asked Questions about home energy management"
description: "Home Energy Management is a vast topic and not everything might be clear. This page tries to clarify a couple of things."
---

## Energy vs Power

Energy is a quantitative measurement of what it takes to produce work (e.g. heat water) while Power measures the speed at which energy is transferred.

Electrical Power is usually measured in Watts (W) and Electrical Energy is usually measured in Watt-Hour (Wh) (not to be confused with Watt/Hour).

This difference is very important as you need to use the proper entities and/or convert between the two. Energy (Watt-Hour) is not an average of the Power you are consuming over a given period of time, but the sum of the power function: Power is the derivative of Energy over time.

Think of this in a parallel to speed and distance: Power is the speed you are going and Energy is the distance driven.

## Split consumption by tariffs

If you are using a 3rd party device (e.g. not reading directly from your utility meter device or from the utility provider cloud service) you need HA to split your energy measurements into 2 (or more) tariffs, in order to track these energy consumptions separately.

To accomplish such, you can use [the utility_meter integration](/integrations/utility_meter/). With this integration you define as many tariffs as required (in accordance to your utility provider contract) and HA will be able to differentiate energy consumptions in each of the tariffs. Please note that each utility provider has their own time schedules for peak and off peak and you are required to create an automation that switches the utility_meter entity from one tariff to the other.
