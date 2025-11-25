---
title: Queensland Bushfire Alert
description: Instructions on how to integrate the Queensland Bushfire Alert feed into Home Assistant.
ha_category:
  - Geolocation
ha_iot_class: Cloud Polling
ha_release: 0.95
ha_codeowners:
  - '@exxamalte'
ha_domain: qld_bushfire
ha_platforms:
  - geo_location
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `qld_bushfire` platform lets you integrate a 
GeoRSS feed containing [bushfire alerts](https://www.qfes.qld.gov.au/Current-Incidents) for Queensland. It retrieves alerts from a feed 
and shows information of those alerts filtered by distance to Home Assistant's 
location.

Entities are generated, updated and removed automatically with each update 
from the feed. Each entity defines latitude and longitude and will be shown 
on the default map automatically, or on a map card by defining the source 
`qld_bushfire`. The distance in kilometers is available as the state 
of each entity.

<p class='img'>
  <img src='/images/screenshots/qld-bushfire-feed-map.png' />
</p>

The data is updated every 5 minutes.

{% note %}
The material used by this integration is provided under the [Creative Commons Attribution 4.0 license](https://creativecommons.org/licenses/by/4.0/legalcode).
It has only been modified for the purpose of presenting the material in Home Assistant.
Please refer to the [creator's copyright notice](https://www.qfes.qld.gov.au/copyright) for more information.
{% endnote %}

## Configuration

To integrate the Queensland Bushfire Alert feed, add the following lines to 
your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
geo_location:
  - platform: qld_bushfire
```

{% configuration %}
categories:
  description: List of category names found in the feed. Only alerts from the feed that match any of these categories are included. Valid categories are 'Emergency Warning', 'Watch and Act', 'Advice', 'Notification' and 'Information'.
  required: false
  type: list
radius:
  description: The distance in kilometers around Home Assistant's coordinates in which bushfire alerts are included.
  required: false
  type: float
  default: 20.0
latitude:
  description: Latitude of the coordinates around which events are considered.
  required: false
  type: string
  default: Latitude defined in your configuration
longitude:
  description: Longitude of the coordinates around which events are considered.
  required: false
  type: string
  default: Longitude defined in your configuration
{% endconfiguration %}


## State attributes

The following state attributes are available for each entity in addition to 
the standard ones:

| Attribute        | Description                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| latitude         | Latitude of the bushfire alert.                                                  |
| longitude        | Longitude of the bushfire alert.                                                 |
| source           | `qld_bushfire` to be used in conjunction with `geo_location` automation trigger. |
| external_id      | The external ID used in the feed to identify the bushfire alert in the feed.     |
| title            | Original title from the feed.                                                    |
| publication_date | Date and time when this alert was first published.                               |
| updated_date     | Date and time when this alert was last updated.                                  |
| status           | Status of the alert, for example, "Patrolled", "Going", "Contained"              |

## Full configuration

```yaml
# Example configuration.yaml entry
geo_location:
  - platform: qld_bushfire
    radius: 30
    categories:
      - 'Emergency Warning'
      - 'Watch and Act'
    latitude: -24.85
    longitude: 152.35
```
