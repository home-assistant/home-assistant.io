---
layout: page
title: Discogs Sensor
description: "Instructions on how to set up Discogs sensors within Home Assistant."
date: 2017-12-04 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: https://www.magneticmag.com/.image/t_share/MTQ5OTE1NzU4NTczMzk3OTYw/discogs-vinyl-record-mark.png
ha_category: Sensor
ha_release: 0.61
logo: discogs.png
ha_iot_class: "Cloud Polling"
---

The `discogs` platform allows you to see the current amount of records in your [Discogs](https://discogs.com) collection.

First, you'll need to get a personal access token from your Discogs account.
You can generate a token from your profile's [Developer settings](https://www.discogs.com/settings/developers).

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: discogs
    token: YOUR_TOKEN
```

{% configuration %}
token:
  description: The Discogs API token to use as identification to get your collection.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  type: string
{% endconfiguration %}
