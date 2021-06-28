---
title: "Integrating your electricity grid"
description: "Learn how to add information about your electricity grid to Home Assistant home energy management."
---

Energy management is all about knowing how much energy you’re consuming, where it’s coming from and where it’s going.

Almost all houses are connected to the electricity grid which provides the energy your home will need. The energy usage is being tracked by your energy meter and is billed to you by your energy provider. Energy prices can differ based on a schedule or change according to market price.

<img src='/images/docs/energy/grid.png' alt='Graphic showing energy flowing from the grid to Home Assistant.' style='border: 0;box-shadow: none;'>

## Tariffs

It has become popular for energy utilities to split the price of energy based on time of the day; this is done in order to incentivise consumers to shift their power needs towards times where the grid has lower loads. These periods of time are commonly referred to as Peak and Off Peak, exactly because they match periods of time where everyone is consuming energy (Peak) and periods of time where the energy is abundant but no one is using it (Off Peak). Therefore Peak energy is more expensive then Off Peak energy.

If you are using a 3rd party device (e.g. not reading directly from your utility meter device or from the utility provider cloud service) you need HA to split your energy measurements into 2 (or more) tariffs, in order to track these energy consumptions separately. To accomplish such, you might use [the utility_meter integration](/integrations/utility_meter/). With the utility_meter integration you define as many tariffs as required (in accordance to your utility provider contract) and HA will be able to differentiate energy consumptions in each of the tariffs. Please note that each utility provider has their own time schedules for peak and off peak and you are required to create an automation that switches the utility_meter entity from one tariff to the other.

## Hardware

Home Assistant will need to know the amount of energy flowing through your meter. This can be done in various ways.

### Reading the meter via the P1 port

TBD. Mention Slimme Lezer

### Reading the meter via the HAN port

This is basically an RS485 port on a smart meter
https://github.com/tiagofreire-pt/Home_Assistant_EDP_Box

### Reading the meter via a pulse counter

Many meters, including older ones, have an LED that will flash whenever energy passes through it. For example, each flash is a 1/1000th kWh. By monitoring the time between flashes it’s possible to determine the energy consumption.

Mention ESPHome support + Home Assistant Glow.

### Data provided by a CT clamp sensor (e.g. Shelly 3EM or OpenEnergyMonitor)

Popular option
CT clamp sensors basically measure the instantaneous current passing through an electrical wire. To translate this into electrical power (Wh) you also need a voltage measurement, because Power = Current x Voltage.
Devices like Shelly EM/3EM, Iotawatt, Openenergymonitor (EmonPi) measure both current and voltage.
In case of three-phase electrical systems, attention should be drawn to the fact that the current measurement of a given phase is matched to the voltage of the same phase, otherwise the power measurements will be incorrect.

Attention! Installing CT clamp sensor devices requires opening your electrical cabinet. This work should be done by someone familiar with electrical wiring. Your qualified installer will know how to do this.

### Data provided by your energy provider

TBD. Mention toon/tibber?
Probably a popular option but it relies on clouds.
