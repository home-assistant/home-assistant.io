---
title: Satel Integra
description: Instructions on how to integrate a Satel Integra alarm panel with Home Assistant using an ETHM network extension from Satel.
ha_categories:
  - security_safety.alarm_systems
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
  - sensor
  - switch
ha_integration_type: device
ha_quality_scale: bronze
---

The **Satel Integra** {% term integration %} allows you to connect your [Satel Integra alarm system](https://www.satel.pl/en/product-category/intruder-alarms/integra/) to Home Assistant to control and monitor your alarm system.

There is currently support for the following device types within Home Assistant:

- Binary sensor: Reports on zone or output statuses
- Switch: allows for setting states of selected outputs
- Alarm control panel: represents the zones (in Polish: "strefa"). Reports its status, and can be used to arm/disarm the partition
- Sensor: Reports zone temperatures for zones that have temperature support 

The module communicates via Satel's open TCP protocol published on their website. It subscribes for new events coming from alarm system and reacts to them immediately.

## Supported devices

The integration only supports the **ETHM-1 Plus**, with firmware version 2.00 or greater. Only the Integra line of alarm systems is supported.

## Prerequisites

1. Open the [DLOADX](https://www.satel.eu/nl/product/343/DLOADX,INTEGRA-en-VERSA-Alarmsysteem-installatie-programma) installer program.
2. Open your existing project file.
3. Open the **System and hardware structure** tab.
4. Navigate to the **Hardware** section, expand the tree and select the **ETHM-1 Plus** module.
5. Select the **Integration** checkbox.
6. Configure encryption:
    - If you want to use an unencrypted connection, clear the **Encrypted integration** checkbox.
    - If you want to use an encrypted connection, select the **Encrypted integration** checkbox and note the
     integration encryption key you configured in the **Keypads** module from the navigation tree.

{% note %}
If you do not have access to the DLOADX program or your project file, ask your installer to adjust the settings for you.
{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address of the Satel Integra ETHM module.
Port:
  description: The port on which the ETHM module listens for clients using the integration protocol.
Integration encryption key:
  description: Encryption key to use if an encrypted connection is used, as configured in DLOADX
    for the ETHM-1 Plus module. Leave empty if not using an encrypted connection.
Code:
  description: Optional code that will be used to toggle switchable outputs.
{% endconfiguration_basic %}

## Configuring partitions, zones, and outputs

After setting up the connection details, you can configure partitions, zones, and outputs as **Subentries** on the {% my integration domain="satel_integra" title="**Satel Integra**" %} integration page.

A list of all partition, zone, and output IDs can be acquired by running the DLOADX program and connecting to your alarm.
To create the respective entities, select the **Add partition**, **Add zone**, **Add output**, or **Add switchable output** buttons. Follow the instructions in the UI to set up the individual entities.
**Result**: Each partition will have its own alarm panel. Each zone and output will have a binary sensor, and a switch will be created for each switchable output. Sensors will be created for each zone that has temperature sensor support enabled.

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

## Supported functionality

### Binary sensor

- **System trouble**
  - **Description**: Indicates when any system trouble is active on the alarm panel.
  - **Remarks**: Available as the first entry in the integration's diagnostics group.
- **Service mode**
  - **Description**: Indicates when the panel is in service mode, activated during maintenance. This can be used to disable automations while the system is under maintenance.
  - **Remarks**: Available as a diagnostic sensor, disabled by default.
- **Panel AC trouble**
  - **Description**: Indicates a missing or failed AC power supply to the panel.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **Panel battery trouble**
  - **Description**: Indicates a fault with the panel backup battery.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **Panel battery missing**
  - **Description**: Indicates that no backup battery is connected to the panel.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **Output {number} trouble**
  - **Description**: Indicates a trouble condition on the specified output (outputs 1–4).
  - **Remarks**: Diagnostic sensors, disabled by default.
- **Keypad power supply trouble**
  - **Description**: Indicates a fault with the keypad power supply.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **Expander power supply trouble**
  - **Description**: Indicates a fault with an expander module power supply.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **DT1 trouble**
  - **Description**: Indicates a trouble on the DT1 dialer interface.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **DT2 trouble**
  - **Description**: Indicates a trouble on the DT2 dialer interface.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **DTM trouble**
  - **Description**: Indicates a trouble on the DTM (Dual Tone Multi-Frequency) dialer interface.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **RTC trouble**
  - **Description**: Indicates a real-time clock fault on the panel.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **EEPROM or RTC access trouble**
  - **Description**: Indicates a fault accessing the panel's EEPROM or RTC memory.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **RAM trouble**
  - **Description**: Indicates a RAM memory fault on the panel.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **Panel restart memory trouble**
  - **Description**: Indicates a fault with the panel's restart memory.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **External device DTR trouble**
  - **Description**: Indicates a trouble with an external device's DTR (Data Terminal Ready) signal.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **External modem initialization trouble**
  - **Description**: Indicates a failure during external modem initialization.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **External modem command trouble**
  - **Description**: Indicates a command failure to the external modem.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **Telephone line bad signal trouble**
  - **Description**: Indicates a poor signal quality on the telephone line.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **Telephone line no signal trouble**
  - **Description**: Indicates no signal detected on the telephone line.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **Telephone line voltage or auxiliary processor trouble**
  - **Description**: Indicates a voltage or auxiliary processor issue on the telephone line.
  - **Remarks**: Diagnostic sensor, disabled by default.
- **Monitoring station {number} trouble**
  - **Description**: Indicates a trouble communicating with the specified monitoring station (stations 1–2).
  - **Remarks**: Diagnostic sensors, disabled by default.

## Known limitations

- The individual system trouble sensors are disabled by default. They must be manually enabled in the entity registry before they will appear in the UI.

## Removing the integration

This integration follows standard integration removal. Once the integration is removed, consider disabling the communication ability to the ETHM-1 Plus module using DLOADX to reduce security risks.

{% include integrations/remove_device_service.md %}
