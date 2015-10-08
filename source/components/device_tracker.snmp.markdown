---
layout: page
title: "Generic SNMP support"
description: "Instructions how to integrate SNMP into Home Assistant."
date: 2015-10-08 12:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/network-snmp.png' class='brand pull-right' />
Most wifi-accesspoints (WAP) and wifi-routers (WRT) support the Simple Network Management Protocol (SNMP). This is a standardized method for monitoring/manageing network connected devices. SNMP uses a tree-like hierarchy where each node is an object. Many of these objects contain (live) lists of insances and metrics, like network interfaces, disks, and wifi registrations.

<p class='note warning'>
This device tracker needs SNMP to be enabled on the router.
</p>

OID examples:
- Microtik: 1.3.6.1.4.1.14988.1.1.1.2.1.1 (confirmed)
- Aruba: 1.3.6.1.4.1.14823.2.3.3.1.2.4.1.2 (untested)

To use the snmp platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: snmp
  hosts: 192.168.1.1
  community: public
  baseoid: 1.3.6.1.4.1.14988.1.1.1.2.1.1
```
Configuration variables:

- **host** (*Required*): The IP address of the router, eg. 192.168.1.1.
- **community** (*Required*): The SNMP community which is configured in the WAP/WRT. Most devices have a default community set to to `public` with read-only permission (which is sufficient).

- **baseoid** (*Required*): The OID prefix where wireless client registrations can be found, usually vendor specific. It's advised to use the numerical notation. To find this base OID, check vendor documentation or check the MIB file for your device.

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.
