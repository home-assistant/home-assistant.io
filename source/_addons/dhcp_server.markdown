---
layout: page
title: "DHCP server"
description: "A simple DHCP server."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Create a simple DHCP server for your network and allow setting fixed IPs for devices.

```json
{
  "domain": "mynetwork.local",
  "dns": ["8.8.8.8", "8.8.4.4"],
  "networks": [
    {
      "subnet": "192.168.1.0",
      "netmask": "255.255.255.0",
      "range_start": "192.168.1.100",
      "range_end": "192.168.1.200",
      "broadcast": "192.168.1.255",
      "gateway": "192.168.1.1",
      "interface": "eth0"
    }
  ],
  "hosts": [
    {
      "name": "webcam_xy",
      "mac": "aa:bb:ee:cc",
      "ip": "192.168.1.40"
    }
  ]
}
```

Configuration variables:

- **domain** (*Required*): Your network domain name.
- **dns** (*Required*): A list of DNS server for your network.
- **networks** (*Optional*): A list of network to provide DHCP.
  - **subnet** (*Required*): Your network schema.
  - **netmask** (*Required*): Your network netmask.
  - **range_start** (*Required*): Start address for dhcp leases.
  - **range_end** (*Required*): End address for dhcp leases.
  - **broadcast** (*Required*): Network broadcast address.
  - **gateway** (*Required*): A List of gateways.
  - **interface** (*Required*): Inteface on that will be listen. Normally is `eth0` for ethernet wired connection and `wlan0` for wireless connection.
- **hosts** (*Optional*): A list of fixed IPs for devices.
  - **name** (*Required*): Name/hostname of your device.
  - **mac** (*Required*): Mac address of your device.
  - **ip** (*Required*): Fix ip address for device.
