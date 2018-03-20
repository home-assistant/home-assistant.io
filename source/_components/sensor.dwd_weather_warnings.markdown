---
layout: page
title: "DWD Weather warnings"
description: "Instructions on how to integrate Deutsche Wetter Dienst weather warnings into Home Assistant."
date: 2017-07-26 22:00
sidebar: true
comments: false
sharing: true
footer: true
#logo: dwdwarnapp.png
ha_category: Weather
ha_release: 0.51
ha_iot_class: "Cloud Polling"
---

The `dwd_weather_warnings` sensor platform uses the [Deutsche Wetter Dienst (DWD)](https://www.dwd.de) as a source for current and advance warnings.

- A name is optional but if multiple regions are used a name will be required.
- The sensor checks for new data every 15 minutes.

To add the DWD WarnApp sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dwd_weather_warnings
    region_name: Hansestadt Hamburg
```

To get the region name:
- Find your region here: `https://www.dwd.de/DE/wetter/warnungen_landkreise/warnWetter_node.html?ort=Hamburg`
- Verify if you find any warning for your region here: `https://www.dwd.de/DWD/warnungen/warnapp_landkreise/json/warnings.json?jsonp=loadWarnings`

The warning level is between 0 (no danger) and 4 (extreme weather conditions):
- Warnungen vor extremem Unwetter (Stufe 4)
- Unwetterwarnungen (Stufe 3)
- Warnungen vor markantem Wetter (Stufe 2)
- Wetterwarnungen (Stufe 1)

Configuration variables:

- **region_name** (*Optional*): The region name string as identified from the DWD website.  If not given, defaults to Hansestadt Hamburg.
- **name** (*Optional*): The name you would like to give to the warnapp sensor.
