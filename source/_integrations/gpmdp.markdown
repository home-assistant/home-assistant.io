---
title: Google Play Music Desktop Player (GPMDP)
description: Instructions on how to integrate GPMDP into Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Local Polling
ha_release: '0.20'
ha_domain: gpmdp
ha_platforms:
  - media_player
---

The `gpmdp` media player platform allows you to control a [GPMDP](https://www.googleplaymusicdesktopplayer.com/) instance running on a computer from Home Assistant.

You will have first have to check "Enable playback API" in GPMDP's settings and then add an inbound rule to the firewall to allow access to port 5672 on the computer running GPMDP.

Then just add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: gpmdp
    host: IP_ADDRESS
```

{% configuration %}
host:
  description: The IP address of the computer running GPMDP.
  required: true
  type: string
name:
  description: Name of the player.
  required: false
  default: GPM Desktop Player
  type: string
{% endconfiguration %}
