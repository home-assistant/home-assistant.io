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

The `braviatv_psk` platform allows you to control a [Sony Bravia TV](http://www.sony.com). This version used a Pre-Shared Key (PSK) for the connection between HA and your TV. The PSK can be configured in the TV settings.

Almost all [Sony Bravia TV from 2014 and newer](http://info.tvsideview.sony.net/en_ww/home_device.html#bravia) are supported.
If your TV doesn't support a PSK you can check the `braviatv` [version](https://home-assistant.io/components/media_player.braviatv/) which uses a PIN method (including a cookie).
That page also describes a more generic method for older TVs connected to a Raspberry Pi with HDMI-CEC. 

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: braviatv_psk
    host: 192.168.1.191
    psk: sony
    mac: AA:BB:CC:DD:EE:FF
    amp: True
    android: False
    sourcefilter:
      - ' HD'
      - HDMI
```

**Configuration variables**

- **name** (*Optional*): The name used on the frontend, defaults to Sony Bravia TV
- **host** (*Required*): The IP of the Sony Bravia TV, eg. 192.168.1.191
- **psk** (*Required*): The Pre-Shared Key of the Sony Bravia TV, eg sony. Make sure that you place the psk between quotes when it has a leading zero (eg 0000 should be in the config file as '0000')
- **mac** (*Optional*): The MAC address of the Sony Bravia TV, eg. AA:BB:CC:DD:EE:FF. This is only required for TVs without Android software and is needed to remotely start the TV
- **amp** (*Optional*): Boolean, defaults to False. Set this to True if you have an amplifier attached to the TV and not use the internal TV speakers. Then the volume slider will not be shown as this doesn’t work for the amplifier. Mute and volume up and down buttons are there and working with an amplifier.
- **android** (*Optional*): Boolean, defaults to True as all new TV models have Android software. Set this to False when you don't have an Android TV as these TV’s only respond to WakeOn LAN commands via the MAC address.
- **sourcefilter** (*Optional*): List of text that is used to filter the source list, eg. ' HD' (with quotes) will only show TV channels in the source list which contain ' HD', eg. 'NPO 3 HD'.

**Installation instructions TV**
You will need to configure your TV to allow Home Assistant for remote usage by performing the following steps.

- Enable remote start on your TV: [Settings] -> [Network] -> [Home Network Setup] -> [Remote Start] -> [On]
- Enable pre-shared key on your TV: [Settings] -> [Network] -> [Home Network Setup] -> [IP Control] -> [Authentication] -> [Normal and Pre-Shared Key]
- Set pre-shared key on your TV: [Settings] -> [Network] -> [Home Network Setup] -> [IP Control] -> [Pre-Shared Key] -> sony
- Give your TV a static IP address, or make a DHCP reservation for a specific IP address in your router
- For non-Android TV's: determine the MAC address of your TV: [Settings] -> [Network] -> [Network Setup] -> [View Network Status]
