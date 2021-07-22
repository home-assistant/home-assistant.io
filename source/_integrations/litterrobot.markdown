---
title: Litter-Robot
description: Instructions on how to integrate a Litter-Robot Wi-Fi-enabled, automatic, self-cleaning litter box to Home Assistant.
ha_category:
  - Vacuum
ha_iot_class: Cloud Polling
ha_release: 2021.3
ha_config_flow: true
ha_codeowners:
  - '@natekspencer'
ha_domain: litterrobot
ha_platforms:
  - sensor
  - switch
  - vacuum
---

The Litter-Robot integration allows you to control and monitor your Wi-Fi-enabled, automatic, self-cleaning litter box for cats.

You will need a Litter-Robot account as well as a Wi-Fi-enabled Litter-Robot unit that has already been associated with your account.

The Feeder-Robot is not currently supported by this integration.

{% include integrations/config_flow.md %}

## Entities

The following entities are created for this component and identified by a single device per Litter-Robot unit:

| Entity                | Domain   | Description                                                                      |
| --------------------- | -------- | -------------------------------------------------------------------------------- |
| Litter Box            | `vacuum` | Main entity that represents a Litter-Robot unit.                                 |
| Night Light Mode      | `switch` | When turned on, automatically turns on the night light in darker settings.       |
| Panel Lockout         | `switch` | When turned on, disables the buttons on the unit to prevent changes to settings. |
| Sleep Mode Start Time | `sensor` | When sleep mode is enabled, displays the current or next sleep mode start time.  |
| Sleep Mode End Time   | `sensor` | When sleep mode is enabled, displays the current or last sleep mode end time.    |
| Waste Drawer          | `sensor` | Displays the current waste drawer level.                                         |

## Additional Attributes

Some entities have attributes in addition to the default ones that are available for that platform. They are listed below.

### Litter Box `vacuum` entity

| Attribute                     | Type    | Description                                                                                                                                                                             |
| ----------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clean_cycle_wait_time_minutes | integer | Current wait time, in minutes, between when your cat uses the Litter-Robot and when the unit cycles automatically.                                                                      |
| is_sleeping                   | boolean | Whether or not the unit is currently in sleep mode.                                                                                                                                     |
| sleep_mode_enabled            | boolean | Whether or not sleep mode is enabled.                                                                                                                                                   |
| power_status                  | string  | Current power status of the unit. `AC` indicates normal power, `DC` indicates battery backup and `NC` indicates that the unit is not connected and/or powered off.                      |
| status_code                   | string  | The [status code](https://github.com/natekspencer/pylitterbot/blob/884944b011f5fea9639b7d21d19fa3f7708e25a7/pylitterbot/enums.py#L44) associated with the current status of the vacuum. |
| last_seen                     | string  | UTC datetime the unit last reported its status.                                                                                                                                         |

## Services

Services are utilized for additional functionality that is available in the Litter-Robot companion app. The following are currently available:

### reset_waste_drawer

Resets the waste drawer level on the Litter-Robot. This will reset the cycle count returned by the Litter-Robot API to `0` such that the waste drawer entity will report as `0.0 %`.

```yaml
service: litterrobot.reset_waste_drawer
target:
  entity_id: vacuum.litter_robot_litter_box
```

### set_sleep_mode

Enables (with `start_time` parameter) or disables sleep mode on the Litter-Robot.

| Parameter  | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                              |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enabled    | bool   | yes      | Set to true to enable and false to disable.                                                                                                                                                                                                                                                                                                              |
| start_time | string | no       | Time at which the unit will enter sleep mode and prevent an automatic clean cycle for 8 hours. This param uses the 24-hour format string `%H:%M:%S`, with seconds being optional, and is based on the timezone configured for your Home Assistant installation. As such, `10:30:00` would indicate 10:30 AM, whereas `22:30:00` would indicate 10:30 PM. |

Example of setting the sleep mode to begin at 10:30 PM.

```yaml
service: litterrobot.set_sleep_mode
target:
  entity_id: vacuum.litter_robot_litter_box
data:
  enabled: true
  start_time: '23:30:00'

```

### set_wait_time

Sets the wait time, in minutes, between when your cat uses the Litter-Robot and when the unit cycles automatically.

| Parameter | Type | Required | Description                 |
| --------- | ---- | -------- | --------------------------- |
| minutes   | int  | yes      | Must be one of: 3, 7 or 15. |

Example of setting the wait time to 3 minutes.

```yaml
service: litterrobot.set_wait_time
target:
  entity_id: vacuum.litter_robot_litter_box
data:
  minutes: 3
```
