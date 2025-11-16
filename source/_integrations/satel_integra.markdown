---
title: Satel Integra
description: Instructions on how to integrate a Satel Integra alarm panel with Home Assistant using an ETHM network extension from Satel.
ha_category:
  - Alarm
  - Binary sensor
  - Hub
  - Switch
ha_release: 0.54
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@Tommatheussen'
ha_domain: satel_integra
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - diagnostics
  - switch
ha_integration_type: device
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `satel_integra` {% term integration %} will allow Home Assistant users who own a Satel Integra alarm panel to leverage their alarm system and its sensors to provide Home Assistant with information about their homes. Connectivity between Home Assistant and the alarm is accomplished through a ETHM extension module that must be installed in the alarm. Compatible with ETHM-1 Plus module with firmware version > 2.00 (version 2.04 confirmed).

There is currently support for the following device types within Home Assistant:

- Binary sensor: Reports on zone or output statuses
- Switch: allows for setting states of selected outputs
- Alarm control panel: represents the zones (in Polish: "strefa"). Reports its status, and can be used to arm/disarm the partition

The module communicates via Satel's open TCP protocol published on their website. It subscribes for new events coming from alarm system and reacts to them immediately.

## Setup

Please note that **ETHM-1 module is currently not supported**: it does not provide functionality used by this extension. At the moment only ETHM-1 Plus module is supported. That might change in the future, but no promises are given.

The library currently doesn't support encrypted connection to your alarm, so you need **to turn off encryption for integration protocol**. In Polish: "koduj integracje" must be unchecked. You will find this setting in your DloadX program.

A list of all partition, zone and output IDs can be acquired by running DloadX program and connecting to your alarm.

For the binary sensor, check the [type/class](/integrations/binary_sensor/) list for a possible visualization of your zones. Note: If no zones or outputs are specified, Home Assistant will not load any binary_sensor integrations."

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address of the Satel Integra ETHM module.
Port:
  description: The port on which the ETHM module listens for clients using the integration protocol.
Code:
  description: Optional code that will be used to toggle switchable outputs.
{% endconfiguration_basic %}

## Configuring partitions, zones, and outputs

After setting up the connection details, you can configure partitions, zones, and outputs as **Subentries** on the {% my integration domain="satel_integra" title="**Satel Integra**" %} integration page.

To create the respective entities, select the **Add partition**, **Add zone**, **Add output**, or **Add switchable output** buttons. Follow the instructions in the UI to set up the individual entities.
**Result**: Each partition will have its own alarm panel. Each zone and output will have a binary sensor, and a switch will be created for each switchable output.

Having configured the zones and the outputs, you can use them for automation, such as to react on the movement in your bedroom.
For example:

```yaml
  alias: "Flick the input switch when movement in bedroom detected"
  triggers:
    - trigger: state
      entity_id: "binary_sensor.bedroom"
      to: "on"
  actions:
    - action: input_boolean.turn_on
      target:
        entity_id: input_boolean.movement_detected
```

## Removing the integration

This integration follows standard integration removal. Once the integration is removed, consider disabling the communication ability to the ETHM-1 Plus module using DLOADX to reduce security risks.

{% include integrations/remove_device_service.md %}
