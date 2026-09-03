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
  - binary_sensor
  - button
  - diagnostics
  - select
  - sensor
  - switch
ha_config_flow: true
ha_integration_type: device
ha_quality_scale: silver
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
  description: "The Modbus TCP port to connect to. The default is `502`."
Modbus unit ID:
  description: "The inverter's Modbus unit ID, also called its Modbus device address. The default is `1`."
{% endconfiguration_basic %}

During setup, the integration also detects whether the inverter has EPS (Emergency Power Supply) wiring for an off-grid backup output, and polls its registers only if it does.

## Reconfiguration

If the inverter becomes reachable somewhere else on the network, for example after a DHCP lease change or when you replace the Modbus TCP bridge it's connected through, you can update the connection settings without removing and re-adding the integration:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and find the **Sofar** integration.
2. Select the three-dot menu {% icon "mdi:dots-vertical" %} and choose **Reconfigure**.
3. Update the **Host**, **Port**, or **Modbus unit ID** as needed.
4. Select **Submit** to save the new settings.

The integration reads the serial number again and only accepts the new settings if they lead to the same inverter, so reconfiguring can't accidentally point an entry at a different device and take its history with it.

## Supported functionality

The **Sofar** integration provides the following entities.

### Binary sensors

- **Faults**: One diagnostic binary sensor per fault category, such as grid, battery, thermal, or communication. Each one turns on if any underlying fault bits in that category are currently active. Faults are grouped by category rather than by vendor register, since a single register can hold faults from more than one category at once. Combiner box, string fuse, input fuse, and AFCI (Arc-Fault Circuit Interrupter) faults are disabled by default, since PV and hybrid inverters don't have that hardware. The integration's diagnostics download includes the complete, decoded list of every currently active fault.

### Buttons

- **RTC sync**: Writes the current date and time to the inverter's clock.
- **IV curve scan**: Starts a scan of the PV strings' I-V curves. Only shown for inverters with battery storage.

### Select

- **Charger use mode**: The battery charger's operating mode, such as self use, time of use, or feed-in priority. Only shown for inverters with battery storage.
- **EPS mode**: Turns the EPS/backup output off and on, and whether it's allowed to cold-start from battery power alone. Only shown for inverters wired for EPS/backup power.

### Sensors

The **Sofar** integration reads a large number of sensors from the inverter. Only the sensors relevant to your inverter's type and configuration are added.

- **System status**: The inverter's operating state, including fault conditions.
- **Temperatures**: Inverter, heatsink, and module temperatures.
- **Device information**: The status of the last real-time clock sync.
- **Grid and output measurements**: Frequency, and active, reactive, and apparent power, both at the inverter's output and at the point of common coupling (PCC). Total household load and external solar production, as reported by the inverter, are also included. Per-phase voltage, current, power, and power factor are available for inverters with multiple phases.
- **Off-grid (EPS/backup) measurements**: The same kind of readings for the EPS/backup output. Only shown for inverters wired for EPS/backup power.
- **PV strings**: Power for each solar panel string, plus voltage and current if you need more detail. Each string the inverter supports gets its own device, connected via the inverter. Only shown for PV-capable inverters.
- **Battery**: Voltage, current, power, temperature, state of charge, state of health, and charge cycles for each battery pack, plus combined power, state of charge, and state of health totals. Each pack gets its own device, connected via the inverter, and only packs that respond are added. A pack added later appears on its own, without reloading the integration. Only shown for inverters with battery storage.
- **Battery configuration**: The battery parameters configured on the inverter, such as capacity, protocol, cell type, and voltage and current limits. Only shown for inverters with battery storage.
- **Energy totals**: Import, export, load consumption, solar generation, and battery charge/discharge energy, both for today and all-time.

The overall totals and the readings most people need are enabled by default. Per-phase detail, daily energy counters, and the battery configuration are disabled. To use one of them, enable it from the entity's settings.

### Switch

The integration adds one switch, named after the inverter itself, that stops and resumes its operation remotely. Turning it off puts the inverter into its waiting state rather than cutting power to it.

## Data updates

The **Sofar** {% term integration %} {% term polling polls %} the inverter's live readings every 5 seconds. Values that rarely change, such as the device information and the battery configuration, are polled every 60 seconds instead, so each poll stays short.

## Known limitations

- This is an early release of the integration, added to Home Assistant one platform at a time. Number entities are planned for a future release.
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
