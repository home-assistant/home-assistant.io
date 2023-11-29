---
title: Volvo On Call
description: Instructions for how to integrate Volvo On Call into Home Assistant.
ha_category:
  - Car
ha_release: 0.39
ha_iot_class: Cloud Polling
ha_domain: volvooncall
ha_platforms:
  - binary_sensor
  - device_tracker
  - lock
  - sensor
  - switch
ha_codeowners:
  - '@molobrakos'
ha_integration_type: integration
ha_config_flow: true
---

The **Volvo On Call** {% term integration %} offers integration with the [Volvo Cars App](https://www.volvocars.com/intl/v/volvo-cars-app) (former Volvo On Call) cloud service and offers presence detection as well as sensors such as odometer and fuel level.

{% include integrations/config_flow.md %}

### Available resources

The list of currently available resources:

- `position`
- `lock`
- `heater`
- `odometer`
- `trip_meter1`
- `trip_meter2`
- `average_speed`
- `fuel_amount`
- `fuel_amount_level`
- `average_fuel_consumption`
- `distance_to_empty`
- `washer_fluid_level`
- `brake_fluid`
- `service_warning_status`
- `bulb_failures`
- `battery_range`
- `battery_level`
- `time_to_fully_charged`
- `battery_charge_status`
- `engine_start`
- `last_trip`
- `is_engine_running`
- `doors_hood_open`
- `doors_tailgate_open`
- `doors_front_left_door_open`
- `doors_front_right_door_open`
- `doors_rear_left_door_open`
- `doors_rear_right_door_open`
- `windows_front_left_window_open`
- `windows_front_right_window_open`
- `windows_rear_left_window_open`
- `windows_rear_right_window_open`
- `tyre_pressure_front_left_tyre_pressure`
- `tyre_pressure_front_right_tyre_pressure`
- `tyre_pressure_rear_left_tyre_pressure`
- `tyre_pressure_rear_right_tyre_pressure`
- `any_door_open`
- `any_window_open`
