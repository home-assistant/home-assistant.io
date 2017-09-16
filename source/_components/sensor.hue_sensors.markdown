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
ha_release: 0.54
---


The `hue_sensors` sensor will display the state of Hue [SML001](https://www.philips.co.uk/c-p/8718696595190/hue-motion-sensor) motion sensors and [RWL021](http://www2.meethue.com/en-us/p/hue-dimmer-switch/046677458140) remotes (dimmer switch). This sensor scans through a list of all sensors on your system and adds a single entity for each SML001 or RWL021 discovered. Note that it you must have the file `phue.conf` in your Home-assistant configuration directory, but this will have been created already if you are using the Hue lights component.

The RWL021 remote has a total of 8 possible state, corresponding to the remote having 4 buttons, where each button can be short pressed (clicked) and long pressed (when holding the button for 2 sec you will see the LED blink twice).

The SML001 detects motion using a PIR, but also has sensors for temperature and light level. The state of the sensor indicates whether motion is detected. whilst temperature and light level data is recorded in the sensor attributes.

To set this component, add the following to your configuration.yaml file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: hue_sensors
```

To create a separate sensor for the SML001 temperature or light level data use a [template sensor](https://home-assistant.io/components/sensor.template/). For example, to read the temperature of a sensor with entity_id `sensor.living_room_motion_sensor` and the following to configuration.yaml:

```yaml
# Example template sensor
- platform: template
    sensors:
      living_room_temperature:
      friendly_name: 'Living room temperature'
      value_template: '{{states.sensor.living_room_motion_sensor.attributes.temperature}}'

```
