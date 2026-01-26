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

### Action: Set hot water schedule

The `bsblan.set_hot_water_schedule` action allows you to set the hot water heating schedule for your BSB-Lan device. Each day of the week can have one or more time slots when hot water heating should be active.

- **Target**: `device_id`
  - **Description**: The BSB-Lan device to configure.
  - **Required**: Yes
- **Data attributes**:
  - **`monday_slots`**: List of time slots for Monday. Each slot contains `start_time` and `end_time`.
    - **Optional**: Yes
  - **`tuesday_slots`**: List of time slots for Tuesday. Each slot contains `start_time` and `end_time`.
    - **Optional**: Yes
  - **`wednesday_slots`**: List of time slots for Wednesday. Each slot contains `start_time` and `end_time`.
    - **Optional**: Yes
  - **`thursday_slots`**: List of time slots for Thursday. Each slot contains `start_time` and `end_time`.
    - **Optional**: Yes
  - **`friday_slots`**: List of time slots for Friday. Each slot contains `start_time` and `end_time`.
    - **Optional**: Yes
  - **`saturday_slots`**: List of time slots for Saturday. Each slot contains `start_time` and `end_time`.
    - **Optional**: Yes
  - **`sunday_slots`**: List of time slots for Sunday. Each slot contains `start_time` and `end_time`.
    - **Optional**: Yes
  - **`standard_values_slots`**: List of standard/default time slots. Each slot contains `start_time` and `end_time`.
    - **Optional**: Yes

Time slots are defined using time pickers for easy configuration without manual formatting. You only need to specify the days you want to configure.

## Examples

The following examples show how to use the BSB-Lan integration actions in Home Assistant automations.

### Setting a weekday and weekend schedule

This example sets different schedules for weekdays and weekends. Each day can have multiple time slots.

```yaml
action: bsblan.set_hot_water_schedule
target:
  device_id: abc123device456
data:
  monday_slots:
    - start_time: "06:00:00"
      end_time: "08:00:00"
    - start_time: "17:00:00"
      end_time: "21:00:00"
  tuesday_slots:
    - start_time: "06:00:00"
      end_time: "08:00:00"
    - start_time: "17:00:00"
      end_time: "21:00:00"
  wednesday_slots:
    - start_time: "06:00:00"
      end_time: "08:00:00"
    - start_time: "17:00:00"
      end_time: "21:00:00"
  thursday_slots:
    - start_time: "06:00:00"
      end_time: "08:00:00"
    - start_time: "17:00:00"
      end_time: "21:00:00"
  friday_slots:
    - start_time: "06:00:00"
      end_time: "08:00:00"
    - start_time: "17:00:00"
      end_time: "21:00:00"
  saturday_slots:
    - start_time: "08:00:00"
      end_time: "22:00:00"
  sunday_slots:
    - start_time: "08:00:00"
      end_time: "22:00:00"
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
        to: winter
    actions:
      - action: bsblan.set_hot_water_schedule
        target:
          device_id: "{{ device_id('water_heater.bsblan_hot_water') }}"
        data:
          monday_slots:
            - start_time: "05:00:00"
              end_time: "08:30:00"
            - start_time: "16:00:00"
              end_time: "23:00:00"
          tuesday_slots:
            - start_time: "05:00:00"
              end_time: "08:30:00"
            - start_time: "16:00:00"
              end_time: "23:00:00"
          wednesday_slots:
            - start_time: "05:00:00"
              end_time: "08:30:00"
            - start_time: "16:00:00"
              end_time: "23:00:00"
          thursday_slots:
            - start_time: "05:00:00"
              end_time: "08:30:00"
            - start_time: "16:00:00"
              end_time: "23:00:00"
          friday_slots:
            - start_time: "05:00:00"
              end_time: "08:30:00"
            - start_time: "16:00:00"
              end_time: "23:00:00"
          saturday_slots:
            - start_time: "07:00:00"
              end_time: "23:00:00"
          sunday_slots:
            - start_time: "07:00:00"
              end_time: "23:00:00"

  - alias: "Set hot water schedule - summer"
    triggers:
      - trigger: state
        entity_id: sensor.season
        to: summer
    actions:
      - action: bsblan.set_hot_water_schedule
        target:
          device_id: "{{ device_id('water_heater.bsblan_hot_water') }}"
        data:
          monday_slots:
            - start_time: "06:00:00"
              end_time: "07:00:00"
            - start_time: "18:00:00"
              end_time: "20:00:00"
          tuesday_slots:
            - start_time: "06:00:00"
              end_time: "07:00:00"
            - start_time: "18:00:00"
              end_time: "20:00:00"
          wednesday_slots:
            - start_time: "06:00:00"
              end_time: "07:00:00"
            - start_time: "18:00:00"
              end_time: "20:00:00"
          thursday_slots:
            - start_time: "06:00:00"
              end_time: "07:00:00"
            - start_time: "18:00:00"
              end_time: "20:00:00"
          friday_slots:
            - start_time: "06:00:00"
              end_time: "07:00:00"
            - start_time: "18:00:00"
              end_time: "20:00:00"
          saturday_slots:
            - start_time: "08:00:00"
              end_time: "21:00:00"
          sunday_slots:
            - start_time: "08:00:00"
              end_time: "21:00:00"
```

{% endraw %}

For more documentation of the BSBLan device, check the [manual](https://docs.bsb-lan.de).

To see a more detailed listing of the reported systems which are successfully used with BSB-LAN, please follow the corresponding link:

[Supported heating systems](https://docs.bsb-lan.de/supported_heating_systems.html)

The integration is tested with the stable firmware version `5.0.16-20250525002819`. A newer firmware version may not work because the API could have changed.
For autodiscovery, use the latest release. [release 5.0](https://github.com/fredlcore/BSB-LAN/releases/tag/v5.0)
