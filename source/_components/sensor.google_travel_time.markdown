---
layout: page
title: "Google Maps Travel Time"
description: "Instructions on how to add Google Maps travel time to Home Assistant."
date: 2016-03-28 10:19
sidebar: true
comments: false
sharing: true
footer: true
logo: google_maps.png
ha_category: Sensor
ha_iot_class: "Cloud Polling"
ha_release: 0.19
---

Sensor to provide travel time from the [Google Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/).

You need to register for an API key by following the instructions [here](https://github.com/googlemaps/google-maps-services-python#api-keys). You only need to turn on the Distance Matrix API.

A free API Key allows 2500 requests per day. The sensor will update the travel time every 5 minutes.

```yaml
# Example entry for configuration.yaml
sensor:
    platform: google_travel_time
    name: Google Travel Time
    api_key: XXXX_XXXXX_XXXXX
    origin: Trondheim, Norway
    destination: Paris, France
    options:
      ...
```

Configuration variables:

- **api_key** (*Required*): Your application's API key (get one by following the instructions above). This key identifies your application for purposes of quota management.
- **origin** (*Required*): The starting point for calculating travel distance and time. You can supply one or more locations separated by the pipe character, in the form of an address, latitude/longitude coordinates, or a Google place ID.
- **destination** (*Required*): One or more locations to use as the finishing point for calculating travel distance and time. The options for the destinations parameter are the same as for the origins parameter, described above.
- **name** (*Optional*): A name to display on the sensor. The default is "Google Travel Time - <Transit Mode>" where transit mode is the mode set in options for the sensor (if no mode is set, the default is driving).
- **options** (*Optional*): A dictionary containing parameters to add to all requests to the Distance Matrix API. A full listing of available options can be found [here](https://developers.google.com/maps/documentation/distance-matrix/intro#RequestParameters).
  - **departure_time** (*Optional*): Can be `now`, a Unix timestamp, or a 24 hour time string like `08:00:00`. If you provide a time string, it will be combined with the current date to get travel time for that moment.
  - **arrival_time** (*Optional*): See notes above for `departure_time`. `arrival_time` can not be `now`, only a Unix timestamp or time string. You can not provide both `departure_time` and `arrival_time`. If you do provide both, `arrival_time` will be removed from the request.
