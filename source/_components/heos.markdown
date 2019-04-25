---
layout: page
title: "Denon HEOS"
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

The HEOS integration adds support for [HEOS](http://heosbydenon.denon.com) capable products, such as speakers, amps, and receivers (Denon and Marantz) into Home Assistant. Features currently include:

- Each device is represented as a media player entity
- View the currently playing media
- Control play mode (play, pause, stop, next and previous), volume, mute and shuffle
- Clear playlist
- Select source from device physical inputs and HEOS favorites


## {% linkable_title Configuration %}

HEOS devices are discovered and setup automatically when the [discovery](/components/discovery) component is enabled. Alternatively, the component can be setup through the frontend control panel integrations page or manually by adding the following to your `configuration.yaml` file:

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
A connection to a single device enables control for all devices on the network. If you have multiple HEOS devices, enter the host of one that is connected to the LAN via wire or has the strongest wireless signal.
</p>

## {% linkable_title Notes %}

- HEOS groups are not currently supported.
- Receivers with multiple zones are represented as a single media player. They will be turned on when playback is started, but cannot be turned off by the integration at this time.


## {% linkable_title Debugging %}

The HEOS component will log additional information about commands, events, and other messages when the log level is set to `debug`. Add the the relevent line below to the `configuration.yaml` to enable debug logging:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.heos: debug
    pyheos: debug
```