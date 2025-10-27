---
title: OASA Telematics
description: Instructions on how to integrate bus and trolley arrival data for Greek OASA Telematics within Home Assistant.
ha_category:
  - Sensor
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.92
ha_domain: oasa_telematics
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `oasa_telematics` {% term integration %} will provide you with bus and trolley arrival times for Greek public transport for Athens, using real-time data from [OASA Telematics](http://telematics.oasa.gr/en/).

## Configuration

Add the {% term integration %} to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: oasa_telematics
    route_id: YOUR_ROUTE_ID
    stop_id: "YOUR_STOP_ID"
```

The `route_id` can be obtained by looking up the "LineCode" of the route you want at this link: 

<http://telematics.oasa.gr/api/?act=webGetLines>

Then getting the "RouteCode" from this link:

`http://telematics.oasa.gr/api/?act=webGetRoutes&p1=LINE_CODE` (Replace "LINE_CODE" with the "LineCode" you copied from the first link) find the route you need and copy the `RouteCode` field.

Next, get the `stop_id` from this link: 

`http://telematics.oasa.gr/api/?act=webGetStops&p1=ROUTE_CODE` (Replace "ROUTE_CODE" with the "RouteCode" you got from the previous link) find the stop you need and copy the `StopID` field. The route must pass from this stop in order for the sensor to work.

{% configuration %}
route_id:
  description: The id of the public transport route.
  required: true
  type: integer
stop_id:
  description: The id of the public transport stop.
  required: true
  type: string
name:
  description: A friendly name for this sensor.
  required: false
  default: OASA Telematics
  type: string
{% endconfiguration %}

## Examples

A more extensive example on how to use this sensor:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: oasa_telematics
    route_id: 1965
    stop_id: "090006"
```
