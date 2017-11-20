---
layout: page
title: "Gitter Sensor"
description: "Instructions how to integrate a Gitter room sensor with Home Assistant"
date: 2017-06-11 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: gitter.png
ha_category: Sensor
ha_release: 0.47
---


This `gitter` sensor allows one to monitor a [Gitter.im](https://gitter.im) chatroom for unread messages.

Visit [Gitter Developer Apps](https://developer.gitter.im/apps) to retrieve your "Personal Access Token".

To use a Gitter sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
sensor:
  - platform: gitter
    api_key: YOUR_API_TOKEN
```

Configuration variables:

- **api_key** (*Required*): Your Gitter.im API token.
- **room** (*Optional*): Gitter room to monitor. Defaults to `home-assistant/home-assistant`

