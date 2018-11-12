---
layout: page
title: "Météo-France"
description: "Instructions on how to integrate Météo-France within Home Assistant."
date: 2018-10-18 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: meteo-france.png
ha_category: Weather
ha_release: 0.83
ha_iot_class: "Cloud Polling"
---

The `meteo_france` platform uses the [Météo-France](http://www.meteofrance.com/) web service as a source for meteorological data for your location. The location is based on the `postal_code` configured in your `configuration.yaml` file.

It displays the current weather along with a 4 days forecast.

## {% linkable_title Configuration %}

To add Météo-France to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: meteo_france
    postal_code: '76000'
```

{% configuration %}
  postal_code:
    description: Postal code of the city.
    required: true
    type: string
{% endconfiguration %}
