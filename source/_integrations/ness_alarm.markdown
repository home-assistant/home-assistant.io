---
title: Ness Alarm
description: Instructions on how to integrate a Ness D8x/D16x alarm system with Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
ha_release: 0.85
ha_iot_class: Local Push
ha_codeowners:
  - '@nickw444'
ha_domain: ness_alarm
ha_platforms:
  - alarm_control_panel
  - binary_sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `ness_alarm` {% term integration %} will allow Home Assistant users who own a Ness D8x/D16x alarm system to leverage their alarm system and its sensors to provide Home Assistant with information about their homes. Connectivity between Home Assistant and the alarm is accomplished through a IP232 module that must be connected to the alarm.

There is currently support for the following device types within Home Assistant:

- Binary sensor: Reports on zone statuses
- Alarm control panel: Reports on alarm status, and can be used to arm/disarm the system

The module communicates via the [Ness D8x/D16x ASCII protocol](https://ia802202.us.archive.org/16/items/ness-d-8x-d-16x-serial-interface.-ascii-protocol/Ness%20D8x%20D16x%20Serial%20Interface.%20ASCII%20Protocol.pdf).

## Configuration

A `ness_alarm` section must be present in the {% term "`configuration.yaml`" %} file and contain the following options as required:
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
ness_alarm:
  host: alarm.local
  port: 2401
  zones:
    - name: Garage
      id: 1
    - name: Storeroom
      id: 2
    - name: Kitchen
      id: 3
    - name: Front Entrance
      id: 4
    - name: Front Door
      id: 5
      type: door
```

{% configuration %}
host:
  description: The hostname of the IP232 module on your home network.
  required: true
  type: string
port:
  description: The port on which the IP232 module listens for clients.
  required: true
  type: integer
scan_interval:
  description: "Time interval between updates. Supported formats: `scan_interval: 'HH:MM:SS'`, `scan_interval: 'HH:MM'` and Time period dictionary (see example below)."
  required: false
  default: "00:01:00"
  type: time
infer_arming_state:
  description: Infer the disarmed arming state only via system status events. This works around a bug with some panels (`<v5.8`) which emit `update.status = []` when they are armed.
  required: false
  default: false
  type: boolean
zones:
  description: List of zones to add
  required: false
  type: list
  keys:
    zone_id:
      description: ID of the zone on the alarm system (i.e Zone 1 -> Zone 16).
      required: true
      type: integer
    name:
      description: Name of the zone.
      required: true
      type: string
    type:
      description: The zone type. Can be any [binary_sensor device class](/integrations/binary_sensor/#device-class).
      required: false
      default: motion
      type: string
{% endconfiguration %}

### Time period dictionary example

```yaml
scan_interval:
  # At least one of these must be specified:
  days: 0
  hours: 0
  minutes: 0
  seconds: 10
  milliseconds: 0
```

### Alarm System Configuration

As part of the installation process of the IP232 module, the device will need to be configured with the correct settings. From the [iComms Manual](https://ness.zendesk.com/hc/en-us/articles/360021989074-iComms-Manual), there are 3 essential steps:
1. Setting up the IP232 module with the correct baud rate (9600).
2. Ensuring connectivity of the device on either a DHCP assigned or Static IP address.
3. Setting the alarm panel up to allow for serial control. On D8x/D16x panels this is enabled by setting `P 199 E` `1E` to `6E` to be `ON` (6E available on v6 panels and later only).

If the settings in steps 1 and 2 are not set correctly, the integration will not be able to communicate properly with the device. If the `P 199 E` from step 3 is not configured properly, data will not be sent to the integration when events occur.

{% important %}
Incorrect configuration of these settings will prevent the integration from functioning properly.
{% endimportant %}

## Actions

### Action `aux`

Trigger an aux output.  This requires PCB version 7.8 or higher.

| Data attribute | Optional | Description                                                                                                                                                         |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `output_id`            | No       | The aux output you wish to change.  A number from 1-4.                                                                                                              |
| `state`                | Yes      | The On/Off State, represented as true/false. Default is true.  If P14xE 8E is enabled then a value of true will pulse output x for the time specified in P14(x+4)E. |

### Action `panic`

Trigger a panic

| Data attribute | Optional | Description                                |
| ---------------------- | -------- | ------------------------------------------ |
| `code`                 | No       | The user code to use to trigger the panic. |
