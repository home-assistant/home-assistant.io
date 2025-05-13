---
title: Greencell
description:   Instructions on how to use Greencell in Home Assistant.
ha_category:
    - Button
    - Number
    - Sensor
    - Energy
ha_release: 2025.5.1
ha_codeowners:
    - '@mikegapinski'
ha_domain: greencell
ha_integration_type: integration
---

The integration with the Greencell EVSE [HabuDen](https://greencell.global/en/555-ev-chargers#/power-22kw_8_stage_regulation) allows monitoring of the device status, measurement of electrical parameters (voltage, current, power), and basic control of the electric vehicle charging process. Communication is handled via MQTT, and the integration supports dynamic state updates and device availability detection. Additionally, users can remotely start and stop charging, and check the current charging session and vehicle connection status.

{% include integrations/config_flow.md %}

## Device control mode

As not all Greencell users may be interested in integrating the Home Assistant system, a suitable integration access system for the operation of the device must be interested. After discussions, it was decided on 3 levels of integration:

* ***DISABLE*** - Home Assistant integration on device is not run. Device is not connected to user MQTT broker. All entities are disabled.
* ***READ*** - Home Assistant integration on device is run. Device only send measurements data (voltage, current, power, energy) and does not react on any commands received in proper topic. Buttons and number are disabled.
* ***EXECUTE*** - Home Assistant integration on device is run. Device send measurements data (voltage, current, power, energy) and react on commands (start, stop, pause) received in proper topic. All supported enables are enabled.

## Supported functionalities

### Entities

#### Sensor

* **Charging Power** - Momentary power of EVSE.
* **Current phase L1** - Measurement of the L1 phase current in Amperes.
* **Current phase L2** - Measurement of the L2 phase current in Amperes.
* **Current phase L3** - Measurement of the L3 phase current in Amperes.
* **Voltage phase L1** - Measurement of the L1 phase voltage in Volts.
* **Voltage phase L2** - Measurement of the L2 phase voltage in Volts.
* **Voltage phase L3** - Measurement of the L3 phase voltage in Volts.
* **EVSE State** - Current state of EVSE. Possible values are: [***IDLE***, ***CONNECTED***, ***WAITING_FOR_CAR***, ***CHARGING***, ***FINISHED***, ***ERROR_CAR***, ***ERROR_EVSE***]

### Button

* **Start Charging** - Enable charging by user. EVSE start charging if car is ready for it.
* **Stop Charging** - Disable charging by user. Car charging will be stopped if it is currently in progress. A new charging cycle will not start until the Start command is sent again.

### Number

* **EVSE Max Current** - Allows control of the maximum current that the EVSE can supply to the car.

## Adding new device

After following the standard procedure for adding a new device, the new device should automatically add itself to the network as long as it has been configured to operate in a mode other than **DISABLED**.

