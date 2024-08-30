---
title: GeoJSON
description: Instructions on how to integrate GeoJSON feeds into Home Assistant.
ha_category:
  - Geolocation
ha_iot_class: Cloud Polling
ha_release: 0.79
ha_config_flow: true
ha_codeowners:
  - '@exxamalte'
ha_domain: geo_json_events
ha_platforms:
  - geo_location
ha_integration_type: service
---

The GeoJSON integration lets you ingest events from GeoJSON feeds. It retrieves events from a feed and shows information of those events filtered by distance to Home Assistant's location.
All entries in the GeoJSON feed must define a `geometry` which typically is a point or polygon with geo coordinates. In addition, this platform will look for a `title` key in the entry's `properties` and use that as the entity's name.

Entities are generated, updated and removed automatically with each update from the GeoJSON feed. Each entity defines latitude and longitude and will be shown on the map automatically. The distance in kilometers is available as the state of each entity.

The data is updated every 5 minutes.

{% include integrations/config_flow.md %}

## State attributes

The following state attributes are available for each entity in addition to the standard ones:

| Attribute   | Description                                                                         |
|-------------|-------------------------------------------------------------------------------------|
| latitude    | Latitude of the event.                                                              |
| longitude   | Longitude of the event.                                                             |
| source      | `geo_json_events` to be used in conjunction with `geo_location` automation trigger. |
| external_id | The external ID used in the feed to identify the event in the feed.                 |
