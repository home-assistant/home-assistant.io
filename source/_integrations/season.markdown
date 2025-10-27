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

To cut a long read short, Astronomical gives seasons based on the shortest/longest day and equinoxes. So in the Northern Hemisphere spring starts on 20 March. Meteorological gives seasons based on months so in the Northern Hemisphere spring starts on 1 March.
