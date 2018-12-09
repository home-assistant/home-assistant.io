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

<p class='important'>
As it suggests the region name is not the city or nearest city you want to get the warnings for but the next higher level of the governmental district called "Kreis" in German.

Be aware, to get the region name you need to use the following link by replacing `Hamburg` with your city:
- Find your region here: `https://www.dwd.de/DE/wetter/warnungen_landkreise/warnWetter_node.html?ort=Hamburg`
- On the page that is loaded in your browser you will find the correct region ("Kreis") below the map as a headding.
- Verify if you find any warning for your region here. Your region ("Kreis") will appear only if warnings exist: `https://www.dwd.de/DWD/warnungen/warnapp_landkreise/json/warnings.json?jsonp=loadWarnings`
</p>

The warning level is between 0 (no danger) and 4 (extreme weather conditions):
- Warnungen vor extremem Unwetter (Stufe 4)
- Unwetterwarnungen (Stufe 3)
- Warnungen vor markantem Wetter (Stufe 2)
- Wetterwarnungen (Stufe 1)

{% configuration %}
region_name:
  required: false
  description: The region name string as identified from the DWD website.
  default: Hansestadt Hamburg
  type: string
name:
  required: false
  description: The name you would like to give to the warnapp sensor.
  type: string
  default: DWD-Weather-Warnings
{% endconfiguration %}
