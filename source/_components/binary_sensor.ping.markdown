---
layout: page
title: "Ping (ICMP) Binary sensor"
description: "Instructions how to integrate Ping (ICMP)-based binary sensors into Home Assistant."
date: 2017-04-11 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Binary Sensor
ha_release: 0.43
---


The `ping` binary sensor platform allows you to using `ping` to send ICMP echo requests. This way you can check if a given host is online and determine the round trip times from your Home Assistant instance to that system.

To use this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ping
    host: 192.168.0.1
```

Configuration variables:

- **host** (*Required*): The IP address or hostname of the system you want to track.
- **count** (*Optional*): Number of packets to send. Defaults to 5.
- **name** (*Optional*): Let you overwrite the name of the device. Defaults to `Ping Binary sensor`.

The sensor exposes the different round trip times values measured by `ping` as attributes: 

- `round trip time mdev`
- `round trip time avg`
- `round trip time min`
- `round trip time max`

<p class='note'>
When run on Windows systems, the round trip time attributes are rounded to the nearest millisecond and the mdev value is unavailable.
</p>

