---
title: "DHCP server"
description: "A simple DHCP server."
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

{% configuration %}
domain:
  description: Your network domain name.
  required: true
  type: string
dns:
  description: A list of DNS server for your network.
  required: true
  type: list
networks:
  description: A list of network to provide DHCP.
  required: false
  type: list
  keys:
    subnet:
      description: Your network schema.
      required: true
      type: string
    netmask:
      description: Your network netmask.
      required: true
      type: string
    range_start:
      description: Start address for DHCP leases.
      required: true
      type: string
    range_end:
      description: End address for DHCP leases.
      required: true
      type: string
    broadcast:
      description: Network broadcast address.
      required: true
      type: string
    gateway:
      description: A List of gateways.
      required: true
      type: list
    interface:
      description: Interface on that will be listen. Normally is `eth0` for ethernet wired connection and `wlan0` for wireless connection.
      required: true
      type: string
hosts:
  description: A list of fixed IPs for devices.
  required: false
  type: list
  keys:
    name:
      description: Name/hostname of your device.
      required: true
      type: string
    mac:
      description: Mac address of your device.
      required: true
      type: string
    ip:
      description: Fix IP address for device.
      required: true
      type: string
{% endconfiguration %}
