---
title: "Home consumption"
description: "Configure a meter that measures the total consumption of your whole home in the Energy dashboard."
---

If you have a meter that measures the consumption of your whole home, for example a main-panel energy monitor, you can add it to the Energy dashboard. When configured, it is used as the total home consumption instead of the value calculated from your grid, solar and battery sources.

## Requirements

- A sensor with a `device_class` of `energy` and a `state_class` of `total` or `total_increasing`, measuring your whole home consumption.
- Optionally, a sensor with a `device_class` of `power`, a `state_class` of `measurement`, and a supported power unit, such as `W` or `kW`. It is used by the live power views, such as the **Now** tab.

Only one home meter can be configured.

## Configuring the home meter

1. Go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %}.
2. In the **Home consumption** section, select **Add home meter**.
3. Select the energy sensor and, optionally, the power sensor.
4. Optionally, enter a display name. If you leave it empty, the name of your home is used.
5. Select **Save**.

## How it is used

- The meter replaces the calculated total consumption of your home.
- [Individual devices](/docs/energy/individual-devices/) remain a breakdown of this total. Consumption not covered by your devices is shown as untracked.
- Grid, solar and battery values always come from their own sensors. The home meter doesn't change them. If the home meter reads higher than your sources, the difference is shown under your home's name in the energy usage graph. If it reads lower, the sources are still shown as measured.