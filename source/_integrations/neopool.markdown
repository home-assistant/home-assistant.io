---
title: NeoPool
description: Instructions on how to integrate NeoPool / Sugar Valley pool controllers with Home Assistant.
ha_release: 2026.8
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - "@svasek"
ha_domain: neopool
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: silver
ha_category:
  - Hub
---

The **NeoPool** {% term integration %} integrates pool controllers built around the **NeoPool control system** (originally developed by **Sugar Valley**, acquired by **Hayward** in 2016) with Home Assistant. It communicates entirely locally over Modbus TCP, providing real-time monitoring of water chemistry, filtration, and hydrolysis without any cloud dependency.

The same control system is sold under many brand names worldwide, including **Hidrolife**, **Aquascenic**, **Oxilife**, **Bionet**, **Hidroniser**, **UVScenic**, **Station**, and **Aquarite**, distributed by **Hayward**, **Brilix** (Albixon), **Bayrol**, **Certikin**, **Poolstar**, **GrupAquadirect**, **Pentair**, **ProducPool**, **Pool Technologie**, **Kripsol**, and others.

{% note %}
_VistaPool_ is the name of Hayward's mobile/web app for cloud-based pool management. The **NeoPool** integration works entirely locally via Modbus and does not require or use the VistaPool app or any cloud service.
{% endnote %}

## Use cases

The NeoPool integration brings your pool controller into Home Assistant, providing comprehensive data and control capabilities. Which entities appear depends on which modules and options the controller reports; unavailable ones are hidden automatically.

- **Monitor water chemistry**: track pH, Redox/ORP, free chlorine, conductivity, and water temperature.
- **Monitor hydrolysis/electrolysis**: read current production intensity, cell voltage, polarity state, and cell wear counters.
- **Monitor ionization**: read the current ionization level and polarity.
- **Monitor filtration**: read the current mode, variable-speed percentage, and Intelligent-mode scheduling data.
- **Track backwash cycles**: read the remaining time when a Besgo automatic filter valve is running a cycle.
- **Surface pool-controller problems**: expose alarm states as sensor readings, and raise a repair issue if the controller's GPIO configuration register becomes corrupted.

## Supported devices

The integration supports any pool controller built on the NeoPool / Sugar Valley platform that exposes the standard Modbus register set, including:

- **Hayward**: Aquarite (with NeoPool option), Hidroniser, UVScenic, Station
- **Sugar Valley**: Hidrolife, Aquascenic, Oxilife, Bionet
- **Brilix** (Albixon), **Bayrol**, **Certikin**, **Poolstar**, **GrupAquadirect**, **Pentair**, **ProducPool**, **Pool Technologie**, **Kripsol**, and other regional rebrands of the same control system

The Modbus protocol implemented here follows the official _NeoPool Control System MODBUS Register description_ documentation by Sugar Valley.

## Prerequisites

Before setting up the NeoPool integration, make sure:

- Your NeoPool controller is connected to a Modbus TCP gateway (any RS-485 to TCP converter, such as the USR-DR164) on your home network.
- The gateway is configured for 19200 baud, 1 stop bit, no parity, Modbus RTU.
- You know the hostname or IP address and TCP port of the gateway.
- The RS-485 wiring is connected to the controller's `WIFI` or `EXTERNAL` port (do **not** use `DISPLAY` unless the internal LCD is disconnected). The pinout (top to bottom) is:

  ```text
  .  ___
  1 |*  |– +12V (from internal power supply)
  2 |*  |– NC (not connected)
  3 |*  |– Modbus A+
  4 |*  |– Modbus B-
  5 |*__|– GND
  ```

  The connector is a standard 2.54 mm 5-pin PCB female header.

{% note %}
The NeoPool device acts as a Modbus _server_. This integration is a Modbus _client_. Only one Modbus client can be connected to a given Modbus connector at a time.
{% endnote %}

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Host:
  description: The hostname or IP address of your Modbus TCP gateway, for example `192.168.1.50` or `pool-gateway.local`.
Port:
  description: The TCP port of your Modbus gateway. Defaults to `502`.
Unit ID:
  description: The Modbus unit (server) ID of the NeoPool controller. Defaults to `1`.
Modbus framer:
  description: Protocol framer to use. `tcp` works for most gateways. Pick `rtu` only if your gateway forwards raw RTU frames over TCP.
{% endconfiguration_basic %}

## Supported functionality

The integration exposes the controller's runtime state as sensor entities. **Only entities backed by a detected hardware module or an enabled controller option are registered**; the rest stay hidden until the module or option becomes available. Each bullet below lists the specific requirement for that sensor.

### Sensors

- **Water temperature**: current pool water temperature (when the temperature sensor is present).
- **pH**: measured pH level (when the pH module is present).
- **Redox / ORP**: measured oxidation-reduction potential in mV (when the Redox module is present).
- **Free chlorine**: measured chlorine concentration (when the chlorine module is present).
- **Conductivity**: measured water conductivity (when the conductivity module is present).
- **pH pump status**: current state of the pH dosing pump (off, idle, dosing acid, dosing base) (when the pH module is present).
- **pH alarm**: latched pH-regulation alarm state (when the pH module is present).
- **Hydrolysis intensity**: current production level in % (when the hydrolysis module is present).
- **Hydrolysis voltage**: current cell voltage (when the hydrolysis module is present; diagnostic, disabled by default).
- **Hydrolysis polarity**: current polarity of the electrolytic cell (when the hydrolysis module is present).
- **Ionization intensity**: current ionization level (when the ionization module is present).
- **Ionization polarity**: current polarity of the ionization electrodes (when the ionization module is present).
- **Filtration mode**: current mode reported by the controller (Manual, Auto, Heating, Smart, Intelligent, Backwash).
- **Filtration speed**: current variable-speed filtration percentage (when the controller reports a variable-speed pump).
- **Intelligent-mode intervals** and **time to next interval**: scheduling data for Intelligent mode (when a heating relay and temperature sensor are configured).
- **Backwash remaining**: time remaining in the active backwash cycle (when a Besgo automatic filter valve is configured).
- **Cell runtime counters**: five diagnostic counters tracking wear on the electrolytic cell (when the hydrolysis module is present), total runtime, runtime since last reset, runtime in polarity 1 and 2, and polarity-change count. The "since reset" counter is enabled by default; the others are diagnostic and disabled by default.

## Data updates

The integration {% term polling polls %} the controller over Modbus TCP at a fixed interval. To stay responsive, the integration reads data from the controller in as few requests as possible per update cycle.

If a poll cycle fails (for example, because the Modbus gateway becomes unreachable), all entities transition to `unavailable` until the next successful poll.

## Known limitations

- **Discovery is not supported.** Modbus TCP gateways do not expose a standard discovery protocol that uniquely identifies a NeoPool controller behind the gateway, so the integration must be configured manually.
- **One controller per config entry.** Multiple physical controllers are supported, but each one needs its own config entry.
- **Authentication is not used.** Modbus TCP itself has no authentication mechanism; the integration relies on network isolation between Home Assistant and the gateway. The gateway should not be exposed to untrusted networks.
- **The DISPLAY connector is reserved.** The NeoPool controller exposes the same protocol on its `DISPLAY` connector as on `WIFI` / `EXTERNAL`, but the built-in LCD usually occupies it. Connecting to `DISPLAY` while the LCD is attached will result in collisions.
- **Variable-speed pump support depends on the controller firmware.** The Filtration speed entity is registered only when the controller reports a variable-speed pump.

## Troubleshooting

### Cannot connect during setup

#### Symptom: "Cannot connect" during the initial config flow

When trying to set up the integration, the form shows the message **Cannot connect** or **Cannot read Modbus**.

#### Description

The integration could reach the network address but did not receive a valid Modbus reply within the timeout, or the gateway refused the TCP connection altogether.

#### Resolution

1. Verify the Modbus TCP gateway is reachable from Home Assistant by pinging the gateway IP.
2. Confirm the gateway is configured for 19200 baud, 1 stop bit, no parity (Modbus RTU).
3. Check the RS-485 wiring (A+ / B− / GND) and that the connector is plugged into `WIFI` or `EXTERNAL`, not `DISPLAY` (when the LCD is connected).
4. Make sure the unit ID matches the controller's configured Modbus address (default `1`).

### All entities went unavailable suddenly

#### Symptom: every NeoPool entity is `unavailable` at the same time

All entities provided by the integration become `unavailable` simultaneously, often after a network change or gateway restart.

#### Description

The integration has lost contact with the Modbus gateway. Entities recover automatically on the next successful poll after connectivity is restored.

#### Resolution

If entities stay unavailable for more than a few minutes:

1. Check the Home Assistant logs for `neopool` errors.
2. Power-cycle the Modbus gateway.
3. Verify nothing else on the network has taken over the same TCP connection (only one Modbus client per gateway port at a time).

### Repair issue: "Corrupted GPIO register"

#### Symptom: a repair issue is created with the message "Corrupted GPIO register"

The integration raises a [repair issue](/integrations/repairs/) shortly after setup or after a controller restart.

#### Description

The integration detected a known-bad value in the controller's GPIO configuration register. This usually points at a relay configuration that was partially written or lost across firmware updates.

#### Resolution

Follow the steps in the repair flow to acknowledge or fix the condition. The issue clears automatically once the register reads a valid value again.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
