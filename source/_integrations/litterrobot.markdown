---
title: Litter-Robot
description: Instructions on how to integrate a Litter-Robot Wi-Fi-enabled, automatic, self-cleaning litter box to Home Assistant.
ha_category:
  - Button
  - Select
  - Sensor
  - Switch
  - Vacuum
ha_iot_class: Cloud Push
ha_release: 2021.3
ha_config_flow: true
ha_codeowners:
  - '@natekspencer'
  - '@tkdrob'
ha_domain: litterrobot
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - button
  - select
  - sensor
  - switch
  - vacuum
ha_integration_type: integration
---

The Litter-Robot integration allows you to control and monitor your Wi-Fi-enabled, automatic, self-cleaning litter box and pet feeders.

You will need a Litter-Robot account as well as a Wi-Fi-enabled Litter-Robot or Feeder-Robot unit that has already been associated with your account.

{% include integrations/config_flow.md %}

## Entities

### Litter-Robot

| Entity                        | Domain   | Description                                                                      |
| ----------------------------- | -------- | -------------------------------------------------------------------------------- |
| Litter Box                    | `vacuum` | Main entity that represents a Litter-Robot unit.                                 |
| Night Light Mode              | `switch` | When turned on, automatically turns on the night light in darker settings.       |
| Panel Lockout                 | `switch` | When turned on, disables the buttons on the unit to prevent changes to settings. |
| Last Seen                     | `sensor` | Displays the time the unit was last seen / reported an update.                   |
| Litter level                  | `sensor` | Displays the litter level, only for Litter-Robot 4.                              |
| Pet weight                    | `sensor` | Displays the last measured pet weight, only for Litter-Robot 4.                  |
| Sleep Mode Start Time         | `sensor` | When sleep mode is enabled, displays the current or next sleep mode start time.  |
| Sleep Mode End Time           | `sensor` | When sleep mode is enabled, displays the current or last sleep mode end time.    |
| Status Code                   | `sensor` | Displays the status code (Clean Cycle in Progress, Ready, Drawer Full, etc).     |
| Waste Drawer                  | `sensor` | Displays the current waste drawer level.                                         |
| Clean Cycle Wait Time Minutes | `select` | View and select the clean cycle wait time.                                       |
| Reset Waste Drawer            | `button` | Button to reset the waste drawer level to 0%, only for Litter-Robot 3.           |

### Feeder-Robot

| Entity           | Domain   | Description                                                                      |
| ---------------- | -------- | -------------------------------------------------------------------------------- |
| Give snack       | `button` | Button to dispense a single snack portion.                                       |
| Meal insert size | `select` | View and select the meal insert size.                                            |
| Food level       | `sensor` | Displays the approximate food level remaining in the hopper.                     |
| Night light mode | `switch` | When turned on, automatically turns on the night light in darker settings.       |
| Panel lockout    | `switch` | When turned on, disables the buttons on the unit to prevent changes to settings. |

## Additional Attributes

Some entities have attributes in addition to the default ones that are available for that platform. They are listed below.

### Litter Box `vacuum` entity

| Attribute          | Type    | Description                                                                                                                                                        |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| is_sleeping        | boolean | Whether or not the unit is currently in sleep mode.                                                                                                                |
| sleep_mode_enabled | boolean | Whether or not sleep mode is enabled.                                                                                                                              |
| power_status       | string  | Current power status of the unit. `AC` indicates normal power, `DC` indicates battery backup and `NC` indicates that the unit is not connected and/or powered off. |

## Services

Services are utilized for additional functionality that is available in the Whisker (previously Litter-Robot) companion app. The following are currently available:

### set_sleep_mode

Enables (with `start_time` parameter) or disables sleep mode on the Litter-Robot. Currently, this is limited to only the Litter-Robot 3. To make changes to the sleep schedule on your Litter-Robot 4, please continue to use the Whisker app.

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
  start_time: "22:30:00"

```
