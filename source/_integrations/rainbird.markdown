---
title: Rain Bird
description: Instructions on how to integrate your Rain Bird LNK WiFi Module within Home Assistant.
ha_category:
  - Binary sensor
  - Calendar
  - Irrigation
  - Sensor
  - Switch
ha_config_flow: true
ha_release: 0.61
ha_iot_class: Local Polling
ha_codeowners:
  - '@konikvranik'
  - '@allenporter'
ha_domain: rainbird
ha_platforms:
  - binary_sensor
  - calendar
  - number
  - sensor
  - switch
ha_integration_type: integration
---

This `rainbird` integration allows interacting with [LNK WiFi](https://www.rainbird.com/products/lnk-wifi-module) module of the Rain Bird Irrigation system in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Calendar](#calendar)
- [Number](#number)
- [Switch](#switch)

{% include integrations/config_flow.md %}

## Configuration options

The integration has a configuration option to change the default amount of time that the irrigation
will run when turning on a zone switch (default is 6 minutes). This can be overridden with an action (see below).

## Binary sensor

The `rainsensor` sensor will tell if you if the device has detected rain.

## Calendar

Some Rain Bird devices support automatic irrigation schedules configured with the Rain Bird app.
and are available in Home Assistant as a [Calendar](https://www.home-assistant.io/integrations/calendar/) entity. You can view the program schedule in the UI, or trigger other automations
based on the irrigation start or end time.

## Number

The Rain Delay Number Entity lets you set and view  the number of days, if any, the automatic irrigation schedule has been delayed.

## Switch

Switches are automatically added for all available zones of configured controllers.

## Actions

The integration exposes actions to give additional control over a Rain Bird device.

### `rainbird.start_irrigation`

Start a Rain Bird zone for a set number of minutes. This action accepts a Rain Bird sprinkler
zone switch entity and allows a custom duration unlike the switch.

| Data attribute | Optional | Description                                           |
| ---------------------- | -------- | ----------------------------------------------------- |
| `entity_id`            | no       | The Rain Bird Sprinkler zone switch to turn on.       |
| `duration`             | no       | Number of minutes for this zone to be turned on.      |


```yaml
# Example configuration.yaml automation entry
automation:
  - alias: "Turn irrigation on"
    trigger:
      - platform: time
        at: "5:30:00"
    action:
      - action: rainbird.start_irrigation
        data:
          entity_id: switch.rain_bird_sprinkler_1
          duration: 5
```
