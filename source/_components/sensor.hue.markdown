---
layout: page
title: "Hue sensors"
description: "Display the state of Hue motion sensors and remotes."
date: 2017-09-15 18:45
sidebar: true
comments: false
sharing: true
footer: true
logo: philips_hue.png
ha_category: Sensor
ha_iot_class: "Cloud Polling"
ha_release: 0.55
---


The `hue` sensor will display the states of Hue sensors registered to your Hue hub. The component supports [SML](https://www.philips.co.uk/c-p/8718696595190/hue-motion-sensor) motion sensors, [RWL](http://www2.meethue.com/en-us/p/hue-dimmer-switch/046677458140) dimmer and [ZPG](https://www.philips.co.uk/c-p/8718696498026/hue-tap-switch) TAP remotes. Additionally if you have configured a Geofence in the Hue app, the state will be reported. The properties of these sensors are described in detail on the [Hue Developers website](https://developers.meethue.com/documentation/supported-sensors).

The RWL dimmer remote has a total of 8 possible states, corresponding to the remote having 4 buttons, where each button can be short pressed (clicked) and long pressed (when holding the button for 2 sec you will see the LED blink twice). The ZPG (or Tap) remote has 4 buttons.

The SML detects motion using a PIR but also has sensors for temperature and light level. The state of the sensor indicates whether motion is detected, whilst temperature and light level data are recorded in the sensor attributes.

To add `hue` sensors to your installation, first follow the instructions in the [Hue component](/components/hue/) to add your hub, and then add the following to your configuration.yaml file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: hue
```

To create a separate sensor for the SML temperature or light level data use a [template sensor](https://home-assistant.io/components/sensor.template/). For example, to read the temperature of a sensor with entity_id `sensor.living_room_motion_sensor` and the following to configuration.yaml:

```yaml
# Example template sensor
- platform: template
    sensors:
      living_room_temperature:
      friendly_name: 'Living room temperature'
      value_template: '{{states.sensor.living_room_motion_sensor.attributes.temperature}}'

```
