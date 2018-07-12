---
layout: page
title: "Skybell Sensor"
description: "Instructions on how to integrate your Skybell HD devices within Home Assistant."
date: 2017-10-03 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: skybell.png
ha_category: Sensor
ha_release: 0.56
ha_iot_class: "Cloud Polling"
---

To get your [Skybell.com](https://skybell.com/) sensors working within Home Assistant, please follow the instructions for the general [Skybell component](/components/skybell).

Once you have enabled the [Skybell component](/components/skybell), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: skybell
    monitored_conditions:
      - chime_level
```

Configuration variables:

- **monitored_conditions** array (*Required*): Conditions to display in the frontend. The following conditions can be monitored.
  - **chime_level**: Return a value between 0-3, indicating no chime, low, medium, and high respectively.
