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

{% configuration %}
host:
  description: The IP address of your host, eg. `192.168.1.32`.
  required: false
  type: string
  default: 'localhost'
baseoid:
  description: The OID where the information is located. It's advised to use the numerical notation.
  required: true
  type: string
port:
  description: The SNMP port of your host.
  required: false
  type: string
  default: '161'
community:
  description: "The SNMP community which is set for the device for SNMP v1 and v2c. Most devices have a default community set to `public` with read-only permission (which is sufficient)."
  required: false
  type: string
  default: 'public'
username:
  description: Username to use for authentication.
  required: false
  type: string
  default: ''
auth_key:
  description: Authentication key to use for SNMP v3.
  required: false
  type: string
  default: no key
auth_protocol:
  description: Authentication protocol to use for SNMP v3.
  required: false
  type: string
  default: 'none'
priv_key:
  description: Privacy key to use for SNMP v3.
  required: false
  type: string
  default: no key
priv_protocol:
  description: Privacy protocol to use for SNMP v3.
  required: false
  type: string
  default: 'none'
version:
  description: "Version of SNMP protocol, `1`, `2c` or `3`. Version `2c` or higher is needed to read data from 64-bit counters."
  required: false
  type: string
  default: '1'
name:
  description: Name of the SNMP sensor.
  required: false
  type: string
unit_of_measurement:
  description: Defines the unit of measurement of the sensor, if any.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to parse the value."
  required: false
  type: template
accept_errors:
  description: "Determines whether the sensor should start and keep working even if the SNMP host is unreachable or not responding. This allows the sensor to be initialized properly even if, for example, your printer is not on when you start Home Assistant."
  required: false
  type: string
  default: false
default_value:
  description: "Determines what value the sensor should take if `accept_errors` is set and the host is unreachable or not responding. If not set, the sensor will have value `unknown` in case of errors."
  required: false
  type: string
{% endconfiguration %}

Valid values for auth_protocol:

- **none**
- **hmac-md5**
- **hmac-sha**
- **hmac128-sha224**
- **hmac192-sha256**
- **hmac256-sha384**
- **hmac384-sha512**

Valid values for priv_protocol:

- **none**
- **des**
- **3des-ede**
- **aes-cfb-128**
- **aes-cfb-192**
- **aes-cfb-256**

## {% linkable_title Finding OIDs %}

OIDs may vary on different systems because they are vendor-specific. Besides the device's manual, the [OID Repository](http://www.oid-info.com/) is a good place to start if you are looking for OIDs. As an example, the following OIDs are for the load of a Linux system.

- 1 minute Load: `1.3.6.1.4.1.2021.10.1.3.1`
- 5 minute Load: `1.3.6.1.4.1.2021.10.1.3.2`
- 15 minute Load: `1.3.6.1.4.1.2021.10.1.3.3`

There is a large amount of tools available to work with SNMP. `snmpwalk` let you easily retrieve the value of an OID.

```bash
$ snmpwalk -Os -c public -v 2c 192.168.1.32 1.3.6.1.4.1.2021.10.1.3.1
laLoad.1 = STRING: 0.19
```

## {% linkable_title Examples %}

### {% linkable_title Printer uptime minutes %}

According to the most common SNMP standard, the uptime of a device is accessible under OID `1.3.6.1.2.1.1.3.0`. The value represented using a format called `TimeTicks`, in units of hundredths of a second.

To create a sensor that displays the uptime for your printer in minutes, you can use this configuration:

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: snmp
    name: 'Printer uptime'
    host: 192.168.2.21
    baseoid: 1.3.6.1.2.1.1.3.0
    accept_errors: true
    unit_of_measurement: 'minutes'
    value_template: '{{((value | int) / 6000) | int}}'
```
{% endraw %}

The `accept_errors` option will allow the sensor to work even if the printer is not on when Home Assistant is first started: the sensor will just display a `-` instead of a minute count.

The `value_template` option converts the original value to minutes.
