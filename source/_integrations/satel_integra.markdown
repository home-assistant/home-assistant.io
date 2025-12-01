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
---

The **Satel Integra** {% term integration %} allows you to connect your [Satel Integra alarm system](https://www.satel.pl/en/product-category/intruder-alarms/integra/) to Home Assistant to control and monitor your alarm system.

There is currently support for the following device types within Home Assistant:

- Binary sensor: Reports on zone or output statuses
- Switch: allows for setting states of selected outputs
- Alarm control panel: represents the zones (in Polish: "strefa"). Reports its status, and can be used to arm/disarm the partition

The module communicates via Satel's open TCP protocol published on their website. It subscribes for new events coming from alarm system and reacts to them immediately.

## Supported devices

The integration only supports the **ETHM-1 Plus**, with firmware version 2.00 or greater. Only the Integra line of alarm systems is supported.

## Prerequisites

1. Open the [DLOADX](https://www.satel.eu/nl/product/343/DLOADX,INTEGRA-en-VERSA-Alarmsysteem-installatie-programma) installer program.
2. Open your existing project file.
3. Open the **System and hardware structure** tab.
4. Navigate to the **Hardware** section, expand the tree and select the **ETHM-1 Plus** module.
5. Select the **Integration** checkbox.
6. Clear the **Encrypted integration** checkbox. Encrypted connection is currently not supported.

{% note %}
If you do not have access to the DLOADX program or your project file, ask your installer to adjust the settings for you.
{% endnote %}

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

A list of all partition, zone, and output IDs can be acquired by running the DLOADX program and connecting to your alarm.
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
