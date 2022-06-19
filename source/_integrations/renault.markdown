---
title: Renault
description: Instructions on how to integrate Renault car into Home Assistant.
ha_category:
  - Binary Sensor
  - Car
  - Presence Detection
  - Select
  - Sensor
ha_release: 2021.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@epenet'
ha_domain: renault
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - select
  - sensor
ha_integration_type: integration
---

The Renault integration offers integration with the **MyRenault** cloud service and provides sensors such as charger state and temperature.

This integration provides the following platforms:

- Binary sensors - such as plug and charge status.
- Device tracker - to track location of your car.
- Selectors - to change the charge mode.
- Sensors - such as battery level, outside temperature, odometer, estimated range, and charging rate.

{% include integrations/config_flow.md %}

All vehicles linked to the account should then get added as devices, with sensors added as linked entity.

## Services

### Service `renault.ac_start`

Start A/C on vehicle.

  | Service data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `vehicle`| yes | device_id of the vehicle | |
  | `temperature` | yes | Target A/C temperature in °C | |
  | `when` | no | Timestamp for the start of the A/C (optional - defaults to now) | `2020-05-01T17:45:00` |

### Service `renault.ac_cancel`

Cancel A/C on vehicle.

  | Service data attribute | Required | Description |
  | ---------------------- | -------- | ----------- |
  | `vehicle`| yes | device_id of the vehicle |

### Service `renault.charge_set_schedules`

Update charge schedule on vehicle.

  | Service data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `vehicle`| yes | device_id of the vehicle |
  | `schedules` | yes | Schedule details. Can be a single schedule or a list of schedules | see [example below](#schedule_example) |
  
Notes:

- `schedules` can be in the form `{'id':1,...}` when updating a single schedules, or in the form `[{'id':1,...},{'id':2,...},...]` when updating multiple schedules within the same call
- the `id` is compulsory on each `schedule` (should be 1 to 5 depending on the vehicle)
- the `activated` flag is an optional boolean. If it is not provided, then the existing flag will be kept as is.
- the `monday` to `sunday` elements are optional. If they are not provided, then the existing settings will be kept for each day. If they are provided as None, then the existing setting will be cleared. If a value is provided, it must conform to this format `{'startTime':'T12:00Z','duration':15}` where start time is in UTC format and the duration is in minutes.

<a name="schedule_example">Example</a>:

```yaml
[
  { 
    'id': 1, 
    'activated': true, 
    'monday': {'startTime':'T12:00Z', 'duration':15} 
  }, 
  { 
    'id': 2, 
    'activated': false, 
    'monday': {'startTime':'T12:00Z', 'duration':240} 
  },
]
```

### Service `renault.charge_start`

Start charge on vehicle.

  | Service data attribute | Required | Description |
  | ---------------------- | -------- | ----------- |
  | `vehicle`| yes | device_id of the vehicle |
