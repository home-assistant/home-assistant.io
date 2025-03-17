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

Once you have the code, you are ready to configure your `wsdot` sensors.

{% include integrations/config_flow.md %}

{% note %}
WSDOT does provide information about ferry schedules, mountain passes, tolls, etc. but so far only Travel Time data is available in this platform.
{% endnote %}

Here's an example of the sensor in use:

<p class='img'>
  <img src='/images/screenshots/wsdot_sensor.png' />
</p>
