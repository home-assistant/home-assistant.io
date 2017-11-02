---
layout: page
title: "Map"
description: "Offers a map to show tracked devices."
date: 2017-10-11 10:01
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: "Other"
---

This offers a map on the frontend to display the location of tracked devices.

To set up tracked devices, look at the [device tracker](/components/device_tracker/) documentation.

```yaml
# Example configuration.yaml entry
map:
```

Configuration variables:

- **tile_provider** (*Optional*): the name of a map tile provider to use. Defaults to `CartoDB.Positron`

## Available Tile Providers

The available tile providers can be previewed [here](http://leaflet-extras.github.io/leaflet-providers/preview/)

To change the current tile provider, set `tile_provider` to one of the provider names listed on the preview page.

For example, to change to the German OpenStreetMap tile provider:

```yaml
map:
  tile_provider: OpenStreetMap.DE
```
