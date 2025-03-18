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
ha_integration_type: hub
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - '@ucodery'
---

The **Washington State Department of Transportation (WSDOT)** {% term integration %} will give you travel time information from the [Washington State Department of Transportation (WSDOT)](https://wsdot.com/).

## Prerequisites

First, you need to get a free Traveler Information `api_key` from the [WSDOT API webpage](https://wsdot.com/traffic/api/). Just enter your email address to instantly get the key.

Once you have the code, you are ready to configure your `wsdot` sensors.

{% include integrations/config_flow.md %}

{% note %}
WSDOT does provide information about ferry schedules, mountain passes, tolls, etc. but so far only Travel Time data is available in this platform.
{% endnote %}

Here's an example of the sensor in use:

<p class='img'>
  <img src='/images/screenshots/wsdot_sensor.png' />
</p>

## Advanced Configuration

If you would like to manually curate the sensors provided by `wsdot`, you can edit your {% term "`configuration.yaml`" %} file to remove, rename, or re-add routes.
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

{% configuration_basic %}
api_key:
  description: Your API key from WSDOT.
travel_time:
  description: List of routes.
  keys:
    id:
      description: ID of the route.
    name:
      description: Name of the route.
      default: Just uses `id`
{% endconfiguration_basic %}

Figuring out which Travel Time ID (`id`) is associated with your routes is a bit of a challenge. If you visit
`https://wsdot.com/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson?AccessCode=[your_api_key_here]`
substituting your `api_key`, you will get a list of all available routes.
Search through it and then find the key `TravelTimeID`.
That tells you the number you need.