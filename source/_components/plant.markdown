---
layout: page
title: "Plant Observer"
description: "Automation component to observe the status of your plants."
date: 2017-05-06 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Other
ha_release: 0.44
---

```yaml
plant:
  simulated_plant:
    sensors:
      moisture: sensor.mqtt_plant_moisture
      battery: sensor.mqtt_plant_battery
      temperature: sensor.mqtt_plant_temperature
      conductivity: sensor.mqtt_plant_conductivity
      brightness: sensor.mqtt_plant_brightness
    min_moisture: 20
    max_moisture: 60
    min_battery: 17
    min_conductivity: 500
    min_temperature: 15
```

## Using plain MQTT sensor to get the data

```yaml
sensor:
  - platform: mqtt
    name: mqtt_plant_moisture
    state_topic: test/simulated_plant
    value_template: '{{ value_json.moisture }}'
  - platform: mqtt
    name: mqtt_plant_battery
    state_topic: test/simulated_plant
    value_template: '{{ value_json.battery }}'
  - platform: mqtt
    name: mqtt_plant_temperature
    state_topic: test/simulated_plant
    value_template: '{{ value_json.temperature }}'
  - platform: mqtt
    name: mqtt_plant_conductivity
    state_topic: test/simulated_plant
    value_template: '{{ value_json.conductivity }}'
  - platform: mqtt
    name: mqtt_plant_brightness
    state_topic: test/simulated_plant
    value_template: '{{ value_json.brightness }}'
```
