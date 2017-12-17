---
layout: page
title: "Russound RIO"
description: "Instructions on how to integrate Russound RIO devices into Home Assistant."
date: 2017-07-12 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: russound.png
ha_category: Media Player
ha_release: 0.49
ha_iot_class: "Local Push"
---

The `russound_rio` platform allows you to control Russound devices that make use of the RIO protocol.

The platform automatically discovers all enabled zones and sources. Each zone is added as a media player device with the enabled sources available as inputs. Media information is supported if the selected source reports it.

To add a device to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: russound_rio
    host: 192.168.1.10
    name: Russound
```

Configuration variables:

- **host** (*Required*): The IP of the TCP gateway
- **port** (*Optional*): The port of the TCP gateway (default: 9621)
- **name** (*Required*): The name of the device
