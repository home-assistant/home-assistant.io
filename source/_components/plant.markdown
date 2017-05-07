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

This`plant`component lets you merge moisture, conductivity, light intensity, temperature and battery level for a plant into a single UI element. It also supports setting minimum and maximum values for each measurement and will change its state to "problem" if it is not within those limits.

To use your `plant` sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
plant:
  sunflower:
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

Configuration variables:

- **entity_id** (*Required*): Set by you and is used by the component as the `entity_id`.
  - **sensors** (*Required*): 
    - **moisture** (*Optional*): Moisture of the plant. Meassured in %. Can have a min and max value set optionally.
    - **battery** (*Optional*): Battery level of the plant sensor. Meassured in %. Can only have a min level set optionally.
    - **temperature:** (*Optional*): Temperaure of the plant. Meassured in degrees Celcius. Can have a min and max value set optionally.
    - **conductivity:** (*Optional*): Conductivity of the plant. Meassured in µS/cm. Can have a min and max value set optionally.
    - **brightness:** (*Optional*): Light exposure of the plant. Meassured in Lux. Can have a min and max value set optionally.
  - **min_moisture** (*Optional*): Minimum moisture level before triggering a problem.
  - **max_moisture** (*Optional*): Maximum moisture level before triggering a problem.
  - **min_battery** (*Optional*): Minimum battery level before triggering a problem.
  - **min_conductivity** (*Optional*): Minimum conductivity level before triggering a problem.
  - **max_conductivity** (*Optional*): Maximum conductivity level before triggering a problem.
  - **min_temperature** (*Optional*): Minimum temperature before triggering a problem.
  - **max_temperature** (*Optional*): Maximum temperature before triggering a problem.
  - **min_brightness** (*Optional*): Minimum brightness before triggering a problem.
  - **max_brightness** (*Optional*): Maximum brightness before triggering a problem.

## {% linkable_title Examples %}
### Using plain MQTT sensor to get the data
This is a practial example that uses a multiple of `MQTT sensors` to supply the readings used by the `plant` sensor.
Another good source of this data would be the [Mi Flora](https://home-assistant.io/components/sensor.miflora/) component. 


```yaml
# Example configuration.yaml entry
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
