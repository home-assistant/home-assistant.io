---
layout: page
title: "BOM Australia Sensor"
description: "Instructions on how to integrate Bureau of Meteorology Australia weather conditions into Home Assistant."
date: 2016-09-13 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bom.png
ha_category: Weather
ha_release: 0.29
ha_iot_class: "Cloud Polling"
---

The `bom` sensor platform uses the [Australian Bureau of Meteorology (BOM)](http://www.bom.gov.au) as a source for current (half-hourly) meteorological data.

- Each sensor will be given the `device_id` of "bom [optionalname] friendlyname units"
- A name is optional but if multiple BOM weather stations are used a name will be required.
- The sensor checks for new data every minute, starting 30 minutes after the timestamp of the most recent data as the data is updated every half-hour.

To add the BOM weather observation to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: bom
    monitored_conditions:
      - apparent_t
      - cloud
      - cloud_base_m
      - cloud_oktas
      - cloud_type_id
      - cloud_type
      - delta_t
      - gust_kmh
      - gust_kt
      - air_temp
      - dewpt
      - local_date_time
      - local_date_time_full
      - press
      - press_qnh
      - press_msl
      - press_tend
      - rain_trace
      - rel_hum
      - sea_state
      - swell_dir_worded
      - swell_height
      - swell_period
      - vis_km
      - weather
      - wind_dir
      - wind_spd_kmh
      - wind_spd_kt
```

To get the station ID for any BOM station:
- Find your station on these maps: [NSW](http://www.bom.gov.au/nsw/observations/map.shtml), [QLD](http://www.bom.gov.au/qld/observations/map.shtml), [VIC](http://www.bom.gov.au/vic/observations/map.shtml), [WA](http://www.bom.gov.au/wa/observations/map.shtml), [SA](http://www.bom.gov.au/sa/observations/map.shtml), [TAS](http://www.bom.gov.au/tas/observations/map.shtml), [ACT](http://www.bom.gov.au/act/observations/canberramap.shtml), [NT](http://www.bom.gov.au/nt/observations/map.shtml).
 - alternatively, from the [BOM website](http://www.bom.gov.au/), navigate to State -> Observations -> Latest Observations -> Choose the station.
- The URL will look like: http://www.bom.gov.au/products/IDx60801/[station].shtml
 - For Adelaide, the URL will look like `http://www.bom.gov.au/products/IDS60801/IDS60801.94675.shtml`; the station ID is `IDS60801.94675`.

{% configuration %}
station:
  description: The station ID string as identified from the BOM website.
  required: false
  type: string
  default: If not given, defaults to the closest station based on location data in configuration.yaml.
name:
  description: The name you would like to give to the weather station.
  required: false
  type: string
monitored_conditions:
  description: A list of the conditions to monitor.
  required: true
  type: list
  keys:
    apparent_t:
      description: Feels like temperature in C.
    cloud:
      description: Cloud cover.
    cloud_base_m:
      description: Cloud Base in m.
    cloud_oktas:
      description: Cloud Oktas.
    cloud_type_id:
      description: Cloud type ID.
    cloud_type:
      description: Cloud type description.
    delta_t:
      description: Delta temperature in C.
    gust_kmh:
      description: Wind gust in km/h.
    gust_kt:
      description: Wing gust in kt.
    air_temp:
      description: Air temperature in C.
    dewpt:
      description: Drew point in C.
    press:
      description: Pressure in mbar.
    press_qnh:
      description: Pressure in qnh.
    press_msl:
      description: Pressure in msl.
    press_tend:
      description: Pressure trend.
    rain_trace:
      description: Raing today in mm.
    rel_hum:
      description: Relative Humidity in %.
    sea_state:
      description: Sea state.
    swell_dir_worded: 
      description: Swell direction.
    swell_height: 
      description: Swell hight in m.
    swell_period:
      description: Swell period.
    vis_km:
      description: Visibility in km.
    weather:
      description: Weather summary.
    wind_dir:
      description: Wind direction.
    wind_spd_kmh:
      description: Wind speed in km/h.
    wind_spd_kt:
      description: Wind speed in kt.
{% endconfiguration %}

<p class='note'>
This sensor is an alternative to the [`bom`](/components/weather.bom/) weather platform.
The weather platform is easier to configure but less customisable.
</p>
