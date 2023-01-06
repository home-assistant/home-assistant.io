---
title: Rain Bird
description: Instructions on how to integrate your Rain Bird LNK WiFi Module within Home Assistant.
ha_category:
  - Irrigation
  - Binary Sensor
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
  - sensor
  - switch
ha_integration_type: integration
---

This `rainbird` integration allows interacting with [LNK WiFi](https://www.rainbird.com/products/lnk-wifi-module) module of the Rain Bird Irrigation system in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Configuration Options](#configuration-options)
- [Binary Sensor](#binary-sensor)
- [Sensor](#sensor)
- [Switch](#switch)
- [Services](#services)

{% include integrations/config_flow.md %}

## Configuration Options

The integration has a configuration option to change the default amount of time that the irrigation
will run when turning on a zone switch (default is 6 minutes). This can be overridden with a service call (see below).

## Binary Sensor

The `rainsensor` sensor will tell if you if the device has detected rain.

## Sensor

The `raindelay` sensor reports the number of days, if any, the automatic irrigation schedule
has been delayed.

## Switch

Switches are automatically added for all available zones of configured controllers.

## Services

The Rain Bird switch platform exposes a service to start a single irrigation for a given duration.

| Service | Description |
| ------- | ----------- |
| rainbird.start_irrigation | Set a duration state attribute for a switch and turn the irrigation on.|
| rainbird.set_rain_delay | Set how long automatic irrigation is turned off.|

The service can be used as part of an automation script. For example:

```yaml
# Example configuration.yaml automation entry
automation:
  - alias: "Turn irrigation on"
    trigger:
      - platform: time
        at: "5:30:00"
    action:
      - service: rainbird.start_irrigation
        data:
          entity_id: switch.sprinkler_1
          duration: 5
```
