---
layout: page
title: "Denon AVR Network Receivers"
description: "Instructions how to integrate Denon AVR Network Receivers into Home Assistant."
date: 2015-09-08 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: denon.png
ha_category: Media Player
ha_iot_class: "Local Polling"
ha_release: 0.7.2
---


The `denonavr` platform allows you to control a [Denon Network Receivers](http://www.denon.co.uk/chg/product/compactsystems/networkmusicsystems/ceolpiccolo) from Home Assistant. It might be that your device is supported by the [Denon] platform.

Supported devices:

- Denon AVR-X1300W
- Denon AVR-X2000
- Denon AVR-X2100W
- Denon AVR-X4100W
- Denon AVR-1912
- Denon AVR-2312CI
- Denon AVR-3311CI
- Denon AVR-4810
- Marantz M-CR603
- Marantz M-RC610
- Marantz SR5008
- Marantz SR6007 - SR6010 
- Marantz NR1604
- Other Denon AVR receivers (untested)
- Marantz receivers (experimental)

<pre class='note warning'>
If you have something else using the IP controller for your Denon AVR 3808CI, such as your URC controller, it will not work! There is either a bug or security issue with some models where only one device could be controlling the IP functionality.
</pre>

To add a Denon Network Receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: denonavr
    host: IP_ADDRESS
    name: NAME
    show_all_sources: True / False
    timeout: POSITIVE INTEGER
    sound_mode: True
    sound_mode_dict: {'MUSIC':'PLII MUSIC', 'MOVIE':'PLII MOVIE', 'GAME':'PLII GAME'}
    zones:
      - zone: Zone2 / Zone3
        name: NAME
```

Configuration variables:

- **host** (*Optional*): IP address of the device. Example: 192.168.1.32. If not set, auto discovery is used.
- **name** (*Optional*): Name of the device. If not set, friendlyName of receiver is used.
- **show_all_sources** (*Optional*): If True all sources are displayed in sources list even if they are marked as deleted in the receiver. If False deleted sources are not displayed (default). Some receivers have a bug that marks all sources as deleted in the interface. In this case this option could help.
- **timeout** (*Optional*): Timeout for HTTP requests to the receiver. Defaults to 2 seconds if not provided.
- **sound_mode** (*Optional*)(*boolean*): Flag that defines if sound mode is supported. Default value: True.
- **sound_mode_dict** (*Optional*): Dictonary containing the sound modes that are supported, the key needs to be identical with the command to set a specific sound mode and the corresponding value needs to be the sound mode as reported by the AVR. Default value: {'MUSIC':'PLII MUSIC', 'MOVIE':'PLII MOVIE', 'GAME':'PLII GAME', 'PURE DIRECT':'DIRECT', 'AUTO':'None', 'DOLBY DIGITAL':'DOLBY DIGITAL', 'MCH STEREO':'MULTI CH STEREO', 'STEREO':'STEREO'}
- **zones** (*Optional*): List of additional zones to be activated. They are displayed as additional media players with the same functionality Main Zone of the device supports
  - **zone**: Zone which should be activated. Valid options are Zone2 and Zone3
  - **name** (*Optional*): Name of the zone. If not set the name of the main device + zone as suffix is taken.

A few notes:

- Additional option the control Denon AVR receivers with a builtin web server is using the HTTP interface with denonavr platform.
- denonavr platform supports some additional functionalities like album covers, custom input source names and auto discovery.
- Marantz receivers seem to a have quite simliar interface. Thus if you own one, give it a try.
- The key-value structure in the sound_mode_dict is needed because the commands to set an sound mode and the reported sound mode are diffrent. This structure matches the reported sound mode with the commands to set a sound mode.

[Denon]: /components/media_player.denon/
