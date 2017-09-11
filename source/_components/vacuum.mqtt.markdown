---
layout: page
title: "MQTT"
description: "Instructions how to integrate your MQTT enabled Vacuum within Home Assistant."
date: 2017-09-11 20:26
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Vacuum
ha_release: 0.54
---

The `mqtt` component allows you to control your MQTT-enabled vacuum.

To add your MQTT vacuum to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example minimal configuration.yaml entry
vacuum:
  - platform: mqtt
```

Configuration variables:

- **name** (*Optional*): The name of the vacuum.
- **supported_features** (*Optional*): List of features that the vacuum supports (possible values are `turn_on`, `turn_off`, `pause`, `stop`, `return_home`, `battery`, `status`, `locate`, `clean_spot`). Defaults to .
- **state_topic** (*Optional*): The MQTT topic subscribed to receive values from the vacuum. Defaults to `vacuum/state`.
- **command_topic** (*Optional*): The MQTT topic to publish commands to control the vacuum. Defaults to `vacuum/command`.

### {% linkable_title Retrofitting a non-wifi Roomba with an ESP8266 %}

- [This repo](https://github.com/johnboiles/esp-roomba-mqtt) has MQTT client firmware for retrofitting your old Roomba
