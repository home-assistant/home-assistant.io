---
layout: page
title: "Yeelight Sunflower Bulb"
description: "Instructions how to setup Yeelight Sunflower hub and bulbs within Home Assistant."
date: 2017-02-11
sidebar: true
comments: false
sharing: true
footer: true
logo: yeelight.png
ha_category: Light
ha_release: 0.39
ha_iot_class: "Local Polling"
---

The `yeelightsunflower` light platform allows you to control your Yeelight Sunflower light bulbs with Home Assistant.

<p class='note warning'>
The "Yeelight Sunflower" bulbs are not the same as the "Yeelight WiFi" bulbs.
</p>

To enable your lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: yeelightsunflower
    host: 192.168.1.59
```

Configuration variables:

- **host** (*Required*): IP address of your Yeelight Sunflower hub.

<p class='note'>
When the hub is loaded, your lights will appear as devices with their Zigbee IDs as part of the entity name. 
</p>

<p class='note warning'>
The Yeelight Sunflower hub supports SSDP discovery, but that has not been built into the platform. Let the developer know if that would be helpful to you.
</p>

