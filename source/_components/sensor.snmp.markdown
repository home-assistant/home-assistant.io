---
layout: page
title: "SNMP"
description: "Instructions on how to integrate SNMP sensors within Home Assistant."
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


The `snmp` sensor platform displays information available through the [Simple Network Management Protocol (SNMP)](https://en.wikipedia.org/wiki/Simple_Network_Management_Protocol). SNMP uses a tree-like hierarchy where each node is an object, and is mainly supported by network-oriented devices such as routers, modems, and printers.

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
- **baseoid** (*Required*): The OID where the information is located. It's advised to use the numerical notation.
- **port** (*Option*): The SNMP port of your host. Defaults to `161`.
- **community** (*Optional*): The SNMP community which is set for the device. Most devices have a default community set to `public` with read-only permission (which is sufficient).
- **version** (*Optional*) version of SNMP protocol, `1` or `2c`. Defaults to `1`. Version `2c` is needed to read data from 64-bit counters.
- **name** (*Optional*): Name of the SNMP sensor.
- **unit_of_measurement** (*Optional*): Defines the unit of measurement of the sensor, if any.
- **value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to parse the value.
- **accept_errors** (*Optional*): Determines whether the sensor should start and keep working even if the SNMP host is unreachable or not responding. This allows the sensor to be initialized properly even if, for example, your printer is not on when you start Home Assistant. Defaults to `false`.
- **default_value** (*Optional*): Determines what value the sensor should take if `accept_errors` is set and the host is unreachable or not responding. If not set, the sensor will have value `unknown` in case of errors.

## {% linkable_title Finding OIDs %}

OIDs may vary on different systems because they are vendor-specific. Beside the device's manual, the [OID Repository](http://www.oid-info.com/) is a good place to start if you are looking for OIDs. As an example, the following OIDs are for the load of a Linux systems.

- 1 minute Load: `1.3.6.1.4.1.2021.10.1.3.1`
- 5 minute Load: `1.3.6.1.4.1.2021.10.1.3.2`
- 15 minute Load: `1.3.6.1.4.1.2021.10.1.3.3`

There is a large amount of tools available to work with SNMP. `snmpwalk` let you easily retrieve the value of a OID.

```bash
$ snmpwalk -Os -c public -v 2c 192.168.1.32 1.3.6.1.4.1.2021.10.1.3.1
laLoad.1 = STRING: 0.19
```

## {% linkable_title Examples %}

### {% linkable_title Printer uptime minutes %}

According to the most common SNMP standard, the uptime of a device is accessible under OID `1.3.6.1.2.1.1.3.0`. The value represented using a format called `TimeTicks`, in units of hundredth of a second.

To create a sensor that displays the uptime for your printer in minutes, you can use this configuration:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: snmp
    name: 'Printer uptime'
    host: 192.168.2.21
    baseoid: 1.3.6.1.2.1.1.3.0
    accept_errors: true
    unit_of_measurement: 'minutes'
    value_template: {% raw %}'{{((value | int) / 6000) | int}}'{% endraw %}
```

The `accept_errors` option will allow the sensor to work even if the printer is not on when Home Assistant is first started: the sensor will just display a `-` instead of a minute count.

The `value_template` option converts the original value to minutes.
