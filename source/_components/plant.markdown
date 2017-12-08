---
layout: page
title: "Plant monitor"
description: "Instructions on how to setup plant monitoring with Home Assistant."
date: 2016-05-7 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Other
ha_release: 0.44
---

This`plant`component lets you merge moisture, conductivity, light intensity, temperature and battery level for a plant into a single UI element. It also supports setting minimum and maximum values for each measurement and will change its state to "problem" if it is not within those limits.

To use your `plant` sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
plant:
  name_of_your_plant:
    sensors:
      moisture: sensor.my_sensor_moisture
      battery: sensor.my_sensor_battery
      temperature: sensor.my_sensor_temperature
      conductivity: sensor.my_sensor_conductivity
      brightness: sensor.my_sensor_brightness
    min_moisture: 20
```

Configuration variables:

- **entity_id** (*Required*): Set by you and is used by the component as the `entity_id`.
  - **sensors** (*Required*): 
    - **moisture** (*Optional*): Moisture of the plant. Measured in %. Can have a min and max value set optionally.
    - **battery** (*Optional*): Battery level of the plant sensor. Measured in %. Can only have a min level set optionally.
    - **temperature:** (*Optional*): Temperature of the plant. Measured in degrees Celsius. Can have a min and max value set optionally.
    - **conductivity:** (*Optional*): Conductivity of the plant. Measured in µS/cm. Can have a min and max value set optionally.
    - **brightness:** (*Optional*): Light exposure of the plant. Measured in Lux. Can have a min and max value set optionally.
  - **min_moisture** (*Optional*): Minimum moisture level before triggering a problem. Typical value: 20
  - **max_moisture** (*Optional*): Maximum moisture level before triggering a problem. Typical value: 60
  - **min_battery** (*Optional*): Minimum battery level before triggering a problem. Typical value: 20
  - **min_conductivity** (*Optional*): Minimum conductivity level before triggering a problem. Typical value: 500
  - **max_conductivity** (*Optional*): Maximum conductivity level before triggering a problem. Typical value: 3000
  - **min_temperature** (*Optional*): Minimum temperature before triggering a problem.
  - **max_temperature** (*Optional*): Maximum temperature before triggering a problem.
  - **min_brightness** (*Optional*): Minimum brightness before triggering a problem.
  - **max_brightness** (*Optional*): Maximum brightness before triggering a problem.

## {% linkable_title Examples %}
### Using plain MQTT sensor to get the data
This is a practical example that uses a multiple of `MQTT sensors` to supply the readings used by the `plant` sensor.
Another good source of this data would be the [Mi Flora](/components/sensor.miflora/) component. 


If the sensor data is within the min/max values the status will be `ok`, if not the status will be `problem`. You can use this to trigger a notification, if there is a problem with your plant. Of course you can only monitor attributes of your plant, where the sensor is configured and is providing the data.

## Data Source

The main sources of the data will usually be a [MiFlora sensor](/components/sensor.miflora/) or a [MQTT sensor](/components/sensor.miflora/) receiving the data from a [PlantGateway](https://github.com/ChristianKuehnel/plantgateway).

If you want to get the date via a PlantGateway, this is a typical configuration for the MQTT sensors:

{% raw %}
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
    name: my_plant_moisture
    state_topic: my_plant_topic
    value_template: '{{ value_json.moisture }}'
  - platform: mqtt
    name: my_plant_battery
    state_topic: my_plant_topic
    value_template: '{{ value_json.battery }}'
  - platform: mqtt
    name: my_plant_temperature
    state_topic: my_plant_topic
    value_template: '{{ value_json.temperature }}'
  - platform: mqtt
    name: my_plant_conductivity
    state_topic: my_plant_topic
    value_template: '{{ value_json.conductivity }}'
  - platform: mqtt
    name: my_plant_brightness
    state_topic: my_plant_topic
    value_template: '{{ value_json.brightness }}'
```
{% endraw %}

You have to replace the `state_topic` with the value that you configured in the PlantGateway. It also depends on the global configuration of your MQTT server.
