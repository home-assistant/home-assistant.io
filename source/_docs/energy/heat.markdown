---
title: "Integrating your heating"
description: "Learn how to add district heating, heat meters, heating oil, pellets, or wood to Home Assistant home energy management."
---

Heating is often the largest share of the energy a home uses. Home Assistant lets you track the energy or fuel you use for heating in the Energy dashboard, next to your electricity, gas, and water usage.

Heating sources work for any kind of heating, for example:

- District heating
- Heat meters in apartment buildings
- Heating oil
- Wood pellets or wood chips
- Firewood
- Gas used for heating, when you want to show it separately from gas used for cooking

Heating has its own **Heating** view in the Energy dashboard. Your heating sources also appear in the **Summary** view and in the energy sources table.

## Ways to measure heating

How you measure heating depends on how your home is heated. Home Assistant accepts three kinds of measurements.

### Heat or energy

A heat meter measures the amount of heat delivered to your home, usually in kWh, MWh, or GJ. Homes with district heating and many apartments with central heating have one. Heat meters can often be read remotely, for example over wireless M-Bus. Some heat pumps and boilers also report the energy they produce.

Use a sensor that measures energy if you have one. Energy can be compared directly with your other energy sources.

### Fuel volume

For heating oil, you can track the total volume of fuel you have burned, for example in liters, cubic meters, or gallons. A common way to get this is the burner run time multiplied by the nozzle flow rate. Gas meters that count the total volume of gas can also be used.

A tank level sensor shows how much fuel is left in the tank, not how much you have burned. The level goes down while you heat and jumps up when the tank is refilled, so it can't be used as a heating source directly. To use it, first create a sensor that adds up the decreases of the tank level and ignores refills.

### Fuel mass

For pellets, wood chips, or firewood, you can track the mass of fuel you burn in kilograms or pounds. Some pellet boilers report the amount of pellets they have consumed. You can also count bags or weigh deliveries.

### Combine different fuels

To show the heating sources together in one graph, all heating sources must measure the same kind of unit: energy, volume, or mass. For example, you can't add a heating oil source in liters next to a pellet source in kilograms.

If you heat with different fuels, convert each fuel to energy. Multiply the amount of fuel by its energy content, for example the kWh per kilogram of pellets or per liter of heating oil. You find the energy content of your fuel on its product sheet or delivery note. Use a [Template](/integrations/template/) sensor for the conversion.

## Sensor requirements

To be selectable as a heating source, a sensor needs these attributes:

- **Device class**: `energy`, `gas`, `volume`, or `weight`
- **State class**: `total` or `total_increasing`
- **Unit of measurement**:
  - Energy: any energy unit, such as `kWh`, `MWh`, or `GJ`
  - Volume: `L`, `m³`, `gal`, `ft³`, `CCF`, or `MCF`
  - Mass: `kg` or `lb`

Optionally, you can add a sensor for the current heating rate. This can be a power sensor, such as the power a heat meter reports in kW, or a volume flow rate sensor, such as the fuel flow of an oil burner in L/h.

If your sensor doesn't show up, see [Troubleshooting missing entities](/docs/energy/faq/#troubleshooting-missing-entities).

## Add heating to the Energy dashboard

1. Go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %} and open the **Heating** tab.
2. Select **Add heating source**.
3. Under **Heating consumption**, select the sensor that measures your heating.
4. Optional: Under **Heating power or fuel flow rate**, select a sensor for the current heating rate.
5. Optional: Under **Display name**, enter a name such as `Pellets`.
6. Choose how Home Assistant should track your heating costs. For details, see [Track heating costs](#track-heating-costs).
7. Select **Save**.

It can take up to 2 hours for new data to show up in the Energy dashboard.

## Track heating costs

You can track your heating costs in four ways:

- **Do not track costs**
- **Use an entity tracking the total costs**: Select a sensor that adds up your heating costs.
- **Use an entity with current price**: Select an entity that holds the current price, such as `EUR/kWh`, `EUR/L`, or `EUR/kg`.
- **Use a static price**: Enter a fixed price per unit of your heating sensor.

When you use a price, Home Assistant creates a helper sensor that adds up your costs. A price entity is converted automatically if its unit differs from the unit of your heating sensor, for example a price in `EUR/kWh` for a sensor in `MWh`, or a price in `EUR/kg` for a sensor in `lb`.

The price must belong to the same kind of unit as your heating sensor. A price per kWh doesn't work for a sensor that measures liters of heating oil. In that case, Home Assistant shows a message next to the heating source in the Energy configuration and doesn't calculate costs until the price is changed.

## Move a gas source to heating

If you added your heating to the Energy dashboard as a gas source, for example pellets converted to energy, you can move it to heating. The history and costs of the source are kept, because the source keeps the same sensor.

1. Go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %} and open the **Gas** tab.
2. Next to the source you want to move, select the radiator icon {% icon "mdi:radiator" %} **Move to heating**.
3. Select **Move**.

The source now appears in the **Heating** tab and in the **Heating** view of the Energy dashboard. If Home Assistant created a helper sensor for the costs of the source, it keeps its entity ID and continues adding up your costs.

You can only move a gas source if it measures the same kind of unit as your existing heating sources. For example, a gas source measuring energy can't be moved next to a heating source measuring volume.

## Troubleshooting

### My heating sensor is not listed

Make sure the sensor meets the [sensor requirements](#sensor-requirements). If you already have heating sources, only sensors measuring the same kind of unit can be selected.

### The heating costs are not calculated

Check that the unit of your price matches the kind of unit of your heating sensor. For example, use a price per liter for a sensor measuring liters of heating oil. Go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %} and open the **Heating** tab. Problems with a heating source are shown next to it.
