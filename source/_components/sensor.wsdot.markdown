---
layout: page
title: "Washington State DOT"
description: "Instructions on how to integrate WSDOT data into your home."
date: 2017-01-21 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: wsdot.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.37
---

The `wsdot` sensor will give you travel time information from the [Washington State Department of Transportation (WSDOT)](http://wsdot.com/). 

First, you need to get a free Traveler Information `api_key` from the [WSDOT API webpage](http://wsdot.com/traffic/api/). Just enter your email address to instantly get the key. 


Once you have the code, create `wsdot` sensors by editing your `configuration.yaml` file as follows:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: wsdot
    api_key: XXXXXXXXXXXXXXXXXXXXXXX
    travel_time:
     - id: 95
       name: I-90 Eastbound HOV
```

Configuration variables:

- **api_key** (*Required*): Your `api_key` from WSDOT.
- **scan_interval** (*Optional*): How frequently to query for new data. Default: 3 minutes. 
- **travel_time** array (*Required*): List of routes.
  - **id** (*Required*): Name of the route.
  - **name** (*Optional*): Name of the route. Default just uses `id`.

Figuring out which Travel Time ID (`id`) is associated with your routes is a bit of a challenge. If you visit `http://wsdot.com/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson?AccessCode=[your_api_key_here]` substituting your `api_key`, you will get a list of all available routes. Search through it and then find the key `TravelTimeID`. That tells you the number you need. 

Some common examples include:

```
 73 Issaquah-Seattle (WB PM)
 74 Seattle-Issaquah (EB AM)
 75 HOV Issaquah-Seattle (WB REV) 
 76 Issaquah-Seattle (WB REV)
 77 HOV Redmond-Seattle (WB PM)
 78 HOV Seattle-Redmond (EB AM)
 79 Redmond-Seattle (WB PM)
 80 Seattle-Redmond (EB AM)
 81 HOV Redmond-Seattle via I-90 (WB PM)
 82 HOV Seattle-Redmond via I-90 (EB AM)
 83 Redmond-Seattle via I-90 (WB PM)
 84 Seattle-Redmond via I-90 (EB AM)
 85 HOV Redmond-Seattle via I-90 (WB REV)
 86 Redmond-Seattle via I-90 (WB REV)
 89 Bellevue-Seattle via 520 (WB PM)
 90 HOV Bellevue-Seattle via 520 (WB PM)
 91 HOV Seattle-Bellevue via 520 (EB AM)
 92 Seattle-Bellevue via 520 (EB AM)
 93 Bellevue-Seattle via I-90 (WB PM)
 94 HOV Bellevue-Seattle via I-90 (WB PM)
 95 HOV Seattle-Bellevue via I-90 (EB AM)
 96 Seattle-Bellevue via I-90 (EB AM)
 97 Bellevue-Seattle via I-90 (WB REV)
 98 HOV Bellevue-Seattle via I-90 (WB REV)
```

<p class='note info'>
WSDOT does provide information about ferry schedules, mountain passes, tolls, etc. but so far only Travel Time data is available in this platform.
</p>

Here's an example of the sensor in use:

<p class='img'>
  <img src='{{site_root}}/images/screenshots/wsdot_sensor.png' />
</p>

