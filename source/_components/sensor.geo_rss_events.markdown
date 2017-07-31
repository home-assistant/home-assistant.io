---
layout: page
title: GeoRSS Events Sensor
description: "Instructions on how to set up GeoRSS sensors within Home Assistant."
date: 2017-07-31
sidebar: true
comments: false
sharing: true
footer: true
logo: rss.png
ha_category: Sensor
ha_version: 0.51
ha_iot_class: "Cloud Polling"
---

The `geo_rss_events` sensor retrieves events from a GeoRSS feed and
shows information of events filtered by distance to Home Assistant's
location and grouped by category.

This sensor is particularly useful if events occur unexpectedly in the
vicinity of the home while the GeoRSS feed also contains many events
further away. Typical examples are bush fires or earthquakes.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/geo-rss-incidents-group-screenshot.png' />
</p>

The reference point for comparing the distance is defined by `latitude`
and `longitude` from the basic configuration.

Only entries of the feed are considered that define a location as point
of polygon in georss.org format or as WGS84 latitude/longitude.

## {% linkable_title Configuration %}

To enable the GeoRSS events sensor, add the following lines to your
`configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: geo_rss_events
    name: NSW Fire Service
    url: http://www.rfs.nsw.gov.au/feeds/majorIncidents.xml
    icon: mdi:fire
    unit_of_measurement: 'Incidents'
    categories:
      - 'Emergency Warning'
      - 'Watch and Act'
      - 'Advice'
```

Configuration variables:

- **url** (*Required*): Full URL of the GeoRSS feed.
- **name** (*Optional*): Name of the sensor used in generating the entity id. Default is 'Event Service'.
- **icon** (*Optional*): Any icon from [MaterialDesignIcons.com]. Prefix name with `mdi:`. Default is `mdi:alert`.
- **radius** (*Optional*): The distance in kilometres around the Home Assistant's coordinates in which events are considered. Default is: 20km.
- **categories** (*Optional*): List of event category names found in the GeoRSS feed. A separate sensor is created for each category defined. Default is to show any category.
- **unit_of_measurement** (*Optional*): The type of events found in the GeoRSS feed. Default is 'Events'.

## {% linkable_title Example Feeds %}

**Bush Fire Alerts**

```yaml
sensor:
  - platform: geo_rss_incidents
    name: Qld Fire and Emergency Services
    url: https://www.qfes.qld.gov.au/data/alerts/bushfireAlert.xml
    icon: mdi:fire
    unit_of_measurement: 'Alerts'
  - platform: geo_rss_incidents
    name: Tas Fire Service
    url: http://www.fire.tas.gov.au/Show?pageId=colBushfireSummariesRss
    icon: mdi:fire
    unit_of_measurement: 'Alerts'
  - platform: geo_rss_incidents
    name: WA Department of Fire and Emergency Services
    url: https://www.emergency.wa.gov.au/data/incident_FCAD.rss
    icon: mdi:fire
  - platform: geo_rss_incidents
    name: ACT Emergency Services Agency
    url: http://www.esa.act.gov.au/feeds/currentincidents.xml
    icon: mdi:fire
```


**Earthquake Alerts**

```yaml
sensor:
  - platform: geo_rss_incidents
    name: USGS All Earthquakes
    url: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.atom
    categories:
      - 'Past Hour'
      - 'Past Day'
  - platform: geo_rss_incidents
    name: BGS Worlwide Earthquakes
    url: http://www.bgs.ac.uk/feeds/worldSeismology.xml
    categories:
      - 'EQMH'
  - platform: geo_rss_incidents
    name: Recent significant earthquake reports (Canada)
    url: http://www.earthquakescanada.nrcan.gc.ca/index-en.php?tpl_region=canada&tpl_output=rss
    categories:
      - 'Earthquake Report'
```
