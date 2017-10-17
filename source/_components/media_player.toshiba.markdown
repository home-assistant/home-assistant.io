---
layout: page
title: "Toshiba Cast TV"
description: "Instructions on how to integrate a Toshiba Cast TV into Home Assistant."
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

The `toshiba` platform allows you to control a Toshiba Cast TV. The component can query and set the power, the input source, and the volume.

Currently known supported models:

- 65L621U

If your model is not on the list, then give it a test, if everything works correctly then add it to the list on [GitHub](https://github.com/home-assistant/home-assistant.io).

Toshiba Cast TV has a "standby mode" that need to be set "active" to allow quick power-on/power-off

Toshiba Cast TV integrate a Google Cast and can be used with the discovery component. 

To activate the component, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: toshiba
    host: 192.168.0.100
```

Configuration variables:

- **host** (*Required*): The IP of the Toshiba Cast TV, e.g. `192.168.0.100`.
- **port** (*Optional*): The port number of your Toshiba Cast TV. Defaults to `4430`.
- **name** (*Optional*): The name you would like to give to the Toshiba Cast TV.
