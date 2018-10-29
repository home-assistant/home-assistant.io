---
layout: page
title: "NAD tcp"
description: "Instructions on how to integrate the NAD D 7050 or C338 digital amplifiers into Home Assistant."
date: 2017-06-07 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: nad.png
ha_category: Media Player
ha_release: 0.47
ha_iot_class: "Local Polling"
---

The `nadtcp` platform allows you to control the D7050 and C338 from Home Assistant via WiFi. Note that it has only been tested with the D 7050.

To add a NAD amplifier to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: nadtcp
    host: 192.168.0.112
```

{% configuration %}
host:
  description: The IP address of your amplifier.
  required: true
  type: string
name:
  description: Name of the device.
  required: false
  default: NAD amplifier
  type: string
min_volume:
  description: Minimum volume in dB to use with the slider.
  required: false
  default: -60
  type: integer
max_volume:
  description: Maximum volume in dB to use with the slider.
  required: false
  default: -10
  type: integer
volume_step:
  description: The amount in dB you want to increase the volume with when pressing volume up/down.
  required: false
  default: 4
  type: integer
{% endconfiguration %}

The maximum volume level of the D 7050 amplifier is +10 db, minimum is -90.
