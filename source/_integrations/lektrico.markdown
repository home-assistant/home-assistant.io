---
title: Lektrico Charging Station
description: Instructions on how to integrate a Lektrico Chargering Station with Home Assistant.
ha_category:
  - Sensor
ha_release: "2024.10"
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@lektrico'
ha_domain: lektrico
ha_zeroconf: true
ha_platforms:
  - sensor
---

The **Lektrico Charging Station** integration integrates your [Lektrico Charging Station](https://lektri.co) into your Home Assistant and allows you to monitor it.

The Lektrico Charging Station device will be added as a sensor in Home Assistant.

{% include integrations/config_flow.md %}

## Sensors

Sensors available in the library:

### Single-phase charger

| Condition           | Description                                               |
| :------------------ | :-------------------------------------------------------- |
| state               | State of the charger.                                     |
| charging_time       | Indicates the current session charging time.              |
| power               | Current instant power.                                    |
| energy              | Current session charged energy.                           |
| temperature         | Board temperature.                                        |
| lifetime_energy     | Total charged energy since installation.                  |
| installation_current| Current value [A] to be limited by software.              |
| limit_reason        | Current limit reason.                                     |
| voltage             | Measured voltage.                                         |
| current             | Measured current.                                         |

### Three-phase charger

| Condition           | Description                                               |
| :------------------ | :-------------------------------------------------------- |
| state               | State of the charger.                                     |
| charging_time       | Indicates the current session charging time.              |
| power               | Current instant power.                                    |
| energy              | Current session charged energy.                           |
| temperature         | Board temperature.                                        |
| lifetime_energy     | Total charged energy since installation.                  |
| installation_current| Current value [A] to be limited by software.              |
| limit_reason        | Current limit reason.                                     |
| voltage_l1          | Measured voltage on L1.                                   |
| voltage_l2          | Measured voltage on L2.                                   |
| voltage_l3          | Measured voltage on L3.                                   |
| current_l1          | Measured current on L1.                                   |
| current_l2          | Measured current on L2.                                   |
| current_l3          | Measured current on L3.                                   |

### Single-phase energy meter

| Condition           | Description                                               |
| :------------------ | :-------------------------------------------------------- |
| breaker_current     | Main breaker current.                                     |
| power               | Measured active power.                                    |
| pf                  | Power factor.                                             |

### Three-phase energy meter

| Condition           | Description                                               |
| :------------------ | :-------------------------------------------------------- |
| breaker_current     | Main breaker current.                                     |
| power_l1            | Measured active power on L1.                              |
| power_l2            | Measured active power on L2.                              |
| power_l3            | Measured active power on L3.                              |
| pf_l1               | Power factor on L1.                                       |
| pf_l2               | Power factor on L2.                                       |
| pf_l3               | Power factor on L3.                                       |
