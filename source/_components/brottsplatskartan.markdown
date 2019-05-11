---
layout: page
title: "Brottsplatskartan"
description: "Instructions on how to integrate brottsplatskartan.se into Home Assistant."
date: 2019-05-11 22:30
sidebar: true
comments: false
sharing: true
footer: true
ha_category:
  - Social
logo: brottsplatskartan.png
ha_release: 0.94
ha_iot_class: Cloud Polling
redirect_from:
 - /components/sensor.brottsplatskartan/
---

The `brottsplatskartan` sensor allows one to track reported incidents occurring in a given area. Incidents include anything reported to [Brottsplatskartan](https://brottsplatskartan.se). The sensor only counts incidents from the current day.

## {% linkable_title Configuration %}

To enable component and sensor, add the following lines to your `configuration.yaml`.

```yaml
brottsplatskartan:
  areas:
    - Stockholms län
    - Hallands län
  sensor:
    monitored_conditions:
       - counter
```

{% configuration %}
name:
  description: Custom name for the component.
  required: false
  type: string
  default: Brottsplatskartan
areas:
  description: Areas for component to monitor
  required: false
  type: list
latitude:
  description: Latitude for component.
  required: false
  default: Your home zone latitude defined in your configuration.
longitude:
  description: Longitude for component.
  required: false
  default: Your home zone longitude defined in your configuration.
{% endconfiguration %}


## {% linkable_title Notes %}

### {% linkable_title Areas %}

Brottsplatskartan captures all incidents in regions, e.g Stockholms län. If areas parameter is defined, any latitude and longitude parameters are ignored.

Allowed areas: https://brottsplatskartan.se/api/areas


### {% linkable_title Latitude and Longitude %}

The radius is set to 5 km when using latitude and longitude to monitor an area. It's not possible to explicitly set radius to another value.
