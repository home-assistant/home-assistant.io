---
title: Global Disaster Alert and Coordination System (GDACS)
description: Instructions on how to integrate the Global Disaster Alert and Coordination System (GDACS) feed into Home Assistant.
ha_category:
  - Geolocation
ha_iot_class: Cloud Polling
ha_release: 0.106
ha_config_flow: true
ha_codeowners:
  - '@exxamalte'
ha_domain: gdacs
ha_platforms:
  - diagnostics
  - geo_location
  - sensor
ha_integration_type: service
---

The `gdacs` integration lets you use a GeoRSS feed provided by [GDACS](https://www.gdacs.org/) with information about major droughts, earthquakes, floods, tropical cyclones, tsunamis and volcanic activities worldwide.
It retrieves alerts from a feed and shows information of those alerts filtered by distance to Home Assistant's location.
The filter is set in the configuration as categories, radius (kilometers or miles based on unit system set in Home Assistant), latitude and longitude.

Entities are generated, updated and removed automatically with each update from the feed. Each entity defines latitude and longitude and will be shown on the default map automatically, or on a map card by defining the source `gdacs`. The distance is available as the state of each entity converted to the configured unit system (kilometers or miles).

<p class='img'>
  <img src='/images/screenshots/gdacs-alerts-feed-map.png' />
</p>

The data is updated every 5 minutes.

{% note %}

The material used by this integration is provided by the [Global Disaster Alert and Coordination System (GDACS)](https://www.gdacs.org/) - a cooperation framework between the United Nations and the European Commission - under the [Creative Commons Attribution 4.0 International (CC BY 4.0) license](https://creativecommons.org/licenses/by/4.0/).
It has only been modified for the purpose of presenting the material in Home Assistant.
Please refer to the [creator's disclaimer and terms of use notice](https://www.gdacs.org/About/termofuse.aspx) for more information.

{% endnote %}

{% include integrations/config_flow.md %}

## State attributes

The following state attributes are available for each entity in addition to the standard ones:

| Attribute        | Description |
|------------------|-------------|
| latitude         | Latitude of the alert's location. |
| longitude        | Longitude of the alert's location. |
| source           | `gdacs` to be used in conjunction with `geo_location` automation trigger. |
| external_id      | The external ID used in the feed to identify the alert. |
| title            | Title of this entry. |
| description      | Description of this entry. |
| event type       | Type of event this alert is for (Drought, Earthquake, Flood, Tropical Cyclone, Tsunami, Volcano). |
| alert level      | Alert level (Red, Orange, Green). |
| country          | Country that the alert is applicable to. |
| duration in week | Duration of the alert in full weeks (only shown if more than one week). |
| from date        | Date and time this alert started. |
| to date          | Date and time this alert ended (or now if ongoing). |
| population       | Exposed population. |
| severity         | Severity of the alert. |
| vulnerability    | Vulnerability score (textual or numerical). |

Please note that some of the attribute values depend on the context and may not
be comparable between different event types.

## Sensor

This integration automatically creates a sensor that shows how many entities
are currently managed by this integration. In addition to that the sensor has
some useful attributes that indicate the currentness of the data retrieved
from the feed.

<p class='img'>
  <img src='/images/screenshots/gdacs-alerts-sensor.png' />
</p>

| Attribute              | Description |
|------------------------|-------------|
| status                 | Status of last update from the feed ("OK" or "ERROR").  |
| last update            | Timestamp of the last update from the feed.  |
| last update successful | Timestamp of the last successful update from the feed.  |
| last timestamp         | Timestamp of the latest entry from the feed.  |
| created                | Number of entities that were created during last update (optional).  |
| updated                | Number of entities that were updated during last update (optional).  |
| removed                | Number of entities that were removed during last update (optional).  |
