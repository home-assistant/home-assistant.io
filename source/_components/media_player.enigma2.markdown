---
layout: page
title: "Enigma2"
description: "Instructions on how to integrate an Enigma2 based box running OpenWebif into Home Assistant."
date: 2018-08-08 12:02
sidebar: true
comments: false
sharing: true
footer: true
logo: openwebif.png
ha_category: Media Player
featured: false
ha_release: 0.76
ha_iot_class: "Local Polling"
---

The `enigma2` platform allows you to control a Linux based set-top box which is running [Enigma2](https://github.com/oe-alliance/oe-alliance-enigma2) with the OpenWebif plugin installed.

[OpenWebif](https://github.com/E2OpenPlugins/e2openplugin-OpenWebif) is an open source web interface for Enigma2 based set-top boxes.

To add a set-top box to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: enigma2
    host: 192.168.1.12
    name: Vu Duo2
```

{% configuration %}
  host:
    description: The IP/hostname of the Enigma2 set-top box on your home network.
    required: true
    type: string
  name:
    description: Name of the device in Home Assistant.
    required: false
    type: string
{% endconfiguration %}
