---
layout: page
title: "SNMP"
description: "Instructions on how to integrate SNMP into Home Assistant."
date: 2015-10-08 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: network-snmp.png
ha_category: Presence Detection
ha_release: 0.7.5
---


A lot of WiFi access points and WiFi routers support the Simple Network Management Protocol (SNMP). This is a standardized method for monitoring/manageing network connected devices. SNMP uses a tree-like hierarchy where each node is an object. Many of these objects contain (live) lists of instances and metrics, like network interfaces, disks, and WiFi registrations.

<p class='note warning'>
This device tracker needs SNMP to be enabled on the router. It could be that you need to install the SNMP support manually.
</p>

The following OID examples pull the current MAC Address table from a router. This reflects all recent devices seen on the network. However, since devices are not removed until they time out, this is less effective for [device tracker component page](/components/device_tracker/) than desirable. It is recommended to use [Ping](/components/device_tracker.ping/) or [Nmap](/components/device_tracker.nmap_tracker/) instead.

| Brand | Device/Firmware | OID |
|---|---|---|---|
| Mikrotik | unknown RouterOS version/model | `1.3.6.1.4.1.14988.1.1.1.2.1.1` |
| Mikrotik | RouterOS 6.x on RB2011 | `1.3.6.1.2.1.4.22.1.2` |
| Aruba | (untested) | `1.3.6.1.4.1.14823.2.3.3.1.2.4.1.2` |
| pfSense | 2.2.4  | `1.3.6.1.2.1.4.22.1.2` |
| BiPAC | 7800DXL Firmware 2.32e | `1.3.6.1.2.1.17.7.1.2.2.1.1` |
| OpenWrt | Chaos Calmer 15.05 | `1.3.6.1.2.1.4.22.1.2` |
| TP-Link | Archer VR2600v |  `1.3.6.1.2.1.3.1.1.2.19.1` |
| TP-Link | Archer VR600 | `1.3.6.1.2.1.3.1.1.2` |
| EdgeRouter | Lite v1.9.0 | `1.3.6.1.2.1.4.22.1.2` |
| Ruckus | ZoneDirector 9.13.3 | `1.3.6.1.4.1.25053.1.2.2.1.1.3.1.1.1.6` |
| DD-WRT | unknown RouterOS version/model |  `1.3.6.1.2.1.4.22.1.2` |
| Apple Airport Express (2nd gen.) | 7.6.9 |  `1.3.6.1.2.1.3.1.1.2` or `1.3.6.1.2.1.4.22.1.2`|

To use the SNMP version 1 platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for SNMP version 1
device_tracker:
  - platform: snmp
    host: 192.168.1.1
    community: public
    baseoid: 1.3.6.1.4.1.14988.1.1.1.2.1.1
```

If you want to use encryption, you must enable SNMP version 3 by adding `authkey` and `privkey` variables and enabling SNMP version 3 on your router. Currently only SHA1 is supported for authentication and AES for encryption. Example of SNMPv3 configuration:

```yaml
# Example configuration.yaml entry for SNMP version 3
device_tracker:
  - platform: snmp
    host: 192.168.1.1
    community: username
    authkey: authpass
    privkey: privpass
    baseoid: 1.3.6.1.4.1.14988.1.1.1.2.1.1
```

Configuration variables:

- **host** (*Required*): The IP address of the router, eg. 192.168.1.1.
- **community** (*Required*): The SNMP community which is set for the device. Most devices have a default community set to `public` with read-only permission (which is sufficient).
- **baseoid** (*Required*): The OID prefix where wireless client registrations can be found, usually vendor specific. It's advised to use the numerical notation. To find this base OID, check vendor documentation or check the MIB file for your device.
- **authkey** (*Inclusive*): Authentication key for SNMPv3. Variable privkey must also be set.
- **privkey** (*Inclusive*): Privacy key SNMPv3. Variable authkey must also be set.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
