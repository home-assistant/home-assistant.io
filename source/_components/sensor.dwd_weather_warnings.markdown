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

## {% linkable_title Configuration %}

To add the DWD WarnApp sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dwd_weather_warnings
    region_name: Hansestadt Hamburg
```

<p class="note">
As it suggests the region name is not the city or nearest city you want to get the warnings for but the next higher level of the governmental district called "Kreis" in German.

Be aware, to get the region name you need to use the following link by replacing `Hamburg` with your city:
- Find your region here: `https://www.dwd.de/DE/wetter/warnungen_landkreise/warnWetter_node.html?ort=Hamburg`
- On the page that is loaded in your browser you will find the correct region ("Kreis") below the map as a headding.
- Verify if you find any warning for your region here. Your region ("Kreis") will appear only if warnings exist: `https://www.dwd.de/DWD/warnungen/warnapp_landkreise/json/warnings.json?jsonp=loadWarnings`
</p>

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

### {% linkable_title Attributes %}

| Attribute    | Description                            |
| ------------ | -------------------------------------- |
| `last_updated` | Information last update from DWD service. |
| `region_name` | Requested region name. This should be the same as the region name in the configuration. |
| `region_state` | State (Bundesland) in abriviated form the requested region is located, eg. "HE" for "Hessen". |
| `region_id` | Region ID assigned by DWD. |
| `warning_count` | *(int)* Number of issued warnings. There can be more than one warning issued at once. |
| `warning_<x>_level` | *(int)* Issued warning level between 0 and 4. <br/>0: Keine Warnungen <br/>1: Wetterwarnungen <br/>2: Warnungen vor markantem Wetter<br/>3: Unwetterwarnungen<br/>4: Warnungen vor extremem Unwetter |
| `warning_<x>_type` | *(int)* Issued warning type. <br/>0: Gewitter<br/>1: Windböen, Sturmböen<br/>2: ?<br/>3: Schneefall<br/>4: Nebel<br/>5: Frost <br/>6: Glätte, Glatteis<br/>Please be aware that the type numbers represent more like a category than an exact number-to-string match. For example Type `6` can mean `GLÄTTE` or `GLATTEIS` or similar. |
| `warning_<x>_name` | This name correlates with the warning type and indicates it in short as a string. |
| `warning_<x>_headline` | Official headline the weather warning. |
| `warning_<x>_start` | Starting time and date of the issued warning. |
| `warning_<x>_end` | Ending time and date of the issued warning. |
| `warning_<x>_description` | Details for the issued warning. |
| `warning_<x>_instruction` | The DWD is sometimes providing helpful information about precautions to take for the issued warning. |

 <p class="note">
In the attribute name `x` is the counter of the warning starting from `1`.
</p>
