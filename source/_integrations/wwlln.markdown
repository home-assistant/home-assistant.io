---
title: World Wide Lightning Location Network (WWLLN)
description: Instructions on how to integrate WWLLN within Home Assistant.
ha_category: Geolocation
ha_release: 0.96
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: wwlln
---

The `wwlln` integration displays lightning strike information from the
[World Wide Lightning Location Network (WWLLN)](https://wwlln.net/).

Entities are generated, updated and removed automatically with each update
from the feed. Each entity defines latitude and longitude and will be shown
on the default map automatically, or on a map card by defining the source
`wwlln`. The distance (in kilometers or miles, depending on your unit system)
is available as the state of each entity.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/wwlln-feed-map.png' />
</p>

New data is fetched every 10 minutes. Because data from the WWLLN may vary in terms
of how real-time it is, the default `window` parameter is set to 1 hour to ensure that as
many strikes are caught as possible.

## Configuration

To retrieve data from the WWLLN, edit your `configuration.yaml` file manually or use the "Integrations" feature in the GUI, you find it under Configurations - Integrations.

To manually add the component, add the following to your `configuration.yaml`:

```yaml
wwlln:
```

{% configuration %}
latitude:
  description: The latitude you want to monitor; defaults to the value defined in `configuration.yaml`.
  required: false
  type: float
longitude:
  description: The longitude you want to monitor; defaults to the value defined in `configuration.yaml`.
  required: false
  type: float
radius:
  description: The radius around your location to monitor; defaults to 25 km or mi (depending on the unit system defined in your `configuration.yaml`).
  required: false
  type: integer
window:
  description: The amount of time before now for which strikes should be considered "active" and shown in the UI. Note that a window of less than 1 hour may cause Home Assistant to miss events.
  required: false
  type: time
  default: 10 minutes
{% endconfiguration %}

## State Attributes

The following state attributes are available for each entity in addition to
the standard ones:

| Attribute        | Description                                                                   |
| ---------------- | ----------------------------------------------------------------------------- |
| latitude         | Latitude of the lightning strike.                                             |
| longitude        | Longitude of the lightning strike.                                            |
| source           | `wwlln` to be used in conjunction with the `geo_location` automation trigger. |
| external_id      | The external ID used in the feed to identify the lightning strike in the feed.      |
| publication_date | Date and time when this event occurred.                                       |

## Full Configuration

```yaml
# Example configuration.yaml entry
wwlln:
  radius: 100
  latitude: 37.39
  longitude: -5.99
```
