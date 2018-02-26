---
layout: page
title: "Bluesound"
description: "Instructions how to integrate Bluesound devices into Home Assistant."
date: 2017-04-21 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bluesound.png
ha_category: Media Player
featured: false
ha_release: 0.51
ha_iot_class: "Local Polling"
---

The `bluesound` platform allows you to control your [Bluesound](http://www.bluesound.com/) HiFi wireless speakers and audio components from Home Assistant.

If you want to automatically discover new devices, just make sure you have discovery: in your configuration.yaml file. To manually add a Bluesound device to your installation, add the following to your configuration.yaml file:


```yaml
# Example configuration.yaml
media_player:
  - platform: bluesound
    hosts:
      - host: 192.168.1.100
```

Configuration variables:

- **hosts** (*Optional*): List with your bluesound devices
  - **host** (*Required*): IP-address or hostname of the player
  - **name** (*Optional*): The name of the device used in the frontend
  - **port** (*Optional*): Port of communication to the device (default: 11000)
  
## Advanced configuration example

```yaml
# Example configuration.yaml entry with manually specified addresses
media_player:
  - platform: bluesound
    hosts:
      - host: 192.168.1.100
        name: bluesound_kitchen
        port: 11000
      - host: 192.168.1.131
```
