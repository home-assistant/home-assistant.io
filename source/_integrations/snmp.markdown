---
title: SNMP
description: Instructions on how to integrate SNMP into Home Assistant.
ha_category:
  - Network
  - Presence detection
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.57
ha_domain: snmp
ha_platforms:
  - device_tracker
  - sensor
  - switch
ha_integration_type: integration
ha_codeowners:
  - '@nmaggioni'
ha_quality_scale: legacy
---

A lot of Wi-Fi access points and Wi-Fi routers support the Simple Network Management Protocol (SNMP). This is a standardized method for monitoring/managing network connected devices. SNMP uses a tree-like hierarchy where each node is an object. Many of these objects contain (live) lists of instances and metrics, like network interfaces, disks and Wi-Fi registrations.

There is currently support for the following device types within Home Assistant:

- [Presence detection](#presence-detection)
- [Sensor](#sensor)
  - [Finding OIDs](#finding-oids)
  - [Examples](#examples)
    - [Printer uptime minutes](#printer-uptime-minutes)
- [Switch](#switch)

{% important %}
This device tracker needs SNMP to be enabled on the router. It could be that you need to install the SNMP support manually.
{% endimportant %}

## Presence detection

The following OID examples pull the current MAC Address table from a router. This reflects all recent devices seen on the network. However, since devices are not removed until they time out, this is less effective for [device tracker integration page](/integrations/device_tracker/) than desirable. It is recommended to use [Ping](/integrations/ping) or [Nmap](/integrations/nmap_tracker) instead.

| Brand | Device/Firmware | OID |
| --- | --- | --- |
| Aerohive | AP230 | `1.3.6.1.4.1.26928.1.1.1.2.1.2.1.1` |
| Apple | Airport Express (2nd gen.) 7.6.9 | `1.3.6.1.2.1.3.1.1.2` or `1.3.6.1.2.1.4.22.1.2`|
| Aruba | IAP325 on AOS 6.5.4.8 | `1.3.6.1.4.1.14823.2.3.3.1.2.4.1.1` |
| BiPAC | 7800DXL Firmware 2.32e | `1.3.6.1.2.1.17.7.1.2.2.1.1` |
| DD-WRT | unknown version/model | `1.3.6.1.2.1.4.22.1.2` |
| IPFire | 2.25 | `1.3.6.1.2.1.4.22.1.2` |
| MikroTik | unknown RouterOS version/model | `1.3.6.1.4.1.14988.1.1.1.2.1.1` |
| MikroTik | RouterOS 6.x on RB2011 | `1.3.6.1.2.1.4.22.1.2` |
| OpenWrt | Chaos Calmer 15.05 | `1.3.6.1.2.1.4.22.1.2` |
| OPNSense | 19.1 | `1.3.6.1.2.1.4.22.1.2` |
| pfSense | 2.2.4 | `1.3.6.1.2.1.4.22.1.2` |
| Ruckus | ZoneDirector 9.13.3 | `1.3.6.1.4.1.25053.1.2.2.1.1.3.1.1.1.6` |
| TP-Link | Archer VR1600v | `1.3.6.1.2.1.3.1.1.2.16.1` |
| TP-Link | Archer VR2600v | `1.3.6.1.2.1.3.1.1.2.19.1` |
| TP-Link | Archer VR600 | `1.3.6.1.2.1.3.1.1.2` |
| Ubiquiti | Edgerouter Lite v1.9.0 | `1.3.6.1.2.1.4.22.1.2` |

To use the SNMP version 1 or 2c platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for SNMP version 1 or 2c
device_tracker:
  - platform: snmp
    host: 192.168.1.1
    community: public
    baseoid: 1.3.6.1.4.1.14988.1.1.1.2.1.1
```

If you want to use encryption, you must enable SNMP version 3 by adding `auth_key` and `priv_key` variables and enabling SNMP version 3 on your router. Currently only SHA1 is supported for authentication and AES for encryption. Example of SNMPv3 configuration:

```yaml
# Example configuration.yaml entry for SNMP version 3
device_tracker:
  - platform: snmp
    host: 192.168.1.1
    community: USERNAME
    auth_key: AUTHPASS
    priv_key: PRIVPASS
    baseoid: 1.3.6.1.4.1.14988.1.1.1.2.1.1
```

{% configuration %}
host:
  description: The IP address of the router, e.g., 192.168.1.1.
  required: true
  type: string
community:
  description: The SNMP community which is set for the device. Most devices have a default community set to `public` with read-only permission (which is sufficient).
  required: true
  type: string
baseoid:
  description: The OID prefix where wireless client registrations can be found, usually vendor specific. It's advised to use the numerical notation. To find this base OID, check vendor documentation or check the MIB file for your device.
  required: true
  type: string
auth_key:
  description: "Authentication key for SNMPv3. Variable `priv_key` must also be set."
  required: inclusive
  type: string
priv_key:
  description: "Privacy key SNMPv3. Variable `auth_key` must also be set."
  required: inclusive
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.

{% include integrations/using_templates.md %}

## Sensor

The `snmp` sensor platform displays information available through the [Simple Network Management Protocol (SNMP)](https://en.wikipedia.org/wiki/Simple_Network_Management_Protocol). SNMP uses a tree-like hierarchy where each node is an object, and is mainly supported by network-oriented devices such as routers, modems and printers.

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: snmp
    host: 192.168.1.32
    baseoid: 1.3.6.1.4.1.2021.10.1.3.1
```

{% configuration %}
accept_errors:
  description: "Determines whether the sensor should start and keep working even if the SNMP host is unreachable or not responding. This allows the sensor to be initialized properly even if, for example, your printer is not on when you start Home Assistant."
  required: false
  type: string
  default: false
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
baseoid:
  description: The OID where the information is located. It's advised to use the numerical notation.
  required: true
  type: string
community:
  description: "The SNMP community which is set for the device for SNMP v1 and v2c. Most devices have a default community set to `public` with read-only permission (which is sufficient)."
  required: false
  type: string
  default: 'public'
default_value:
  description: "Determines what value the sensor should take if `accept_errors` is set and the host is unreachable or not responding. If not set, the sensor will have value `unknown` in case of errors."
  required: false
  type: string
device_class:
  description: Sets the [class of the device](/integrations/sensor#device-class), changing the device state and icon that is displayed on the frontend.
  required: false
  type: string
host:
  description: The IP address of your host, e.g., `192.168.1.32`.
  required: false
  type: string
  default: 'localhost'
icon:
  description: Defines a template for the icon of the SNMP sensor.
  required: false
  type: template
name:
  description: Defines a template for the name of the SNMP sensor.
  required: false
  type: template
  default: SNMP
picture:
  description: Defines a template for the entity picture of the SNMP sensor.
  required: false
  type: template
port:
  description: The SNMP port of your host.
  required: false
  type: string
  default: '161'
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
state_class:
  description: The [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this entity. This allows changing the `name`, `icon` and `entity_id` from the web interface.
  required: false
  type: string
unit_of_measurement:
  description: Defines the units of measurement of the sensor, if any.
  required: false
  type: string
username:
  description: Username to use for authentication.
  required: false
  type: string
  default: ''
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to parse the value."
  required: false
  type: template
version:
  description: "Version of SNMP protocol, `1`, `2c` or `3`. Version `2c` or higher is needed to read data from 64-bit counters."
  required: false
  type: string
  default: '1'
{% endconfiguration %}

Valid values for `auth_protocol`:

- **none**
- **hmac-md5**
- **hmac-sha**
- **hmac128-sha224**
- **hmac192-sha256**
- **hmac256-sha384**
- **hmac384-sha512**

Valid values for `priv_protocol`:

- **none**
- **des**
- **3des-ede**
- **aes-cfb-128**
- **aes-cfb-192**
- **aes-cfb-256**

### Finding OIDs

OIDs may vary on different systems because they are vendor-specific. Besides the device's manual, the [OID Repository](http://www.oid-info.com/) is a good place to start if you are looking for OIDs. As an example, the following OIDs are for the load of a Linux system.

- 1 minute Load: `1.3.6.1.4.1.2021.10.1.3.1`
- 5 minute Load: `1.3.6.1.4.1.2021.10.1.3.2`
- 15 minute Load: `1.3.6.1.4.1.2021.10.1.3.3`

There is a large amount of tools available to work with SNMP. `snmpwalk` let you easily retrieve the value of an OID.

```bash
$ snmpwalk -Os -c public -v 2c 192.168.1.32 1.3.6.1.4.1.2021.10.1.3.1
laLoad.1 = STRING: 0.19
```

### Examples

#### Printer uptime minutes

According to the most common SNMP standard, the uptime of a device is accessible under OID `1.3.6.1.2.1.1.3.0`. The value represented using a format called `TimeTicks`, in units of hundredths of a second.

To create a sensor that displays the uptime for your printer in minutes, you can use this configuration:

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: snmp
    name: "Printer uptime"
    host: 192.168.2.21
    baseoid: 1.3.6.1.2.1.1.3.0
    accept_errors: true
    unit_of_measurement: "minutes"
    value_template: "{{((value | int) / 6000) | int}}"
```

{% endraw %}

The `accept_errors` option will allow the sensor to work even if the printer is not on when Home Assistant is first started: the sensor will just display a `-` instead of a minute count.

The `value_template` option converts the original value to minutes.

## Switch

The `snmp` switch platform allows you to control SNMP-enabled equipment.

Currently, only SNMP OIDs that accept integer values are supported. SNMP v1, v2c and v3 are supported.

To use an SNMP switch in your installation:

```yaml
# Example configuration.yaml entry:
switch:
  - platform: snmp
    host: 192.168.0.2
    baseoid: 1.3.6.1.4.1.19865.1.2.1.4.0
```

{% configuration %}
baseoid:
  description: The SNMP BaseOID which to poll for the state of the switch.
  required: true
  type: string
command_oid:
  description: The SNMP OID which to set in order to turn the switch on and off, if different from `baseoid`.
  required: false
  type: string
host:
  description: The IP/host which to control.
  required: false
  type: string
  default: 'localhost'
port:
  description: The port on which to communicate.
  required: false
  type: string
  default: '161'
community:
  description: community string to use for authentication (SNMP v1 and v2c).
  required: false
  type: string
  default: 'private'
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
  description: SNMP version to use - either `1`, `2c` or `3`.
  required: false
  type: string
  default: '1'
payload_on:
  description: What return value represents an `On` state for the switch. The same value is used in writes to turn on the switch if `command_payload_on` is not set.
  required: false
  type: string
  default: '1'
payload_off:
  description: What return value represents an `Off` state for the switch. The same value is used in writes to turn off the switch if `command_payload_off` is not set.
  required: false
  type: string
  default: '0'
command_payload_on:
  description: The value to write to turn on the switch, if different from `payload_on`.
  required: false
  type: string
command_payload_off:
  description: The value to write to turn off the switch, if different from `payload_off`.
  required: false
  type: string
vartype:
  description: The SNMP vartype for the `payload_on` and `payload_off` commands as defined in [RFC1902](https://tools.ietf.org/html/rfc1902.html).
  required: false
  type: string  
  default: 'none'
{% endconfiguration %}

You should check with your device's vendor to find out the correct BaseOID and what values turn the switch on and off.

Valid values for `auth_protocol`:

- **none**
- **hmac-md5**
- **hmac-sha**
- **hmac128-sha224**
- **hmac192-sha256**
- **hmac256-sha384**
- **hmac384-sha512**

Valid values for `priv_protocol`:

- **none**
- **des**
- **3des-ede**
- **aes-cfb-128**
- **aes-cfb-192**
- **aes-cfb-256**

Valid values for `vartype`:

- **Counter32**
- **Counter64**
- **Gauge32**
- **Integer32**
- **Integer**
- **IpAddress**
- **ObjectIdentifier**
- **OctetString**
- **Opaque**
- **TimeTicks**
- **Unsigned32**

Complete examples:

```yaml
switch:
  - platform: snmp
    name: SNMP v1 switch
    host: 192.168.0.2
    community: private
    baseoid: 1.3.6.1.4.1.19865.1.2.1.4.0
    payload_on: 1
    payload_off: 0

  - platform: snmp
    name: SNMP v3 switch
    host: 192.168.0.3
    version: "3"
    username: "myusername"
    auth_key: "myauthkey"
    auth_protocol: "hmac-sha"
    priv_key: "myprivkey"
    priv_protocol: "aes-cfb-128"
    baseoid: 1.3.6.1.4.1.19865.1.2.1.4.0
    payload_on: 1
    payload_off: 0

  - platform: snmp
    name: Enable PoE on Netgear switch port 2 using SNMP v3
    host: 192.168.0.4
    version: "3"
    username: "myusername"
    auth_key: "myauthkey"
    auth_protocol: "hmac-sha"
    priv_key: "myprivkey"
    priv_protocol: "des"
    baseoid: 1.3.6.1.4.1.4526.11.15.1.1.1.1.1.2
    payload_on: 15400
    payload_off: 3000
    vartype: Gauge32
```
