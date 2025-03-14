---
title: Washington State Department of Transportation (WSDOT)
description: Instructions on how to integrate WSDOT data into your home.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.37
ha_domain: wsdot
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Washington State Department of Transportation (WSDOT)** {% term integration %} will give you travel time information from the [Washington State Department of Transportation (WSDOT)](https://wsdot.com/).

## Setup

First, you need to get a free Traveler Information `api_key` from the [WSDOT API webpage](https://wsdot.com/traffic/api/). Just enter your email address to instantly get the key.

## Configuration

Once you have the code, create `wsdot` sensors by editing your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: wsdot
    api_key: YOUR_API_KEY
    travel_time:
     - id: 95
       name: I-90 Eastbound HOV
```

{% configuration %}
api_key:
  description: Your API key from WSDOT.
  required: true
  type: string
travel_time:
  description: List of routes.
  required: true
  type: list
  keys:
    id:
      description: ID of the route.
      required: true
      type: string
    name:
      description: Name of the route.
      required: false
      default: Just uses `id`
      type: string
{% endconfiguration %}

Figuring out which Travel Time ID (`id`) is associated with your routes is a bit of a challenge. If you visit `https://wsdot.com/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson?AccessCode=[your_api_key_here]` substituting your `api_key`, you will get a list of all available routes. Search through it and then find the key `TravelTimeID`. That tells you the number you need.

Some common examples include:

```text
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

{% note %}
WSDOT does provide information about ferry schedules, mountain passes, tolls, etc. but so far only Travel Time data is available in this platform.
{% endnote %}

Here's an example of the sensor in use:

<p class='img'>
  <img src='/images/screenshots/wsdot_sensor.png' />
</p>
