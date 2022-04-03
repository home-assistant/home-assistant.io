---
type: card
title: "Energy Cards"
sidebar_label: Energy Cards
description: "An overview of the energy cards that are available."
---

This is a list of all the cards used in the energy dashboard, you can also place them anywhere you want in your dashboard.

At the moment there are no configuration options available for these cards, you can configure them on the {% my config_energy title="energy configuration page" %}.

## Energy date picker

<p class='img'>
  <img src='/images/dashboards/energy/date-selection.png' alt='Screenshot of the energy date selection card'>
  Screenshot of the Energy date selection card.
</p>

This card will allow you to pick what data to show. Changing it in this card will influence the data in all other cards.

#### Example
```yaml
type: energy-date-selection
```

## Energy usage graph

<p class='img'>
  <img src='/images/dashboards/energy/usage-graph.png' alt='Screenshot of the energy usage graph card'>
  Screenshot of the Energy usage graph card.
</p>

The energy usage graph card shows the amount of energy your house has consumed, and from what source this energy came.
It will also show the amount of energy your have returned to the grid.

#### Example
```yaml
type: energy-usage-graph
```

## Solar production graph

<p class='img'>
  <img src='/images/dashboards/energy/solar-graph.png' alt='Screenshot of the solar graph card'>
  Screenshot of the Solar production graph card.
</p>

The solar production graph card shows the amount of energy your solar panels have produced per source, and if setup and available the forecast of the solar production.

#### Example
```yaml
type: energy-solar-graph
```

## Gas consumption graph

<p class='img'>
  <img src='/images/dashboards/energy/gas-graph.png' alt='Screenshot of the gas consumption graph card'>
  Screenshot of the gas consumption graph card.
</p>

The gas consumption graph card shows the amount of gas consumed per source.

#### Example

```yaml
type: energy-gas-graph
```

## Energy distribution

<p class='img'>
  <img src='/images/dashboards/energy/distribution.png' alt='Screenshot of the energy distribution card'>
  Screenshot of the Energy distribution card.
</p>

The energy distribution card shows how the energy flowed, from the grid to your house, from your solar panels to your house and/or back to the grid.

If setup, it will also tell you how many kWh of the energy you got from the grid was produced without using fossil fuels.

If you set `link_dashboard` to `true`, the card will include a link to the energy dashboard.

#### Example
```yaml
type: energy-distribution
link_dashboard: true
```

## Energy sources table

<p class='img'>
  <img src='/images/dashboards/energy/sources-table.png' alt='Screenshot of the energy sources table card'>
  Screenshot of the Energy sources table card.
</p>

The energy sources table card shows all your energy sources, and the corresponding amount of energy.
If setup, it will also show the costs and compensation per source and the total.

#### Example
```yaml
type: energy-sources-table
```

## Grid neutrality gauge

<p class='img'>
  <img src='/images/dashboards/energy/grid-neutrality-gauge.png' alt='Screenshot of the grid neutrality gauge card'>
  Screenshot of the Grid neutrality gauge card.
</p>

The grid neutrality gauge card represents your energy dependency. If the needle is in the purple, you returned more energy to the grid than you consumed from it. If it's in the blue, you consumed more energy from the grid than you returned.

#### Example
```yaml
type: energy-grid-neutrality-gauge
```

## Solar consumed gauge

<p class='img'>
  <img src='/images/dashboards/energy/solar-consumed-gauge.png' alt='Screenshot of the solar consumed gauge card'>
  Screenshot of the Solar consumed gauge card.
</p>

The solar consumed gauge represents how much of the solar energy was not used by your home and was returned to the grid. If you frequently return a lot, try to conserve this energy by installing a battery or buying an electric car to charge.

#### Example
```yaml
type: energy-solar-consumed-gauge
```

## Carbon consumed gauge

<p class='img'>
  <img src='/images/dashboards/energy/carbon-consumed-gauge.png' alt='Screenshot of the carbon consumed gauge card'>
  Screenshot of the Carbon consumed gauge card.
</p>

The carbon consumed gauge card represents how much of the energy consumed by your home was generated using non-fossil fuels like solar, wind and nuclear. It includes the solar energy you generated your self.

#### Example
```yaml
type: energy-carbon-consumed-gauge
```

## Devices energy graph

<p class='img'>
  <img src='/images/dashboards/energy/devices-graph.png' alt='Screenshot of the devices energy graph card'>
  Screenshot of the devices energy graph card.
</p>

The devices energy graph show the energy usage per device, it is sorted by usage.

#### Example
```yaml
type: energy-devices-graph
```
