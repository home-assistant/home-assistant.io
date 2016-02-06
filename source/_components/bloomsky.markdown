---
layout: component
title: "BloomSky"
description: "Instructions how to integrate the BloomSky within Home Assistant."
date: 2016-02-03 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bloomsky.png
ha_category: Hub
---


The `bloomsky` component allows you to access your [BloomSky](http://www.insteon.com/) weather station's [sensors](/components/sensor.bloomsky) and [camera](/components/camera.bloomsky) from Home Assistant.

To integrate your BloomSky hub with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
bloomsky:
  api_key: YOUR_API_KEY
```

Configuration variables:

- **api_key** *Required*: Your BloomSky API key, obtained from your [BloomSky dashboard](https://dashboard.bloomsky.com) (click `developers` in the bottom left of the screen)
