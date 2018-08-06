---
layout: page
title: "Ping (ICMP) Binary sensor"
description: "Instructions on how to integrate Ping (ICMP)-based binary sensors into Home Assistant."
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

The default polling interval is 5 minutes. As many components [based on the entity class](/docs/configuration/platform_options), it is possible to overwrite this scan interval by specifying a `scan_interval` configuration key (value in seconds). In the example below we setup the `ping` binary sensor to poll the devices every 30 seconds.

```yaml
# Example configuration.yaml entry to ping host 192.168.0.1 with 2 packets every 30 seconds.
binary_sensor:
  - platform: ping
    host: 192.168.0.1
    count: 2
    scan_interval: 30
```

<p class='note'>
When run on Windows systems, the round trip time attributes are rounded to the nearest millisecond and the mdev value is unavailable.
</p>

