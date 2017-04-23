---
layout: page
title: "SNMP"
description: "Instructions how to integrate SNMP sensors within Home Assistant."
date: 2016-06-05 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: network-snmp.png
ha_category: System Monitor
ha_iot_class: "Local Polling"
ha_release: "0.22"
---


The `snmp` sensor platform simple displays the information which are available through the [Simple Network Management Protocol (SNMP)](https://en.wikipedia.org/wiki/Simple_Network_Management_Protocol). SNMP uses a tree-like hierarchy where each node is an object.

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: snmp
    host: 192.168.1.32
    baseoid: 1.3.6.1.4.1.2021.10.1.3.1
```

Configuration variables:

- **host** (*Required*): The IP address of your host, eg. `192.168.1.32`.
- **port** (*Option*): The SNMP port of your host. Defaults to `161`.
- **name** (*Optional*): Name of the SNMP sensor.
- **community** (*Optional*): The SNMP community which is set for the device. Most devices have a default community set to to `public` with read-only permission (which is sufficient).
- **baseoid** (*Required*): The OID where the information is located. It's advised to use the numerical notation.
- **unit_of_measurement** (*Optional*): Defines the unit of measurement of the sensor, if any.

The OIDs may vary on different system because they are vendor-specific. Beside the device's manual is the [OID Repository](http://www.oid-info.com/) a good place to start if you are looking for OIDs. The following OIDs are for the load of a Linux systems.

- 1 minute Load: 1.3.6.1.4.1.2021.10.1.3.1
- 5 minute Load: 1.3.6.1.4.1.2021.10.1.3.2
- 15 minute Load: 1.3.6.1.4.1.2021.10.1.3.3

There is a large amount of tools available to work with SNMP. `snmpwalk` let you easily retrieve the value of a OID.

```bash
$ snmpwalk -Os -c public -v 2c 192.168.1.32 1.3.6.1.4.1.2021.10.1.3.1
laLoad.1 = STRING: 0.19
```

