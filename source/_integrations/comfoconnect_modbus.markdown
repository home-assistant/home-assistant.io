---
title: Zehnder ComfoConnect PRO
description: Instructions on how to integrate a Zehnder ComfoAir Q or Flex ventilation unit with Home Assistant through the ComfoConnect PRO gateway over Modbus.
ha_categories:
  - climate.fans_ventilation
ha_release: "2026.12"
ha_iot_class: Local Polling
ha_codeowners:
  - '@AlCalzone'
ha_domain: comfoconnect_modbus
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: device
ha_quality_scale: bronze
---

The **Zehnder ComfoConnect PRO** {% term integration %} connects Home Assistant to a Zehnder ComfoAir Q or ComfoAir Flex ventilation unit through the ComfoConnect PRO gateway. It talks to the gateway over Modbus TCP on your network, or over Modbus RTU on its RS-485 terminals.

It reads the airflow, the temperature and humidity of each air stream, the CO₂ levels, the filter life and the unit's alarms.

## Use cases

- Following CO₂ in each room. Each CO₂ zone wired to the unit becomes a sensor.
- Knowing when to order filters. **Filter days remaining** counts down to the next filter change.
- Getting told about alarms. **Active error 1** names the alarm the unit reports.
- Seeing how much heat the unit recovers, from the outdoor and supply air temperatures.

## Supported devices

The integration supports the Zehnder ComfoConnect PRO gateway (product number 30006323) connected over ComfoNet to a ComfoAir Q or ComfoAir Flex ventilation unit.

## Unsupported devices

- The older ComfoConnect LAN C gateway. Use the [Zehnder ComfoAir Q](/integrations/comfoconnect/) integration for it.
- ComfoAir Classic units (ComfoAir 160 to 550, SL and Standard models). The gateway connects to them, but it serves Modbus only for the ComfoAir Q and Flex.

## Prerequisites

1. Open the gateway's web interface, for example at `http://comfoconnectpro.local`.
2. On the **Protocols and services** page, select **Modbus TCP** or **Modbus RTU**.
3. Note the unit ID. The default is `1`.
4. For Modbus TCP, note the gateway's IP address from the **Network** page. For Modbus RTU, note the baud rate and parity, and wire the gateway's terminals A and B to your RS-485 adapter.

{% include integrations/config_flow.md %}

First choose how Home Assistant reaches the gateway: **Network (Modbus TCP)** or **Serial port (Modbus RTU)**.

{% configuration_basic %}
Host:
  description: "Modbus TCP only. The hostname or IP address of the gateway."
Port:
  description: "Modbus TCP only. The Modbus TCP port. The gateway uses `502`."
Serial port:
  description: "Modbus RTU only. The serial port wired to the gateway's RS-485 terminals. Ports shared over the network by a serial proxy, such as an ESPHome device, are listed too."
Baud rate:
  description: "Modbus RTU only. The baud rate set on the gateway."
Parity:
  description: "Modbus RTU only. The parity set on the gateway. The default is even. Without parity, the gateway uses 2 stop bits, and the integration matches that."
Modbus unit ID:
  description: "The unit ID set on the gateway. The default is `1`."
{% endconfiguration_basic %}

The integration checks that the gateway reaches a supported ventilation unit before it creates the entry.

{% note %}
Home Assistant can share a Modbus connection between integrations. Another integration that already talks to the same gateway or serial port shares the connection instead of opening a second one.
{% endnote %}

## Supported functionality

All entities belong to one device, named after the config entry.

### Sensors

- **Airflow**: in m³/h.
- **Extract air temperature**, **Exhaust air temperature**, **Outdoor air temperature**, **Supply air temperature**. Extract air comes from the rooms into the unit. Exhaust air leaves the house. Supply air goes into the rooms.
- The humidity of the same four air streams.
- **Room temperature** and **Room humidity**: added once a room sensor reports.
- **CO₂ zone 1** to **CO₂ zone 8**: added once a zone reports a level.
- **Filter days remaining**.
- **Comfort temperature**: the comfort temperature the unit aims for, from the temperature profile and its mode.
- **Boost time remaining**: the time left on a running boost, or 0.
- **Active error 1** to **Active error 5** (diagnostic): the alarms the unit reports, by name. Only the first is enabled by default.

## Data updates

The integration polls the gateway every 30 seconds. One poll makes five Modbus reads.

The integration reads the data in three groups: the status with the alarms, the measurements, and the settings, which include the comfort temperature and the boost time remaining. If one group fails to read, only the entities from that group become unavailable. All entities become unavailable when every group fails, when the link to the gateway drops, or when the gateway loses its ventilation unit. They come back with the next poll that succeeds.

## Known limitations

- The gateway has no serial number over Modbus. The integration tells gateways apart by host and port, or by serial port and unit ID. The same gateway added once by IP address and once by hostname shows up twice.
- Two gateways behind one Modbus TCP-to-RTU converter, on different unit IDs, cannot both be added. The integration identifies a TCP gateway by host and port only.
- The manual does not say what a CO₂ zone without a sensor reports. The integration takes 0 to mean no sensor.

## Troubleshooting

### The gateway does not reach a ventilation unit

The gateway answered, but it reports a connection state other than OK:

- **30**: the unit on ComfoNet is not a ComfoAir Q or Flex.
- **40**: the unit's firmware is not compatible with the gateway. Update the unit's firmware.
- **50**: the gateway finds no unit. Check the ComfoNet cable.

### The gateway has no path to the ventilation unit

The gateway answers, but refuses every read, while Zehnder's app still reaches the unit. Saving the gateway's settings restarts the gateway, but did not help in testing. Power cycle the ventilation unit, then reload the integration.

### Failed to connect

- Check that Modbus TCP or Modbus RTU is selected on the gateway's **Protocols and services** page, and that it matches what you chose in Home Assistant.
- Check the unit ID.
- For Modbus RTU, check the baud rate, the parity, and the A and B wiring.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service_steps.md %}

After removing the integration, set the gateway's protocol back to **None** if nothing else uses Modbus.
