---
title: "Integrating your heat usage"
description: "Learn how to add information about your heat usage to Home Assistant home energy management."
---

Some homes are connected to a district heating network instead of having their own boiler.
A central plant heats water and sends it to your home, where it heats your rooms and often your tap water.
A heat meter measures how much heat your home takes from the network.

Home Assistant allows you to track your heat usage and its costs on the Energy dashboard.
Heat gets its own **Heat** tab, so you can compare it against your electricity, gas, and water usage for the same period of time.

## Requirements

To track heat, you need a sensor that measures the total amount of heat your home has used.
The sensor needs the following attributes:

- `device_class: energy`
- `state_class: total` or `state_class: total_increasing`
- An energy unit, such as kWh, MWh, or GJ

Heat meters often report in MWh or GJ.
The Energy dashboard converts these to kWh for you.

## Adding heat to the Energy dashboard

1. Go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %}.
2. In the **Heat consumption** section, select **Add heat source**.
3. Under **Heat consumption**, select the sensor that measures your heat usage.
4. Optional: Under **Heat power**, select a sensor that measures the heat power supplied to your home, in W or kW.
5. Optional: Enter a **Display name**.
6. Under **Cost tracking**, select how Home Assistant should track the costs of the heat you use:
   - **Do not track costs**
   - **Use an entity tracking the total costs**: Select an entity that reports your total heat costs.
   - **Use an entity with current price**: Select an entity that reports the current price. The price can use any energy unit, such as EUR/kWh or EUR/GJ. Home Assistant converts it for you.
   - **Use a static price**: Enter a fixed price per kWh.
7. Select **Save**.

## Hardware

How you read your heat meter depends on the meter model and your heating supplier.

### Read the heat meter through its optical port

Many heat meters have an optical (infrared) port on the front.
The [Landis+Gyr Heat Meter](/integrations/landisgyr_heat_meter/) integration reads Landis+Gyr Ultraheat meters this way, using an IR read head.

### Read the heat meter using Wireless M-Bus

Many heat meters send their readings over [Wireless M-Bus](https://en.wikipedia.org/wiki/Meter-Bus).
The [wmbusmeters project](https://github.com/wmbusmeters/wmbusmeters/) can receive and decode these readings and send them to Home Assistant using MQTT.
Some suppliers encrypt the readings. In that case, ask your supplier for the decryption key.
