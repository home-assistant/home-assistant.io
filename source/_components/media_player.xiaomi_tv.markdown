---
layout: page
title: "Xiaomi TV"
description: "Instructions on how to integrate a Xiaomi TV into Home Assistant."
date: 2018-02-12 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Media Player
ha_release: next
ha_iot_class: "Assumed State"
---

The `xiaomi_tv` platform allows you to control a [Xiaomi TV](http://www.mi.com/en/mitv3s/65flat/).

You need to make sure the TV is connected to the internet, and that your Home Assistant instance is on the same network.

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: xiaomi_tv
```

<p class='note warning'>
When starting or restarting Home Assistant make sure your TV is off. This is a flaw in the TV itself.
</p>

Configuration variables:

- **host** (*Optional*): The IP of the Xiaomi TV, eg. 192.168.0.10
- **name** (*Optional*): The name to use on the frontend. Default is 'Xiaomi TV'.

If you do not set a host in the configuration file, local TVs will automatically be discovered.

To manually add a TV you can use the following configuration:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: xiaomi_tv
    host: YOUR_TV_IP
    name: YOUR_TV_NAME
```

<p class='note info'>
The platform will never turn your TV off. Instead, it will be put to sleep and woken up. This can be useful, because the selected source of the TV will remain the same. It will essentially turn your TV into a dumb TV.
</p>
