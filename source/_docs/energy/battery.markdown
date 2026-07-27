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

## Adding your battery to the energy dashboard

To track your battery, go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %} and, under **Home battery storage**, select **Add battery system**.

The energy dashboard tracks the flow of energy in each direction separately, so you provide two energy sensors:

- **Energy charged into the battery**: a sensor that measures the electricity flowing into the battery, measured in kWh (or another supported energy unit, such as Wh, MWh, or GJ).
- **Energy discharged from the battery**: a sensor that measures the electricity flowing out of the battery, in the same unit.

Both are cumulative, positive-only sensors: their values only increase over time. You do not use a single sensor with positive and negative values for battery energy.

You can also add these optional inputs:

- **Battery state of charge**: a sensor that reports the battery's charge level as a percentage.
- **Battery capacity**: the usable capacity of the battery in kWh. This is used to weight the combined state of charge when you have several batteries of different sizes.

### Adding a power sensor for real-time monitoring

Energy sensors show total usage over time. If you also want to see the battery charging and discharging in real time, add a **Battery power** sensor, measured in W or kW.

Because devices represent the direction of flow in different ways, you tell Home Assistant which convention your sensor uses with the **Type of power measurement** setting:

- **Standard**: positive values mean the battery is discharging, and negative values mean it is charging.
- **Inverted**: positive values mean the battery is charging, and negative values mean it is discharging. Select this if your device reports the opposite sign, so you do not need to create a template sensor to invert it.
- **Two sensors**: select a separate charge power sensor and discharge power sensor, each reporting positive values.

For more details, see [Power measurement sign conventions](/docs/energy/faq/#power-measurement-sign-conventions).

### If your battery reports a single signed energy value

The energy dashboard needs two separate positive energy sensors, one for charging and one for discharging. If your device only provides a single energy sensor that goes positive when charging and negative when discharging, split it into two sensors first. You can do this with a [template sensor](/integrations/template/) or the [Utility Meter integration](/integrations/utility_meter/) to derive separate charge and discharge values.

If your device only provides a power sensor, you can turn it into an energy sensor with the [Riemann sum integral integration](/integrations/integration/#energy).
