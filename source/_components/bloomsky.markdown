---
layout: page
title: "BloomSky"
description: "Instructions on how to integrate the BloomSky within Home Assistant."
date: 2016-02-03 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bloomsky.png
ha_category: Hub
ha_release: 0.14
ha_iot_class: "Cloud Polling"
---


The `bloomsky` component allows you to access your [BloomSky](https://www.bloomsky.com/) weather station's [sensors](/components/sensor.bloomsky), [binary sensors](/components/binary_sensor.bloomsky), and [camera](/components/camera.bloomsky) from Home Assistant.

Obtain your API key from your [BloomSky dashboard](https://dashboard.bloomsky.com). Click `developers` in the bottom left of the screen.

To integrate your BloomSky hub with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
bloomsky:
  api_key: YOUR_API_KEY
```

Configuration variables:

- **api_key** (*Required*): Your BloomSky API key.
