---
title: Sofar Inverter Modbus
description: Instructions on how to integrate a Sofar solar inverter with Home Assistant over Modbus TCP.
ha_category:
  - Energy
  - Switch
ha_release: 2026.9
ha_iot_class: Local Polling
ha_codeowners:
  - '@darkrain-nl'
ha_domain: sofar_modbus
ha_platforms:
  - diagnostics
  - switch
ha_config_flow: true
ha_integration_type: device
ha_quality_scale: bronze
---

The **Sofar Inverter Modbus** {% term integration %} connects Home Assistant to a Sofar Solar inverter over Modbus TCP, either directly to an inverter with a network port, or through a Modbus TCP bridge for inverters that only expose RS485.

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
  description: "The inverter's Modbus unit/slave ID. The default is `1`."
Poll EPS / backup registers:
  description: "Also poll the EPS (backup power) register block, for inverters with EPS wiring. Off by default."
{% endconfiguration_basic %}

## Reconfiguration

If you need to update the connection settings for your inverter, you can reconfigure the integration without removing and re-adding it:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. On the **Sofar Inverter Modbus** integration, select the three-dot menu and choose **Reconfigure**.
3. Update the connection settings as needed.
4. Select **Submit** to save the new settings.

This is useful when the inverter's IP address changes, for example after a router restart or a DHCP lease renewal. Reconfiguring to point at a different physical inverter isn't supported; the integration checks the serial number and rejects the change if it doesn't match.

## Supported functionality

The **Sofar Inverter Modbus** integration provides the following entities.

### Switches

- **Active power control**: Whether a direct cap on the inverter's own power output is armed. This caps generation itself, not just how much power is exported to the grid. Only shown for inverters that support this feature.

## Data updates

The **Sofar Inverter Modbus** {% term integration %} {% term polling polls %} the inverter every 5 seconds. Some less time-sensitive data, such as settings and energy totals, is read less often in the background to reduce the number of registers read per cycle.

## Known limitations

- This is an early release of the integration, added to Home Assistant one platform at a time. Only the **Active power control** switch is available so far; sensors and additional controls are planned for future releases.
- Toggling **Active power control** currently only stages the change; it isn't written to the inverter until a companion control to commit it is added in a future release.
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
