---
title: Brottsplatskartan
description: Instructions on how to integrate brottsplatskartan.se into Home Assistant.
ha_category:
  - Social
ha_release: 0.85
ha_iot_class: Cloud Polling
ha_domain: brottsplatskartan
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `brottsplatskartan` sensor allows one to track reported incidents occurring in a given area. Incidents include anything reported to [Brottsplatskartan](https://brottsplatskartan.se). The sensor only counts incidents from the current day.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`.

```yaml
sensor:
  - platform: brottsplatskartan
```

{% configuration %}
name:
  description: Custom name for the sensor.
  required: false
  type: string
  default: Brottsplatskartan
area:
  description: Area for sensor to monitor
  required: false
  type: string
latitude:
  description: Latitude for sensor.
  required: false
  type: float
  default: Your home zone latitude defined in your configuration.
longitude:
  description: Longitude for sensor.
  required: false
  type: float
  default: Your home zone longitude defined in your configuration.
{% endconfiguration %}

## Notes

### Area

Brottsplatskartan captures all incidents in a region, e.g Stockholms län. If area parameter is defined, any latitude and longitude parameters are ignored.

### Latitude and Longitude

The radius is set to 5 km when using latitude and longitude to monitor an area. It's not possible to explicitly set radius to another value.
