---
layout: page
title: "Google Maps Travel Time"
description: "Instructions on how to add Google Maps travel time to Home Assistant."
date: 2016-03-28 10:19
sidebar: true
comments: false
sharing: true
footer: true
logo:
ha_category: Sensor
ha_iot_class: "Cloud Polling"
ha_release: 0.19
---

Sensor to provide travel time from Google maps api.

Get an api key [here](https://github.com/googlemaps/google-maps-services-python#api-keys).

```yaml
# Example entry for configuration.yaml
sensor:
    platform: google_travel_time
    api_key: XXXX_XXXXX_XXXXX
    origin: Trondheim, Norway
    destination: Paris, France
    travel_mode: bicycling # can be ["driving", "walking", "bicycling", "transit"]
```
