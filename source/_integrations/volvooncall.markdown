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
---

The `volvooncall` integration offers integration with the [Volvo On Call](https://www.volvocars.com/intl/why-volvo/human-innovation/future-of-driving/connectivity/volvo-on-call) cloud service and offers presence detection as well as sensors such as odometer and fuel level.

## Configuration

To use Volvo On Call in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
volvooncall:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

Users registered with Volvo in North America or China will need to specify a region:

```yaml
# North America
volvooncall:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  region: na
```

or

```yaml
# China
volvooncall:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  region: cn
```

{% configuration %}
username:
  description: The username associated with your Volvo On Call account.
  required: true
  type: string
password:
  description: The password for your given Volvo On Call account.
  required: true
  type: string
region:
  description: The region where the Volvo is registered. Needs to be set for users in North America or China.
  required: false
  type: string
service_url:
  description: The service URL to use for Volvo On Call. Normally not necessary to specify.
  required: false
  type: string
mutable:
  description: If set to true, include components that can make changes to the vehicle (unlock, start engine, start heater etc).
  required: false
  default: true
  type: boolean
name:
  description: "Make it possible to provide a name for the vehicles. Note: Use all lower case letters when inputting your VIN number."
  required: false
  type: string
resources:
  description: A list of resources to display (defaults to all available).
  required: false
  type: list
scandinavian_miles:
  description: If set to true, Scandinavian miles ("mil") are used for distances and fuel range.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

### Available Resources

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

## Advanced Examples

A more advanced example for setting the vehicle name and selecting what resources to display:

```yaml
# Example configuration.yaml entry
volvooncall:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  name:
    YOUR_VIN_NUMBER: "NEW_NAME"
  resources:
    - odometer
    - lock
    - heater
```
