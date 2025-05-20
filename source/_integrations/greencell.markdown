---
title: Greencell
description: Instructions on how to use the Greencell EVSE integration in Home Assistant.
ha_category:
  - Button
  - Number
  - Sensor
  - Energy
ha_release: 2025.5.1
ha_codeowners:
  - '@BrzezowskiGC'
ha_domain: greencell
ha_integration_type: integration
---

The Greencell EVSE [HabuDen](https://greencell.global/en/555-ev-chargers#/power-22kw_8_stage_regulation) integration for Home Assistant enables:

- Monitoring of the device status
- Measurement of electrical parameters (voltage, current, power, energy)
- Basic control of the electric vehicle charging process

Communication is handled via MQTT, and the integration supports:

- Dynamic state updates and device availability detection
- Remote start and stop of charging
- Checking the current charging session and vehicle connection status

{% include integrations/config_flow.md %}

## Integration Modes

Greencell offers three levels of integration with Home Assistant to suit different user needs:

| Mode      | Description                                                                                         |
|:----------|:-----------------------------------------------------------------------------------------------------|
| **DISABLE** | Integration Disabled – the device does not connect to the MQTT broker, and all entities are disabled. |
| **READ**    | Read Only – the device sends measurement data (voltage, current, power, set_current) and ignores commands received on the relevant topic except for the `QUERY` command. Buttons and Number entities are disabled. |
| **EXECUTE** | Full Access – the device sends measurement data and responds to commands (`START`, `STOP`, `SET_CURRENT`, `QUERY`) received on the relevant topic. All supported entities are enabled. |

## Supported Entities

### Sensors

- **Charging Power** – Instantaneous charging power of the EVSE (W).
- **Current Phase L1** – Current measurement for phase L1 (A).
- **Current Phase L2** – Current measurement for phase L2 (A).
- **Current Phase L3** – Current measurement for phase L3 (A).
- **Voltage Phase L1** – Voltage measurement for phase L1 (V).
- **Voltage Phase L2** – Voltage measurement for phase L2 (V).
- **Voltage Phase L3** – Voltage measurement for phase L3 (V).
- **EVSE State** – Current state of the EVSE. Possible values:
  - `IDLE`
  - `CONNECTED`
  - `WAITING_FOR_CAR`
  - `CHARGING`
  - `FINISHED`
  - `ERROR_CAR`
  - `ERROR_EVSE`

### Buttons

- **Start Charging** – Sends a command to start charging when the vehicle is ready.
- **Stop Charging** – Sends a command to stop charging; a new charging session will not start until the Start command is sent again.

### Number

- **EVSE Max Current** – Sets the maximum current the EVSE can supply to the vehicle (A).

## Adding a New Device

To add a new device:

1. Configure the Greencell device in a mode other than **DISABLE**.
2. Add the MQTT broker to Home Assistant via the MQTT integration.
3. The device should automatically be discovered, and all available entities created.

## MQTT Description

### MQTT topic names

To support multiple devices in a single Home Assistant instance, each device publishes and subscribes on its own set of MQTT topics. The integration includes the device’s serial number (assigned during manufacturing) in each topic for easy identification. Below is the list of topics used by a given device (replace {SERIAL} with the device’s unique serial number). Additionally, when a new device wants to join the network, the integration can send a discovery message on the broadcast topic.

- `/greencell/evse/{SERIAL}/cmd`
- `/greencell/evse/{SERIAL}/voltage`
- `/greencell/evse/{SERIAL}/current`
- `/greencell/evse/{SERIAL}/power`
- `/greencell/evse/{SERIAL}/status`
- `/greencell/evse/{SERIAL}/device_state`
- `/greencell/broadcast`
- `/greencell/broadcast/device`

### Payload examples

Below is a presentation of the messages exchanged on each topic.

#### /greencell/evse/{SERIAL}/cmd

The message contains commands that the device should execute. Possible command names are `START`, `STOP`, `QUERY`, and `SET_CURRENT`. Command names are case-insensitive. The `SET_CURRENT` command also includes a `current` field specifying the new maximum output current in Amperes.

```json
{
    "name": "START"
}
```

```json
{
    "name" : "SET_CURRENT",
    "current" : 12
}
```

#### /greencell/evse/{SERIAL}/voltage

The message contains the voltages (in volts) for each phase.

```json
{
    "l1" : 230,
    "l2" : 231,
    "l3" : 229
}
```

#### /greencell/evse/{SERIAL}/current

The message contains the currents (in milliamperes) on each phase and the maximal current for each phase (in amperes).

```json
{
    "l1" : 810,
    "l2" : 10987,
    "l3" : 703,
    "i_max" : 32,
}
```

#### /greencell/evse/{SERIAL}/power

The message contains the momentary power for each phase (in watts).

```json
{
    "momentary": 11345
}
```

#### /greencell/evse/{SERIAL}/status

The message contains the current charging state of a connected electric/PHEV car. Possible states are:
`IDLE`, `CONNECTED`, `WAITING_FOR_CAR`, `CHARGING`, `FINISHED`, `ERROR_CAR`, `ERROR_EVSE`

```json
{
    "state" : "CHARGING"
}
```

#### /greencell/evse/{SERIAL}/device_state

This message contains information about the current state of Home Assistant integration access and the HEMS current set by HA on the device. It isn't sent synchronously, but can be queried by sending a `QUERY` command on the `/greencell/evse/{SERIAL}/cmd` topic. Possible states are: `READ`, `EXECUTE`, `DISABLED`. The `DISABLED` state is sent only if HA was enabled and the user subsequently disabled it during program execution.

```json
{
    "level" : "EXECUTE",
    "hems_current" : 9
}
```

#### /greencell/broadcast

This topic is used to send a `BROADCAST` command to notify all devices on the local network that a new device is being added to the integration.

```json
{
    "name" : "BROADCAST"
}
```

#### /greencell/broadcast/device

On this topic, devices send their serial numbers in response to a broadcast request.

```json
{
    "id" : "{SERIAL}"
}
```
