---
title: Sofar
description: Instructions on how to integrate a Sofar solar inverter with Home Assistant over Modbus TCP.
ha_category:
  - Energy
ha_release: 2026.9
ha_iot_class: Local Polling
ha_codeowners:
  - '@darkrain-nl'
ha_domain: sofar
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: device
ha_quality_scale: bronze
---

The **Sofar** {% term integration %} connects Home Assistant to a Sofar Solar inverter over Modbus TCP, either directly to an inverter with a network port, or through a Modbus TCP bridge for inverters that only expose RS485.

## Supported devices

During setup, the integration reads the inverter's serial number and uses it to automatically detect the inverter model and its register map. It currently recognizes newer-generation Sofar inverters, including:

- PV-only (grid-tied) inverters.
- Hybrid inverters with battery storage.

If the inverter answers but its serial number isn't recognized, setup fails and you'll need to wait for support for your model to be added.

## Prerequisites

- The inverter needs to be reachable over the network from Home Assistant, either because it has its own Modbus TCP port, or because it's connected through a Modbus TCP bridge (for example, a serial-to-network adapter wired to its RS485 port).
- Modbus needs to be enabled on the inverter, if it has a setting for this.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the inverter, or of the Modbus TCP bridge it's connected through."
Port:
  description: "The Modbus TCP port to connect on. The default is `502`."
Modbus unit ID:
  description: "The inverter's Modbus unit ID, also called its Modbus device address. The default is `1`."
{% endconfiguration_basic %}

During setup, the integration also detects whether the inverter has EPS (Emergency Power Supply) wiring for an off-grid backup output, and polls its registers only if it does.

## Supported functionality

The **Sofar** integration provides the following entities.

### Sensors

The **Sofar** integration reads a large number of sensors from the inverter. Only the sensors relevant to your inverter's type and configuration are added.

- **System status**: The inverter's operating state, including fault conditions.
- **Temperatures**: Inverter, heatsink, and module temperatures.
- **Device information**: Serial number, hardware and software versions, and the status of the last real-time clock sync.
- **Grid and output measurements**: Frequency, and active, reactive, and apparent power, both at the inverter's output and at the point of common coupling (PCC). Total household load and external solar production, as reported by the inverter, are also included. Per-phase voltage, current, power, and power factor are available for inverters with multiple phases.
- **Off-grid (EPS/backup) measurements**: The same kind of readings for the EPS/backup output. Only shown for inverters wired for EPS/backup power.
- **PV strings**: Power for each connected solar panel string, plus voltage and current if you need the detail. Only shown for PV-capable inverters.
- **Battery**: Voltage, current, power, temperature, state of charge, state of health, and charge cycles for each connected battery pack, plus combined power, state of charge, and state of health totals. Only shown for inverters with battery storage.
- **Battery configuration**: The battery parameters configured on the inverter, such as capacity, protocol, cell type, and voltage and current limits. Only shown for inverters with battery storage.
- **Energy totals**: Import, export, load consumption, solar generation, and battery charge/discharge energy, both for today and all-time.

The overall totals and the readings most people need are enabled by default. Per-phase detail, additional battery packs beyond the first, daily energy counters, and the battery configuration are disabled. To use one of them, enable it from the entity's settings.

## Data updates

The **Sofar** {% term integration %} {% term polling polls %} the inverter's live readings every 5 seconds. Values that rarely change, such as the device information and the battery configuration, are polled every 60 seconds instead, so each poll stays short.

## Known limitations

- This is an early release of the integration, added to Home Assistant one platform at a time. Only sensors are available so far; controls such as number and select entities are planned for future releases.
- Only Modbus TCP connections are supported. Direct serial (RTU) connections aren't supported yet.
- Only newer-generation Sofar inverters are recognized. Older, legacy models aren't supported yet.

## Troubleshooting

### Cannot connect to the inverter

1. Make sure the inverter (or the Modbus TCP bridge it's connected through) is powered on and reachable on the network.
2. Confirm the host and port are correct, and that nothing else is holding open the same Modbus connection.
3. Check that Modbus is enabled on the inverter, if it has a setting for this.

### Inverter isn't recognized

The integration only recognizes inverter models it knows the register map for. If setup fails with an unrecognized inverter error, your model isn't supported yet.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
