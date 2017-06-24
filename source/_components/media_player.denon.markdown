---
layout: page
title: "Denon Network Receivers"
description: "Instructions how to integrate Denon Network Receivers into Home Assistant."
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


The `denon` platform allows you to control a [Denon Network Receivers](http://www.denon.co.uk/chg/product/compactsystems/networkmusicsystems/ceolpiccolo) from Home Assistant.

Supported devices:

- Denon DRA-N5
- Denon RCD-N8 (untested)
- Denon RCD-N9 (partial support)
- Denon AVR receivers with integrated Network support (partial support)
- Denon AVR-X2000 (via denonavr platform)
- Denon AVR-X2100W (via denonavr platform)
- Denon AVR-X4100W (via denonavr platform)
- Denon AVR-1912 (via denonavr platform)
- Denon AVR-2312CI (via denonavr platform)
- Denon AVR-3311CI (via denonavr platform)
- Marantz M-CR603 (via denonavr platform)
- Marantz M-RC610 (via denonavr platform)
- Marantz SR5008 (via denonavr platform)
- Marantz NR1604 (via denonavr platform)
- Other Denon AVR receivers (via denonavr platform (untested))
- Marantz receivers (experimental via denonavr platform)

<pre class='note'>
If you have something else using the IP controller for your Denon AVR 3808CI, such as your URC controller, it will not work! There is either a bug or security issue with some models where only one device could be controlling the IP functionality.
</pre>

To add a Denon Network Receiver to your installation, add the following to your `configuration.yaml` file:

**Telnet platform**
```yaml
# Example configuration.yaml entry
media_player:
  - platform: denon
    host: IP_ADDRESS
```

Configuration variables:

- **host** (*Required*): IP address of the device. Example: 192.168.1.32
- **name** (*Optional*): Name of the device.

A few notes for platform: denon
- The receiver handles only one telnet connection and refuses others.
- Be careful with the volume. 100% or even 50% is very loud.
- To be able to wake up the receiver, activate the "remote" setting in the receiver's settings.
- Play and pause are supported, toggling is not possible.
- Seeking cannot be implemented as the UI sends absolute positions. Only seeking via simulated button presses is possible.


**denonavr platform**
```yaml
# Example configuration.yaml entry
media_player:
  - platform: denonavr
    host: IP_ADDRESS
    name: NAME
    show_all_sources: True / False
    zones:
      - zone: Zone2 / Zone3
        name: NAME
```

Configuration variables:

- **host** (*Optional*): IP address of the device. Example: 192.168.1.32. If not set, auto discovery is used.
- **name** (*Optional*): Name of the device. If not set, friendlyName of receiver is used.
- **show_all_sources** (*Optional*): If True all sources are displayed in sources list even if they are marked as deleted in the receiver. If False deleted sources are not displayed (default). Some receivers have a bug that marks all sources as deleted in the interface. In this case this option could help.
- **zones** (*Optional*): List of additional zones to be activated. They are displayed as additional media players with the same functionality Main Zone of the device supports
  - **zone**: Zone which should be activated. Valid options are Zone2 and Zone3
  - **name** (*Optional*): Name of the zone. If not set the name of the main device + zone as suffix is taken.

A few notes for platform: denonavr
- Additional option the control Denon AVR receivers with a builtin web server is using the HTTP interface with denonavr platform.
- denonavr platform supports some additional functionalities like album covers, custom input source names and auto discovery.
- Marantz receivers seem to a have quite simliar interface. Thus if you own one, give it a try.
