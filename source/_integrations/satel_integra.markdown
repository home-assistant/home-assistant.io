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
ha_domain: satel_integra
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
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
  description: The port on which the ETHM module listens for clients using integration protocol.
Code:
  description: Optional code that will be used to toggle switchable outputs.
{% endconfiguration_basic %}

## Settings

After setting up the connection details, partitions, zones and outputs can be configured using the <i>Options</i> on the <i>Satel Integra</i> card on the {% my integrations title="Settings > Devices & services" %} page.

### Partitions, Zones and Outputs

Partitions, Zones and outputs can be added, edited, and removed through the option forms.

Each partition will have it's own alarm panel, each zone and output will have a binary sensor and each switchable output will have a switch created.

To get started, select which entry type you want to manage:

![image](https://github.com/user-attachments/assets/c788689b-9f58-46c4-9e51-d6cce5431763)

Then select the partition/zone/output number you want to manage and the corresponding action. The first action will always be to Add (unless a previous YAML configuration was imported)

![image](https://github.com/user-attachments/assets/eba00284-c9fb-4678-9f46-1e67bd806ab3)

Afterwards fill in the required fields for each entry type. Saving the options form should automatically generate and/or update the {%term entities %}.
Deleting an entry removes the corresponding entry from the configuration, but the entity will still exist, you will manually have to remove this from the list afterwards.

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

