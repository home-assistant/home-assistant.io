---
title: CityBikes
description: Instructions on how to integrate data from the CityBikes API into Home Assistant.
ha_category:
  - Transport
ha_release: 0.49
ha_iot_class: Cloud Polling
ha_domain: citybikes
ha_platforms:
  - sensor
---

The `citybikes` sensor platform monitors bike availability at bike sharing stations in a chosen area. The data is provided by [CityBikes](https://citybik.es/#about), which supports bike sharing systems all around the world.

## Configuration

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry (using radius)
sensor:
  - platform: citybikes
```

{% configuration %}
name:
  description: The base name of this group of monitored stations. The entity ID of every monitored station in this group will be prefixed with this base name, in addition to the network ID.
  required: false
  type: string
network:
  description: The name of the bike sharing system to poll.
  required: false
  default: Defaults to the system that operates in the monitored location.
  type: string
latitude:
  description: Latitude of the location, around which bike stations are monitored.
  required: false
  default: Defaults to the latitude in your `configuration.yaml` file.
  type: string
longitude:
  description: Longitude of the location, around which bike stations are monitored.
  required: false
  default: Defaults to the longitude in your `configuration.yaml` file.
  type: string
radius:
  description: The radius (in meters or feet, depending on the Home Assistant configuration) around the monitored location. Only stations closer than this distance will be monitored.
  required: false
  type: integer
stations:
  description: A list of specific stations to monitor. The list should contain station `ID`s or `UID`s, which can be obtained from the CityBikes API.
  required: false
  type: list
{% endconfiguration %}


## Example

Additional configuration samples:

```yaml
# Example configuration.yaml entry (using a list of stations)
sensor:
  - platform: citybikes
    name: Work Stations
    stations:
      - 123
      - 145
      - 436
```
