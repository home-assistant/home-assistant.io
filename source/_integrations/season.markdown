---
title: Season
description: Instructions on how to add season sensors into Home Assistant.
ha_category:
  - Sensor
  - Utility
ha_iot_class: Local Polling
ha_release: 0.53
ha_quality_scale: internal
ha_domain: season
ha_config_flow: true
ha_platforms:
  - sensor
ha_codeowners:
  - '@frenck'
ha_integration_type: service
---

The season integration will provide the current astronomical or meteorological season (Spring, Summer, Autumn, Winter)
as a sensor.

{% include integrations/config_flow.md %}

For information on the difference between astronomical and meteorological seasons please see the link below:

- [https://www.ncei.noaa.gov/news/meteorological-versus-astronomical-seasons](https://www.ncei.noaa.gov/news/meteorological-versus-astronomical-seasons)

All information about how the seasons work was taken from Wikipedia:

- [https://en.wikipedia.org/wiki/Season#Astronomical](https://en.wikipedia.org/wiki/Season#Astronomical)
- [https://en.wikipedia.org/wiki/Equinox](https://en.wikipedia.org/wiki/Equinox)
- [https://en.wikipedia.org/wiki/Solstice](https://en.wikipedia.org/wiki/Solstice)

Astronomical seasons change on solstices and equinoxes. For example, the June solstice in 2025 occurs on June 21 at 02:42 UTC, marking the beginning of Summer in the Northern Hemisphere and Winter in the Southern Hemisphere.

Meteorological seasons change at the beginning of a calendar month. Each year, at midnight local time on June 1, Summer begins in the Northern Hemisphere and Winter begins in the Southern Hemisphere.
