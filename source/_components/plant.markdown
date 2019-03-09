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
ha_category: Environment
ha_release: 0.44
ha_qa_scale: internal
---

This`plant`component lets you merge moisture, conductivity, light intensity, temperature and battery level for a plant into a single UI element. It also supports setting minimum and maximum values for each measurement and will change its state to "problem" if it is not within those limits.

## {% linkable_title Configuration %}

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

{% configuration %}
entity_id:
  description: Set by you and is used by the component as the `entity_id`.
  required: true
  type: list
  keys:
    sensors:
      description: List of sensor measure entities.
      required: true
      type: list
      keys:
        moisture:
          description: Moisture of the plant. Measured in %. Can have a min and max value set optionally.
          required: false
          type: string
        battery:
          description: Battery level of the plant sensor. Measured in %. Can only have a min level set optionally.
          required: false
          type: string
        temperature:
          description: Temperature of the plant. Measured in degrees Celsius. Can have a min and max value set optionally.
          required: false
          type: string
        conductivity:
          description: Conductivity of the plant. Measured in µS/cm. Can have a min and max value set optionally.
          required: false
          type: string
        brightness:
          description: Light exposure of the plant. Measured in Lux. Can have a min and max value set optionally.
          required: false
          type: string
    min_moisture:
      description: Minimum moisture level before triggering a problem.
      required: false
      default: 20
      type: integer
    max_moisture:
      description: Maximum moisture level before triggering a problem.
      required: false
      default: 60
      type: integer
    min_battery:
      description: Minimum battery level before triggering a problem.
      required: false
      default: 20
      type: integer
    min_conductivity:
      description: Minimum conductivity level before triggering a problem.
      required: false
      default: 500
      type: integer
    max_conductivity:
      description: Maximum conductivity level before triggering a problem.
      required: false
      default: 3000
      type: integer
    min_temperature:
      description: Minimum temperature before triggering a problem.
      required: false
      type: float
    max_temperature:
      description: Maximum temperature before triggering a problem.
      required: false
      type: float
    min_brightness:
      description: Minimum brightness before triggering a problem. In contrast to the other values, this check is *not* looking at the current situation, but rather at the last days. A problem is only reported if the maximum brightness over the last days was lower than min_brightness. You can use this to check if the plant gets enough light during the course of the day.
      required: false
      type: integer
    max_brightness:
      description: Maximum brightness before triggering a problem.
      required: false
      type: integer
    check_days:
      description: time interval (in days) used when checking `min_brightness`.
      required: false
      default: 3
      type: integer
{% endconfiguration %}

## {% linkable_title Examples %}
### Using plain MQTT sensor to get the data
This is a practical example that uses a multiple of `MQTT sensors` to supply the readings used by the `plant` sensor.
Another good source of this data would be the [Mi Flora](/components/sensor.miflora/) component.

If the sensor data is within the min/max values the status will be `ok`, if not the status will be `problem`. You can use this to trigger a notification, if there is a problem with your plant. Of course you can only monitor attributes of your plant, where the sensor is configured and is providing the data.

## Data Source

The main sources of the data will usually be a [MiFlora sensor](/components/sensor.miflora/) or a [MQTT sensor](/components/sensor.mqtt/) receiving the data from a [PlantGateway](https://github.com/ChristianKuehnel/plantgateway).

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
    value_template: '{{ value_json.moisture | int }}'
    unit_of_measurement: '%'
  - platform: mqtt
    name: my_plant_battery
    state_topic: my_plant_topic
    value_template: '{{ value_json.battery | int }}'
    unit_of_measurement: '%'
  - platform: mqtt
    name: my_plant_temperature
    state_topic: my_plant_topic
    value_template: '{{ value_json.temperature | float }}'
    unit_of_measurement: '°C'
  - platform: mqtt
    name: my_plant_conductivity
    state_topic: my_plant_topic
    value_template: '{{ value_json.conductivity | int }}'
    unit_of_measurement: 'µS/cm'
  - platform: mqtt
    name: my_plant_brightness
    state_topic: my_plant_topic
    value_template: '{{ value_json.brightness | int }}'
    unit_of_measurement: 'Lux'
```

{% endraw %}

You have to replace the `state_topic` with the value that you configured in the PlantGateway. It also depends on the global configuration of your MQTT server.
