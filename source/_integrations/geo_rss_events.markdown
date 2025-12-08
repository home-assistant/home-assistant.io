---
title: GeoRSS
description: Instructions on how to set up GeoRSS sensors within Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.55
ha_codeowners:
  - '@exxamalte'
ha_domain: geo_rss_events
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `geo_rss_events` {% term integration %} retrieves events from a GeoRSS feed and shows information of those events filtered by distance to Home Assistant's location and grouped by category.

This {% term integration %} is particularly useful if events occur unexpectedly in the vicinity of the home while the GeoRSS feed also contains many events representing distant unrelated entries. Typical examples are bush fires alerts or earthquakes.

<p class='img'>
  <img src='/images/screenshots/geo-rss-incidents-group-screenshot.png' />
</p>

The reference point for comparing the distance is by default defined by `latitude` and `longitude` in the basic configuration.

Only entries of the feed are considered that define a location as `point` or `polygon` in *georss.org* format or as *WGS84 latitude/longitude*.

The data is updated every 5 minutes.

## Configuration

To enable the GeoRSS events sensor, add the following lines to your {% term "`configuration.yaml`" %} file.
This is an example configuration showing bush fire incidents from the NSW Rural Fire Service.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: geo_rss_events
    name: NSW Fire Service
    url: https://www.rfs.nsw.gov.au/feeds/majorIncidents.xml
    unit_of_measurement: "Incidents"
    categories:
      - 'Emergency Warning'
      - 'Watch and Act'
      - 'Advice'
```

{% configuration %}
url:
  description: Full URL of the GeoRSS feed.
  required: true
  type: string
name:
  description: Name of the sensor used in generating the entity id.
  required: false
  type: string
  default: Event Service
latitude:
  description: Latitude of the coordinates around which events are considered.
  required: false
  type: string
  default: Latitude defined in your `configuration.yaml`
longitude:
  description: Longitude of the coordinates around which events are considered.
  required: false
  type: string
  default: Longitude defined in your `configuration.yaml`
radius:
  description: The distance in kilometers around the Home Assistant's coordinates in which events are considered.
  required: false
  type: string
  default: 20km
categories:
  description: List of event category names found in the GeoRSS feed. A separate sensor is created for each category defined.
  required: false
  type: list
  default: Default is to join events from all categories into an 'Any' category.
unit_of_measurement:
  description: The type of events found in the GeoRSS feed.
  required: false
  type: string
  default: Events
{% endconfiguration %}

## Example Feeds

### Bush Fire Alerts

```yaml
sensor:
  - platform: geo_rss_events
    name: Qld Fire and Emergency Services
    url: https://www.qfes.qld.gov.au/data/alerts/bushfireAlert.xml
    unit_of_measurement: "Alerts"
  - platform: geo_rss_events
    name: TasALERT
    url: https://alert.tas.gov.au/data/incidents-and-alerts.xml
    unit_of_measurement: "Alerts"
  - platform: geo_rss_events
    name: WA Department of Fire and Emergency Services
    url: https://www.emergency.wa.gov.au/data/incident_FCAD.rss
  - platform: geo_rss_events
    name: ACT Emergency Services Agency
    url: https://www.esa.act.gov.au/feeds/currentincidents.xml
```

### Earthquake Alerts

```yaml
sensor:
  - platform: geo_rss_events
    name: USGS All Earthquakes
    url: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.atom
    categories:
      - 'Past Hour'
      - 'Past Day'
  - platform: geo_rss_events
    name: BGS Worldwide Earthquakes
    url: http://earthquakes.bgs.ac.uk/feeds/WorldSeismology.xml
    categories:
      - 'EQMH'
  - platform: geo_rss_events
    name: Recent significant earthquake reports (Canada)
    url: https://www.earthquakescanada.nrcan.gc.ca/cache/earthquakes/canada-en.atom
    categories:
      - 'Earthquake Report'
```
