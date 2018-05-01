---
layout: page
title: "Philips TV (Joint Space API 5)"
description: "Instructions on how to add Philips TVs to Home Assistant."
date: 2018-01-05 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: philips.png
ha_category: Media Player
ha_iot_class: "Local Polling"
ha_release: 0.69
---

This component is a modfied version of [media_player.philips_js](https://home-assistant.io/components/media_player.philips_js/).
Additionally you can now change tv channels, but not the source like HDMI 1 etc.
Furthermore you can set the volume to a specific value.

To add your TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: philips_js_v5
    host: 192.168.1.99
```

Configuration variables:

- **host** (*Required*): IP address of TV.
- **name** (*Optional*): The name you would like to give to the Philips TV.
- **turn_on_action** (*Optional*): A script that will be executed to turn on the TV (can be used with wol).
- **api_version** (*Optional*): The JointSpace API version of your Philips TV, defaults to `5`. This is an experimental option and not all the functionalities are guaranteed to work with API versions different from `5`.
