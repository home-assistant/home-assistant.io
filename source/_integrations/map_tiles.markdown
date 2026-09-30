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

The **Map tiles** {% term integration %} serves the base map that you see behind the Home Assistant map, such as on the [Map dashboard](/dashboards/dashboards/#map-dashboard) and the [Map card](/dashboards/map/). It provides the streets, place names, and other map imagery that your entities are shown on top of.

The map tiles come from the [OpenStreetMap Foundation](https://osmfoundation.org/) tile servers and are based on OpenStreetMap data from its contributors. This integration proxies those requests and caches recently used tiles in memory to improve performance and help keep the map usable during brief upstream or internet outages.

This integration is automatically loaded by Home Assistant and requires no configuration.
