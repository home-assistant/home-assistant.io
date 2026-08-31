---
title: Map tiles
description: Serves the base map used by the Home Assistant map.
ha_category:
  - Other
ha_release: 2026.9
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: map_tiles
ha_integration_type: system
---

The **Map tiles** {% term integration %} serves the base map that you see behind the Home Assistant map, such as on the [map dashboard](/dashboards/dashboards/#map-dashboard) and the [map card](/dashboards/map/). It provides the streets, place names, and other map imagery that your entities are shown on top of.

The map imagery comes from the [OpenStreetMap Foundation](https://osmfoundation.org/). This integration fetches it on your behalf and caches it, so the map keeps working smoothly and remains available even when your internet connection is temporarily unavailable.

This integration is automatically loaded by Home Assistant and requires no configuration.
