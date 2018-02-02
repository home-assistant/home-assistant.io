---
layout: page
title: "Dark Sky Sensor"
description: "How to integrate Dark Sky within Home Assistant."
date: 2016-09-26 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: dark_sky.png
ha_category: Weather
featured: true
ha_release: "0.30"
redirect_from: /components/sensor.forecast/
ha_iot_class: "Cloud Polling"
---

The `darksky` platform uses the [Dark Sky](https://darksky.net/) web service as a source for meteorological data for your location. The location is based on the `longitude` and `latitude` coordinates configured in your `configuration.yaml` file. The coordinates are auto-detected but to take advantage of the hyper-local weather reported by Dark Sky, you can refine them down to your exact home address. GPS coordinates can be found by using [Google Maps](https://www.google.com/maps) and clicking on your home or [Openstreetmap](http://www.openstreetmap.org/).

You need an API key which is free but requires [registration](https://darksky.net/dev/register). You can make up to 1000 calls per day for free which means that you could make one approximately every 86 seconds.

<p class='note warning'>
[Dark Sky](https://darksky.net/dev/) will charge you $0.0001 per API call if you enter your credit card details and create more than 1000 calls per day.
</p>

To add Dark Sky to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: darksky
    api_key: YOUR_API_KEY
    monitored_conditions:
      - summary
      - icon
      - nearest_storm_distance
```

Configuration variables:

- **api_key** (*Required*): Your API key.
- **name** (*Optional*): Additional name for the sensors. Default to platform name.
- **forecast** array (*Optional*): List of days in the 7 day forecast you would like to receive data on, starting with tomorrow as day 1. Any `monitored_condition` with a daily forecast by DarkSky will generate a sensor tagged with `_<day>`.
- **latitude** (*Optional*): Latitude coordinate to monitor weather of (required if **longitude** is specified), defaults to coordinates defined in your `configuration.yaml`
- **longitude** (*Optional*): Longitude coordinate to monitor weather of (required if **latitude** is specified), defaults to coordinates defined in your `configuration.yaml`
- **monitored_conditions** array (*Required*): Conditions to display in the frontend.
  - **summary**: A human-readable text summary of the current conditions.
  - **precip_type**: The type of precipitation occurring.
  - **precip_intensity**: The average expected intensity of precipitation occurring.
  - **precip_probability**: A value between 0 and 1 which is representing the probability of precipitation.
  - **precip_accumulation**: Daily snow accumulation. Returns unknown if no snow accumulation available.
  - **temperature**: The current temperature.
  - **apparent_temperature**: A numerical value representing the apparent (or "feels like") temperature.
  - **dew_point**: The dew point.
  - **wind_speed**: The wind speed.
  - **wind_bearing**: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise.
  - **cloud_cover**: The percentage of sky occluded by clouds.
  - **humidity**: The relative humidity.
  - **pressure**: The sea-level air pressure in millibars.
  - **visibility**: The average visibility.
  - **ozone**: The columnar density of total atmospheric ozone in Dobson.
  - **minutely_summary**: A human-readable text summary for the next hour.
  - **hourly_summary**: A human-readable text summary for the next 24 hours.
  - **daily_summary**: A human-readable text summary for the next 7 days.
  - **temperature_max**: Today's expected high temperature.
  - **temperature_min**: Today's expected low temperature.
  - **apparent_temperature_max**: Today's expected apparent high temperature.
  - **apparent_temperature_min**: Today's expected apparent low temperature.
  - **precip_intensity_max**: Today's expected maximum intensity of precipitation.
  - **uv_index**: The current UV index.
- **units** (*Optional*): Specify the unit system. Default to `si` or `us` based on the temperature preference in Home Assistant. Other options are `auto`, `us`, `si`, `ca`, `uk` and `uk2`.
`auto` will let Dark Sky decide the unit system based on location.
- **update_interval** (*Optional*): Minimum time interval between updates. Default is 2 minutes. Supported formats:
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

<p class='note warning'>
While the platform is called "darksky" the sensors will show up in Home Assistant as "dark_sky" (eg: sensor.dark_sky_summary).
</p>

Details about the API are available in the [Dark Sky documentation](https://darksky.net/dev/docs).
