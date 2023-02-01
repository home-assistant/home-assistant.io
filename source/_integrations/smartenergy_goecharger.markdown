---
title: go-e Charger Cloud
description: Instructions on setting up go-e Charger within Home Assistant.
ha_category:
  - Car
  - Sensor
  - Button
ha_iot_class: Cloud Polling
ha_quality_scale: silver
ha_release: '2023.2'
ha_config_flow: true
ha_codeowners:
  - '@openkfw'
ha_domain: smartenergy_goecharger
ha_platforms:
  - button
  - number
  - select
  - sensor
ha_integration_type: hub
---

The go-e Charger Cloud integration allows you to control and monitor the go-e wallbox and car connected to it. Integration currently support following features:

- connect to the wallbox via cloud API and retrieve the status
- portion of the retrieved status is displayed via sensors
- there is a button included to control charging and authentication based on the car state
- there is a number input included to change charging power in Amperes
- there is a select input included to change the phase (1 phase or 3 phase)
- button, number, and select controls are disabled if the wallbox is offline
- plethora of services are available to be used by other integrations or in automations

{% include integrations/config_flow.md %}

## Sensors

Following sensors are available to monitor the wallbox (and car respectively):

| Name                         | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| `car_status`                 | State of the car - connected/charging/etc.                       |
| `charging_allowed`           | Whether the car is allowed to charge at all.                     |
| `charger_max_current`        | Requested current for charging in A.                             |
| `energy_since_car_connected` | Energy in kWh since car is connected.                            |
| `energy_total`               | Total energy used in kWh.                                        |
| `phase_switch_mode`          | Phase switch mode - auto/1/3.                                    |
| `phases_number_connected`    | Number of connected phases - relates to the `phase_switch_mode`. |
| `charger_access`             | Access control for the device - 0/1.                             |
| `name`                       | Friendly name of the device.                                     |

## Services

Following functions are exposed as Home Assistant services, thus can be used by other integrations or in automations.

| Name                    | Parameters                                                                                         | Description                                                                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start_charging`        | `{"device_name": "example_charger", "charging_power": 10}` or `{"device_name": "example_charger"}` | Starts charging with a specified charging power. `charging_power` is optional and you can use this service purely to start without setting the charging power. |
| `stop_charging`         | `{"device_name": "example_charger"}`                                                               | Stop charging.                                                                                                                                                 |
| `change_charging_power` | `{"device_name": "example_charger", "charging_power": 10}`                                         | Change charging power for a given charger.                                                                                                                     |
| `set_phase`             | `{"device_name": "example_charger", "phase": 1}`                                                   | Change phase for a given charger. `phase` accepts values 0, 1, 2.                                                                                              |
| `set_transaction`       | `{"device_name": "example_charger", "status": 0}`                                                  | Set the wallbox transaction. `status` accepts values None (no transaction) and 0 (authenticate all users).                                                     |
