---
layout: page
title: "Sony Bravia TV with Pre-Shared Key"
description: "Instructions on how to integrate a Sony Bravia TV with Pre-Shared Key into Home Assistant."
date: 2018-02-17 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bravia.png
ha_category: Media Player
ha_release: 0.64
ha_iot_class: "Local Polling"
---

The `braviatv_psk` platform allows you to control a [Sony Bravia TV](http://www.sony.com). This version uses a Pre-Shared Key (PSK) for the connection between Home Assistant and your TV. The PSK can be configured in the TV settings.

Almost all [Sony Bravia TVs from 2014 and newer](http://info.tvsideview.sony.net/en_ww/home_device.html#bravia) are supported.
If your TV doesn't support a PSK you can check the `braviatv` [version](https://home-assistant.io/components/media_player.braviatv/) which uses a PIN method (including a cookie).
That page also describes a more generic method for older TVs connected to a Raspberry Pi with HDMI-CEC. 

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: braviatv_psk
    name: TV living room
    host: 192.168.1.191
    psk: sony
    mac: AA:BB:CC:DD:EE:FF
    amp: True
    android: False
    sourcefilter:
      - ' HD'
      - HDMI
```

{% configuration %}
  name:
    description: The name used on the frontend, defaults to `Sony Bravia TV`.
    required: false
    type: String
  host:
    description: The IP of the Sony Bravia TV, e.g. `192.168.1.191`.
    required: true
    type: String
  psk:
    description: The Pre-Shared Key of the Sony Bravia TV, e.g. `sony`. Make sure that you place the PSK between quotes when it has a leading zero (e.g. PSK 0000 should be in the config file as `'0000'`).
    required: true
    type: String
  mac:
    description: The MAC address of the Sony Bravia TV, e.g. `AA:BB:CC:DD:EE:FF`. This is only required for TVs without Android software and is needed to remotely start the TV.
    required: false
    type: String
  amp:
    description: Set this to `True` if you have an amplifier attached to the TV and not use the internal TV speakers. Then the volume slider will not be shown as this doesn’t work for the amplifier. Mute and volume up and down buttons are available and will work with an amplifier.
    required: false
    type: boolean
    default: false
  android:
    description: Set this to `False` when you don't have an Android TV. In that case you need to enter the MAC address field to be able to switch the TV on via Home Assistant as these TVs only respond to WakeOn LAN commands via the MAC address.
    required: false
    type: boolean
    default: true
  sourcefilter:
    description: List of text that is used to filter the source list, e.g. `' HD'` (with quotes) will only show TV channels in the source list which contain ' HD', e.g. 'NPO 1 HD'.
    required: false
    type: list
{% endconfiguration %}

### {% linkable_title Installation instructions TV %}

You will need to configure your TV to allow Home Assistant for remote usage by performing the following steps.

- Enable remote start on your TV: [Settings] -> [Network] -> [Home Network Setup] -> [Remote Start] -> [On]
- Enable pre-shared key on your TV: [Settings] -> [Network] -> [Home Network Setup] -> [IP Control] -> [Authentication] -> [Normal and Pre-Shared Key]
- Set Pre-Shared Key on your TV: [Settings] -> [Network] -> [Home Network Setup] -> [IP Control] -> [Pre-Shared Key] -> e.g. `sony`
- Give your TV a static IP address, or make a DHCP reservation for a specific IP address in your router
- For non-Android TVs: determine the MAC address of your TV: [Settings] -> [Network] -> [Network Setup] -> [View Network Status]
