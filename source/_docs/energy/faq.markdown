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

## Using a power sensor or a flow rate sensor

The **Energy** dashboard tracks energy in kWh, and gas and water as volumes. If a device only reports power in watts, or a flow rate, Home Assistant can calculate the totals for you.

1. Go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %}.
2. Add an individual device, solar panels, home consumption, gas, or water, and select the power sensor or flow rate sensor.
3. Select **Save**.
   - Result: A dialog suggests a sensor that can be created from the sensor you selected.
   - If a sensor that calculates the total from the same sensor already exists, the dialog lists that one instead, so you don't get a duplicate.
4. Select **Create**, or **Use sensor** if the dialog only lists existing sensors.
   - Result: The sensor is created or reused, and added to the **Energy** dashboard.

New sensors start counting when you create them, so earlier values are not included. The sensor that Home Assistant creates is an [Integration (Riemann sum integral)](/integrations/integration/) helper. You can find it under {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}.

## Split consumption by tariffs

If you are using a third-party device (for example, not reading directly from your utility meter or from the utility provider's cloud service) you need Home Assistant to split your energy measurements into two or more tariffs in accordance with your utility provider contract.

To accomplish this, you can use the [utility_meter integration](/integrations/utility_meter/). With this integration you define as many tariffs as required by your utility provider.

## Setting up a dedicated solar export connection in the Energy dashboard

If you have a solar installation with a dedicated grid connection that is used only for exporting production—separate from the main household consumption grid connection—you can configure the energy dashboard as follows:

1. If not configured yet, add your main household grid connection as a **Grid** source with **Energy imported from grid**, **Energy exported to grid**, and **Power measurement** configured as normal. Do not add any sensor for the separate solar production to this connection.
2. Add your inverter production energy and power sensors as a **Solar panels** source, as usual.
3. Add the dedicated solar grid connection as a **Grid** source.
    - Configure **Energy exported to grid** and leave **Energy imported from grid** empty, as this connection never imports.
    - Set the **Power measurement** sensor for this connection to a sensor that reads the export power.
    - Set the **Type of power measurement** setting to **Inverted** so that the value is negative when exporting to the grid. Most inverters report export power as a positive value.
    - On the **Export compensation** setting, select one of the desired cost tracking options. Leave the **Cost tracking** setting empty.

With this setup, the dashboard correctly attributes solar production exported via the dedicated connection as **Solar → Grid**.

## Why is my Energy dashboard showing inflated totals?

If you add up several sensors that reset on a schedule, for example with a template sensor or a **Group** helper that sums two `utility_meter` sensors, and use that combined sensor as an Energy dashboard source, your totals can become inflated. The individual sensors are unlikely to reset to zero at the exact same moment, so in the brief gap where one has reset and the other hasn't, the combined sensor reports a false, temporary value. Home Assistant records that value in long-term statistics, where it's easy to miss and requires manual correction.

To avoid this, add each cumulative sensor to the Energy dashboard as its own separate source, instead of combining them into one summed sensor first.

If inflated data has already been recorded, you can review and adjust it from {% my tools_statistics title="**Settings** > **Tools** > **Statistics**" %}.

## The Energy dashboard is not visible

If you do not see the Energy dashboard in the sidebar, make sure you have not removed [`default_config:`](/integrations/default_config/) from your {% term "`configuration.yaml`" %}. If you have, you will need to enable the integrations and UI elements required for the dashboard to appear.

## Troubleshooting

{% details "Sensor is missing from the Energy dashboard" %}

### Symptom: The sensor doesn't appear in the selection list

You are trying to add a sensor to the Energy dashboard, but it doesn't appear in the selection list.

#### Description

The Energy dashboard only lists sensors that it can use for the field you're filling in. A sensor doesn't appear if it has the wrong attributes, if it isn't a `sensor` entity, or if it has statistics errors.

#### Resolution

To find out why the sensor is not showing, check the following points:

- The sensor must have the appropriate attributes. Check your entity attributes in {% my tools_states title="**Settings** > **Tools** > **States**" %}. The required attributes depend on what the sensor measures:
  - **Energy**: `device_class: energy` with `state_class: total` or `state_class: total_increasing`.
  - **Power**: `device_class: power` with `state_class: measurement`.
  - **Battery state of charge**: `device_class: battery`, `state_class: measurement`, and `unit_of_measurement: "%"`.
  - **Gas**: `device_class: gas` with `state_class: total` or `state_class: total_increasing`.
  - **Water**: `device_class: water` with `state_class: total` or `state_class: total_increasing`.
  - The sensor must use a supported `unit_of_measurement`. See the help text for the Energy dashboard field for the accepted units. Units containing an exponent must match superscript characters exactly.

  If an attribute is missing or not correct, refer to [The sensor is missing an attribute that the Energy dashboard needs](#symptom-the-sensor-is-missing-an-attribute-that-the-energy-dashboard-needs).
- The entity must be a `sensor`. If you are trying to add something from another domain (for example an `input_number`), then you must first [create a template sensor](/integrations/template/#creating-a-template-helper-from-the-user-interface) from it.
- The entity must not have any statistics errors. Go to {% my tools_statistics title="**Settings** > **Tools** > **Statistics**" %} to check your specific entity. If your unit has a listed issue here, address that first.

{% enddetails %}

{% details "Sensor is missing the device class or state class" %}

### Symptom: The sensor is missing an attribute that the Energy dashboard needs

In {% my tools_states title="**Settings** > **Tools** > **States**" %}, the device class, state class, or unit of measurement of your sensor is missing or not correct. You can't change it in the entity settings.

#### Description

The integration that provides the sensor sets these attributes. You can't change the device class or state class of a sensor in the entity settings.

#### Resolution

Create a template sensor helper that copies the value of your sensor and has the correct attributes:

1. Create a template sensor helper. For the steps, refer to [Creating a template helper from the user interface](/integrations/template/#creating-a-template-helper-from-the-user-interface).
2. In **State**, enter a template that reads your sensor, for example `{{ states('sensor.garden_water_meter') | float(none) }}`.
   - The [`float(none)`](/template-functions/float/) filter keeps the template sensor working while your sensor has no value, for example while Home Assistant starts.
3. Select the **Unit of measurement**, **Device class**, and **State class** that the Energy dashboard needs.
4. Add the new template sensor to the Energy dashboard.

Also open an issue against the integration that provides your sensor, so that it can set the correct attributes.

{% enddetails %}
