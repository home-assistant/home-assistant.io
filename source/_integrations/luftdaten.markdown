---
title: Luftdaten
description: Instructions on how to setup Luftdaten sensors in Home Assistant.
ha_category:
  - Health
  - Sensor
ha_release: 0.82
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_quality_scale: gold
ha_codeowners:
  - '@fabaff'
ha_domain: luftdaten
ha_platforms:
  - sensor
---

The `luftdaten` integration will query the open data API of [luftdaten.info](https://luftdaten.info/) to monitor air quality and other weather data from a specific (self build) sensor station.

## Setup

- To get the ID of a particle sensor you need to select it on the [Feinstaub map](https://deutschland.maps.luftdaten.info/) and find it in the sidebar (Column "Sensor ID").
- To get the ID of a temperature/humidity sensor you need to find it on the map hosted on [Madavi](https://www.madavi.de/sensor/feinstaub-map-dht/).

{% include integrations/config_flow.md %}

## Manual Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
luftdaten:
```

{% configuration %}
sensor_id:
  description: The ID of the sensor.
  required: true
  type: string
show_on_map:
  description: Option to show the position of the sensor on the map.
  required: false
  default: false
  type: boolean
scan_interval:
  description: the frequency (in seconds) between data updates.
  required: false
  type: integer
  default: 1800
sensors:
  description: The sensor-related configuration options.
  required: false
  type: map
  keys:
    monitored_conditions:
      description: A list of conditions you want to monitor.
      required: true
      type: list
      keys:
        P1:
          description: Show the particle sensors (particles 10 microns and below).
        P2:
          description: Show the particle sensors (particles 2.5 microns and below).
        temperature:
          description: Display the temperature from the sensor.
        humidity:
          description: Display the humidity from the sensor.
        pressure:
          description: Display the pressure from the sensor.
{% endconfiguration %}

<div class='note warning'>

If you set `show_on_map` to `true` then the location attributes are named `latitude` and `longitude`. The default name of the location attributes is `lat` and `long` to avoid showing them on the map.

</div>

Not all sensors provide all conditions. Also, it's possible that the sensor values are not available all the time. To check what a sensor is publishing use `curl`:

```bash
curl https://data.sensor.community/airrohr/v1/sensor/[sensorid]/
```

## Full example

This example would use the sensor with the ID 155, show it on the `map` and would monitor `temperature` and `humidity`.

```yaml
# Example configuration.yaml entry
luftdaten:
  sensor_id: 155
  show_on_map: true
  sensors:
    monitored_conditions:
      - temperature
      - humidity
```

## Sensor

The `luftdaten` sensor platform will query the open data API of [luftdaten.info](https://luftdaten.info/) to monitor air quality and other weather data from a specific (self build) sensor station.

You must have the `luftdaten` integration (from above) configured to use this platform. After configuring that component, sensors will automatically appear.
