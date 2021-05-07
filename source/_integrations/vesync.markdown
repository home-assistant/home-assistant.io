---
title: VeSync
description: Instructions on how to set up VeSync switches, outlets, and fans within Home Assistant.
ha_category:
  - Switch
  - Fan
  - Light
ha_release: 0.66
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@markperdue'
  - '@webdjoe'
  - '@thegardenmonkey'
ha_domain: vesync
ha_platforms:
  - fan
  - light
  - switch
---

The `vesync` integration enables you to control smart switches and outlets connected to the VeSync App.

The devices must be added to the VeSync App before this integration can discover them.

The following platforms are supported:

- **switch**
- **fan**
- **light**

## Supported Devices

This integration supports devices controllable by the VeSync App.  The following devices are supported by this integration:

### Plugs

- Etekcity 7 Amp US outlet - ESW01-USA (Round)
- Etekcity 10 Amp US outlet - ESW10-USA (Round)
- Etekcity 10 Amp EU outlet - ESW10-EU (Round)
- Etekcity 15 Amp US outlet - ESW15-USA (Rectangular)
- Etekcity 2 Plug Outdoor Outlet - ESO15-TB

### Switches

- Etekcity In Wall Smart Switch (EWSL01-USA)
- Etekcity Wifi Dimmer Switch (ESD16)
- Etekcity Wifi Dimmer Switch (ESWD16)

### Fans

- LEVOIT Smart Wifi Air Purifier (LV-PUR131S)
- LEVOIT Core 200S Smart True HEPA Air Purifier (Core200S)

## Prerequisite

Before you can use this integration, all devices must be registered with the
VeSync App. Once registration is complete, continue with the steps described in
the configuration section below.

{% include integrations/config_flow.md %}

## Services

| Service | Description |
|---------|-------------|
| `update_devices` | Poll Vesync server to find and add any new devices |

## Outlet Exposed Attributes

VeSync outlets will expose the following details for only the smart outlets. Energy monitoring not available for in-wall switches.

| Attribute               | Description                                                             | Example         |
| ----------------------- | ----------------------------------------------------------------------- | --------------- |
| `current_power_w`       | The present power consumption of the switch in watts.                   | 100             |
| `today_energy_kwh`      | The kilowatt hours used by the switch during the previous 24 hours.     | 0.12            |
| `voltage`               | Current voltage of the device                                           | 120.32          |
| `weekly_energy_total`   | Total energy usage for week starting from Monday 12:01AM in kWh         | 14.74           |
| `monthly_energy_total`  | Total energy usage for month starting from 12:01AM on the first in kWh  | 52.30           |
| `yearly_energy_total`   | Total energy usage for year start from 12:01AM on Jan 1 in kWh          | 105.25          |

## Fan Exposed Attributes

VeSync air purifiers will expose the following details depending on the features supported by the model:

| Attribute               | Description                                                                       | Example         |
| ----------------------- | --------------------------------------------------------------------------------- | --------------- |
| `mode`                  | The current mode the device is in. (LV-PUR131S, Core200S)                         | manual          |
| `speed`                 | The current speed setting of the device. (LV-PUR131S, Core200S)                   | high            |
| `speed_list`            | The available list of speeds supported by the device. (LV-PUR131S)                | high            |
| `active_time`           | The number of seconds since the device has been in a non-off mode. (LV-PUR131S)   | 1598            |
| `filter_life`           | Remaining percentage of the filter. (LV-PUR131S, Core200S)                        | 142             |
| `air_quality`           | The current air quality reading. (LV-PUR131S)                                     | excellent       |
| `screen_status`         | The current status of the screen. (LV-PUR131S)                                    | on              |
| `night_light`           | The current status of the night light (Core200S)                                  | off             |
| `child_lock`            | The current status of the child lock (Core200S)                                   | off             |

## Extracting Attribute data

In order to get the attributes readings from supported devices, such as energy from outlets or fan attributes, you'll have to create a [template sensor](/integrations/switch.template/).

In the example below, change all of the `vesync_switch`'s to match your device's entity ID.

Adapted from the [TP-Link integration](https://www.home-assistant.io/integrations/tplink/#plugs).

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      vesync_switch_watts:
        friendly_name_template: "{{ states.switch.vesync_switch.name}} Current Consumption"
        value_template: '{{ states.switch.vesync_switch.attributes["current_power_w"] | float }}'
        unit_of_measurement: "W"
      vesync_switch_total_kwh:
        friendly_name_template: "{{ states.switch.vesync_switch.name}} Total Consumption"
        value_template: '{{ states.switch.vesync_switch.attributes["today_energy_kwh"] | float }}'
        unit_of_measurement: "kWh"
      vesync_switch_volts:
        friendly_name_template: "{{ states.switch.vesync_switch.name}} Voltage"
        value_template: '{{ states.switch.vesync_switch.attributes["voltage"] | float }}'
        unit_of_measurement: "V"
```

{% endraw %}
