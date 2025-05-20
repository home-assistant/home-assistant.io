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
| **READ**    | Read Only – the device sends only measurement data (voltage, current, power, set_current) and ignores any commands received on the relevant topic. Buttons and Number entities are disabled. |
| **EXECUTE** | Full Access – the device sends measurement data and responds to commands (start, stop, set max current) received on the relevant topic. All supported entities are enabled. |

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

## MQTT description

### MQTT topic names

To support multiple devices in a single Home Assistant instance, each device publishes and subscribes on its own set of MQTT topics. Integrations includes the device’s serial number (assigned during manufacturing) in each topic for easy identification. Below is the list of topics used by a given device (replace {SERIAL} with the device’s unique serial number). Additionally, when a new device wants to join the network, the integration can send a discovery message on the broadcast topic.

- /greencell/evse/{SERIAL}/cmd
- /greencell/evse/{SERIAL}/voltage
- /greencell/evse/{SERIAL}/current
- /greencell/evse/{SERIAL}/power
- /greencell/evse/{SERIAL}/status
- /greencell/evse/{SERIAL}/device_state
- /greencell/broadcast
- /greencell/broadcast/device

### Payload examples

Below is a presentation of the messages exchanged on each topic.

#### /greencell/evse/{SERIAL}/cmd

The message contains name of commands, which should be executed by device. Possible commands name are `START`, `STOP`, `QUERY` and `SET_CURRENT`. Commands name are case insensitive. Set current commands contains also field current with new maximal value of device output current in Amperes.

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

The message contains the voltages in Volts on each phase

```json
{
    "l1" : 230,
    "l2" : 231,
    "l3" : 229
}
```

#### /greencell/evse/{SERIAL}/current

The message contains the currents in MilliAmperes on each phase and maximal current for **EACH** phase in Amperes

```json
{
    "l1" : 810,
    "l2" : 10987,
    "l3" : 703,
    "i_max" : 32,
}
```

#### /greencell/evse/{SERIAL}/power

The message contains the momentary power in each phases in Watts

```json
{
    "momentary": 11345
}
```

#### /greencell/evse/{SERIAL}/status

The message contains current charging state of connected electric/PHEV car. Possible states are:
`IDLE`, `CONNECTED`, `WAITING_FOR_CAR`, `CHARGING`, `FINISHED`, `ERROR_CAR`, `ERROR_EVSE`

```json
{
    "state" : "CHARGING"
}
```

#### /greencell/evse/{SERIAL}/device_state

The message contains information about current state of Home Assistant integration access and HEMS current set by HA in device. This message isn't sent synchronously, by can be query by sending `QUERY` command on CommandTopic. Possible states are: `READ`, `EXECUTE`, `DISABLED`. Disabled state is sent only when HA was enabled and user disabled it during program run.

```json
{
    "level" : "EXECUTE",
    "hems_current" : 9
}
```

#### /greencell/broadcast

This topic is used to add a command `BROADCAST` to notify all devices on the local network that the user is trying to add a new device to their integration.

```json
{
    "name" : "BROADCAST"
}
```

#### /greencell/broadcast/device

On this topic devices send its serial number in response for broadcast request.

```json
{
    "id" : "${SERIAL_NUMBER}"
}
```
