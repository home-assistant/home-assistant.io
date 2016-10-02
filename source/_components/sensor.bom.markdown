---
layout: page
title: "Bureau of Meteorology (BOM) Australia"
description: "Instructions on how to integrate Bureau of Meteorology Australia weather conditions into Home Assistant."
date: 2016-09-13 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bom.png
ha_category: Weather
ha_release: 0.29
---

The `bom` platform allows you to get the current weather conditions from the [Bureau of Meteorology (BOM)](http://www.bom.gov.au/) Australia.

- Each sensor will be given the `device_id` of "bom [optionalname] friendlyname units"
- A name is optional but if multiple BOM weather stations are used a name will be required.
- The sensor will update every minute 35 minutes after last data timestamp. This allows for the 30 minute observation cycle and the approximate 5 minute update delay in publishing the data.

To get the station ID `[zone_id]` and `[wmo_id]` for your local BOM station:
- Find your station on these maps:
 - NSW: http://www.bom.gov.au/nsw/observations/map.shtml
 - QLD: http://www.bom.gov.au/qld/observations/map.shtml
 - VIC: http://www.bom.gov.au/vic/observations/map.shtml
 - WA: http://www.bom.gov.au/wa/observations/map.shtml
 - SA: http://www.bom.gov.au/sa/observations/map.shtml
 - TAS: http://www.bom.gov.au/tas/observations/map.shtml
 - ACT: http://www.bom.gov.au/act/observations/canberramap.shtml
 - NT: http://www.bom.gov.au/nt/observations/map.shtml
 - alternatively, from the [BOM website](http://www.bom.gov.au/), navigate to State -> Observations -> Latest Observations -> Choose the station.
- The URL will look like: http://www.bom.gov.au/products/[zone_id]/[zone_id].[wmo_id].shtml
 - For Adelaide, the URL will look like http://www.bom.gov.au/products/IDS60801/IDS60801.94675.shtml.

To add the BOM weather observation to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: bom
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
- **monitored_conditions** (*Required*): A list of the conditions to monitor.
