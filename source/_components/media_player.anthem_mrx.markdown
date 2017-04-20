---
layout: page
title: "Anthem MRXx00 Receivers"
description: "Instructions on how to integrate a Anthem MRXx00 Receivers into Home Assistant."
date: 2016-09-13 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: anthemav.png
ha_category: Media Player
featured: false
ha_release: 0.29
---

The `anthem_mrx` platform allows you to control Anthem MRXx00 Receivers. MRXx00 receivers do not have direct IP control so therefore will require a IP to Serial converter.
This component has been tested with the Global Cache iTach IP2SL device.

This will not work with MRXx10 or MRXx20 receivers.

To add a Anthem MRXx00 receiver to your installation, add the following to
your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: anthem_mrx
    name: anthem_zone1
    host: 192.168.2.200
    port: 4999
    mrxzone: 1
    minvol: -60
    maxvol: -30

  - platform: anthem_mrx
    name: anthem_zone2
    host: 192.168.2.200
    port: 4999
    mrxzone: 2
    minvol: -45
    maxvol: -25
```

Configuration variables:

- **host** (*Required*): The IP or hostname of the IP to Serial device,  eg. `192.168.2.200`
- **port** (*Required*): The Port of the IP to Serial device,  eg. `4999`
- **name** (*Optional*): The name you would like to give to the receiver.
- **mrxzone** (*Optional*): The zone of the receiver. Defaults to zone 1.
- **minvol** (*Optional*): The minimum volume for the HA volume slider. Defaults to -60db.
- **maxvol** (*Optional*): The maximum volume for the HA volume slider. Defaults to -30db.
