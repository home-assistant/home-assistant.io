---
title: Hive
description: Instructions on how to integrate Hive devices with Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Climate
  - Hub
  - Light
  - Sensor
  - Switch
  - Water heater
ha_release: 0.59
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@Rendili'
  - '@KJonline'
ha_domain: hive
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - climate
  - light
  - sensor
  - switch
  - water_heater
ha_config_flow: true
ha_integration_type: integration
ha_homekit: true
---

The Hive integration for Home Assistant allows you to interact with supported devices and services offered by
[hivehome.com](https://www.hivehome.com)

{% note %}
Please note that Hive shut down its North American Servers on November 30th, 2021.
Read more about this in their [shutdown notice](https://www.hivehome.com/us/support).
{% endnote %}

This Hive integration uses the same username and password you use on the [Hive website](https://sso.hivehome.com) to configure it within Home Assistant, 2FA authentication must be enabled to use this integration. Once configured Home Assistant will detect and add all Hive devices, including support for multi-zone heating.

{% include integrations/config_flow.md %}

## Options

Menu: *Configuration* > *Integrations* > *Select your new integration* > *Press the options button*

- **Scan Interval**: Update the scan interval allowing the integration to poll for data more frequently (Cannot be set lower than 30 seconds).
  
## Actions

### Action `hive.boost_heating_on`

You can use the action `hive.boost_heating_on` to set your heating to boost for a period of time at a certain target temperature". Individual TRVs can also be boosted in the same way, using this action.

| Data attribute | Optional | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `entity_id`            | no       | String, Name of entity e.g., `climate.heating`                         |
| `time_period`          | no       | Time Period, Period of time the boost should last for e.g., `01:30:00` |
| `temperature`          | yes      | String, The required target temperature e.g., `20.5`                   |

Examples:

```yaml
# Example script to boost heating, boost period and target temperature specified.
script:
  boost_heating:
    sequence:
      - action: hive.boost_heating_on
        target:
          entity_id: "climate.heating"
        data:
          time_period: "01:30:00"
          temperature: "20.5"
```

### Action `hive.boost_heating_off`

You can use the `hive.boost_heating_off` action to turn your heating boost off.

| Data attribute | Optional | Description                                    |
| ---------------------- | -------- | ---------------------------------------------- |
| `entity_id`            | no       | String, Name of entity e.g., `climate.heating` |

Examples:

```yaml
# Example script to boost heating, boost period and target temperature specified.
script:
  boost_heating:
    sequence:
      - action: hive.boost_heating_off
        target:
          entity_id: "climate.heating"
```

### Action `hive.boost_hot_water`

You can use the `hive.boost_hot_water` action to set your hot water to boost for a period of time.

| Data attribute | Optional | Description                                                             |
| ---------------------- | -------- | ----------------------------------------------------------------------- |
| `entity_id`            | no       | String, Name of entity e.g., `water_heater.hot_water`                   |
| `time_period`          | yes      | Time Period, Period of time the boost should last for e.g., `01:30:00`. |
| `on_off`               | no       | String, The mode to set the boost to on or off e.g., `on`               |

Examples:

```yaml
# Example script to boost hot water, boost period specified
script:
  boost_hot_water:
    sequence:
      - action: "hive.boost_hot_water"
        target:
          entity_id: "water_heater.hot_water"
        data:
          time_period: "01:30:00"
          on_off: "on"
```

## Platforms

### Alarm control panel

The `hive` alarm control panel integration integrates your Hive alarm into Home Assistant.

The platform supports the following Hive devices:

- Hive Home Shield

### Binary sensor

The `hive` binary sensor integration integrates your Hive sensors into Home Assistant.

The platform supports the following Hive devices and sensors:

- Devices
  - Hive Window or Door Sensor
  - Hive Motion Sensor
- Sensors
  - Hive Hub Online Status
  - Hive Hub 360 Glass Break
  - Hive Hub 360 Dog Bark
  - Hive Hub 360 Smoke CO2

### Climate

The `hive` climate platform integrates your Hive thermostat and Hive radiator valves into Home Assistant, enabling control of setting the **mode** and setting the **target temperature**.

A short boost for Hive Heating can be set by using the **Boost** preset, this will turn on the boost feature for 30 minutes at 0.5 degrees higher than the current temperature.

The platform supports the following Hive products:

- Hive Active Heating
- Hive Multi-zone
- Hive Radiator Valve

### Light

The `hive` light platform integrates your Hive lights into Home Assistant, enabling control of various settings, depending on the model light.

The platform supports the following Hive products:

- Hive Active Light Dimmable
- Hive Active Light Cool to Warm White
- Hive Active Light Color Changing

### Sensor

The `hive` sensor integration exposes Hive data as a sensor.

The platform exposes the following sensors:

- Battery level for supported products
- Boost for supported products
- Mode for supported products
- State for supported products
- Current temperature for supported products
- Target temperature for supported products
  
### Switch

The `hive` switch platform integrates your Hive plugs into Home Assistant, enabling control of your devices.

The platform supports the following Hive products:

- Hive Active Plug
- Hive Heat on Demand

### Water heater

The `hive` water heater platform integrates your Hive hot water into Home Assistant, enabling control of setting the **mode**.

The platform supports the following Hive products:

- Hot Water Control
