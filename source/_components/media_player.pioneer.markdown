---
layout: page
title: "Pioneer Network Receivers"
description: "Instructions on how to integrate a Pioneer Network Receivers into Home Assistant."
date: 2016-05-07 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: pioneer.png
ha_category: Media Player
featured: false
ha_release: 0.19
ha_iot_class: "Local Polling"
---

The `pioneer` platform allows you to control Pioneer Network Receivers.

To add a Pioneer receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: pioneer
    host: 192.168.0.10
```

Configuration variables:

- **host** (*Required*): The IP of the Pioneer device,  eg. `192.168.0.10`
- **name** (*Optional*): The name you would like to give to the receiver.

