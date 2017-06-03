---
layout: page
title: "NZBGet"
description: "Instructions how to integrate NZBGet within Home Assistant."
date: 2016-04-08 19:59
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_iot_class: "Local Polling"
---

The `NZBGet` platform will allow you to monitor your downloads with [NZBGet](http://NZBGet.net) from within Home Assistant and setup automation based on the information.

To use NZBGet with your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: nzbget
    base_url: http://192.168.1.18:6789
    username: apiuser
    password: apipass
    monitored_variables:
      - ArticleCacheMB
      - DownloadRate
      - DownloadPaused
      - FreeDiskSpaceMB
      - PostPaused
      - RemainingSizeMB
```
