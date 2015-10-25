---
layout: component
title: "Forecast.io"
description: "Instructions how to integrate Forecast.io within Home Assistant."
date: 2015-04-25 9:06
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Weather
featured: true
---


The forecast platform uses the [Forecast.io](https://forecast.io/) web service as a source for meteorological data for your location. The location is based on the Longitude and Latitude cooridinates configured in `configuration.yaml`.  The cooridinates are auto detected but to take advantage of the hyper-local weather reported by forecast.io, you can refine them down to your exact home address.  GPS cooridinates can be found by using Google Maps and clicking on your home.

You need an API key which is free but requires a [registration](https://developer.forecast.io/register). You can make 1000 requests per day. This means that you could create approximately every 1.4 minute one.

To add Forecast.io to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: forecast
  api_key: YOUR_APP_KEY
  monitored_conditions:
    - summary
    - icon
    - nearest_storm_distance
    - nearest_storm_bearing
    - precip_type
    - precip_intensity
    - precip_probability
    - temperature
    - apparent_temperature
    - dew_point
    - wind_speed
    - wind_bearing
    - cloud_cover
    - humidity
    - pressure
    - visibility
    - ozone
```

Configuration variables:

- **api_key** (*Required*): Your API key for http://forecast.io/. 
- **monitored_conditions** array (*Required*): Conditions to display in the frontend.
  - **summary**: A human-readable text summary.
  - **precip_type**: The type of precipitation occurring.
  - **precip_intensity**: The average expected intensity of precipitation occurring.
  - **temperature**: The current temperature.
  - **dew_point**: The dew point.
  - **wind_speed**: The wind speed.
  - **wind_bearing**: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise.
  - **cloud_cover**: The percentage of sky occluded by clouds.
  - **humidity**: The relative humidity.
  - **pressure**: The sea-level air pressure in millibars.
  - **visibility**: The average visibility.
  - **ozone**: The columnar density of total atmospheric ozone in Dobson.
- **units** (*Optional*): Specify the unit system. Default to `si` or `us` based on the temperature preference in Home Assistant. Other options are auto, us, si, ca, and uk2.
`auto` will let forecast.io decide the unit system based on location.

Details about the API are available in the [Forecast.io documentation](https://developer.forecast.io/docs/v2).
