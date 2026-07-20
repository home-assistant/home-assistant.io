---
title: Renault
description: Instructions on how to integrate Renault car into Home Assistant.
ha_category:
  - Binary sensor
  - Car
  - Number
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
  - number
  - select
  - sensor
ha_integration_type: hub
ha_quality_scale: silver
---

The **Renault** {% term integration %} offers integration with the **MyRenault** cloud service and provides sensors such as charger state and temperature.

This integration provides the following platforms:

- Binary sensors - such as plug and charge status.
- Buttons - to start air conditioning, start/stop the charge, flash lights, and sound horn. Although available, these actions do not work on all vehicles.
- Device tracker - to track location of your car.
- Numbers - to set battery charge limits (minimum and target charge levels for electric vehicles).
- Selectors - to change the charge mode.
- Sensors - such as battery level, outside temperature, odometer, estimated range, charging rate, charging schedule details, and tyre pressure.

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

## Charging schedule attributes

For vehicles that report charge schedules, the **Charging mode** sensor includes extra attributes:

- `schedule_count`: Number of charge schedules reported by the vehicle.
- `active_schedule_count`: Number of active charge schedules.
- `active_schedules`: Details of the active charge schedules, including configured days, `start_time`, and `duration`.

## Battery charge limits

For electric vehicles that support battery state of charge (<abbr title="State of charge">SoC</abbr>) control, the integration provides two number entities to configure charging limits:

- **Minimum charge level**: Sets the minimum battery charge level (range: 15% to 45% in 5% increments). This ensures the battery maintains at least this charge level.
- **Target charge level**: Sets the target battery charge level (range: 55% to 100% in 5% increments). Charging will stop when the battery reaches this level.

These controls allow you to optimize battery health and charging costs by limiting how much the battery charges. For example, setting a target of 80% can help preserve long-term battery health, while setting a higher minimum level ensures you always have enough charge for daily use.

{% note %}
Battery charge limit controls are only available for electric vehicles that support setting battery charge limits remotely through the MyRenault service. This feature may require an active subscription to services such as *Pack EV Remote Control*.
{% endnote %}

## Data updates

Due to rate limitations from the Renault servers, the integration limits {% term polling %} to 60 data requests/hour.
For a single vehicle with all 7 endpoints available, the integration fetches data from the device every 7 minutes.

## Actions

### Action: Start A/C

The `renault.ac_start` action starts A/C on a vehicle.

  | Data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `vehicle`| yes | device_id of the vehicle | |
  | `temperature` | yes | Target A/C temperature in °C | |
  | `when` | no | Timestamp for the start of the A/C (optional - defaults to now) | `2020-05-01T17:45:00` |

### Action: Cancel A/C

The `renault.ac_cancel` action cancels A/C on a vehicle.

  | Data attribute | Required | Description |
  | ---------------------- | -------- | ----------- |
  | `vehicle`| yes | device_id of the vehicle |

### Action: Set A/C schedules

The `renault.ac_set_schedules` action updates A/C schedules on a vehicle.

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

### Action: Start charge

The `renault.charge_start` action starts charging on a vehicle.

  | Data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `vehicle`| yes | device_id of the vehicle | 
  | `when` | no | Timestamp for charging to start, defaults to now | `2020-05-01T17:45:00` |


### Action: Set charge schedules

The `renault.charge_set_schedules` action updates charge schedules on a vehicle.

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

## Known limitations

- Some of the features may require a subscription such as the *Pack EV Remote Control* and/or the *Pack Smart Navigation* subscription.
- Newer vehicles use new endpoints for some actions, which are not yet supported by the underlying library. The corresponding actions will currently fail with error code `err.func.wired.forbidden`.

## Troubleshooting

The **Renault** integration relies on:

- A stable internet connection.
- Renault server availability (unexpected downtime or scheduled maintenance).

You can quickly verify service status by opening the official Android/iOS app.

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs, stop the debug logging again (*download of debug log file will start automatically*). Further, if still possible, please also download the [diagnostics](/integrations/diagnostics) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
