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

## Power measurement sign conventions

When you add a power sensor to a **Grid**, **Solar panels**, or **Home battery storage** source, Home Assistant needs to know how your sensor represents the direction of flow. You set this with the **Type of power measurement** option in the source's configuration dialog.

Three options are available:

- **Standard**: a single sensor that uses positive and negative values for the two directions of flow. Home Assistant expects these signs:
  - For a **grid** source, positive values mean energy imported from the grid, and negative values mean energy exported to the grid.
  - For a **home battery** source, positive values mean the battery is discharging, and negative values mean the battery is charging.
- **Inverted**: the same as **Standard**, but with the signs reversed. Select this when your device reports the opposite sign, for example a battery that reports charging as a positive value. Using this option avoids having to create a template sensor to invert the value.
- **Two sensors**: two separate sensors that both report positive values, one for each direction of flow. For a battery, you select a separate charge power and discharge power sensor. For a grid source, you select separate import and export power sensors.

This setting applies only to the real-time power sensor. Energy sensors (in kWh) are always cumulative, positive-only values, and you add a separate sensor for each direction of flow.

## Setting up a dedicated solar export connection in the Energy dashboard

If you have a solar installation with a dedicated grid connection that is used only for exporting production—separate from the main household consumption grid connection—you can configure the energy dashboard as follows:

1. If not configured yet, add your main household grid connection as a **Grid** source with **Energy imported from grid**, **Energy exported to grid**, and **Power measurement** configured as normal. Do not add any sensor for the separate solar production to this connection.
2. Add your inverter production energy and power sensors as a **Solar panels** source, as usual.
3. Add the dedicated solar grid connection as a **Grid** source.
    - Configure **Energy exported to grid** and leave **Energy imported from grid** empty, as this connection never imports.
    - Set the **Power measurement** sensor for this connection to a sensor that reads the export power.
    - Set the **Type of power measurement** setting to **Inverted** so that the value is negative when exporting to the grid. Most inverters report export power as a positive value. For more details, see [Power measurement sign conventions](/docs/energy/faq/#power-measurement-sign-conventions).
    - On the **Export compensation** setting, select one of the desired cost tracking options. Leave the **Cost tracking** setting empty.

With this setup, the dashboard correctly attributes solar production exported via the dedicated connection as **Solar → Grid**.

## Why is my Energy dashboard showing inflated totals?

If you add up several sensors that reset on a schedule, for example with a template sensor or a **Group** helper that sums two `utility_meter` sensors, and use that combined sensor as an Energy dashboard source, your totals can become inflated. The individual sensors are unlikely to reset to zero at the exact same moment, so in the brief gap where one has reset and the other hasn't, the combined sensor reports a false, temporary value. Home Assistant records that value in long-term statistics, where it's easy to miss and requires manual correction.

To avoid this, add each cumulative sensor to the Energy dashboard as its own separate source, instead of combining them into one summed sensor first.

If inflated data has already been recorded, you can review and adjust it from {% my developer_statistics title="**Settings** > **Tools** > **Statistics**" %}.

## The Energy dashboard is not visible

If you do not see the Energy dashboard in the sidebar, make sure you have not removed [`default_config:`](/integrations/default_config/) from your {% term "`configuration.yaml`" %}. If you have, you will need to enable the integrations and UI elements required for the dashboard to appear.

## Troubleshooting missing entities

### Condition

You are trying to add a sensor to the Energy dashboard, but it does not appear in the selection list.

### Resolution

To find out why the sensor is not showing, check the following points:

- The sensor must have the appropriate attributes. Check your entity attributes in {% my developer_states title="**Settings** > **Tools** > **States**" %} to confirm the following:
  - `device_class` must be `energy` or `power` for electricity grid, solar, or battery categories. It must be `gas` for gas, or `water` for water.
  - `state_class` must be `measurement` for power sensors and `total` or `total_increasing` for all others.
  - The sensor must have an appropriate `unit_of_measurement`. See the help text for each category to see which units are accepted. Units containing an exponent must match superscript characters exactly.
  
  If any of the attributes are not correct, please open an issue against the integration that provides your sensor, or if you are developing custom template sensors, make sure the templates have the correct attributes.

- The entity must be a `sensor`. If you are trying to add something from another domain (for example an `input_number`), then you must first create a template sensor from it.
- The entity must not have any statistics errors. Go to {% my developer_statistics title="**Settings** > **Tools** > **Statistics**" %} to check your specific entity. If your unit has a listed issue here, address that first.
