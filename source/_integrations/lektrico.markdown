---
title: Lektrico Charging Station
description: Instructions on how to integrate a Lektrico Chargering Station with Home Assistant.
ha_category:
  - Sensor
ha_release: '2024.10'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@lektrico'
ha_domain: lektrico
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - number
  - select
  - sensor
  - switch
ha_integration_type: device
---

The **Lektrico Charging Station** integration integrates your [Lektrico Charging Station](https://lektri.co) into your Home Assistant and allows you to monitor it.

The Lektrico Charging Station device will be added as a sensor in Home Assistant.

{% include integrations/config_flow.md %}

## Binary sensors

Binary sensors available in the library:

### Chargers

| Condition         | Description                          |
| :---------------- | :----------------------------------- |
| state_e_activated | Electric vehicle error               |
| overtemp          | Overtemperature                      |
| critical_temp     | Critical temperature                 |
| overcurrent       | Overcurrent                          |
| meter_fault       | Meter fault                          |
| undervoltage      | Undervoltage                         |
| overvoltage       | Overvoltage                          |
| rcd_error         | <abbr title="residual current device">RCD</abbr> error                            |
| cp_diode_failure  | Electric vehicle communication error |
| contactor_failure | Contactor failure                    |

## Sensors

Sensors available in the library:

### Single-phase charger

| Condition           | Unit | Description                                               |
| :------------------ | :--- | :-------------------------------------------------------- |
| state               |      | State of the charger.                                     |
| charging_time       | s    | Indicates the current session charging time.              |
| power               | kW   | Current instant power.                                    |
| energy              | kWh  | Total charged energy for the current charging session.    |
| temperature         | °C   | Board temperature.                                        |
| lifetime_energy     | kWh  | Total charged energy since installation.                  |
| installation_current| A    | Current value [A] to be limited by software.              |
| limit_reason        |      | Current limit reason.                                     |
| voltage             | V    | Measured voltage.                                         |
| current             | A    | Measured current.                                         |

### Three-phase charger

| Condition           | Unit | Description                                               |
| :------------------ | :--- | :-------------------------------------------------------- |
| state               |      | State of the charger.                                     |
| charging_time       | s    | Indicates the current session charging time.              |
| power               | kW   | Current instant power.                                    |
| energy              | kWh  | Total charged energy for the current charging session.    |
| temperature         | °C   | Board temperature.                                        |
| lifetime_energy     | kWh  | Total charged energy since installation.                  |
| installation_current| A    | Current value [A] to be limited by software.              |
| limit_reason        |      | Current limit reason.                                     |
| voltage_l1          | V    | Measured voltage on L1.                                   |
| voltage_l2          | V    | Measured voltage on L2.                                   |
| voltage_l3          | V    | Measured voltage on L3.                                   |
| current_l1          | A    | Measured current on L1.                                   |
| current_l2          | A    | Measured current on L2.                                   |
| current_l3          | A    | Measured current on L3.                                   |

### Single-phase energy meter

| Condition           | Unit | Description                                               |
| :------------------ | :--- | :-------------------------------------------------------- |
| breaker_current     | A    | Main breaker current.                                     |
| power               | kW   | Measured active power.                                    |
| pf                  |      | Power factor.                                             |

### Three-phase energy meter

| Condition           | Unit | Description                                               |
| :------------------ | :--- | :-------------------------------------------------------- |
| breaker_current     | A    | Main breaker current.                                     |
| power_l1            | kW   | Measured active power on L1.                              |
| power_l2            | kW   | Measured active power on L2.                              |
| power_l3            | kW   | Measured active power on L3.                              |
| pf_l1               |      | Power factor on L1.                                       |
| pf_l2               |      | Power factor on L2.                                       |
| pf_l3               |      | Power factor on L3.                                       |

## Buttons

Buttons available in the library:

### Chargers

| Button              | Description                        |
| :------------------ | :--------------------------------- |
| charge_start        | Command charger to start charging. |
| charge_stop         | Command charger to stop charging.  |
| reboot              | Reboot charger.                    |

### Energy meters

| Button              | Description                        |
| :------------------ | :--------------------------------- |
| reboot              | Reboot energy meter.               |

## Numbers

Numbers available in the library:

### Chargers

| Number             | Unit | Range   | Description                               |
| :----------------- | :--- | :------ | :---------------------------------------- |
| led_max_brightness | %    | 0 - 100 | Set the LED brightness of the charger.    |
| dynamic_limit      | A    | 0 - 32  | Set the maximum allowed charging current. |

## Selects

Selects available in the library:

### Energy meters

| Select              | Description                             |
| :------------------ | :-------------------------------------- |
| lb_mode             | Select the load balancing mode of the energy meter. The options are **Disabled**, **Power**, **Hybrid**, and **Green**. |

## Switches

Switches available in the library:

### Single-phase charger

| Switch              | Description                             |
| :------------------ | :-------------------------------------- |
| authentication      | Allows to select if the charger will automatically start to charge or if it needs authentication. |
| lock                | Allows to select if the charger is locked or not. When the charger is locked, no charging is possible.|

### Three-phase charger

| Switch              | Description                             |
| :------------------ | :-------------------------------------- |
| authentication      | Allows to select if the charger will automatically start to charge or if it needs authentication. |
| lock                | Allows to select if the charger is locked or not. When the charger is locked, no charging is possible.|
| force_single_phase  | Allows to put the three-phase charger in single-phase mode or three-phase mode. |
