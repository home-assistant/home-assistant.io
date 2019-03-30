---
layout: page
title: "Denon HEOS speakers"
description: "Instructions on how to integrate Denon HEOS into Home Assistant."
date: 2019-03-06 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: heos.png
ha_category: Media Player
ha_release: 0.92
ha_iot_class: Local Push
---

The Heos component integrates [HEOS](http://heosbydenon.denon.com) capable products, such as speakers, amps, and receivers (Dennon and Marantz) into Home Assistant. Features currently include:

- Each device is represented as a media player entity
- View the currently playing media
- Control play mode (play, pause, stop), volume, and mute
- Clear playlist support
- Play previous and next tracks


## {% linkable_title Configuration %}

To add a Denon HEOS speaker to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
heos:
  host: IP_ADDRESS
```

{% configuration %}
host:
  description: "Address of the device. Example: 192.168.1.32."
  required: true
  type: string
{% endconfiguration %}

<p class='note info'>
A connection to a single device enables control for all devices in the HEOS account. If you have multiple Heos devices, enter the host of one that is connected to the LAN via wire or has the strongest wireless signal.
</p>

## {% linkable_title Notes %}

- HEOS groups are not currently supported.
- Receivers with multiple zones are represented as a single media player. They can be turned on, but not off by this integration.
