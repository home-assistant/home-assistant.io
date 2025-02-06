---
title: VeSync
description: Instructions on how to set up VeSync switches, outlets, and fans within Home Assistant.
ha_category:
  - Fan
  - Light
  - Number
  - Switch
ha_release: 0.66
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@markperdue'
  - '@webdjoe'
  - '@thegardenmonkey'
  - '@cdnninja'
  - '@iprak'
ha_domain: vesync
ha_platforms:
  - binary_sensor
  - diagnostics
  - fan
  - humidifier
  - light
  - number
  - sensor
  - switch
ha_integration_type: integration
---

The **VeSync** {% term integration %} enables you to control smart switches and outlets connected to the VeSync App.

The devices must be added to the VeSync App before this {% term integration %} can discover them.

The following platforms are supported:

- **fan**
- **humidifier**
- **light**
- **number**
- **sensor**
- **switch**

## Supported devices

This {% term integration %} supports devices controllable by the VeSync App.  The following devices are supported by this {% term integration %}:

### Bulbs
- Etekcity WiFi Dimmable LED Bulb (ESL100)
- Etekcity WiFi Dimmable and Tunable White LED Bulb (ESL100CW)

### Wall switches

- Etekcity In Wall Smart Switch (EWSL01-USA)
- Etekcity Wifi Dimmer Switch (ESD16)
- Etekcity Wifi Dimmer Switch (ESWD16)

### Outlet plugs

- Etekcity 7 Amp US outlet - ESW01-USA (Round)
- Etekcity 10 Amp US outlet - ESW10-USA (Round)
- Etekcity 10 Amp EU outlet - ESW10-EU (Round)
- Etekcity 15 Amp US outlet - ESW15-USA (Rectangular)
- Etekcity 2 Plug Outdoor Outlet - ESO15-TB

### Fans

- Core 200S: Smart True HEPA Air Purifier
- Core 300S: Smart True HEPA Air Purifier
- Core 400S: Smart True HEPA Air Purifier
- Core 600S: Smart True HEPA Air Purifier
- EverestAir: Smart Air Purifier
- Vital 100S Smart True HEPA Air Purifier (LAP-V102S-WUS) 
- Vital 200S Smart True HEPA Air Purifier (LAP-V201S-WUS)
- LEVOIT Smart Wifi Air Purifier (LV-PUR131S)
- LEVOIT Smart Tower Fan (LTF-F422S-WUS)

### Humidifiers

- Classic200S: Classic 200S Smart Ultrasonic Cool Mist Humidifier
- Classic300S: Classic 300S Ultrasonic Smart Humidifier

## Prerequisite

Before you can use this {% term integration %}, all devices must be registered with the
VeSync App. Once registration is complete, continue with the steps described in
the configuration section below.

{% include integrations/config_flow.md %}

## Actions

| Action | Description |
|---------|-------------|
| `update_devices` | Poll Vesync server to find and add any new devices |

## Power & energy sensors

Many VeSync outlets support power & energy monitoring. This data is exposed as sensor entities alongside the outlet
itself. Note that prior versions of the {% term integration %} exposed these as state attributes on the outlet switch {% term entity %}.

| Sensor                                    | Description                                                             | Example |
| ------------------------------------------|-------------------------------------------------------------------------|---------|
| `sensor.<outlet name>_current_power`      | The present power consumption of the switch in watts                    | 7.89    |
| `sensor.<outlet name>_energy_use_today`   | The kilowatt hours used by the switch during the previous 24 hours      | 0.12    |
| `sensor.<outlet name>_voltage`            | The present voltage of the switch in Volts as a diagnostic sensor       | 120.32  |
| `sensor.<outlet name>_energy_use_weekly`  | Total energy usage for week starting from Monday 12:01AM in kWh         | 14.74   |
| `sensor.<outlet name>_energy_use_monthly` | Total energy usage for month starting from 12:01AM on the first in kWh  | 52.30   |
| `sensor.<outlet name>_energy_use_yearly`  | Total energy usage for year start from 12:01AM on Jan 1 in kWh          | 105.25  |

## Fan & air quality sensors
All VeSync air purifiers expose the remaining filter lifetime, and some also expose air quality measurements.

| Sensor                  | Description                                                                            | Example   |
| ----------------------- | -------------------------------------------------------------------------------------- | --------- |
| `filter_life`           | Remaining percentage of the filter. (LV-PUR131S, Core200S/300s/400s/600s/EverestAir)   | 142       |
| `air_quality`           | The current air quality reading. (LV-PUR131S, Core300s/400s/600s)                      | excellent |
| `pm2_5`                 | The current air quality reading. (Core300s/400s/600s/EverestAir)                       | 8         |

## Fan exposed attributes

VeSync air purifiers will expose the following details depending on the features supported by the model:

| Attribute               | Description                                                                       | Example         |
| ----------------------- | --------------------------------------------------------------------------------- | --------------- |
| `mode`                  | The current mode the device is in. (LV-PUR131S, Core200S/300s/400s)               | manual          |
| `speed`                 | The current speed setting of the device. (LV-PUR131S, Core200S/300s/400s)         | high            |
| `speed_list`            | The available list of speeds supported by the device. (LV-PUR131S)                | high            |
| `active_time`           | The number of seconds since the device has been in a non-off mode. (LV-PUR131S)   | 1598            |
| `screen_status`         | The current status of the screen. (LV-PUR131S)                                    | on              |
| `night_light`           | The current status of the night light (Core200S/Core400s)                         | off             |
| `child_lock`            | The current status of the child lock (Core200S/300s/400s)                         | off             |

## Humidifier

Sensors and settings exposed by VeSync humidifiers.

| Sensor                  | Description                                                                        | Example   |
| ----------------------- | ---------------------------------------------------------------------------------- | --------- |
| `humidity`              | Current humidity (in %)                                                            | 35        |

| Number                  | Description                                                                        | Example   |
| ----------------------- | ---------------------------------------------------------------------------------- | --------- |
| `mist_level`            | Mist level intensity (Range: 1-9, Step: 1)                                         | 1         |

## Extracting attribute data

In order to get the attributes readings from supported devices, such as voltage from outlets or fan attributes, you'll have to create a [template sensor](/integrations/template#state-based-template-sensors/).

In the example below, change all of the `vesync_switch`'s to match your device's entity ID.

Adapted from the [TP-Link integration](https://www.home-assistant.io/integrations/tplink/#plugs).

{% raw %}

```yaml
template:
  - sensor:
    - name: "Vesync voltage"
      state: "{{ state_attr('switch.vesync_switch', 'voltage') | float(default=0) }}"
      unit_of_measurement: "V"
```

{% endraw %}
