---
title: NMBS
description: Instructions on how to integrate timetable data for traveling on the NMBS/SNCB Belgian Railway within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.85
ha_codeowners:
  - '@thibmaek'
ha_domain: nmbs
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `nmbs` platform will create sensors for monitoring travel time and information between 2 stations.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: nmbs
    station_from: "STATION_1"
    station_to: "STATION_2"
    station_live: "STATION_1"
    exclude_vias: true
```

The stations can only be provided by their standard names and not ids. The list of stations can be checked on the NMBS/SNCB website but for most accurate results check them on the [iRail API page](https://api.irail.be/stations/) which this integration uses internally.

{% configuration %}
station_from:
  description: The station where the connection departs.
  required: true
  type: string
station_to:
  description: The station where the connection arrives.
  required: true
  type: string
station_live:
  description: Setting this will create another sensor to monitor the liveboard in a station.
  required: false
  type: string
exclude_vias:
  description: Setting this will not show connections for which you have to transfer to another station.
  required: false
  type: boolean
  default: false
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: "`NMBS`, `NMBS Live` for the liveboard sensor when set."
show_on_map:
  description: Show the station on the map.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

<p class='img'>
  <img src='/images/screenshots/nmbs-card-example.png' />
  <p>Example using the <a href="https://github.com/custom-cards/entity-attributes-card">Entity Attributes custom card</a> </p>
</p>
