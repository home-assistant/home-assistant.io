---
layout: page
title: "BloomSky"
description: "Instructions on how to integrate the BloomSky within Home Assistant."
date: 2016-02-03 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bloomsky.png
ha_category:
  - Environment
  - Binary Sensor
  - Camera
  - Sensor
ha_release: 0.14
ha_iot_class: "Cloud Polling"
redirect_from:
  - /components/binary_sensor.bloomsky/
---

The `bloomsky` component allows you to access your [BloomSky](https://www.bloomsky.com/) weather station's.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Camera](#camera)
- [Sensor](#sensor)

## {% linkable_title Setup %}

Obtain your API key from your [BloomSky dashboard](https://dashboard.bloomsky.com). Click `developers` in the bottom left of the screen.

## {% linkable_title Configuration %}

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

## {% linkable_title Binary Sensor %}

The `bloomsky` binary sensor platform allows you to get data from your BloomSky device.

To get your BloomSky binary sensors working with Home Assistant, follow the instructions above first.

### {% linkable_title Configuration %}

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

## {% linkable_title Camera %}

The `bloomsky` camera component allows you to view the current photo created by the camera in the [BloomSky](https://www.bloomsky.com) weather station. This can work in concert with [BloomSky sensors](#sensor).

### {% linkable_title Configuration %}

To enable this camera in your installation, set up the BloomSky component with your API key and add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: bloomsky
```

## {% linkable_title Sensor %}

The `bloomsky` sensor component allows you to view the measurements made by sensors in the [BloomSky](https://www.bloomsky.com) weather station. This can work in concert with the [BloomSky camera](#camera).

### {% linkable_title Configuration %}

To enable these sensors in your installation, set up the BloomSky component with your API key add the following to your `configuration.yaml` file:

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