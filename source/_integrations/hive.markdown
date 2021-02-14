---
title: Hive
description: Instructions on how to integrate Hive devices with Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Climate
  - Light
  - Sensor
  - Switch
  - Water Heater
ha_release: 0.59
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@Rendili'
  - '@KJonline'
ha_domain: hive
ha_platforms:
  - binary_sensor
  - climate
  - light
  - sensor
  - switch
  - water_heater
---

This `hive` integration uses the same username and password you use on the [Hive website](https://my.hivehome.com) to configure it within Home Assistant. Once configured Home Assisatnt will detect and add all Hive devices, including support for multi-zone heating.

## Configuration

Menu: *Configuration* > *Integrations*

Press on **Hive** and configure the integration:

- Enter you Hive Username.
- Enter you Hive Password.
- Set the scan interval (Default 120 seconds)

If you have 2 factor authentication setup on your Hive account, a following dialog will be presented asking for  your code.

### Configuration via YAML

_YAML configuration is still around for people that prefer YAML, but it's deprecated and you should not use it anymore._

```yaml
# Example configuration.yaml entry
hive:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Your username from [https://my.hivehome.com](https://my.hivehome.com).
  required: true
  type: string
password:
  description: Your password from [https://my.hivehome.com](https://my.hivehome.com).
  required: true
  type: string
scan_interval:
  description: The time in seconds between Hive API calls
  required: false
  type: integer
  default: 120
{% endconfiguration %}

## Options

Menu: *Configuration* > *Integrations* > *Select your new integration* > *Press the options button*

- **Scan Interval**: Update the scan interval allowing the integration to poll for data more frequently (Cannot be set lower than 30 seconds).
  
## Services

### Service `hive.boost_heating`

You can use the service `hive.boost_heating` to set your heating to boost for a period of time at a certain target temperature". Individual TRVs can also be boosted in the same way, using this service.

| Service data attribute | Optional | Description                                                            |
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
      - service: hive.boost_heating
        target:
          entity_id: "climate.heating"
        data:
          time_period: "01:30:00"
          temperature: "20.5"
```

### Service `hive.boost_hot_water`

You can use the service `hive.boost_hot_water` to set your hot water to boost for a period of time.

| Service data attribute | Optional | Description                                                             |
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
      - service: "hive.boost_hot_water"
        target:
          entity_id: "water_heater.hot_water"
        data:
          time_period: "01:30:00"
          on_off: "on"
```

## Platforms

### Binary Sensor

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
  
### Switch

The `hive` switch platform integrates your Hive plugs into Home Assistant, enabling control of your devices.

The platform supports the following Hive products:

- Hive Active Plug

### Water Heater

The `hive` water heater platform integrates your Hive hot water into Home Assistant, enabling control of setting the **mode**.

The platform supports the following Hive products:

- Hot Water Control
