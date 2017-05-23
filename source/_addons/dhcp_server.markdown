---
layout: page
title: "DHCP server"
description: "A simple dhcp server"
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Create a simple DHCP server for your network and allow set fix ip for some devices.

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
      "broadcast": "192.168.1.254",
      "routers": ["192.168.1.1"]
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

- **token** (*Required*): Your Duck DNS API key.
- **domains** (*Required*): A list of domains to update DNS.
- **seconds** (*Optional*): Seconds between updates to Duck DNS.
