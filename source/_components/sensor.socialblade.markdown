---
layout: page
title: Social Blade Sensor
description: "Instructions on how to set up Social Blade Sensor within Home Assistant."
date: 2018-04-23 08:00
sidebar: false
comments: false
sharing: true
footer: true
logo: socialblade.png
ha_category: Sensor
ha_release: 0.69
ha_iot_class: "Cloud Polling"
---

The `socialblade` sensor component allows you get updates on a youtube channel using your social blade channel id. The sensor gets the subscribers and total views count  from [Social Blade Website]( https://socialblade.com/)

to get the channel id you can go to [Social Blade Website]( https://socialblade.com/) and search for youtube channel by username, then select the channel and grab the id from the url. 
The channel id will be the last part of the url :
https://socialblade.com/youtube/channel/{channel_id}

## Example for `configuration.yaml` :

```yaml
sensor:
  - platform: socialblade
    channel_id: YOUR_CHANNEL_NUMBER
    name: OPTIONAL_NAME
```

{% configuration %}
friendly_name:
  description: Name of the sensor in Home Assistant.
  required: false
  default: Social Blade
  type: string
channel_id:
  description: channel id number optained from the URL when you access Social Blade web client. 
  required: true
  type: string
{% endconfiguration %}

All the data will be fetch from  [USCIS](https://egov.uscis.gov/casestatus/mycasestatus.do). 
