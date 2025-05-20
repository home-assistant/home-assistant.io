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
| **EXECUTE** | Full Access – the device sends measurement data and responds to commands (start, stop, pause) received on the relevant topic. All supported entities are enabled. |

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
3. The device should automatically be discovered and all available entities created.
