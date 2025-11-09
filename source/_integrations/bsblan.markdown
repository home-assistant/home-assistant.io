---
title: BSB-Lan
description: Instructions on how to integrate BSBLan device into Home Assistant.
ha_category:
  - Climate
  - Sensor
  - Water heater
ha_release: '0.110'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@liudger'
ha_domain: bsblan
ha_platforms:
  - climate
  - diagnostics
  - sensor
  - water_heater
ha_integration_type: device
ha_zeroconf: true
---

The **BSB-Lan** {% term integration %} integrates [BSBLan](https://github.com/fredlcore/BSB-LAN) devices into Home Assistant.

BSBLan is a device that is made by `Frederik Holst` and with
the help of many other contributors.
The board v3 is designed for an Arduino Due with an Ethernet-Shield for web-based controlling
of heating systems such as `Elco Thision`, `Brötje` and similar systems.
Also, available is an ESP32 version of the board.

It can interface with the heating system over Boiler-System-Bus, Local Process Bus and PPS (Punkt-zu-Punkt Schnittstelle)
For more information of which system it supports, take a look at their [documentation](https://docs.bsb-lan.de).

{% include integrations/config_flow.md %}

For authentication HTTP authentication using a username and password,
or using a passkey is supported. Use either one.

## Available sensors depending on your heating system

- `inside temperature`
- `outside temperature`

## Available platforms depending on your system

- `climate`
- `water heater`

## Actions

The integration provides the following action.

### Action `bsblan.set_hot_water_schedule`

Sets the hot water heating schedule for your BSB-Lan device. Each day of the week can have one or more time periods when hot water heating should be active.

- **Target**: `device_id`
  - **Description**: The BSB-Lan device to configure. Use the `target` field with a `device_id` to specify which device you want to set the schedule for.
  - **Required**: Yes
- **Data attribute**: `schedule`
  - **Description**: A schedule object containing one or more day configurations. Each day accepts a string in the format `"HH:MM-HH:MM HH:MM-HH:MM"`. Multiple time periods can be specified, separated by spaces. Use 24-hour time format. Set a day to `null` to clear its schedule. Available days: `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`.
  - **Required**: Yes

## Examples

The following examples show how to use the BSB-Lan integration actions in Home Assistant automations.

### Setting a weekday and weekend schedule

This example sets different schedules for weekdays and weekends.

```yaml
action: bsblan.set_hot_water_schedule
target:
  device_id: abc123device456
data:
  schedule:
    monday: "06:00-08:00 17:00-21:00"
    tuesday: "06:00-08:00 17:00-21:00"
    wednesday: "06:00-08:00 17:00-21:00"
    thursday: "06:00-08:00 17:00-21:00"
    friday: "06:00-08:00 17:00-21:00"
    saturday: "08:00-22:00"
    sunday: "08:00-22:00"
```

### Seasonal schedule automation

This example automatically adjusts the hot water schedule based on the season.

{% raw %}

```yaml
automation:
  - alias: "Set hot water schedule - winter"
    triggers:
      - trigger: state
        entity_id: sensor.season
        to: "winter"
    actions:
      - action: bsblan.set_hot_water_schedule
        target:
          device_id: "{{ device_id('water_heater.bsblan_hot_water') }}"
        data:
          schedule:
            monday: "05:00-08:30 16:00-23:00"
            tuesday: "05:00-08:30 16:00-23:00"
            wednesday: "05:00-08:30 16:00-23:00"
            thursday: "05:00-08:30 16:00-23:00"
            friday: "05:00-08:30 16:00-23:00"
            saturday: "07:00-23:00"
            sunday: "07:00-23:00"

    - alias: "Set hot water schedule - summer"
      triggers:
        - trigger: state
          entity_id: sensor.season
          to: "summer"
      actions:
        - action: bsblan.set_hot_water_schedule
          target:
            device_id: "{{ device_id('water_heater.bsblan_hot_water') }}"
          data:
            schedule:
              monday: "06:00-07:00 18:00-20:00"
              tuesday: "06:00-07:00 18:00-20:00"
              wednesday: "06:00-07:00 18:00-20:00"
              thursday: "06:00-07:00 18:00-20:00"
              friday: "06:00-07:00 18:00-20:00"
              saturday: "08:00-21:00"
              sunday: "08:00-21:00"
```

{% endraw %}

For more documentation of the BSBLan device, check the [manual](https://docs.bsb-lan.de).

To see a more detailed listing of the reported systems which are successfully used with BSB-LAN, please follow the corresponding link:

[Supported heating systems](https://docs.bsb-lan.de/supported_heating_systems.html)

The integration is tested with the stable firmware version `5.0.16-20250525002819`. A newer firmware version may not work because the API could have changed.
For autodiscovery, use the latest release. [release 5.0](https://github.com/fredlcore/BSB-LAN/releases/tag/v5.0)
