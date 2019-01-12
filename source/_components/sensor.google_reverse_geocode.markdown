---
layout: page
title: "Google Reverse Geocode"
description: "Instructions on how to use reverse geocode device_trackers"
date: 2019-01-11 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: google_maps.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.86
---

The `google_reverse_geocode` sensor provides converts GPS co-ordinates to human readable addresses using Google Geocoding API

## {% linkable_title Setup %}

You need to register for an API key by following the instructions [here](https://github.com/googlemaps/google-maps-services-python#api-keys). For this component, you only need to turn on the Geocoding API.

[Google now requires billing](https://mapsplatform.googleblog.com/2018/05/introducing-google-maps-platform.html) to be enabled (and a valid credit card loaded) to access Google Maps APIs. Free calls limited to 2500 requests per day (you will see charges in your billing, but upto $200(avg. 2500 requests/day) will be credited back). 

The component will automatically detect all device_tracker components and create a sensor for each of them. It will also adjust the scan interval depending on the number of device sensors. This roughly translates to 1 call per device every 30 seconds. If you have 5 device_trackers, it will update 30*5, every 150 seconds. 

A quota can be set against the API to avoid exceeding the free credit amount. Details on how to configure a quota can be found [here](https://developers.google.com/maps/documentation/geocoding/usage-and-billing#set-caps)

If you have a picture set for your device tracker (in known_devices.yaml), it will associate the same picture to the sensor.

## {% linkable_title Configuration %}

To enable the sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example entry for configuration.yaml
sensor:
  - platform: google_reverse_geocode
    api_key: XXXX_XXXXX_XXXXX
```

{% configuration %}
api_key:
  description: Your application's API key (get one by following the instructions above). This key identifies your application for purposes of quota management.
  required: true
  type: string
{% endconfiguration %}
