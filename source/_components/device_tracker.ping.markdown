---
layout: page
title: "Ping (ICMP)"
description: "Instructions on how to integrate Ping (ICMP)-based presence detection into Home Assistant."
date: 2017-01-06 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Network
ha_release: 0.36
---


The `ping` device tracker platform offers presence detection by using `ping` to send ICMP echo requests. This can be useful when devices are running a firewall and are blocking UDP or TCP packets but responding to ICMP requests (like Android phones). This tracker doesn't need to know the MAC address since the host can be on a different subnet. This makes this an option to detect hosts on a different subnet when `nmap` or other solutions don't work since `arp` doesn't work.

<p class='note'>
  Please keep in mind that modern smart phones will usually turn off WiFi when they are idle. Simple trackers like this may not be reliable on their own.
</p>

## {% linkable_title Configuration %}

To use this presence detection in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: ping
    hosts:
      hostone: 192.168.2.10
```

Configuration variables:

- **hosts** array (*Required*): List of device names and their corresponding IP address or hostname.
- **count** (*Optional*): Number of packet used for each device (avoid false detection).

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
