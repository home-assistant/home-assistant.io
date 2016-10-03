---
layout: page
title: "Snapcast"
description: "Instructions on how to integrate Snapcast into Home Assistant."
date: 2016-02-01 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: snapcast.png
ha_category: Media Player
featured: false
ha_release: 0.13
ha_iot_class: "Local Polling"
---

The `snapcast` platform allows you to control [Snapcast](https://github.com/badaix/snapcast) from Home Assistant.

To add Snapcast to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: snapcast
    host: xxx.xxx.xxx.xxx
```

Configuration variables:

- **host** (*Required*): The IP of the device, eg. `192.168.0.10`.
