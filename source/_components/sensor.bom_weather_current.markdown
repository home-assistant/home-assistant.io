---
layout: page
title: "Bureau of Meteorology Australia current weather"
description: "Instructions on how to integrate Bureau of Meteorology Australia current weather conditions into Home Assistant."
date: 2016-09-13 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bom.png
ha_category: Weather
featured: false
ha_release: 0.19
---

The `bom_weather_current` platform allows you to get the current weather conditions from the Bureau of Meteorology (BOM) Australia.
- Each sensor will be given the device_id of "bom [optionalname] friendlyname units"
- Get the station id for your local BOM station from BOM > State > Observations > Latest Observations > Choose the station > read the url
- The url will look like "http://www.bom.gov.au/products/IDS60801/IDS60801.94675.shtml". This is for Adelaide.
- The url is read as: "http://www.bom.gov.au/products/[zone_id]/[zone_id].[wmo_id].shtml"
- A name is optional but if multiple bom weather stations are used a name will be required.
- The sensor will update every minute 35 minutes after last data timestamp. This allows for the 30 minute observation cycle and the approximate 5 minute update delay in publishing the data.



To add the BOM weather observation to your installation, add the following to
your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: bom_weather_current
  name: "optional name"
  zone_id: IDS60801
  wmo_id: 94675
  monitored_conditions:
    - wmo
    - name
    - history_product
    - local_date_time
    - local_date_time_full
    - aifstime_utc
    - lat
    - lon
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

Configuration variables:

- **zone_id** (*Required*): The zone_id as identified from the BOM website.
- **wmo_id** (*Required*): The wmo as identified from the BOM website.
- **name** (*Optional*): The name you would like to give to the weather station.
- **monitored_conditions** (*Required*): A List of the conditions to monitor
