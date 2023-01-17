---
title: NSW Rural Fire Service Incidents
description: Instructions on how to integrate the NSW Rural Fire Service Incidents feed into Home Assistant.
ha_category:
  - Geolocation
ha_iot_class: Cloud Polling
ha_release: 0.81
ha_config_flow: true
ha_codeowners:
  - '@exxamalte'
ha_domain: nsw_rural_fire_service_feed
ha_platforms:
  - geo_location
ha_integration_type: service
---

The `nsw_rural_fire_service_feed` platform lets you integrate a GeoJSON feed provided by the [NSW Rural Fire Service](https://www.rfs.nsw.gov.au/fire-information/fires-near-me) with information about bush fires, grass fires, hazard reductions and more. It retrieves incidents from a feed and shows information of those incidents filtered by distance to Home Assistant's location.

<p class='img'>
  <img src='/images/screenshots/nsw-rural-fire-service-feed-entities.png' />
</p>

Entities are generated, updated and removed automatically with each update from the feed. Each entity defines latitude and longitude and will be shown on the map automatically. The distance in kilometers is available as the state of each entity.

<p class='img'>
  <img src='/images/screenshots/nsw-rural-fire-service-feed-map.png' />
</p>

The entity's information can be used for example if a bush fire that produces smoke or embers is reported close to your home, and you want to automatically close windows, turn on a sprinkler system or simply send yourself a reminder to clean the gutters from dry leaves.

The data is updated every 5 minutes.

{% include integrations/config_flow.md %}

## State Attributes

The following state attributes are available for each entity in addition to the standard ones:

| Attribute          | Description |
|--------------------|-------------|
| latitude           | Latitude of the incident. |
| longitude          | Longitude of the incident. |
| source             | `nsw_rural_fire_service_feed` to be used in conjunction with `geo_location` automation trigger. |
| external_id        | The external ID used in the feed to identify the incident in the feed. |
| category           | One of 'Emergency Warning', 'Watch and Act', 'Advice', 'Not Applicable'. |
| location           | Location details of where the incident takes place. |
| publication_date   | Date and time when this incident was last updated. |
| council_area       | Council area in which this incident takes place. |
| status             | One of 'Under Control', 'Being Controlled', 'Out of Control'. |
| type               | Incident type, for example 'Bush Fire', 'Grass Fire' or 'Hazard Reduction'. |
| fire               | `True` if this incident is a fire, `False` otherwise. |
| size               | Size in hectare |
| responsible_agency | Agency responsible for this incident. |
