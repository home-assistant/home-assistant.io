---
layout: page
title: "Orange Livebox Play TV"
description: "Instructions on how to integrate a Livebox Play TV appliance into Home Assistant."
date: 2017-01-25 07:27
sidebar: true
comments: false
sharing: true
footer: true
logo: orange.png
ha_category: Media Player
featured: false
ha_release: 0.38
ha_iot_class: "Local Polling"
---

The `liveboxplaytv` platform allows you to control [Orange Livebox Play TV appliances](https://boutique.orange.fr/internet/decodeur-tv-livebox).

To add an Orange Livebox Play TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: liveboxplaytv
    host: 192.168.1.3
```

Configuration variables:

- **host** (*Required*): The IP or hostname of the Orange Livebox Play TV appliance.
- **name** (*Optional*): The name to use in the frontend. Defaults to `Livebox Play TV`.
- **port** (*Optional*): The port on which the Livebox is listening on. Defaults to 8080.

## {% linkable_title Full configuration %}

A full configuration example for an Orange TV appliance can look like this:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: liveboxplaytv
    host: 192.168.1.3
    port: 8080
    name: Orange Livebox Play TV
```
