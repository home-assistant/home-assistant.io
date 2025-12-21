---
title: IGN Sismología
description: Instructions on how to integrate the Instituto Geográfico Nacional Sismología (Earthquakes) Feed feed into Home Assistant.
ha_category:
  - Geolocation
ha_iot_class: Cloud Polling
ha_release: 0.92
ha_codeowners:
  - '@exxamalte'
ha_domain: ign_sismologia
ha_platforms:
  - geo_location
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `ign_sismologia` {% term integration %} lets you integrate a GeoRSS feed provided by the 
Spanish [Instituto Geográfico Nacional](https://www.ign.es/) with information 
about seismic events like earthquakes on the Iberian Peninsula and Canary 
Islands. It retrieves incidents from a feed and shows information of those 
incidents filtered by distance to Home Assistant's location.

Entities are generated, updated and removed automatically with each update 
from the feed. Each entity defines latitude and longitude and will be shown 
on the default map automatically, or on a map card by defining the source 
`ign_sismologia`. The distance in kilometers is available as the state 
of each entity.

<p class='img'>
  <img src='/images/screenshots/ign-sismologia-feed-map.png' />
</p>

The data is updated every 5 minutes.

## Configuration

To integrate the IGN Sismología feed, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
geo_location:
  - platform: ign_sismologia
```

{% configuration %}
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


## State Attributes

The following state attributes are available for each entity in addition to 
the standard ones:

| Attribute        | Description                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| latitude         | Latitude of the earthquake.                                                                                           |
| longitude        | Longitude of the earthquake.                                                                                          |
| source           | `ign_sismologia` to be used in conjunction with `geo_location` automation trigger.                                    |
| external_id      | The external ID used in the feed to identify the earthquake in the feed.                                              |
| title            | Original title from the feed.                                                                                         |
| region           | Textual description of named geographic region near to the event.                                                     |
| magnitude        | Reported magnitude of the earthquake.                                                                                 |
| publication_date | Date and time when this event occurred.                                                                               |
| image_url        | URL to a map supplied in the feed marking the location of the event. This could for example be used in notifications. |


## Full Configuration

```yaml
# Example configuration.yaml entry
geo_location:
  - platform: ign_sismologia
    radius: 100
    minimum_magnitude: 2.0
    latitude: 37.39
    longitude: -5.99
```
