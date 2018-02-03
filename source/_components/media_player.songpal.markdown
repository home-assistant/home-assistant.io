---
layout: page
title: "Sony SongPal compatible devices"
description: "Instructions how to integrate Sony Songpal devices into Home Assistant."
date: 2018-02-03 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: sony.png
ha_category: Media Player
ha_iot_class: "Local Polling"
ha_release: 0.63
---

The `songpal` platform allows you to control Sony's Songpal ("[Audio Control API](https://developer.sony.com/develop/audio-control-api/)") compatible devices a [Denon Network Receivers](http://www.denon.co.uk/chg/product/compactsystems/networkmusicsystems/ceolpiccolo) from Home Assistant.

[List of supported devices](http://vssupport.sony.net/en_ww/device.html) from Sony's Songpal website. Even when the API officially supports only a few devices (STR-DN1080, HT-CT800, and SRS-ZR5), it has also been confirmed to work on others. If the platform works with your non-listed device, or you encounter bugs, please feel free to [report them upstream](https://github.com/rytilahti/python-songpal).

A few notes:

- The quick start-up mode has to be enabled in order to turn the device on.
- Supports currently only one output terminal, e.g. the volume control works only on the first volume controller as reported by the backend library.
- Some devices, e.g. HT-XT3, do not support decreasing the volume step-by-step correctly.
- Feel free to improve the available services!

The platform will be loaded automatically by discover component. If you want to manually configure it, add the following to your `configuration.yaml` file:

```yaml
media_player:
  - platform: songpal
    name: my soundbar
    endpoint: http://IP_ADDRESS:10000/sony
```

Configuration variables:

- **endpoint** (*Required*): API endpoint of the device. See [python-songpal's documentation](https://github.com/rytilahti/python-songpal#locating-the-endpoint) how to do that.
- **name** (*Optional*): Name of the device

## {% linkable_title Services %}

In addition to the general media player services, the following services are provided:

### {% linkable_title Service `media_player/songpal_set_sound_setting` %}

For a list of available settings and their values use [`songpal sound`](https://github.com/rytilahti/python-songpal#sound-settings) command.

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `name`                 |       no | Configuration variable, e.g. `nightmode`         |
| `value`                |       no | New configuration value, e.g. `on`               |



