---
title: Dark Sky
description: How to integrate Dark Sky within Home Assistant.
ha_category:
  - Weather
ha_release: '0.30'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fabaff'
ha_domain: darksky
ha_platforms:
  - sensor
  - weather
ha_integration_type: integration
---

The `darksky` platform uses the [Dark Sky](https://darksky.net/) web service as a source for meteorological data for your location. The location is based on the `longitude` and `latitude` coordinates configured in your `configuration.yaml` file. The coordinates are auto-detected but to take advantage of the hyper-local weather reported by Dark Sky, you can refine them down to your exact home address. GPS coordinates can be found by using [Google Maps](https://www.google.com/maps) and clicking on your home or [Openstreetmap](https://www.openstreetmap.org/).

## Setup

<div class='note warning'>

On March 31, 2020 Dark Sky was [acquired by Apple](https://blog.darksky.net/dark-sky-has-a-new-home/) and is no longer allowing new API registrations. The Dark Sky API will continue to function for existing users through the [end of 2022](https://blog.darksky.net/), but it is no longer possible to obtain an API key for new users. Home Assistant supports many alternative [weather integrations](/integrations/#weather).

</div>

You can make up to 1000 calls per day for free which means that you could make one approximately every 86 seconds.

<div class='note warning'>

[Dark Sky](https://darksky.net/dev/) will charge you $0.0001 per API call if you enter your credit card details and create more than 1000 calls per day.

</div>

## Configuration

To add Dark Sky to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: darksky
    api_key: YOUR_API_KEY
    forecast:
      - 0
    hourly_forecast:
      - 0
      - 1
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
  description: List of days in the 7-day forecast you would like to receive data on, starting with today as day 0 and ending with day 7. Any condition from `monitored_conditions` with a daily forecast by Dark Sky will generate a sensor with entity_id `<condition>_<day>d`.
  required: false
  type: list
hourly_forecast:
  description: List of hours in the 48-hour forecast you would like to receive data on, starting with this hour as hour 0 and ending with hour 48. Any condition from `monitored_conditions` with an hourly forecast by Dark Sky will generate a sensor with entity_id `<condition>_<hour>h`.
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
  default: coordinates from the Home Assistant configuration
  type: float
longitude:
  description: Longitude coordinate to monitor weather of (required if **latitude** is specified).
  required: false
  default: coordinates from the Home Assistant configuration
  type: float
monitored_conditions:
  description: Conditions to display in the frontend.
  required: true
  type: list
  keys:
    summary:
      description: A human-readable text summary.
    icon:
      description: A machine-readable text summary, suitable for selecting an icon for display. See [Dark Sky API documentation](https://darksky.net/dev/docs) for the list of possible values.
    precip_type:
      description: The type of precipitation occurring at the given time. If `precip_intensity` is zero, then this property will be `unknown`. See [Dark Sky API documentation](https://darksky.net/dev/docs) for the list of possible values.
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
    alerts:
      description: Current severe weather advisories.
units:
  description: Specify the unit system. Valid options are `auto`, `us`, `si`, `ca` and `uk2`. `auto` will let Dark Sky decide the unit system based on location.
  required: false
  default: "`si` or `us`, based on the temperature preference in Home Assistant."
  type: string
scan_interval:
  description: "Minimum time interval between updates. Supported formats: `scan_interval: 'HH:MM:SS'`, `scan_interval: 'HH:MM'` and Time period dictionary (see example below)."
  required: false
  default: 2 minutes
  type: time
{% endconfiguration %}

<div class='note'>

Please note that some monitored conditions, such as `temperature_high` or `temperature_low`, may only work when setting the `forecast` attribute to at least `0` (current day).

</div>

#### Time period dictionary example

```yaml
scan_interval:
  # At least one of these must be specified:
  days: 0
  hours: 0
  minutes: 3
  seconds: 30
  milliseconds: 0
```

#### Language options

All language options are described in this table that you can use for the Dark Sky sensor.

|Language|Variable Code|
|---|---|
|Arabic|`ar`|
|Azerbaijani|`az`|
|Belarusian|`be`|
|Bulgarian|`bg`|
|Bengali|`bn`|
|Bosnian|`bs`|
|Catalan|`ca`|
|Czech|`cs`|
|Danish|`da`|
|German|`de`|
|Greek|`el`|
|English|`en`|
|Esperanto|`eo`|
|Spanish|`es`|
|Estonian|`et`|
|Finnish|`fi`|
|French|`fr`|
|Hebrew|`he`|
|Hindi|`hi`|
|Croatian|`hr`|
|Hungarian|`hu`|
|Indonesian|`id`|
|Icelandic|`is`|
|Italian|`it`|
|Japanese|`ja`|
|Georgian|`ka`|
|Kannada|`kn`|
|Korean|`ko`|
|Cornish|`kw`|
|Latvian|`lv`|
|Malayam|`ml`|
|Marathi|`mr`|
|Norwegian Bokmål|`nb`|
|Dutch|`nl`|
|Punjabi|`pa`|
|Polish|`pl`|
|Portuguese|`pt`|
|Romanian|`ro`|
|Russian|`ru`|
|Slovak|`sk`|
|Slovenian|`sl`|
|Serbian|`sr`|
|Swedish|`sv`|
|Tamil|`ta`|
|Telugu|`te`|
|Tetum|`tet`|
|Turkish|`tr`|
|Ukrainian|`uk`|
|Urdu|`ur`|
|Igpay Atinlay|`x-pig-latin`|
|simplified Chinese|`zh`|
|traditional Chinese|`zh-tw`|

<div class='note warning'>
While the platform is called "darksky" the sensors will show up in Home Assistant as "dark_sky" (eg: sensor.dark_sky_summary).
</div>

More details about the API are available in the [Dark Sky API documentation](https://darksky.net/dev/docs).
