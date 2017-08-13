---
layout: page
title: "Thosiba Smart TV"
description: "Instructions on how to integrate a Toshiba Smart TV into Home Assistant."
date: 2017-08-13 13:04
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Media Player
featured: false
ha_release: 0.17
ha_iot_class: "Local Polling"
---

The `toshiba` platform allows you to control a Toshiba Cast TV.

Currently known supported models:

- 65L621U

If your model is not on the list then give it a test, if everything works correctly then add it to the list on [GitHub](https://github.com/home-assistant/home-assistant.io).

This TV has a "standby mode" that need to be "active" to allow power-on/power-off

This TV will also be listed as a Google Cast device with the discovery protocol.  This component allow to manage input, volume and power on/off.

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: toshiba
    host: 192.168.0.100
    port: 4430
```

Configuration variables:

- **host** (*Required*): The IP of the Toshiba Smart TV, e.g. `192.168.0.100`.
- **port** (*Optional*): The port number of your Toshiba SmART TV. Defaults to `4430`.
- **name** (*Optional*): The name you would like to give to the Toshiba Smart TV.
