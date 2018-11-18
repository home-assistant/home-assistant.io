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
featured: false
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

{% configuration %}
api_key:
  description: Your API key.
  required: true
  type: string
name:
  description: Additional name for the sensors.
  required: false
  default: Dark Sky
  type: string
forecast:
  description: List of days in the 7 day forecast you would like to receive data on, starting with tomorrow as day 1. Any `monitored_condition` with a daily forecast by DarkSky will generate a sensor tagged with `_<day>`.
  required: false
  type: list
language:
  description: The desired language of the summary properties. The valid options are further down in a table.
  required: false
  default: "`en`"
  type: string
latitude:
  description: Latitude coordinate to monitor weather of (required if **longitude** is specified).
  required: false
  default: coordinates defined in your `configuration.yaml`
  type: float
longitude:
  description: Longitude coordinate to monitor weather of (required if **latitude** is specified).
  required: false
  default: coordinates defined in your `configuration.yaml`
  type: float
monitored_conditions:
  description: Conditions to display in the frontend.
  required: true
  type: list
  keys:
    summary:
      description: A human-readable text summary of the current conditions.
    precip_type:
      description: The type of precipitation occurring.
    precip_intensity:
      description: The average expected intensity of precipitation occurring.
    precip_probability:
      description: A value between 0 and 1 which is representing the probability of precipitation.
    precip_accumulation:
      description: Daily snow accumulation. Returns unknown if no snow accumulation available.
    temperature:
      description: The current temperature.
    apparent_temperature:
      description: A numerical value representing the apparent (or "feels like") temperature.
    dew_point:
      description: The dew point.
    wind_speed:
      description: The wind speed.
    wind_gust:
      description: The wind gust.
    wind_bearing:
      description: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise.
    cloud_cover:
      description: The percentage of sky occluded by clouds.
    humidity:
      description: The relative humidity.
    pressure:
      description: The sea-level air pressure in millibars.
    visibility:
      description: The average visibility.
    ozone:
      description: The columnar density of total atmospheric ozone in Dobson.
    minutely_summary:
      description: A human-readable text summary for the next hour.
    hourly_summary:
      description: A human-readable text summary for the next 24 hours.
    daily_summary:
      description: A human-readable text summary for the next 7 days.
    temperature_high:
      description: Today's daytime expected high temperature.
    temperature_low:
      description: Today's overnight expected low temperature.
    apparent_temperature_high:
      description: Today's daytime expected apparent high temperature.
    apparent_temperature_low:
      description: Today's overnight expected apparent low temperature.
    precip_intensity_max:
      description: Today's expected maximum intensity of precipitation.
    uv_index:
      description: The current UV index.
    moon_phase:
      description: The fractional part of the lunation number during the given day.
units:
  description: Specify the unit system. Valid options are `auto`, `us`, `si`, `ca`, `uk` and `uk2`. `auto` will let Dark Sky decide the unit system based on location.
  required: false
  default: "`si` or `us`, based on the temperature preference in Home Assistant."
  type: string
update_interval:
  description: "Minimum time interval between updates. Supported formats: `update_interval: 'HH:MM:SS'`, `update_interval: 'HH:MM'` and Time period dictionary (see example below)."
  required: false
  default: 2 minutes
  type: time
{% endconfiguration %}

#### {% linkable_title Time period dictionary example %}

```yaml
update_interval:
  # At least one of these must be specified:
  days: 0
  hours: 0
  minutes: 3
  seconds: 30
  milliseconds: 0
```

#### {% linkable_title Language options %}

All language options are described in this table that you can use for the dark sky sensor.

|Language|Variable Code|
|---|---|
|Arabic|`ar`|
|Azerbaijani|`az`|
|Belarusian|`be`|
|Bulgarian|`bg`|
|Bosnian|`bs`|
|Catalan|`ca`|
|Czech|`cs`|
|Danish|`da`|
|German|`de`|
|Greek|`el`|
|English|`en`|
|Spanish|`es`|
|Estonian|`et`|
|Finnish|`fi`|
|French|`fr`|
|Croatian|`hr`|
|Hungarian|`hu`|
|Indonesian|`id`|
|Icelandic|`is`|
|Italian|`it`|
|Japanese|`ja`|
|Georgian|`ka`|
|Cornish|`kw`|
|Norwegian Bokmål|`nb`|
|Dutch|`nl`|
|Polish|`pl`|
|Portuguese|`pt`|
|Romanian|`ro`|
|Russian|`ru`|
|Slovak|`sk`|
|Slovenian|`sl`|
|Serbian|`sr`|
|Swedish|`sv`|
|Tetum|`tet`|
|Turkish|`tr`|
|Ukrainian|`uk`|
|Igpay Atinlay|`x-pig-latin`|
|simplified Chinese|`zh`|
|traditional Chinese|`zh-tw`|

<p class='note warning'>
While the platform is called "darksky" the sensors will show up in Home Assistant as "dark_sky" (eg: sensor.dark_sky_summary).
</p>

Details about the API are available in the [Dark Sky documentation](https://darksky.net/dev/docs).
