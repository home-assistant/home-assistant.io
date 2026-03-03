---
title: "Frequently Asked Questions about home energy management"
description: "Home energy management is a vast topic and not everything might be clear. This page tries to clarify a couple of things."
---

## Energy vs power

People often confuse [power](https://en.wikipedia.org/wiki/Electric_power) with [energy](https://en.wikipedia.org/wiki/Energy); they are different physical quantities. Power is the rate at which energy is transferred or converted (how fast), while energy is the amount that has been transferred or converted (how much).

Power is measured in watts (W) and energy is commonly measured in kilowatt-hours (kWh). Think of this as analogous to speed and distance: power is like the speed at which you are travelling, and energy is like the distance driven.

Mathematically, energy is the integral of power over time. When working with sampled power values, the energy over an interval is the time integral of power (or a numerical approximation computed from the samples).

This distinction is important because you need to use the correct entities in the Energy dashboard.

## Creating an energy sensor out of a power sensor

Since Home Assistant works with discrete samples of power rather than continuous power functions, you can't obtain an exact energy value by integrating from a single, sparsely sampled stream. Instead, you must approximate the integral from the available samples.

If you can sample power values frequently enough (for example, every few seconds), you can reliably estimate transferred energy using numerical approximations such as [Riemann sums](https://en.wikipedia.org/wiki/Riemann_sum).

## Split consumption by tariffs

If you are using a third-party device (for example, not reading directly from your utility meter or from the utility provider's cloud service) you need Home Assistant to split your energy measurements into two or more tariffs in accordance with your utility provider contract.

To accomplish this, you can use the [utility_meter integration](/integrations/utility_meter/). With this integration you define as many tariffs as required by your utility provider.

## The Energy dashboard is not visible

If you do not see the Energy dashboard in the sidebar, make sure you have not removed [`default_config:`](/integrations/default_config/) from your {% term "`configuration.yaml`" %}. If you have, you will need to enable the integrations and UI elements required for the dashboard to appear.

## Troubleshooting missing entities

### Condition

You are trying to add a sensor to the Energy dashboard, but it does not appear in the selection list.

### Resolution

To find out why the sensor is not showing, check the following points:

- The sensor must have the appropriate attributes. Check your entity attributes in {% my developer_states title="**Settings** > **Developer tools** > **States**" %} to confirm the following:
  - `device_class` must be `energy` or `power` for electricity grid, solar, or battery categories. It must be `gas` for gas, or `water` for water.
  - `state_class` must be `measurement` for power sensors and `total` or `total_increasing` for all others.
  - The sensor must have an appropriate `unit_of_measurement`. See the help text for each category to see which units are accepted. Units containing an exponent must match superscript characters exactly.
  
  If any of the attributes are not correct, please open an issue against the integration that provides your sensor, or if you are developing custom template sensors, make sure the templates have the correct attributes.

- The entity must be a `sensor`. If you are trying to add something from another domain (for example an `input_number`), then you must first create a template sensor from it.
- The entity must not have any statistics errors. Go to {% my developer_statistics title="**Settings** > **Developer tools** > **Statistics**" %} to check your specific entity. If your unit has a listed issue here, address that first.
