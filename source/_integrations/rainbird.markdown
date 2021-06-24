---
title: Rain Bird
description: Instructions on how to integrate your Rain Bird LNK WiFi Module within Home Assistant.
ha_category:
  - Irrigation
  - Sensor
  - Switch
ha_release: 0.61
ha_iot_class: Local Polling
ha_codeowners:
  - '@konikvranik'
ha_domain: rainbird
ha_platforms:
  - binary_sensor
  - sensor
  - switch
---

This `rainbird` integration allows interacting with [LNK WiFi](https://www.rainbird.com/products/lnk-wifi-module) module of the Rain Bird Irrigation system in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Switch](#switch)

## Configuration

To enable it, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rainbird:
  host: IP_ADDRESS_OF_MODULE
  password: YOUR_PASSWORD
  trigger_time: 360

```

{% configuration %}
host:
  description: IP Address of the Module
  required: true
  type: string
password:
  description: The password for accessing the module.
  required: true
  type: string
trigger_time:
  description: Irrigation time. The time will be rounded down to whole minutes.
  required: true
  type: time
zones:
  description: Dictionary of zone configurations
  required: false
  type: map
  keys:
    ZONE_NUMBER:
      description: Zone ID
      type: map
      keys:
        friendly_name:
          description: Friendly name to see in GUI
          required: false
          type: string
        trigger_time:
          description: Irrigation time. Seconds are ignored.
          required: false
          type: time
{% endconfiguration %}


More complex configuration using all possible features could look like this example:
```yaml
# Example configuration.yaml entry
rainbird:
  - host: IP_ADDRESS_OF_MODULE
    password: YOUR_PASSWORD
    trigger_time:
      minutes: 6
    zones:
      1:
        friendly_name: My zone 1
        trigger_time:
          minutes: 6
      2:
        friendly_name: My zone 2
        trigger_time:
          minutes: 2
  - host: IP_ADDRESS_OF_ANOTHER_MODULE
    password: YOUR_ANOTHER_PASSWORD
    trigger_time: 0:06
    zones:
      1:
        friendly_name: My zone 1
        trigger_time: 0:06
      3:
        friendly_name: My zone 3
        trigger_time: 0:05
```
<div class='note'>
Please note that due to the implementation of the API within the LNK Module, there is a concurrency issue. For example, the Rain Bird app will give connection issues (like already a connection active).
</div>

## Sensor

This `rainbird` sensor allows interacting with [LNK WiFi](https://www.rainbird.com/products/lnk-wifi-module) module of the Rain Bird Irrigation system in Home Assistant.

The integration adds `rainsensor` and `raindelay` sensors and their `binary_sensor` alternatives.

## Switch

This `rainbird` switch platform allows interacting with [LNK WiFi](https://www.rainbird.com/products/lnk-wifi-module) module of the Rain Bird Irrigation system in Home Assistant.

Switches are automatically added for all available zones of configured controllers.

## Services

The Rain Bird switch platform exposes a service to start a single irrigation for a given duration.

| Service | Description |
| ------- | ----------- |
| rainbird.start_irrigation | Set a duration state attribute for a switch and turn the irrigation on.|

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
