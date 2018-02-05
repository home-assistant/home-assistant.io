---
layout: page
title: "Google Cast"
description: "Instructions how to integrate Google Cast into Home Assistant."
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
---


Google Cast devices like Android TVs and Chromecasts will be automatically discovered if you enable [the discovery component]({{site_root}}/components/discovery/). There is an issue where Chromecasts can only be discovered if your device is connected to the same subnet as your Chromecast.

The Chromecast platform can also be forced to load by adding the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: cast
```

Configuration variables:

- **host** (*Optional*): Use only if you don't want to scan for devices.
- **ignore_cec** (*Optional*) A list of Chromecasts that should ignore CEC data for determining the active input. [See the upstream documentation for more information.](https://github.com/balloob/pychromecast#ignoring-cec-data)

## {% linkable_title Example %}

By setting `host:` you can specify the Chromecast to use.

```yaml
# Example configuration.yaml entry
media_player:
  - platform: cast
    host: 192.168.1.10
```
