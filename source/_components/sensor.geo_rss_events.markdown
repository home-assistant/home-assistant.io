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
ha_version: 0.55
ha_iot_class: "Cloud Polling"
---

The `geo_rss_events` sensor retrieves events from a GeoRSS feed and
shows information of those events filtered by distance to Home Assistant's
location and grouped by category.

This sensor is particularly useful if events occur unexpectedly in the
vicinity of the home while the GeoRSS feed also contains many events
representing distant unrelated entries. Typical examples are bush fires
alerts or earthquakes.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/geo-rss-incidents-group-screenshot.png' />
</p>

The reference point for comparing the distance is defined by `latitude`
and `longitude` in the basic configuration.

Only entries of the feed are considered that define a location as `point`
or `polygon` in *georss.org* format or as *WGS84 latitude/longitude*.

The data is updated every 5 minutes.

## {% linkable_title Configuration %}

To enable the GeoRSS events sensor, add the following lines to your
`configuration.yaml`. This is an example configuration showing bush fire
incidents from the NSW Rural Fire Service.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: geo_rss_events
    name: NSW Fire Service
    url: http://www.rfs.nsw.gov.au/feeds/majorIncidents.xml
    unit_of_measurement: 'Incidents'
    categories:
      - 'Emergency Warning'
      - 'Watch and Act'
      - 'Advice'
```

Configuration variables:

- **url** (*Required*): Full URL of the GeoRSS feed.
- **name** (*Optional*): Name of the sensor used in generating the entity id. Default is 'Event Service'.
- **radius** (*Optional*): The distance in kilometres around the Home Assistant's coordinates in which events are considered. Default is: 20km.
- **categories** (*Optional*): List of event category names found in the GeoRSS feed. A separate sensor is created for each category defined. Default is to join events from all categories into an 'Any' category.
- **unit_of_measurement** (*Optional*): The type of events found in the GeoRSS feed. Default is 'Events'.
- **custom_attributes** (*Optional*): List of custom attributes extracted from data available from the GeoRSS feed.
  - **name** (*Required*): Name of the custom attribute.
  - **source** (*Required*): Source which must be the name of an existing attribute (`title`, `id`, `distance`, `category`, `date_published`, `date_updated`).
  - **regexp** (*Required*): Regular expression that extracts a new value from the atrribute defined as `source`. The regular expression must contain a named group called `custom_attribute`.
- **custom_filters** (*Optional*): List of custom filters. If an entry does not match all filter criteria it will be discarded.
  - **attribute** (*Required*): Attribute name that the filter will be applied to. This can be a predefined or a custom attribute.
  - **regexp** (*Required*): Regular expression that will be used to match the attribute's value. If the attribute's value does not match, the event will be discarded.
- **sort_by** (*Optional*): Attribute name that the events from the GeoRSS feed should be sorted by in the UI. Valid values are `title`, `id`, `distance`, `category`, `date_published`, `date_updated` and any custom attribute name. Default is the same order as the events appear in the GeoRSS feed.
- **sort_reverse** (*Optional*): Set to `True` to reverse the sort order to descending order. Default: `False` which means ascending order.
- **publish_events** (*Optional*): Set to `True` to publish the events from the GeoRSS feed onto the Home Assistant event bus. Default: `False`.

## {% linkable_title Example Feeds %}

**Bush Fire Alerts**

```yaml
sensor:
  - platform: geo_rss_events
    name: Qld Fire and Emergency Services
    url: https://www.qfes.qld.gov.au/data/alerts/bushfireAlert.xml
    unit_of_measurement: 'Alerts'
  - platform: geo_rss_events
    name: Tas Fire Service
    url: http://www.fire.tas.gov.au/Show?pageId=colBushfireSummariesRss
    unit_of_measurement: 'Alerts'
  - platform: geo_rss_events
    name: WA Department of Fire and Emergency Services
    url: https://www.emergency.wa.gov.au/data/incident_FCAD.rss
  - platform: geo_rss_events
    name: ACT Emergency Services Agency
    url: http://www.esa.act.gov.au/feeds/currentincidents.xml
```


**Earthquake Alerts**

```yaml
sensor:
  - platform: geo_rss_events
    name: USGS All Earthquakes
    url: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.atom
    categories:
      - 'Past Hour'
      - 'Past Day'
  - platform: geo_rss_events
    name: BGS Worlwide Earthquakes
    url: http://www.bgs.ac.uk/feeds/worldSeismology.xml
    categories:
      - 'EQMH'
  - platform: geo_rss_events
    name: Recent significant earthquake reports (Canada)
    url: http://www.earthquakescanada.nrcan.gc.ca/index-en.php?tpl_region=canada&tpl_output=rss
    categories:
      - 'Earthquake Report'
```

## {% linkable_title Custom Attribute and Custom Filter Example %}

The following example shows how to extract earthquake events from a
GeoRSS feed and how to use a custom attribute and a custom filter to
only consider earthquakes above a certain magnitude.
Because GeoRSS is a generic format, it does not specify magnitude, and
this particular GeoRSS feed contains the magnitude value in the event's
title.

A custom attribute with the name `magnitude` is defined and it uses the
feed entry's `title` as its source. The regular expression then looks
for any characters before the phrase "Magnitude" followed by "M" and
another character in brackets (to cater for "ML" and "Md" values),
followed by the numeric magnitude value specified as two digits
separated by a dot, and finally followed by a space character and
more characters.

The earthquakes are sorted by the magnitude value in descending order,
i.e. highest first.

A custom filter is defined on the `magnitude` attribute that only takes
values of 2.0 or higher into account. THe regular expression looks for
either any two-digit value or a one-digit value that is any number from
2 to 9, followed by a dot and another one-digit value.


```yaml
sensor:
  - platform: geo_rss_events
    name: Terremoti
    url: http://info.terremoti.ingv.it/feed/atom/all_week
    radius: 100
    custom_attributes:
      - name: magnitude
        source: title
        regexp: '.*Magnitude\(M.+\) (?P<custom_attribute>\d+.\d+) .*'
    sort_by: 'magnitude'
    sort_reverse: true
    custom_filters:
      - attribute: magnitude
        regexp: '([0-9]{2,}|[2-9]{1})\.\d{1}'
```

## {% linkable_title Publishing events to event bus %}

The `geo_rss_events` sensor can publish the events retrieved from the
external GeoRSS feed onto the event bus. Each filtered entry from the
GeoRSS feed will be published with available attributes extracted from
the feed.

The sensor will only publish new or updated events, but will always
publish all found events after a restart of Home Assistant.
The event type is generated from the sensor name similar to how entity
ids are generated, i.e. all lower-case, whitespace replaced by
underscore.

The published events can for example be used as a trigger for an
automation that notifies you about the event.
To have the sensor publish its event to the event bus, set
`publish_events` to `True` in the configuration.
