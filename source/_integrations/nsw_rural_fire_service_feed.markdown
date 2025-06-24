---
title: NSW Rural Fire Service Incidents
description: Instructions on how to integrate the NSW Rural Fire Service Incidents feed into Home Assistant.
ha_category:
  - Geolocation
ha_iot_class: Cloud Polling
ha_release: 0.81
ha_codeowners:
  - '@exxamalte'
ha_domain: nsw_rural_fire_service_feed
ha_platforms:
  - geo_location
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `nsw_rural_fire_service_feed` platform lets you integrate a GeoJSON feed provided by the [NSW Rural Fire Service](https://www.rfs.nsw.gov.au/fire-information/fires-near-me) with information about bush fires, grass fires, hazard reductions and more. It retrieves incidents from a feed and shows information of those incidents filtered by distance to Home Assistant's location.

<p class='img'>
  <img src='/images/screenshots/nsw-rural-fire-service-feed-entities.png' />
</p>

Entities are generated, updated and removed automatically with each update from the feed. Each entity defines latitude and longitude and will be shown on the map automatically. The distance in kilometers is available as the state of each entity.

<p class='img'>
  <img src='/images/screenshots/nsw-rural-fire-service-feed-map.png' />
</p>

For example, you can use the entity's information to trigger actions based on the proximity and severity of a fire incident. You can set up automations to close windows, activate sprinklers or remind yourself to clean the gutters if there is a fire in your area.

The data is updated every 5 minutes.

## Configuration

To integrate the NSW Rural Fire Service Incidents feed, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
geo_location:
  - platform: nsw_rural_fire_service_feed
```

{% configuration %}
radius:
  description: The distance in kilometers around Home Assistant's coordinates in which incidents are included.
  required: false
  type: float
  default: 20.0
categories:
  description: List of incident category names found in the feed. Only incidents from the feed that match any of these categories are included. Valid categories are 'Emergency Warning', 'Watch and Act', 'Advice', 'Not Applicable'.
  required: false
  type: list
  default: None. Any incident regardless of its category will be included.
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

| Attribute          | Description                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| latitude           | Latitude of the incident.                                                                       |
| longitude          | Longitude of the incident.                                                                      |
| source             | `nsw_rural_fire_service_feed` to be used in conjunction with `geo_location` automation trigger. |
| external_id        | The external ID used in the feed to identify the incident in the feed.                          |
| category           | One of 'Emergency Warning', 'Watch and Act', 'Advice', 'Not Applicable'.                        |
| location           | Location details of where the incident takes place.                                             |
| publication_date   | Date and time when this incident was last updated.                                              |
| council_area       | Council area in which this incident takes place.                                                |
| status             | One of 'Under Control', 'Being Controlled', 'Out of Control'.                                   |
| type               | Incident type, for example 'Bush Fire', 'Grass Fire' or 'Hazard Reduction'.                     |
| fire               | `True` if this incident is a fire, `False` otherwise.                                           |
| size               | Size in hectare                                                                                 |
| responsible_agency | Agency responsible for this incident.                                                           |

## Advanced Configuration Example

Depending on your personal circumstances with regards to bush fire risk you may want to adjust the radius and define the categories of fire warnings you are actually interested in.

```yaml
# Example configuration.yaml entry
geo_location:
  - platform: nsw_rural_fire_service_feed
    entity_namespace: "nsw_fire_service_feed"
    radius: 10
    categories:
      - 'Emergency Warning'
      - 'Watch and Act'
      - 'Advice'
```
