---
type: card
title: "Energy cards"
sidebar_label: Energy cards
description: "An overview of the energy cards that are available."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

This is a list of all the cards used in the energy dashboard. You can also place them anywhere you want in your dashboard.

You can configure them on the {% my config_energy title="energy configuration page" %}.

## Energy date picker

<p class='img'>
  <img src='/images/dashboards/energy/date-selection.png' alt='Screenshot of the energy date selection card'>
  Screenshot of the Energy date selection card.
</p>

This card allows you to pick what data to show. Changing it in this card will influence the data in all other cards.
Specific dates and ranges can be selected by opening the date range picker. The current period can be compared to the previous one using the compare data option within the menu.

### Example

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

### YAML configuration

The following YAML options are available

{% configuration %}
type:
  required: true
  description: "`energy-usage-graph`"
  type: string
collection_key:
  required: false
  description: "Collection key to use for the card. This links the card to a specific energy dashboard collection. Defaults to `energy_dashboard`."
  type: string
  default: energy_dashboard
title:
  required: false
  description: When defined, shows a card header with the title string and total energy consumed chip.
  type: string
{% endconfiguration %}

### Example

```yaml
type: energy-usage-graph
```

## Solar production graph

<p class='img'>
  <img src='/images/dashboards/energy/solar-graph.png' alt='Screenshot of the solar graph card'>
  Screenshot of the Solar production graph card.
</p>

The solar production graph card shows the amount of energy your solar panels have produced per source, and if setup and available the forecast of the solar production.

### YAML configuration

The following YAML options are available

{% configuration %}
type:
  required: true
  description: "`energy-solar-graph`"
  type: string
collection_key:
  required: false
  description: "Collection key to use for the card. This links the card to a specific energy dashboard collection. Defaults to `energy_dashboard`."
  type: string
  default: energy_dashboard
title:
  required: false
  description: When defined, shows a card header with the title string and total solar produced chip.
  type: string
{% endconfiguration %}

### Example

```yaml
type: energy-solar-graph
```

## Gas consumption graph

<p class='img'>
  <img src='/images/dashboards/energy/gas-graph.png' alt='Screenshot of the gas consumption graph card'>
  Screenshot of the gas consumption graph card.
</p>

The gas consumption graph card shows the amount of gas consumed per source.

{% configuration %}
type:
  required: true
  description: "`energy-gas-graph`"
  type: string
collection_key:
  required: false
  description: "Collection key to use for the card. This links the card to a specific energy dashboard collection. Defaults to `energy_dashboard`."
  type: string
  default: energy_dashboard
title:
  required: false
  description: When defined, shows a card header with the title string and total gas consumed chip.
  type: string
{% endconfiguration %}

### Example

```yaml
type: energy-gas-graph
```

## Water consumption graph

<p class='img'>
  <img src='/images/dashboards/energy/water-graph.png' alt='Screenshot of the water consumption graph card'>
  Screenshot of the water consumption graph card.
</p>

The water consumption graph card shows the amount of water consumed per source.

### YAML configuration

The following YAML options are available

{% configuration %}
type:
  required: true
  description: "`energy-water-graph`"
  type: string
collection_key:
  required: false
  description: "Collection key to use for the card. This links the card to a specific energy dashboard collection. Defaults to `energy_dashboard`."
  type: string
  default: energy_dashboard
title:
  required: false
  description: When defined, shows a card header with the title string and total water consumed chip.
  type: string
{% endconfiguration %}

### Example

```yaml
type: energy-water-graph
```

## Water Sankey graph

<p class='img'>
  <img src='/images/dashboards/energy/water-sankey.png' alt='Screenshot of the water Sankey graph card'>
  Screenshot of the water sankey graph card.
</p>

The water Sankey graph shows the flow of water consumption in your home. It visualizes how water flows from sources to the various consumers. Devices are grouped into floors and areas if these are configured.

This card displays historical water data based on the selected date range from the energy date picker.

### YAML configuration

The following YAML options are available:

{% configuration %}
type:
  required: true
  description: "`water-sankey`"
  type: string
collection_key:
  required: false
  description: "Collection key to use for the card. This links the card to a specific energy dashboard collection."
  type: string
title:
  required: false
  description: The title of the card.
  type: string
layout:
  required: false
  description: "`vertical`, `horizontal` or `auto`. Determines the orientation (flow direction) of the card. `auto` changes it based on the screen size."
  type: string
  default: auto
group_by_area:
  required: false
  description: Whether to group the devices by area
  type: boolean
  default: true
group_by_floor:
  required: false
  description: Whether to group the devices by floor
  type: boolean
  default: true
{% endconfiguration %}

### Examples

```yaml
type: water-sankey
```

The following example orients the flow from left to right:

```yaml
type: water-sankey
layout: horizontal
```

## Energy distribution

<p class='img'>
  <img src='/images/dashboards/energy/distribution.png' alt='Screenshot of the energy distribution card'>
  Screenshot of the Energy distribution card.
</p>

The energy distribution card shows how the energy flowed, from the grid to your house, from your solar panels to your house and/or back to the grid.

If setup, it will also tell you how many kWh of the energy you got from the grid was produced without using fossil fuels.

If you set `link_dashboard` to `true`, the card will include a link to the energy dashboard.

### Example

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

### YAML configuration

The following YAML options are available

{% configuration %}
type:
  required: true
  description: "`energy-sources-table`"
  type: string
types:
  required: false
  description: "If defined, table displays listed types of consumption only. Valid values are: `grid`, `solar`, `battery`, `gas`, and `water`."
  type: list
{% endconfiguration %}

### Example

```yaml
type: energy-sources-table
types:
  - gas
  - water
```

## Grid neutrality gauge

<p class='img'>
  <img src='/images/dashboards/energy/grid-neutrality-gauge.png' alt='Screenshot of the grid neutrality gauge card'>
  Screenshot of the Grid neutrality gauge card.
</p>

The grid neutrality gauge card represents your energy dependency. If the needle is in the purple, you returned more energy to the grid than you consumed from it. If it's in the blue, you consumed more energy from the grid than you returned.

### Example

```yaml
type: energy-grid-neutrality-gauge
```

## Solar consumed gauge

<p class='img'>
  <img src='/images/dashboards/energy/solar-consumed-gauge.png' alt='Screenshot of the solar consumed gauge card'>
  Screenshot of the Solar consumed gauge card.
</p>

The solar consumed gauge represents how much of the solar energy was used by your home and was not returned to the grid. If you frequently return a lot, try to conserve this energy by installing a battery or buying an electric car to charge.

### Example

```yaml
type: energy-solar-consumed-gauge
```

## Carbon consumed gauge

<p class='img'>
  <img src='/images/dashboards/energy/carbon-consumed-gauge.png' alt='Screenshot of the carbon consumed gauge card'>
  Screenshot of the Carbon consumed gauge card.
</p>

The carbon consumed gauge card represents how much of the energy consumed by your home was generated using non-fossil fuels like solar, wind and nuclear. It includes the solar energy you generated your self.

### Example

```yaml
type: energy-carbon-consumed-gauge
```

## Self-sufficiency gauge

<p class='img'>
  <img src='/images/dashboards/energy/self-sufficiency-gauge.png' alt='Screenshot of the self-sufficiency gauge card'>
  Screenshot of the self-sufficiency gauge card.
</p>

The self-sufficiency gauge represents how self-sufficient your home is. If you rely on grid imports, this value decreases. You can increase this value by adding more solar capacity or battery storage.

### Example

```yaml
type: energy-self-sufficiency-gauge
```

## Devices energy graph

<p class='img'>
  <img src='/images/dashboards/energy/devices-graph.png' alt='Screenshot of the devices energy graph card'>
  Screenshot of the devices energy graph card.
</p>

The devices energy graph show the energy usage per device, it is sorted by usage.

### YAML configuration

The following YAML options are available

{% configuration %}
type:
  required: true
  description: "`energy-devices-graph`"
  type: string
title:
  required: false
  description: The title of the card.
  type: string
max_devices:
  required: false
  description: By default, this card will show all your devices. Optionally, the number of devices can be limited by adding the `max_devices` option and specifying the maximum number of devices to show. If there are more devices available than shown, the devices with the highest energy usage are shown.
  type: integer
hide_compound_stats:
  required: false
  description: Hide higher level devices like breakers. These are devices that are set as `included_in_stat` of another device.
  type: boolean
  default: false
{% endconfiguration %}

### Examples

```yaml
type: energy-devices-graph
```

The following example limits the number of shown devices to 5:

```yaml
type: energy-devices-graph
max_devices: 5
```

## Detail devices energy graph

<p class='img'>
  <img src='/images/dashboards/energy/devices-detail-graph.png' alt='Screenshot of the devices energy graph card'>
  Screenshot of the detail devices energy graph card.
</p>

The **Detail devices energy graph** card is similar to the **Devices energy graph** card, but shows the individual usage on a time scale.

By default, this card will show all your devices. Optionally, the number of devices can be limited by adding the `max_devices` option and specifying the maximum number of devices to show. If there are more devices available than shown, the devices with the highest energy usage are shown.

### Examples

```yaml
type: energy-devices-detail-graph
```

The following example limits the number of shown devices to 5:

```yaml
type: energy-devices-detail-graph
max_devices: 5
```

## Sankey energy graph

<p class='img'>
  <img src='/images/dashboards/energy/sankey.png' alt='Screenshot of the sankey energy graph card'>
  Screenshot of the sankey energy graph card.
</p>

The sankey energy graph shows the flow of energy in your home. It starts with sources and flows into the various consumers. Devices are grouped into floors and areas if these are configured.

### YAML configuration

The following YAML options are available

{% configuration %}
type:
  required: true
  description: "`energy-sankey`"
  type: string
title:
  required: false
  description: The title of the card.
  type: string
layout:
  required: false
  description: "`vertical`, `horizontal` or `auto`. Determines the orientation (flow direction) of the card. `auto` changes it based on the screen size."
  type: string
  default: auto
group_by_area:
  required: false
  description: Whether to group the devices by area
  type: boolean
  default: true
group_by_floor:
  required: false
  description: Whether to group the devices by floor
  type: boolean
  default: true
{% endconfiguration %}

### Examples

```yaml
type: energy-sankey
```

The following example orients the flow from top to bottom:

```yaml
type: energy-sankey
layout: vertical
```

## Power Sankey graph to visualize power flow

<p class='img'>
  <img src='/images/dashboards/energy/sankey.png' alt='Screenshot of the Sankey graph card to visualize power'>
  Screenshot of the power Sankey graph card.
</p>

The power Sankey graph shows the real-time flow of power in your home. Unlike the energy Sankey card, which shows historical energy data based on the selected date range, this card displays current power values and is not affected by the date picker selection.

It visualizes the instantaneous power flow from sources (like the grid, solar panels, and battery) to consumers in your home. Devices are grouped into floors and areas if these are configured.

### YAML configuration

The following YAML options are available

{% configuration %}
type:
  required: true
  description: "`power-sankey`"
  type: string
collection_key:
  required: false
  description: "Collection key to use for the card. This links the card to a specific energy dashboard collection. Defaults to `energy_dashboard`."
  type: string
  default: energy_dashboard
title:
  required: false
  description: The title of the card.
  type: string
layout:
  required: false
  description: "`vertical`, `horizontal` or `auto`. Determines the orientation (flow direction) of the card. `auto` changes it based on the screen size."
  type: string
  default: auto
group_by_area:
  required: false
  description: Whether to group the devices by area
  type: boolean
  default: true
group_by_floor:
  required: false
  description: Whether to group the devices by floor
  type: boolean
  default: true
{% endconfiguration %}

### Examples

```yaml
type: power-sankey
```

The following example orients the flow from left to right:

```yaml
type: power-sankey
layout: horizontal
```

## Power sources graph

<p class='img'>
  <img src='/images/dashboards/energy/power-sources.png' alt='Screenshot of the Sankey sources graph card'>
  Screenshot of the power Sankey graph card.
</p>

The power sources graph shows historical power data.

### YAML configuration

The following YAML options are available

{% configuration %}
type:
  required: true
  description: "`power-sources-graph`"
  type: string
collection_key:
  required: false
  description: "Collection key to use for the card. This links the card to a specific energy dashboard collection. Defaults to `energy_dashboard`."
  type: string
  default: energy_dashboard
title:
  required: false
  description: The title of the card.
  type: string
show_legend:
  required: false
  description: Show or hide the legend
  type: boolean
  default: true
{% endconfiguration %}

### Examples

```yaml
type: power-sources-graph
```

## Using multiple collections

By default, all energy cards are linked to any `energy-date-selection` card on the view, and all `energy-date-selection` cards are linked to the same period. To enable multiple different date selections on the same view, it is necessary to link them to different collections. This is done by adding the variable `collection_key` to the card YAML, and giving this a value of any custom string that begins with `energy_`. (strings that do not start with `energy_` will generate an error).

All energy cards support use of `collection_key` option.

### Examples

Example view with multiple collections:

```yaml
type: masonry
path: example
cards:
  - type: energy-date-selection
  - type: energy-date-selection
    collection_key: energy_2

  # This card is linked to the first (default) date selection
  - type: energy-usage-graph

  # This card is linked to the second date selection
  - type: energy-usage-graph
    collection_key: energy_2
```
