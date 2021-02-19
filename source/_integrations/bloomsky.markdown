---
title: BloomSky
description: Instructions on how to integrate the BloomSky within Home Assistant.
ha_category:
  - Environment
  - Binary Sensor
  - Camera
  - Sensor
ha_release: 0.14
ha_iot_class: Cloud Polling
ha_domain: bloomsky
ha_platforms:
  - binary_sensor
  - camera
  - sensor
---

The `bloomsky` integration allows you to access your [BloomSky](https://www.bloomsky.com/) weather station's.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Camera](#camera)
- [Sensor](#sensor)

## Setup

Obtain your API key from your [BloomSky dashboard](https://dashboard.bloomsky.com). Click `developers` in the bottom left of the screen.

## Configuration

To integrate your BloomSky hub with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
bloomsky:
  api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Your BloomSky API key.
  required: true
  type: string
{% endconfiguration %}

## Binary Sensor

The `bloomsky` binary sensor platform allows you to get data from your BloomSky device.

To get your BloomSky binary sensors working with Home Assistant, follow the instructions above first.

### Configuration

To use your BloomSky binary sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: bloomsky
    monitored_conditions:
      - Night
      - Rain
```

{% configuration %}
monitored_conditions:
  description: "The sensors that you wish to monitor on all of your devices. Select from these options:"
  required: true
  type: list
  keys:
    night:
      description: Night
    rain:
      description: Rain
{% endconfiguration %}

## Camera

The `bloomsky` camera integration allows you to view the current photo created by the camera in the [BloomSky](https://www.bloomsky.com) weather station. This can work in concert with [BloomSky sensors](#sensor).

### Configuration

To enable this camera in your installation, set up the BloomSky integration with your API key and add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: bloomsky
```

## Sensor

The `bloomsky` sensor integration allows you to view the measurements made by sensors in the [BloomSky](https://www.bloomsky.com) weather station. This can work in concert with the [BloomSky camera](#camera).

### Configuration

To enable these sensors in your installation, set up the BloomSky integration with your API key add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: bloomsky
  monitored_conditions:
    - Temperature
    - Humidity
    - Pressure
    - UVIndex
    - Luminance
    - Voltage
```

{% configuration %}
monitored_conditions:
  description: "The sensors that you wish to monitor on all of your devices. Select from these options:"
  required: true
  type: list
  keys:
    humidity:
      description: Humidity
    luminance:
      description: Luminance
    pressure:
      description: Pressure
    temperature:
      description: Temperature
    uvindex:
      description: UVIndex
    voltage:
      description: Voltage
{% endconfiguration %}

More conditions are available using the [BloomSky binary sensor](#binary-sensor) component.
