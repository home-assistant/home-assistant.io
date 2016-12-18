---
layout: page
title: "International Space Station Sensor"
description: "Know if or when ISS will be above your home location"
date: 2016-12-18 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bbox.png
ha_category: Sensor
ha_release: 0.36
---

The `iss` platform uses the [Open Notify API](http://open-notify.org/Open-Notify-API/ISS-Location-Now/) to let you know if the station is above your home location. This means that ISS is 10° above the horizon of your home.
A second sensor let you know how many minutes you have to wait until the next rise of the station.

To add ISS sensors to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: iss
```


