---
layout: page
title: "Season Sensor"
description: "Instructions on how to add season sensors into Home Assistant."
date: 2017-07-04 07:00:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Utility
logo: home-assistant.png
ha_iot_class: "Local Polling"
ha_release: 0.53
ha_qa_scale: internal
---

The `season` sensor will display the current astronomical or meteorological season (Spring, Summer, Autumn, Winter) based on the user's setting in the configuration file.

All information about how the seasons work was taken from Wikipedia:

 - [https://en.wikipedia.org/wiki/Season#Astronomical](https://en.wikipedia.org/wiki/Season#Astronomical)
 - [https://en.wikipedia.org/wiki/Equinox](https://en.wikipedia.org/wiki/Equinox)
 - [https://en.wikipedia.org/wiki/Solstice](https://en.wikipedia.org/wiki/Solstice)

## {% linkable_title Configuration %}

To enable the sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: season
    type: astronomical
```

{% configuration %}
type:
  description: "Type of season definition. Options are `meteorological` or `astronomical`."
  required: false
  type: string
  default: astronomical
{% endconfiguration %}

