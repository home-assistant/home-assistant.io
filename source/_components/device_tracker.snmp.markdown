---
layout: page
title: "SNMP"
description: "Instructions how to integrate SNMP into Home Assistant."
date: 2015-10-08 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: network-snmp.png
ha_category: Presence Detection
ha_release: 0.7.5
---


A lot WiFi access points and WiFi routers support the Simple Network Management Protocol (SNMP). This is a standardized method for monitoring/manageing network connected devices. SNMP uses a tree-like hierarchy where each node is an object. Many of these objects contain (live) lists of insances and metrics, like network interfaces, disks, and wifi registrations.

<p class='note warning'>
This device tracker needs SNMP to be enabled on the router.
</p>

OID examples:

- Mikrotik: `1.3.6.1.4.1.14988.1.1.1.2.1.1` (confirmed, unknown RouterOS version/model)
- Mikrotik: `1.3.6.1.2.1.4.22.1.2` (confirmed, RouterOS 6.x on RB2011)
- Aruba: `1.3.6.1.4.1.14823.2.3.3.1.2.4.1.2` (untested)
- BiPAC 7800DXL: `1.3.6.1.2.1.17.7.1.2.2.1.1` (confirmed on firmware 2.32e)
- OpenWrt: `1.3.6.1.2.1.4.22.1.2` (tested on Chaos Calmer 15.05 firmware, need to install snmpd package)
- pfSense: `1.3.6.1.2.1.4.22.1.2` (tested on 2.2.4-RELEASE, need to enable SNMP service)
- TPLink: `1.3.6.1.2.1.3.1.1.2.19.1` (Archer VR2600v, need to enable SNMP service)
- EdgeRouter `1.3.6.1.2.1.4.22.1.2` (EdgeRouter Lite v1.9.0, need to enable SNMP service)

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
- **community** (*Required*): The SNMP community which is set for the device. Most devices have a default community set to to `public` with read-only permission (which is sufficient).
- **baseoid** (*Required*): The OID prefix where wireless client registrations can be found, usually vendor specific. It's advised to use the numerical notation. To find this base OID, check vendor documentation or check the MIB file for your device.
- **authkey** (*Inclusive*): Authentication key for SNMPv3. Variable privkey must also be set.
- **privkey** (*Inclusive*): Privacy key SNMPv3. Variable authkey must also be set.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
