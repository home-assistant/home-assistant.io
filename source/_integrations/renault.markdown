---
title: Renault
description: Instructions on how to integrate Renault car into Home Assistant.
ha_category:
  - Binary sensor
  - Car
  - Presence detection
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
ha_integration_type: hub
ha_quality_scale: silver
---

The Renault integration offers integration with the **MyRenault** cloud service and provides sensors such as charger state and temperature.

This integration provides the following platforms:

- Binary sensors - such as plug and charge status.
- Device tracker - to track location of your car.
- Buttons - to start air conditioning or start/stop the charge. Please note that although available these actions do not work on all vehicles.
- Selectors - to change the charge mode.
- Sensors - such as battery level, outside temperature, odometer, estimated range, and charging rate.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Locale:
  description: "The country code (e.g., `fr_FR`, `en_GB`) used to connect to the Renault servers. This should match your MyRenault account's locale setting."
Username:
  description: "The username used to connect to the Renault servers."
Password:
  description: "The password used to connect to the Renault servers."
Kamereon account id:
  description: "The Kamereon account ID that your vehicles are assigned to. If there is only one account available it will be automatically selected."
{% endconfiguration_basic %}

All vehicles linked to the account should then get added as devices, with sensors added as linked entity.

In some situations, some of the features may require a subscription such as the *Pack EV Remote Control* and/or the *Pack Smart Navigation* subscription.

## Actions

### Action `renault.ac_start`

Start A/C on vehicle.

  | Data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `vehicle`| yes | device_id of the vehicle | |
  | `temperature` | yes | Target A/C temperature in °C | |
  | `when` | no | Timestamp for the start of the A/C (optional - defaults to now) | `2020-05-01T17:45:00` |

### Action `renault.ac_cancel`

Cancel A/C on vehicle.

  | Data attribute | Required | Description |
  | ---------------------- | -------- | ----------- |
  | `vehicle`| yes | device_id of the vehicle |

### Action `renault.ac_set_schedules`

Update AC schedule on vehicle.

  | Data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `vehicle`| yes | device_id of the vehicle | |
  | `schedules` | yes | Schedule details. Can be a single schedule or a list of schedules | see [example below](#ac_schedule_example) |

Notes:

- `schedules` can contain one or more schedules which are set within the same call.
- The `id` is compulsory on each `schedule` (should be 1 to 5, depending on the vehicle).
- The `activated` flag is an optional boolean. If it is not provided, then the existing flag will be kept as is.
- The `monday` to `sunday` elements are optional. If they are not provided, then the existing settings will be kept for each day. If they are provided as None, then the existing setting will be cleared. If a value is provided, it must contain the key `readyAtTime` (in UTC format).

<a name="ac_schedule_example">Example</a>:

```yaml
- id: 1 
  activated: true 
  monday: 
    readyAtTime: 'T12:00Z' 
- id: 2 
  activated: false 
  monday:
    readyAtTime: 'T12:00Z' 
  tuesday:
    readyAtTime: 'T12:00Z'
```

### Action `renault.charge_set_schedules`

Update charge schedule on vehicle.

  | Data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `vehicle`| yes | device_id of the vehicle |
  | `schedules` | yes | Schedule details. Can be a single schedule or a list of schedules | see [example below](#schedule_example) |
  
Notes:

- `schedules` can contain one or more schedules which are set within the same call
- the `id` is compulsory on each `schedule` (should be 1 to 5 depending on the vehicle)
- the `activated` flag is an optional boolean. If it is not provided, then the existing flag will be kept as is.
- the `monday` to `sunday` elements are optional. If they are not provided, then the existing settings will be kept for each day. If they are provided as None, then the existing setting will be cleared. If a value is provided, it must contain the keys `startTime` (in UTC format) and `duration` (in minutes).

<a name="schedule_example">Example</a>:

```yaml
- id: 1 
  activated: true 
  monday: 
    startTime: 'T12:00Z'
    duration: 15 
- id: 1 
  activated: false 
  monday: 
    startTime: 'T12:00Z'
    duration: 15 
```

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
