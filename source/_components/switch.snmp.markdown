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

Currently, only SNMP OIDs that accept integer values are supported. SNMP v1 and v2c are supported. SNMP v3 is **not** supported.

To use an SNMP switch in your installation:

```yaml
# Example configuration.yaml entry:
switch:
  - platform: snmp
    host: 192.168.0.2
    baseoid: 1.3.6.1.4.1.19865.1.2.1.4.0
```

Configuration variables:

- **baseoid** (*Required*): The SNMP BaseOID which to poll for the state of the switch.
- **command_oid** (*Optional*): The SNMP OID which to set in order to turn the switch on and off, if different from `baseoid`.
- **host** (*Optional*): The IP/host which to control. Defaults to `localhost`.
- **port** (*Optional*): The port on which to communicate. Defaults to `161`.
- **community** (*Optional*): community string to use for authentication. Defaults to `private`.
- **version** (*Optional*): SNMP version to use - either `1` or `2c`. Defaults to `1`.
- **payload_on** (*Optional*): What return value represents an `On` state for the switch. The same value is used in writes to turn on the switch if `command_payload_on` is not set. Defaults to `1`.
- **payload_off** (*Optional*): What return value represents an `Off` state for the switch. The same value is used in writes to turn off the switch if `command_payload_off` is not set. Defaults to `0`.
- **command_payload_on** (*Optional*): The value to write to turn on the switch, if different from `payload_on`.
- **command_payload_off** (*Optional*): The value to write to turn off the switch, if different from `payload_off`.

You should check with your device's vendor to find out the correct BaseOID and what values turn the switch on and off.

A complete example:

```yaml
switch:
  - platform: snmp
    name: SNMP switch
    host: 192.168.0.2
    community: private
    baseoid: 1.3.6.1.4.1.19865.1.2.1.4.0
    payload_on: 1
    payload_off: 0
```
