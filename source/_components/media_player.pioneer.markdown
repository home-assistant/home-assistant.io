---
layout: page
title: "Pioneer Network Receivers"
description: "Instructions on how to integrate a Pioneer Network Receivers into Home Assistant."
date: 2016-05-07 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: pioneer.png
ha_category: Media Player
featured: false
ha_release: 0.19
ha_iot_class: "Local Polling"
---

The `pioneer` platform allows you to control Pioneer Network Receivers. Please note, however, that the more recent Pioneer models work with [Onkyo](/components/media_player.onkyo/) platform instead.

To add a Pioneer receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: pioneer
    host: 192.168.0.10
```

Configuration variables:

- **host** (*Required*): The IP of the Pioneer device,  eg. `192.168.0.10`
- **name** (*Optional*): The name you would like to give to the receiver.
- **port** (*Optional*): The port on which the Pioneer device listens, e.g., `23` (default) or `8102`
- **timeout** (*Optional*): Number of seconds (float) to wait for blocking operations like connect, write, and read.


For older Pioneer receivers that do not work with the default configuration (due to not supporting input labels), you can fall back to a more basic mode using these additional configuration variables.  If the component works correctly with just the host/name/port then don't use this.

- **mode** (*Required*): `basic`
- **input** (*Optional*): A list of reciever input numbers and their associated name.  If this is left out you will still get automatic labels like "Input 06".  The numbers seem to vary between devices, so you will need to configure this yourself to match your receiver.
To find the input numbers, either telnet to the receiver and watch the messages when changing inputs, or run this component without `input` configured and see what gets detected.

```yaml
media_player:
  - platform: pioneer
    host: 192.168.0.10
    mode: basic
    input:
      02:
        name: "Tuner"
      06:
        name: "PC"
      15:
        name: "FireTV"
```

Notes:

- Some Pioneer AVRs use the port 23 default and some are reported to use 8102.
- `timeout` is a socket level option and should only be configured if you know what you are doing.
