---
title: VeSync
description: Instructions on how to set up VeSync switches, outlets, fans, and humidifiers within Home Assistant.
ha_category:
  - Light
  - Switch
  - Fan
  - Humidifier
  - Number
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
  - sensor
  - humidifier
  - number
---

The `vesync` integration enables you to control smart switches, outlets, fans, and humidifiers connected to the VeSync App.

The devices must be added to the VeSync App before this integration can discover them.

The following platforms are supported:

- **light**
- **switch**
- **fan**
- **sensor**
- **humidifier**
- **number**

## Supported Devices

This integration supports devices controllable by the VeSync App.  The following devices are supported by this integration:

### Bulbs
- Etekcity WiFi Dimmable LED Bulb (ESL100)
- Etekcity WiFi Dimmable and Tunable White LED Bulb (ESL100CW)

### Wall Switches

- Etekcity In Wall Smart Switch (EWSL01-USA)
- Etekcity Wifi Dimmer Switch (ESD16)
- Etekcity Wifi Dimmer Switch (ESWD16)

### Outlet Plugs

- Etekcity 7 Amp US outlet - ESW01-USA (Round)
- Etekcity 10 Amp US outlet - ESW10-USA (Round)
- Etekcity 10 Amp EU outlet - ESW10-EU (Round)
- Etekcity 15 Amp US outlet - ESW15-USA (Rectangular)
- Etekcity 2 Plug Outdoor Outlet - ESO15-TB

### Fans

- Core 200S: Smart True HEPA Air Purifier
- Core 300S: Smart True HEPA Air Purifier
- Core 400S: Smart True HEPA Air Purifier
- LEVOIT Smart Wifi Air Purifier (LV-PUR131S)

### Humidifiers

- LEVOIT Classic 300S Ultrasonic Smart Humidifier

## Prerequisite

Before you can use this integration, all devices must be registered with the
VeSync App. Once registration is complete, continue with the steps described in
the configuration section below.

{% include integrations/config_flow.md %}

## Services

| Service | Description |
|---------|-------------|
| `update_devices` | Poll Vesync server to find and add any new devices |

## Power & Energy Sensors

Many VeSync outlets support power & energy monitoring. These data are exposed as diagnostic sensor entities alongside the outlet
itself. Note that prior versions of the integration exposed these as state attributes on the outlet switch entity.

| Sensor                                  | Description                                                        | Example |
| --------------------------------------- | ------------------------------------------------------------------ | ------- |
| `sensor.<outlet name>_current_power`    | The present power consumption of the switch in watts               | 7.89    |
| `sensor.<outlet name>_energy_use_today` | The kilowatt hours used by the switch during the previous 24 hours | 0.12    |

## Outlet Exposed Attributes

VeSync outlets will expose the following details for only the smart outlets. Energy monitoring not available for in-wall switches.

| Attribute               | Description                                                             | Example         |
| ----------------------- | ----------------------------------------------------------------------- | --------------- |
| `voltage`               | Current voltage of the device                                           | 120.32          |
| `weekly_energy_total`   | Total energy usage for week starting from Monday 12:01AM in kWh         | 14.74           |
| `monthly_energy_total`  | Total energy usage for month starting from 12:01AM on the first in kWh  | 52.30           |
| `yearly_energy_total`   | Total energy usage for year start from 12:01AM on Jan 1 in kWh          | 105.25          |

## Fan Exposed Attributes

VeSync air purifiers will expose the following details depending on the features supported by the model:

| Attribute               | Description                                                                       | Example         |
| ----------------------- | --------------------------------------------------------------------------------- | --------------- |
| `mode`                  | The current mode the device is in. (LV-PUR131S, Core200S/300s/400s)               | manual          |
| `speed`                 | The current speed setting of the device. (LV-PUR131S, Core200S/300s/400s)         | high            |
| `speed_list`            | The available list of speeds supported by the device. (LV-PUR131S)                | high            |
| `active_time`           | The number of seconds since the device has been in a non-off mode. (LV-PUR131S)   | 1598            |
| `filter_life`           | Remaining percentage of the filter. (LV-PUR131S, (Core200S/300s/400s)             | 142             |
| `air_quality`           | The current air quality reading. (LV-PUR131S)                                     | excellent       |
| `screen_status`         | The current status of the screen. (LV-PUR131S)                                    | on              |
| `night_light`           | The current status of the night light (Core200S/Core400s)                         | off             |
| `child_lock`            | The current status of the child lock (Core200S/300s/400s)                         | off             |

## Humidity Sensors

VeSync humidifiers include humidity sensors. The measured humidity is exposed as a diagnostic sensor entity alongside the
humidifier itself.

| Sensor                                      | Description                                     | Example |
| ------------------------------------------- | ----------------------------------------------- | ------- |
| `sensor.<humidifier name>_current_humidity` | The percent humidity measured by the humidifier | 43      |

## Humidifier Settings

VeSync humidifiers have settings other than just a target humidity, like a manual mist level and an on/off display toggle.
These are exposed as configuration entities alongside the humidifier itself.

| Entity ID                                 | Description                                    |
| ----------------------------------------- | ---------------------------------------------- |
| `number.<humidifier name>_mist_level`     | The target mist level of the humidifier        |
| `light.<humidifier name>_night_light`     | The brightness of the humidifier's night light |
| `switch.<humidifier name>_display`        | The humidifier's display                       |
| `switch.<humidifier name>_automatic_stop` | The humidifier's automatic stop feature        |

## Humidifier Exposed Attributes

VeSync humidifiers will expose the following details:

| Attribute                     | Description                                             | Example             |
| ----------------------------- | ------------------------------------------------------- | ------------------- |
| `humidity`                    | The target humidity of the humidifier                   | 40                  |
| `max_humidity`                | The minimum allowed target humidity of the humidifier   | 30                  |
| `min_humidity`                | The maximum allowed target humidity of the humidifier   | 80                  |
| `mode`                        | The current mode the humidifier is in                   | manual              |
| `available_modes`             | The available list of modes supported by the humidifier | auto, manual, sleep |
| `water_lacks`                 | Whether the humidifier lacks water                      | false               |
| `humidity_high`               | Wether the humidifier detects high humidity             | true                |
| `water_tank_lifted`           | Wether the water tank is lifted                         | true                |
| `automatic_stop_reach_target` | Wether the automatic stop target has been reached       | false               |
| `mist_level`                  | The level of mist being emitted by the humidifier       | 5                   |

## Extracting Attribute data

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

Extracting air quality from a VeSync LV-PUR131S air purifier. Change the `vesync_air_purifier` to match your device's entity ID.

{% raw %}

```yaml
template:
  - sensor:
      - name: "VeSync Air Quality"
        state: "{{ state_attr('fan.vesync_air_purifier', 'air_quality') | title }}"
```

{% endraw %}
