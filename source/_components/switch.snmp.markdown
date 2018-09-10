---
layout: page
title: "SNMP Switch"
description: "Instructions on how to integrate SNMP switches into Home Assistant."
date: 2017-10-12 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: network-snmp.png
ha_category: Switch
ha_iot_class: "Local Polling"
ha_release: 0.57
---

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
{% endconfiguration %}

You should check with your device's vendor to find out the correct BaseOID and what values turn the switch on and off.

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
    version: '3'
    username: 'myusername'
    auth_key: 'myauthkey'
    auth_protocol: 'hmac-sha'
    priv_key: 'myprivkey'
    priv_protocol: 'aes-cfb-128'
    baseoid: 1.3.6.1.4.1.19865.1.2.1.4.0
    payload_on: 1
    payload_off: 0
```
