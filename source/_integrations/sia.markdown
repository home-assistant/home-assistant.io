---
title: SIA Alarm Systems
description: Instructions on how to integrate SIA DC-09 Based Alarm systems into Home Assistant.
ha_category:
  - Alarm
  - Binary Sensor
  - Sensor
ha_release: "0.112"
ha_iot_class: "Local Push"
ha_quality_scale: platinum
ha_config_flow: true
ha_codeowners:
  - '@eavanvalkenburg'
ha_domain: sia
---

The `sia` platform provides integration with several alarm systems that implement the SIA DC-09 Protocol, including [Ajax Systems](https://ajax.systems/). This protocol is listen-only, so does not allow you to turn on/off your alarm system, it just updates the state to reflect your alarm and allows you to act on that state, for instance turning on all lights and opening the curtains when the alarm triggers.

To use this platform, you need to setup your alarm system to communicate using the SIA Protocol and setup several things on the alarm. This integration basically works by Home Assistant listening on a port for messages from the alarm systems and handling and responding to that message and finally updating one or more entities in Home Assistant.

## Alarm Setup (Ajax Systems Hub example)

1. Select "SIA Protocol". 
2. Enable "Connect on demand". 
3. Place Account Id - 3-16 ASCII hex characters. For example AAA.
4. Insert Home Assistant IP address. It must be visible to hub. There is no cloud connection necessary to it.
5. Insert Home Assistant listening port. This port must not be used by anything else on the machine Home Assistant is running on.
6. Select Preferred Network. Ethernet is preferred if hub and HA in same network. Multiple networks are not tested.
7. Enable Periodic Reports. The interval with which the alarm systems reports to the monitoring station, default is 1 minute. This component adds 30 seconds before setting the alarm unavailable to deal with slights latencies between ajax and HA and the async nature of HA.
8. Encryption is preferred but optional. Password is 16 ASCII characters.

## Installation

1. Go to the Integration page
1. Click add integration and search for `sia`
1. After clicking the add button in the Integration pane, you fill in the below fields.

## Configuration flow fields

{% configuration %}
port:
  description: Port that your alarm will communicate with, must be set in the alarm system as explained above.
  required: true
  type: integer
account:
  description: Hub account to communicate with. 3-16 ASCII hex characters. Must be set in the alarm system as explained above.
  required: true
  type: string
encryption_key:
  description: Encoding key. 16 ASCII characters. Must be same, as in hub properties.
  required: false
  type: string
ping_interval:
  description: Ping interval in minutes that the alarm system uses to send "Automatic communication test report" messages, the component adds 30 seconds before marking all entities for that account (alarm and binary sensors) unavailable. Must be between 1 and 1440 minutes.
  required: false
  type: integer
  default: 1
zones:
  description: The number of zones configured in your alarm.
  required: false
  type: integer
  default: 1
additional_account:
  description: Used to ask if a additional account needs to be included, if so will open a dialog for the next account, after checking the current input.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

ASCII characters are 0-9 and ABCDEF, so a account is something like `346EB` and the encryption key has the same characters but needs to be 16 characters in length.

### Note on monitoring multiple alarm systems
If you have multiple accounts (alarm systems) that you want to monitor you can choose to have all communicating with the same port, in that case, use the additional accounts checkbox in the dialog to setup the next account and keep doing that until you have them all. You can also choose to have both running on a different port, in that case setup the component twice with the different ports.

### Port usage
The port used with this component must be a port no other processes use on the machine your HA instance is running. If you have a complex network setup or want to monitor alarm systems at other locations you will most likely have to open firewalls and/or create network routes for that purpose, the integration will just listen for messages coming into that port, and will not proactively send, only responding with a acknowledgement to the alarm system.

### Entities
After setup you will see one entity per account for the heartbeat, and 3 entities for each zone per account, alarm, smoke sensor and moisture sensor. This means at least four entities are added, each will also have a device associated with it, to allow you to use the area feature. Unwanted sensors can be hidden in the interface and friendly names assigned.
