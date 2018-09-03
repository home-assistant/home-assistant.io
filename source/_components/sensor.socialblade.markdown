---
layout: page
title: Social Blade Sensor
description: "Instructions on how to set up Social Blade Sensor within Home Assistant."
date: 2018-04-23 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: socialblade.png
ha_category: Multimedia
ha_release: 0.69
ha_iot_class: "Cloud Polling"
---

The `socialblade` sensor platform allows you get updates on a Youtube channel using your social blade channel ID. The sensor gets the subscribers and total views count from [Social Blade Website]( https://socialblade.com/).

## {% linkable_title Setup %}

To get the channel ID you can go to [Social Blade Website]( https://socialblade.com/) and search for Youtube channel by username, then select the channel and grab the ID from the URL. The channel ID will be the last part of the URL: https://socialblade.com/youtube/channel/{channel_id}

## {% linkable_title Configuration %}

To enable the sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: socialblade
    channel_id: YOUR_CHANNEL_NUMBER
```

{% configuration %}
channel_id:
  description: Channel id number optained from the URL when you access Social Blade web client. 
  required: true
  type: string
{% endconfiguration %}

All the data will be fetch from  [Social Blade]( https://socialblade.com/). 
