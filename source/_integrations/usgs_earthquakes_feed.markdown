---
title: U.S. Geological Survey Earthquake Hazards (USGS)
description: Instructions on how to integrate the U.S. Geological Survey Earthquake Hazards Program Feed feed into Home Assistant.
ha_category:
  - Geolocation
ha_iot_class: Cloud Polling
ha_release: 0.84
ha_codeowners:
  - '@exxamalte'
ha_domain: usgs_earthquakes_feed
ha_platforms:
  - geo_location
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `usgs_earthquakes_feed` platform lets you integrate a GeoJSON feed provided by the [U.S. Geological Survey](https://earthquake.usgs.gov/) with information about seismic events like earthquakes. It retrieves incidents from a feed and shows information of those incidents filtered by distance to Home Assistant's location.

<p class='img'>
  <img src='/images/screenshots/usgs-earthquake-hazards-program-feed-entities.png' />
</p>

Entities are generated, updated and removed automatically with each update from the feed. Each {% term entity %} defines latitude and longitude and will be shown on the map automatically. The distance in kilometers is available as the state of each {% term entity %}.

<p class='img'>
  <img src='/images/screenshots/usgs-earthquake-hazards-program-feed-map.png' />
</p>

The data is updated every 5 minutes.

## Configuration

To integrate the U.S. Geological Survey Earthquake Hazards Program feed, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
geo_location:
  - platform: usgs_earthquakes_feed
    feed_type: "past_day_all_earthquakes"
```

{% configuration %}
feed_type:
  description: The U.S. Geological Survey Earthquake Hazards Program provides 20 feeds covering different timeframes and magnitudes. You must select one of the feed types listed below.
  type: string
  required: true
minimum_magnitude:
  description: The minimum magnitude of an earthquake to be included.
  required: false
  type: float
  default: 0.0
radius:
  description: The distance in kilometers around Home Assistant's coordinates in which seismic events are included.
  required: false
  type: float
  default: 50.0
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

### Supported feed types

| Description                            | Feed Type                            |
| -------------------------------------- | ------------------------------------ |
| Past Hour - Significant Earthquakes    | `past_hour_significant_earthquakes`  |
| Past Hour - M4.5+ Earthquakes          | `past_hour_m45_earthquakes`          |
| Past Hour - M2.5+ Earthquakes          | `past_hour_m25_earthquakes`          |
| Past Hour - M1.0+ Earthquakes          | `past_hour_m10_earthquakes`          |
| Past Hour - All Earthquakes            | `past_hour_all_earthquakes`          |
| Past Day - Significant Earthquakes     | `past_day_significant_earthquakes`   |
| Past Day - M4.5+ Earthquakes           | `past_day_m45_earthquakes`           |
| Past Day - M2.5+ Earthquakes           | `past_day_m25_earthquakes`           |
| Past Day - M1.0+ Earthquakes           | `past_day_m10_earthquakes`           |
| Past Day - All Earthquakes             | `past_day_all_earthquakes`           |
| Past 7 Days - Significant Earthquakes  | `past_week_significant_earthquakes`  |
| Past 7 Days - M4.5+ Earthquakes        | `past_week_m45_earthquakes`          |
| Past 7 Days - M2.5+ Earthquakes        | `past_week_m25_earthquakes`          |
| Past 7 Days - M1.0+ Earthquakes        | `past_week_m10_earthquakes`          |
| Past 7 Days - All Earthquakes          | `past_week_all_earthquakes`          |
| Past 30 Days - Significant Earthquakes | `past_month_significant_earthquakes` |
| Past 30 Days - M4.5+ Earthquakes       | `past_month_m45_earthquakes`         |
| Past 30 Days - M2.5+ Earthquakes       | `past_month_m25_earthquakes`         |
| Past 30 Days - M1.0+ Earthquakes       | `past_month_m10_earthquakes`         |
| Past 30 Days - All Earthquakes         | `past_month_all_earthquakes`         |


## State attributes

The following state attributes are available for each {% term entity %} in addition to the standard ones:

| Attribute   | Description                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------- |
| latitude    | Latitude of the earthquake.                                                                  |
| longitude   | Longitude of the earthquake.                                                                 |
| source      | `usgs_earthquakes_feed` to be used in conjunction with `geo_location` automation trigger.    |
| external_id | The external ID used in the feed to identify the earthquake in the feed.                     |
| place       | Textual description of named geographic region near to the event.                            |
| magnitude   | Reported magnitude of the earthquake.                                                        |
| time        | Date and time when this event occurred.                                                      |
| updated     | Date and time when this event was most recently updated.                                     |
| status      | Indicates whether the event has been reviewed by a human: "automatic", "reviewed", "deleted" |
| type        | Type of seismic event: "earthquake" or "quarry".                                             |


## Full configuration

```yaml
# Example configuration.yaml entry
geo_location:
  - platform: usgs_earthquakes_feed
    feed_type: "past_month_all_earthquakes"
    radius: 50
    minimum_magnitude: 0.0
    latitude: 35.899722
    longitude: -120.432778
```
## Card example

Assuming you configure this service using `feed_type: past_week_all_earthquakes`, you can create a corresponding map card in a dashboard with the following card:
```yaml
type: map
geo_location_sources:
  - usgs_earthquakes_feed
entities:
  - zone.home
title: Nearby Earthquakes Last Week
```
