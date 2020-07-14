---
title: Season
description: Instructions on how to add season sensors into Home Assistant.
ha_category:
  - Utility
ha_iot_class: Local Polling
ha_release: 0.53
ha_quality_scale: internal
ha_domain: season
---

The `season` sensor will display the current astronomical or meteorological season (Spring, Summer, Autumn, Winter) based on the user's setting in the configuration file.

For information on the difference between astronomical and meteorological seasons please see the link below:

- [https://www.ncei.noaa.gov/news/meteorological-versus-astronomical-seasons](https://www.ncei.noaa.gov/news/meteorological-versus-astronomical-seasons)

All information about how the seasons work was taken from Wikipedia:

- [https://en.wikipedia.org/wiki/Season#Astronomical](https://en.wikipedia.org/wiki/Season#Astronomical)
- [https://en.wikipedia.org/wiki/Equinox](https://en.wikipedia.org/wiki/Equinox)
- [https://en.wikipedia.org/wiki/Solstice](https://en.wikipedia.org/wiki/Solstice)

## Configuration

To enable the sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: season
```

{% configuration %}
type:
  description: "Type of season definition. Options are `meteorological` or `astronomical`."
  required: false
  type: string
  default: astronomical
name:
  description: "An identifier for the sensor in the frontend."
  required: false
  type: string
  default: Season
{% endconfiguration %}
