---
title: NeoPool
description: Instructions on how to integrate NeoPool / Sugar Valley pool controllers with Home Assistant.
ha_release: 2026.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@svasek'
ha_domain: neopool
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - light
  - number
  - select
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: platinum
ha_category:
  - Hub
---

The **NeoPool** {% term integration %} integrates pool controllers built around the **NeoPool control system** (originally developed by **Sugar Valley**, acquired by **Hayward** in 2016) with Home Assistant. It communicates entirely locally over Modbus TCP, providing real-time monitoring and control of water chemistry, filtration, lighting, heating, and auxiliary relays without any cloud dependency.

The same control system is sold under many brand names worldwide, including **Hidrolife**, **Aquascenic**, **Oxilife**, **Bionet**, **Hidroniser**, **UVScenic**, **Station**, and **Aquarite**, distributed by **Hayward**, **Brilix** (Albixon), **Bayrol**, **Certikin**, **Poolstar**, **GrupAquadirect**, **Pentair**, **ProducPool**, **Pool Technologie**, **Kripsol**, and others.

{% note %}
_VistaPool_ is the name of Hayward's mobile/web app for cloud-based pool management. This integration works **entirely locally** via Modbus and does not require or use the VistaPool app or any cloud service.
{% endnote %}

## Use cases

The NeoPool integration brings your pool controller into Home Assistant, providing comprehensive data and control capabilities:

- **Monitor water chemistry in real time**: track pH, Redox/ORP, free chlorine, salt, conductivity, water temperature, hydrolysis intensity and voltage from your dashboard.
- **Automate filtration schedules**: switch between Manual, Auto, Heating, Smart, and Intelligent modes; configure timers; or drive filtration purely from Home Assistant.
- **Track pool energy consumption**: when the filtration pump wattage is configured, the integration exposes instantaneous power and a cumulative energy sensor that can be added to the [Home Assistant Energy dashboard](/docs/energy/).
- **Get notified of pool problems**: receive alerts when low-flow, sensor faults, or alarm conditions are detected.
- **Run seasonal automations**: enable winter mode automatically on a date, or pause polling entirely during the off-season while keeping all entities registered.
- **Control auxiliary relays**: manage pool lighting, heating, UV lamp, and up to four AUX relays with per-relay timer/period/mode entities.

## Supported devices

The integration supports any pool controller built on the NeoPool / Sugar Valley platform that exposes the standard Modbus register set, including:

- **Hayward**: Aquarite (with NeoPool option), Hidroniser, UVScenic, Station
- **Sugar Valley**: Hidrolife, Aquascenic, Oxilife, Bionet
- **Brilix** (Albixon), **Bayrol**, **Certikin**, **Poolstar**, **GrupAquadirect**, **Pentair**, **ProducPool**, **Pool Technologie**, **Kripsol**, and other regional rebrands of the same control system

The Modbus protocol implemented here follows the official _NeoPool Control System MODBUS Register description_ documentation by Sugar Valley.

## Prerequisites

Before setting up the NeoPool integration, make sure:

- Your NeoPool controller is connected to a **Modbus TCP gateway** (any RS-485 to TCP converter, such as the USR-DR164) on your home network.
- The gateway is configured for **19200 baud, 1 stop bit, no parity, Modbus RTU**.
- You know the **hostname or IP address** and **TCP port** of the gateway.
- The RS-485 wiring is connected to the controller's `WIFI` or `EXTERNAL` port (do **not** use `DISPLAY` unless the internal LCD is disconnected). The pinout (top to bottom) is:

  ```text
       ___
    1 |*  |– +12V (from internal power supply)
    2 |*  |– NC (not connected)
    3 |*  |– Modbus A+
    4 |*  |– Modbus B-
    5 |*__|– GND
  ```

  The connector is a standard 2.54 mm 5-pin PCB female header.

{% note %}
The NeoPool device acts as a Modbus _server_ (slave), this integration is a Modbus _client_ (master). Only one Modbus client can be connected to a given Modbus connector at a time.
{% endnote %}

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Host:
  description: The hostname or IP address of your Modbus TCP gateway.
Port:
  description: The TCP port of your Modbus gateway. Defaults to `502`.
Slave ID:
  description: The Modbus slave (unit) ID of the NeoPool controller. Defaults to `1`.
Modbus framer:
  description: Protocol framer to use. `tcp` works for most gateways; pick `rtu` only if your gateway forwards raw RTU frames over TCP.
Filtration pump power:
  description: Rated wattage of the filtration pump. When non-zero, the integration creates instantaneous power and cumulative energy sensors usable in the [Energy dashboard](/docs/energy/). Set to `0` to disable.
Enable filtration timers 1/2/3:
  description: Create timer entities for the controller's three filtration schedules. Enable only the timers you actually use.
Enable Pool Cover Sensor:
  description: Create a binary sensor exposing the pool cover open/closed state.
Enable Light Relay:
  description: Create entities to control and monitor the pool light relay.
{% endconfiguration_basic %}

The above configuration can also be adjusted later via {% my integrations title="**Settings** > **Devices & services**" %}, click {% icon "mdi:dots-vertical" %} and select **Reconfigure**.

## Supported functionality

This integration provides device-class-aware entities for every feature exposed by the controller. Capability detection automatically hides entities for hardware modules that are not present (for example, hydrolysis-related entities are not registered if the hydrolysis module is absent).

### Sensors

- **Water temperature**: current pool water temperature in °C / °F.
- **pH**: measured pH value.
- **Redox / ORP**: measured oxidation-reduction potential in mV.
- **Free chlorine**: measured chlorine concentration (if chlorine module is present).
- **Salt**: salt concentration in g/L (if hydrolysis module is present).
- **Conductivity**: measured water conductivity (if conductivity module is present).
- **Hydrolysis intensity**: current production level in % (if hydrolysis module is present).
- **Hydrolysis voltage**: current cell voltage (diagnostic, disabled by default).
- **Ionization**: current ionization level (if ionization module is present).
- **Filtration speed**: current variable-speed filtration percentage (if supported).
- **Backwash remaining**: time remaining in the active backwash cycle (if Besgo automatic filter valve is configured).
- **Filtration pump power**: instantaneous power draw in W (only when pump wattage is configured in the integration's options).
- **Filtration pump energy**: cumulative energy consumption in Wh / kWh, suitable for the [Energy dashboard](/docs/energy/).
- **Device time**: the controller's internal clock.
- **Hydrolysis cell runtime**: five counters that track wear on the electrolytic cell (if the hydrolysis module is present). The "since reset" counter is enabled by default; the cumulative total, the per-polarity runtime (polarity 1 / polarity 2), and the polarity-change count are diagnostic and disabled by default.

### Binary sensors

Around 50 binary sensors covering:

- **Relay states**: Filtration, Light, AUX1–AUX4, pH acid pump.
- **Module detection**: pH, Redox, Chlorine, Conductivity, Hydrolysis, Ionization modules present.
- **Regulation status**: pH, Redox, Chlorine, Conductivity, Hydrolysis regulation active.
- **Problem indicators**: low flow, pH/Redox sensor faults, time-sync drift, alarm conditions.
- **Heating**: heating relay active (if heating relay assigned).
- **UV lamp**: UV lamp active (if UV relay assigned).
- **Pool cover**: cover open/closed (if cover sensor enabled).

### Numbers

- **pH setpoint**, **Redox setpoint**, **Chlorine setpoint**, **Temperature setpoint**.
- **Hydrolysis production setpoint** (if hydrolysis module is present).
- **Hydrolysis cover reduction %** (if hydrolysis module + cover sensor enabled).
- **Hydrolysis shutdown temperature threshold** (if hydrolysis module + temperature sensor + cover sensor enabled).

### Switches

- **Manual filtration**: start/stop filtration manually.
- **Light** and **AUX1–AUX4** relay switches (can be enabled in options).
- **Automatic time sync**: keep the controller clock in sync with Home Assistant (disabled by default).
- **Winter mode**: suspends Modbus communication while keeping all entities registered.
- **Climate mode** (if heating relay + temperature sensor present).
- **Smart antifreeze** (if temperature sensor present).
- **UV mode** (if UV relay assigned).
- **Hydrolysis cover reduction enable** (if hydrolysis module + cover sensor enabled).
- **Hydrolysis temperature shutdown enable** (if hydrolysis module + temperature sensor + cover sensor enabled).

### Selects

- **Filtration mode**: Manual, Auto, Heating, Smart, Intelligent, Backwash (Backwash auto-enabled if Besgo valve configured).
- **Filtration timers**: three independent automatic timers per day.
- **Filtration speed** (if variable-speed pump is supported).
- **Boost control**: Inactive, Normal, Hydro (if hydrolysis / electrolysis module present).
- **pH pump activation delay**.
- **Intelligent mode minimum filtration time** (if heating + temperature sensor present).
- **Backwash repeat interval** and **Backwash valve mode** (if Besgo valve configured).
- Per-relay **timer / period / mode** controls for AUX and Light relays.

### Buttons

- **Manual time sync**: push Home Assistant's time to the controller.
- **Reset alarm/error**: clear latched controller alarm states.
- **Start backwash**: manually start a backwash cycle (only if Besgo automatic filter valve is configured).
- **Reset cell runtime counter**: reset the hydrolysis cell user counters (if the hydrolysis module is present, disabled by default). The controller resets all user counters (cell partial, ION, and UV) together in one atomic operation; there is no per-counter button.

### Light

- **Pool light** with on/off control (and brightness/effect when supported by the relay configuration).

## Data updates

The integration polls the controller over Modbus TCP at a fixed interval. Reads are batched into a small number of register requests to minimize bus load and the round-trip time per refresh.

If a poll cycle fails (for example because the Modbus gateway becomes unreachable), the integration applies an **adaptive backoff** that grows up to three minutes between attempts, then drops back to the normal interval once the controller is reachable again. While in backoff, all entities transition to `unavailable` so automations can react to the loss of communication.

The **winter mode** switch fully suspends polling for the off-season; the entities remain registered (so dashboards keep their layout), but no Modbus traffic is generated until winter mode is turned off again.

## Actions

{% include integrations/actions.md %}

## Examples

The real power of this integration comes from automating filtration, seasonal modes, and direct register writes from Home Assistant. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Schedule manual filtration

Run filtration once a day from 10:00 to 15:00, but only when the controller is in **Manual** mode. In automatic modes the controller runs filtration on its own schedule and the manual switch is unavailable, so the filtration mode condition prevents the automation from firing for nothing. Two time triggers share an automation, distinguished by trigger ID, and an outer `choose:` block keeps each branch idempotent (it only acts when the switch is in the opposite state).

- **Triggers**: time-based, `10:00:00` (turn on) and `15:00:00` (turn off).
- **Condition**: filtration mode is `manual`.
- **Action**: turn the manual filtration switch on or off as appropriate.

{% details "YAML example for scheduling manual filtration" %}

{% example %}
automation: |
  alias: "Pool: scheduled filtration"
  triggers:
    - trigger: time
      at: "10:00:00"
      id: turn_on
    - trigger: time
      at: "15:00:00"
      id: turn_off
  conditions:
    - condition: state
      entity_id: select.pool_filt_mode
      state: manual
  actions:
    - choose:
        - conditions:
            - condition: trigger
              id: turn_on
            - condition: state
              entity_id: switch.pool_filt_manual_state
              state: "off"
          sequence:
            - action: switch.turn_on
              target:
                entity_id: switch.pool_filt_manual_state
        - conditions:
            - condition: trigger
              id: turn_off
            - condition: state
              entity_id: switch.pool_filt_manual_state
              state: "on"
          sequence:
            - action: switch.turn_off
              target:
                entity_id: switch.pool_filt_manual_state
{% endexample %}

{% enddetails %}

### Auto-enable winter mode based on the season

Turn winter mode on at the start of November and back off at the start of April so the controller stops polling the network and the pool hardware while it is off-season. Two automations sharing a single midnight trigger; each fires only on its target date.

- **Trigger**: time-based, daily at `00:00:00`.
- **Condition**: today is the configured switch-over date (`November 1st` to enable, `April 1st` to disable).
- **Action**: turn the winter mode switch on or off.

{% details "YAML example for seasonal winter mode" %}

{% example %}
automation: |
  alias: "Pool: enter winter mode"
  triggers:
    - trigger: time
      at: "00:00:00"
  conditions:
    - condition: template
      value_template: "{{ now().month == 11 and now().day == 1 }}"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.pool_winter_mode
automation: |
  alias: "Pool: exit winter mode"
  triggers:
    - trigger: time
      at: "00:00:00"
  conditions:
    - condition: template
      value_template: "{{ now().month == 4 and now().day == 1 }}"
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.pool_winter_mode
{% endexample %}

{% enddetails %}

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
2. Confirm the gateway is configured for **19200 baud, 1 stop bit, no parity** (Modbus RTU).
3. Check the RS-485 wiring (A+ / B− / GND) and that the connector is plugged into `WIFI` or `EXTERNAL`, not `DISPLAY` (when the LCD is connected).
4. Make sure the slave ID matches the controller's configured Modbus address (default `1`).

### All entities went unavailable suddenly

#### Symptom: every NeoPool entity is `unavailable` at the same time

All entities provided by the integration become `unavailable` simultaneously, often after a network change or gateway restart.

#### Description

The integration has lost contact with the Modbus gateway. It applies an adaptive backoff up to three minutes; once the gateway is reachable again, entities recover automatically.

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

### Backwash button does not appear

#### Symptom: the **Start backwash** button is missing from the device

The integration is set up successfully but the Backwash entities (button, repeat interval, valve mode) are not registered.

#### Description

The Backwash entities are only created when a Besgo automatic filter valve is configured on the controller. The integration probes the relevant register set during setup and skips the entities if the valve is not detected.

#### Resolution

1. Confirm the Besgo valve is wired and configured via the controller's native interface.
2. Reload the integration (or restart Home Assistant) so the capability probe runs again.
3. If the valve is installed but still not detected, double-check the controller's relay assignment for the valve.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
