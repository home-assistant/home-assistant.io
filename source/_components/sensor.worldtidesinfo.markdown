---
layout: page
title: "World Tides"
description: "Instructions how to add Tides information to Home Assistant."
date: 2017-08-23 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: worldtidesinfo.png
ha_category: Weather
ha_release: 0.52
---

The `worldtidesinfo` sensor platform uses details from [World Tides](https://www.worldtides.info/) to provide information about the prediction for the tides for any location in the world. 

To use this sensor, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: worldtidesinfo
    api_key: YOUR_API_KEY
```

Configuration variables:

- **api_key** (*Required*): Your API key for https://www.worldtides.info/.
- **name** (*Optional*): Name to use in the frontend.
- **latitude** (*Optional*): Latitude of the location to display the tides. Defaults to the latitude in your `configuration.yaml` file. 
- **longitude** (*Optional*): Longitude of the location to display the tides. Defaults to the longitude in your `configuration.yaml` file.

