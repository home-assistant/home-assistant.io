---
title: GeoJSON
description: Instructions on how to integrate GeoJSON feeds into Home Assistant.
logo: geo_location.png
ha_category:
  - Geolocation
ha_iot_class: Cloud Polling
ha_release: 0.79
ha_domain: geo_json_events
---

The `geo_json_events` platform lets you integrate GeoJSON feeds. It retrieves events from a feed and shows information of those events filtered by distance to Home Assistant's location.
All entries in the GeoJSON feed must define a `geometry` which typically is a point or polygon with geo coordinates. In addition, this platform will look for a `title` key in the entry's `properties` and use that as the entity's name.

Entities are generated, updated and removed automatically with each update from the GeoJSON feed. Each entity defines latitude and longitude and will be shown on the map automatically. The distance in kilometers is available as the state of each entity.

The data is updated every 5 minutes.

## Configuration

To integrate a GeoJSON feed, add the following lines to your `configuration.yaml`. This is an example configuration showing [earthquake data provided by the U.S. Geological Survey](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).

```yaml
# Example configuration.yaml entry
geo_location:
  - platform: geo_json_events
    url: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
```

{% configuration %}
url:
  description: Full URL of the GeoJSON feed.
  required: true
  type: string
radius:
  description: The distance in kilometers around the Home Assistant's coordinates in which events are considered.
  required: false
  type: float
  default: 20.0
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
{% endconfiguration %}

## State Attributes

The following state attributes are available for each entity in addition to the standard ones:

| Attribute   | Description |
|-------------|-------------|
| latitude    | Latitude of the event. |
| longitude   | Longitude of the event. |
| source      | `geo_json_events` to be used in conjunction with `geo_location` automation trigger. |
| external_id | The external ID used in the feed to identify the event in the feed. |

## Advanced Configuration Example

When integrating several GeoJSON feeds, it may be useful to distinguish the entities of different feeds. The easiest way to do that is by defining an [`entity_namespace`](/docs/configuration/platform_options/#entity-namespace/) for each platform which will prefix each entity ID with the defined value.

```yaml
# Example configuration.yaml entry
geo_location:
  - platform: geo_json_events
    url: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
    radius: 250
    entity_namespace: "usgs_earthquakes"
```
