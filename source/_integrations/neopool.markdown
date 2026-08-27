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
  - button
  - light
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: silver
ha_category:
  - Hub
---

The **NeoPool** {% term integration %} integrates pool controllers built around the **NeoPool control system** (originally developed by **Sugar Valley**, acquired by **Hayward** in 2016) with Home Assistant. It communicates entirely locally over Modbus TCP, providing real-time monitoring of water chemistry, filtration, and hydrolysis without any cloud dependency.

The same control system is sold under many brand names worldwide, including **Hidrolife**, **Aquascenic**, **Oxilife**, **Bionet**, **Hidroniser**, **UVScenic**, **Station**, and **Aquarite**, distributed by **Hayward**, **Brilix** (Albixon), **Bayrol**, **Certikin**, **Poolstar**, **GrupAquadirect**, **Pentair**, **ProducPool**, **Pool Technologie**, **Kripsol**, and others.

{% note %}
_VistaPool_ is the name of Hayward's mobile/web app for cloud-based pool management. The **NeoPool** integration works entirely locally via Modbus and does not require or use the VistaPool app or any cloud service. If you prefer to use the cloud API instead, see the [Vistapool integration](/integrations/vistapool/).
{% endnote %}

## Use cases

The NeoPool integration brings your pool controller into Home Assistant, providing comprehensive data and control capabilities. Which entities appear depends on which modules and options the controller reports; unavailable ones are hidden automatically.

- **Monitor water chemistry**: track pH, Redox/ORP, free chlorine, conductivity, and water temperature.
- **Monitor hydrolysis/electrolysis**: read current production intensity, cell voltage, polarity state, and cell wear counters.
- **Monitor ionization**: read the current ionization level and polarity.
- **Monitor filtration**: read the current mode, variable-speed percentage, and Intelligent-mode scheduling data.
- **Track backwash cycles**: read the remaining time when a Besgo automatic filter valve is running a cycle.
- **Surface pool-controller problems**: expose alarm states as sensor readings, and raise a repair issue if the controller's GPIO configuration register becomes corrupted.
- **Control the pool light**: turn the pool light relay on and off when the relay timer is in a manual mode. Opt-in through the integration options.
- **Control filtration and relays**: run the filtration pump manually, start and stop backwash, drive the auxiliary relays, and toggle the controller's configuration flags.

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

{% include integrations/option_flow.md %}

{% configuration_basic %}
Enable pool light relay:
  description: Turn on if your pool controller has a pool light wired to the lighting relay. When enabled, a **Pool light** entity is added so you can switch the light from Home Assistant. Off by default because the controller cannot detect whether a physical light is wired to the relay.
Enable auxiliary relays 1 to 4:
  description: Turn on for each auxiliary relay you have wired to a device. When enabled, an **Auxiliary relay** switch is added for that relay. Off by default because the controller cannot detect what, if anything, is wired to each auxiliary relay.
Enable cover sensor:
  description: Turn on if a pool cover sensor is wired to the controller. When enabled, the **Enable cover reduction** switch is added so you can toggle the cover-driven hydrolysis reduction. Off by default because the controller cannot detect whether a cover sensor is present.
{% endconfiguration_basic %}

## Supported functionality

The integration exposes the controller's runtime state as sensor entities, plus an optional light entity for the pool light relay, switch entities for filtration, backwash, the auxiliary relays, and the controller's configuration flags, and button entities for device maintenance actions.

{% note %}
Only entities backed by a detected hardware module or an enabled controller option are registered. The rest stay hidden until the module or option becomes available. Each bullet below lists the specific requirement for that entity.
{% endnote %}

### Buttons

- **Synchronize device time**: Writes Home Assistant's current time to the controller's clock.
- **Clear error messages**: Clears the controller's active error and alarm messages.
- **Reset cell runtime counter**: Resets the partial cell-runtime counter used to track electrolytic cell wear. Added when the hydrolysis module is present. This button is a configuration entity and is disabled by default, because it clears a wear counter you may want to keep.

### Light

- **Pool light**: switches the pool light relay on and off. Added when the pool light relay is enabled in the integration options, and the controller has a lighting relay configured. The entity state reflects the relay's actual state, regardless of whether the relay is in automatic or manual mode. Turning the light on or off is only possible when the light timer is set to manual mode. If the timer is in automatic mode, Home Assistant shows an error and does not change the relay, so it does not override the schedule. Change the timer mode to manual on the controller itself to control the light directly.

### Switches

- **Filtration**: Runs the filtration pump on or off. The entity state reflects the actual pump state, regardless of whether filtration is in automatic or manual mode. Turning it on or off is only possible while the controller is in manual filtration mode. If it is in another mode, or a hydrolysis boost is active, Home Assistant shows an error and does not change the pump, so it does not override the controller.
- **Backwash**: Starts a backwash cycle for the configured duration, or stops a running one. The entity state reflects the remaining cycle time. Added when a Besgo automatic filter valve is configured. Backwash cannot be started while the filter valve is in an automatic mode.
- **Auxiliary relays 1 to 4**: Switches an auxiliary relay on and off. Added for each auxiliary relay enabled in the integration options. Like the pool light, an auxiliary relay can only be switched while its timer is in a manual mode.
- **Configuration flags**: Toggles controller settings such as the climate mode for heating, UV mode, smart antifreeze, and hydrolysis shutdown on high temperature. Each flag is added when the controller reports the corresponding module.
- **Enable cover reduction**: Toggles the cover-driven hydrolysis reduction. Added when the cover sensor is enabled in the integration options and the controller has a hydrolysis module.

### Sensors

- **Water temperature**: current pool water temperature (when the temperature sensor is present).
- **pH**: measured pH level (when the pH module is present).
- **Redox / ORP**: measured oxidation-reduction potential in mV (when the Redox module is present).
- **Free chlorine**: measured chlorine concentration (when the chlorine module is present).
- **Conductivity**: measured water conductivity (when the conductivity module is present).
- **pH pump status**: current state of the pH dosing pump (off, idle, acid pump, base pump, both pumps) (when the pH module is present).
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
- **Cell runtime counters**: five diagnostic counters tracking wear on the electrolytic cell (when the hydrolysis module is present), total runtime, runtime since last reset, runtime in polarity 1 and 2, and polarity-change count. All five are diagnostic and disabled by default; enable them in the entity registry if you want to track cell wear over time.

## Data updates

The integration {% term polling polls %} the controller over Modbus TCP at a fixed interval. To stay responsive, the integration reads data from the controller in as few requests as possible per update cycle.

If a poll cycle fails (for example, because the Modbus gateway becomes unreachable), all entities transition to `unavailable` until the next successful poll.

## Diagnostics

This integration provides diagnostic information to help with troubleshooting. To download the diagnostics data:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the NeoPool integration.
3. Open the three-dot {% icon "mdi:dots-vertical" %} menu and select **Download diagnostics**.

The downloaded file includes the config entry, the latest data read from the controller, and connection statistics. Sensitive values such as the host, port, and the controller's serial number are redacted and appear as `**REDACTED**`.

## Known limitations

- Discovery is not supported. Modbus TCP gateways do not expose a standard discovery protocol that uniquely identifies a NeoPool controller behind the gateway, so the integration must be configured manually.
- One controller per config entry. Multiple physical controllers are supported, but each one needs its own config entry.
- Authentication is not used. Modbus TCP itself has no authentication mechanism; the integration relies on network isolation between Home Assistant and the gateway. The gateway should not be exposed to untrusted networks.
- The DISPLAY connector is reserved. The NeoPool controller exposes the same protocol on its `DISPLAY` connector as on `WIFI` / `EXTERNAL`, but the built-in LCD usually occupies it. Connecting to `DISPLAY` while the LCD is attached will result in collisions.
- Variable-speed pump support depends on the controller firmware. The Filtration speed entity is registered only when the controller reports a variable-speed pump.
- The pool light entity is opt-in. The controller does not report whether a physical light is wired to its lighting relay, so the entity is only registered after you enable it in the integration options.
- The pool light cannot be controlled while its timer is in an automatic mode. Set the light timer to a manual mode first to turn the light on or off from Home Assistant.
- The auxiliary relay and cover reduction switches are opt-in. The controller does not report what is wired to each auxiliary relay or whether a cover sensor is present, so these switches are only registered after you enable them in the integration options.
- Filtration and auxiliary relays can only be switched in a manual mode. Set the controller or the relay timer to a manual mode first. When it is in an automatic mode, Home Assistant shows an error rather than overriding the schedule.

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
