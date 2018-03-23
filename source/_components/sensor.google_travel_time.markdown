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
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.19
---

Sensor to provide travel time from the [Google Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/).

You need to register for an API key by following the instructions [here](https://github.com/googlemaps/google-maps-services-python#api-keys). You only need to turn on the Distance Matrix API.

A free API Key allows 2500 requests per day. The sensor, by default, will update the travel time every 5 minutes.

```yaml
# Example entry for configuration.yaml
sensor:
  - platform: google_travel_time
    api_key: XXXX_XXXXX_XXXXX
    origin: Trondheim, Norway
    destination: Paris, France
```

Configuration variables:

- **api_key** (*Required*): Your application's API key (get one by following the instructions above). This key identifies your application for purposes of quota management.
- **origin** (*Required*): The starting point for calculating travel distance and time. You can supply one or more locations separated by the pipe character, in the form of an address, latitude/longitude coordinates, or a [Google place ID](https://developers.google.com/places/place-id). When specifying the location using a Google place ID, the ID must be prefixed with `place_id:`.
- **destination** (*Required*): One or more locations to use as the finishing point for calculating travel distance and time. The options for the destinations parameter are the same as for the origins parameter, described above.
- **name** (*Optional*): A name to display on the sensor. The default is "Google Travel Time - [Travel Mode]" where [Travel Mode] is the mode set in options for the sensor (see option "mode" below).
- **options** (*Optional*): A dictionary containing parameters to add to all requests to the Distance Matrix API. A full listing of available options can be found [here](https://developers.google.com/maps/documentation/distance-matrix/intro#RequestParameters).
  - **mode** (*Optional*): The travel mode used to calculate the directions / time. Can be `driving` (*Default*), `bicycling`, `transit` or `walking`.
  - **departure_time** (*Optional*): Can be `now`, a Unix timestamp, or a 24 hour time string like `08:00:00`. If you provide a time string, it will be combined with the current date to get travel time for that moment.
  - **arrival_time** (*Optional*): See notes above for `departure_time`. `arrival_time` can not be `now`, only a Unix timestamp or time string. You can not provide both `departure_time` and `arrival_time`. If you do provide both, `arrival_time` will be removed from the request.
  - **units** (*Optional*): Set the unit for the sensor in metric or imperial, otherwise the default unit the same as the unit set in `unit_system:`.
- **update_interval** (*Optional*): Minimum time interval between updates. Default is 5 minutes. Supported formats:
  - `update_interval: 'HH:MM:SS'`
  - `update_interval: 'HH:MM'`
  - Time period dictionary, e.g.:
    <pre>update_interval:
        # At least one of these must be specified:
        days: 0
        hours: 0
        minutes: 3
        seconds: 30
        milliseconds: 0
    </pre>

##### {% linkable_title Dynamic Configuration %}

Tracking can be setup to track entities of type device_tracker, zone, and sensor. If an entity is placed in the origin or destination then every 5 minutes when the component updates it will use the latest location of that entity.

```yaml
# Example entry for configuration.yaml
sensor:
  # Tracking entity to entity
  - platform: google_travel_time
    name: Phone To Home
    api_key: XXXX_XXXXX_XXXXX
    origin: device_tracker.mobile_phone
    destination: zone.home

  # Tracking entity to zone friendly name
  - platform: google_travel_time
    name: Home To Eddie's House
    api_key: XXXX_XXXXX_XXXXX
    origin: zone.home
    destination: Eddies House    # Friendly name of a zone
    
  # Tracking entity in imperial unit
  - platform: google_travel_time
    api_key: XXXX_XXXXX_XXXXX
    destination: zone.home
    options:
      units: imperial    # 'metric' for Metric, 'imperial' for Imperial
    
```

#### {% linkable_title Entity Tracking %}

- **device_tracker**
  - If state is a zone then the zone location will be used
  - If state is not a zone it will look for the longitude and latitude attributes
- **zone**
  - Uses the longitude and latitude attributes
  - Can also be referenced by just the zone's friendly name found in the attributes.
- **sensor**
  - If state is a zone or zone friendly name then will use the zone location
  - All other states will be passed directly into the google API
    - This includes all valid locations listed in the *Configuration Variables*
