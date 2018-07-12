---
layout: page
title: "Google Cast"
description: "Instructions on how to integrate Google Cast into Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: google_cast.png
ha_category: Media Player
featured: true
ha_release: pre 0.7
ha_iot_class: "Local Polling"
redirect_from: /components/media_player.cast/
---


Google Cast devices like Android TVs and Chromecasts will be automatically discovered if you enable [the discovery component]({{site_root}}/components/discovery/). If you don't have the discovery component enabled, you can enable the Cast component by going to the Integrations page inside the config panel.

## {% linkable_title Advanced use %}

The Cast component has some extra configuration options available for advanced users. You will still need to create a config entry to initialize the Cast component.

For example, Cast devices can only be discovered if they are on the same subnet as Home Assistant. If this is not the case, you want to configure the IP address of the Cast device directly:


```yaml
# Example configuration.yaml entry
cast:
  media_player:
  - host: 192.168.1.10
```

Configuration variables:

- **host** (*Optional*): Use only if you don't want to scan for devices.
- **ignore_cec** (*Optional*) A list of Chromecasts that should ignore CEC data for determining the active input. [See the upstream documentation for more information.](https://github.com/balloob/pychromecast#ignoring-cec-data)
