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

## Add your battery to the Energy dashboard

Once your battery data is available in Home Assistant, add your battery to the Energy dashboard:

1. Go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %}.
2. Under **Home battery storage**, select **Add battery system**.
3. Under **What does your battery measure?**, select the option that matches your battery's sensors. To find out which option fits, see [choose what your battery measures](#choose-what-your-battery-measures).
4. Select the energy sensors for your battery.
5. Optionally, select power sensors and a state of charge sensor, and enter the battery capacity. Power sensors are used by the live power views, such as the **Now** tab.
6. Select **Save**.

Only compatible statistics are available for selection. If you have more than one battery, add each one separately. Each battery can use a different option.

### Choose what your battery measures

Some batteries only measure the electricity that goes in and comes out. Others also measure where it comes from and where it goes. Check your battery's sensors, then select one of these options:

- **Only total in and out**: Your battery has one sensor for electricity going into the battery and one for electricity coming out.
- **Separately for grid, solar and home**: Your battery has separate sensors for charging from the grid and from solar, and for discharging to your home and to the grid.

If your battery has sensors for each direction, select **Separately for grid, solar and home**. The Energy dashboard then shows the flows your battery measures, instead of estimating them. To learn more, see [measured and estimated battery flows](#measured-and-estimated-battery-flows).

### Sensors for total in and out

Select the sensor for **Energy charged into the battery** and the sensor for **Energy discharged from the battery**.

### Sensors for each direction

With **Separately for grid, solar and home**, your battery has four directions:

- Charging from the grid: energy that flows from the grid into the battery
- Charging from solar: energy that flows from your solar panels into the battery
- Discharging to your home: energy that flows from the battery to your home
- Discharging to the grid: energy that flows from the battery back to the grid

For each direction, select an energy sensor and, optionally, a power sensor. You need at least one charging direction and one discharging direction.

Leave a direction empty only if that flow never happens. Home Assistant counts an empty direction as zero and doesn't estimate it. For example, if your battery never sends energy back to the grid, leave discharging to the grid empty.

### Power sensors for each direction

You can add a power sensor to any of the directions. In the live power views, a direction without a power sensor counts as 0 W.

Each power sensor measures one direction only, so its value must never be negative. If a power sensor reports a negative value, Home Assistant shows a warning.

From these power sensors, Home Assistant creates a battery power sensor. It shows the net power of your battery: positive while the battery discharges and negative while it charges. Views that show the battery as a single value, such as the power sources graph, use this sensor. If you change which power sensors you use, Home Assistant creates a new battery power sensor.

### Warnings about missing sources

Some directions need another source in the Energy dashboard. If that source is missing, Home Assistant shows a warning. You can still save your battery.

- You measure charging from the grid, but no grid connection has **Energy imported from grid**.
- You measure discharging to the grid, but no grid connection has **Energy exported to grid**.
- You measure charging from solar, but no **Solar panels** source is configured.

To resolve a warning, add the missing source. Without it, the Energy dashboard can't show where that energy comes from or where it goes.

## Measured and estimated battery flows

The Energy dashboard shows where your battery's energy comes from and where it goes. For example, the energy distribution card and the Sankey graphs show these flows.

- With **Separately for grid, solar and home**, the dashboard shows the flows that your sensors measure.
- With **Only total in and out**, the dashboard only knows how much energy went into the battery and how much came out. It estimates where that energy came from and where it went. This estimate can be wrong. For an example, see [why grid charging can look like solar charging](/docs/energy/faq/#why-does-grid-charging-of-my-battery-look-like-solar-charging).

If you have several batteries, each battery uses its own option. The dashboard uses the measured flows and only estimates the flows of batteries with total in and out.
