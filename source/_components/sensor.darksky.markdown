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

## {% linkable_title Setup %}

You need an API key which is free but requires [registration](https://darksky.net/dev/register). You can make up to 1000 calls per day for free which means that you could make one approximately every 86 seconds.

<p class='note warning'>
[Dark Sky](https://darksky.net/dev/) will charge you $0.0001 per API call if you enter your credit card details and create more than 1000 calls per day.
</p>

## {% linkable_title Configuration %}

To add Dark Sky to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: darksky
    api_key: YOUR_API_KEY
    forecast:
      - 0
    monitored_conditions:
      - summary
      - icon
      - temperature
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
  description: List of days in the 7-day forecast you would like to receive data on, starting with today as day 0 and ending with day 7. Any condition from `monitored_conditions` with a daily forecast by Dark Sky will generate a sensor with entity_id `<condition>_<day>`.
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
      description: A human-readable text summary.
    icon:
      description: A machine-readable text summary, suitable for selecting an icon for display. See [Dark Sky API documentation][] for the list of possible values.
    precip_type:
      description: The type of precipitation occurring at the given time. If `precip_intensity` is zero, then this property will be `unknown`. See [Dark Sky API documentation][] for the list of possible values.
    precip_intensity:
      description: The intensity of precipitation occurring at the given time. This value is conditional on probability (that is, assuming any precipitation occurs at all).
    precip_probability:
      description: The probability of precipitation occurring, in percents.
    precip_accumulation:
      description: The amount of snowfall accumulation expected to occur. If no snowfall is expected, this property will be `undefined`.
    temperature:
      description: The air temperature.
    apparent_temperature:
      description: The apparent (or "feels like") temperature.
    dew_point:
      description: The dew point.
    wind_speed:
      description: The wind speed.
    wind_gust:
      description: The wind gust speed.
    wind_bearing:
      description: The direction that the wind is coming **from** in degrees, with true north at 0° and progressing clockwise. If `wind_speed` is 0, then this value is `unknown`.
    cloud_cover:
      description: The percentage of sky occluded by clouds.
    humidity:
      description: The relative humidity.
    pressure:
      description: The sea-level air pressure in millibars.
    visibility:
      description: The average visibility.
    ozone:
      description: The columnar density of total atmospheric ozone at the given time in Dobson units.
    minutely_summary:
      description: A human-readable text summary for the next hour.
    hourly_summary:
      description: A human-readable text summary for the next two days.
    daily_summary:
      description: A human-readable text summary for the next week.
    temperature_high:
      description: The daytime high temperature.
    temperature_low:
      description: The overnight low temperature.
    apparent_temperature_high:
      description: The daytime high apparent temperature.
    apparent_temperature_low:
      description: The overnight low apparent temperature.
    precip_intensity_max:
      description: The maximum value of `precip_intensity` during a given day.
    uv_index:
      description: The UV index.
    moon_phase:
      description: "The fractional part of the lunation number during the given day: a value of 0 corresponds to a new moon, 0.25 to a first quarter moon, 0.5 to a full moon, and 0.75 to a last quarter moon."
    sunrise_time:
      description: The time of when the sun will rise during a given day.
    sunset_time:
      description: The time of when the sun will set during a given day.
    nearest_storm_distance:
      description: The approximate distance to the nearest storm in miles.
    nearest_storm_bearing:
      description: The approximate direction of the nearest storm in degrees, with true north at 0° and progressing clockwise.
units:
  description: Specify the unit system. Valid options are `auto`, `us`, `si`, `ca` and `uk2`. `auto` will let Dark Sky decide the unit system based on location.
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

More details about the API are available in the [Dark Sky API documentation][].

[Dark Sky API documentation]: https://darksky.net/dev/docs
