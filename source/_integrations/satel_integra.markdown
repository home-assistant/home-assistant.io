---
description: Instructions on how to integrate a Satel Integra alarm panel with Home Assistant using an ETHM network extension from Satel.
ha_release: 0.54
ha_domain: satel_integra
---

The **Satel Integra** {% term integration %} allows you to connect your [Satel Integra alarm system](https://www.satel.pl/en/product-category/intruder-alarms/integra/) to Home Assistant to control and monitor your alarm system.

There is currently support for the following device types within Home Assistant:

- Binary sensor: Reports on zone or output statuses, and on the alarm panel's service mode and system troubles
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

### Configuration parameters

{% configuration_basic %}
Host:
  description: The IP address of the Satel Integra ETHM module.
Port:
  description: The port on which the ETHM module listens for clients using the integration protocol.
Integration encryption key:
  description: Encryption key to use if an encrypted connection is used, as configured in DLOADX
    for the ETHM-1 Plus module. Leave empty if not using an encrypted connection.
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Code:
  description: The 4- to 16-digit user code configured on the alarm panel. The integration uses this code to toggle switchable outputs. Leave the field empty if you do not need to control switchable outputs.
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

### Binary sensors

- **Service mode**: Whether the panel is in service mode, activated during maintenance. Use it to pause automations while the panel is under maintenance.
- **System trouble**: Whether any system trouble is active on the alarm panel.

#### Individual trouble sensors

{% tip %}
The individual trouble sensors are disabled by default. See [Enabling and disabling entities](/docs/configuration/customizing-devices/#disabling-or-enabling-an-entity) to enable them.
{% endtip %}

- **Panel AC trouble**: Whether the panel has lost its AC power supply.
- **Panel battery trouble**: Whether there is a fault with the panel backup battery.
- **Panel battery missing**: Whether no backup battery is connected to the panel.
- **Output {number} trouble**: Whether there is a trouble condition on the specified output (outputs 1–4).
- **Keypad power supply trouble**: Whether there is a fault with the keypad power supply.
- **Expander power supply trouble**: Whether there is a fault with an expander module power supply.
- **DT1 trouble**: Whether there is a trouble on the first expander bus data line.
- **DT2 trouble**: Whether there is a trouble on the second expander bus data line.
- **DTM trouble**: Whether there is a trouble on the keypad bus data line.
- **RTC trouble**: Whether there is a real-time clock fault on the panel.
- **EEPROM or RTC access trouble**: Whether there is a fault accessing the panel's EEPROM or RTC memory.
- **RAM trouble**: Whether there is a RAM memory fault on the panel.
- **Panel restart memory trouble**: Whether there is a fault with the panel's restart memory.
- **External device DTR trouble**: Whether the panel detects no DTR (Data Terminal Ready) signal from an external device.
- **External modem initialization trouble**: Whether there is a failure during external modem initialization.
- **External modem command trouble**: Whether there is a command failure to the external modem.
- **Telephone line bad signal trouble**: Whether there is a poor signal quality on the telephone line.
- **Telephone line no signal trouble**: Whether there is no signal detected on the telephone line.
- **Telephone line voltage or auxiliary processor trouble**: Whether there is a telephone line voltage fault or an auxiliary processor fault, depending on the panel model.
- **Monitoring station {number} trouble**: Whether there is a trouble communicating with the specified monitoring station (stations 1–2).

## Removing the integration

This integration follows standard integration removal. Once the integration is removed, consider disabling the communication ability to the ETHM-1 Plus module using DLOADX to reduce security risks.

{% include integrations/remove_device_service.md %}
