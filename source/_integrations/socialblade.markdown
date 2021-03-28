---
title: Social Blade
description: Instructions on how to set up Social Blade Sensor within Home Assistant.
ha_category:
  - Multimedia
ha_release: 0.69
ha_iot_class: Cloud Polling
ha_domain: socialblade
ha_platforms:
  - sensor
---

The `socialblade` sensor platform allows you to monitor a YouTube channels subscriber count and total views count. The sensor retrieves data from the [Social Blade website](https://socialblade.com).

## Setup

To get the YouTube channel ID, search for and select the channel on the [Social Blade website](https://socialblade.com). The channel ID will be at the end of the Social Blade URL: `https://socialblade.com/youtube/channel/{channel_id}`

## Configuration

To enable the sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: socialblade
    channel_id: YOUTUBE_CHANNEL_ID
```

{% configuration %}
channel_id:
  description: YouTube channel ID.
  required: true
  type: string
{% endconfiguration %}
