---
layout: page
title: "Tile"
description: "Instructions how to use Tile to track devices in Home Assistant."
date: 2017-11-08 20:40:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tile.png
ha_release: 0.58
ha_category: Presence Detection
ha_iot_class: "Cloud Polling"
---

The `tile` platform allows Home Assistant to utilize [Tile® Bluetooth trackers](https://www.thetileapp.com).
The official Tile mobile app handles the actual tracking of Tile devices using
the mobile device's Bluetooth and GPS.

To integrate Tile into Home Assistant, add the following section to your
`configuration.yaml` file:

```yaml
device_tracker:
  - platform: tile
    username: email@address.com
    password: MY_PASSWORD_123
```

{% configuration %}
  username:
    description: the email address for the Tile account
    required: true
    type: string
  password:
    description: the password for the Tile account
    required: true
    type: string
  monitored_variables:
    description: the Tile types to monitor; valid values are `TILE` and `PHONE` (default is for all types to be included)
    required: false
    type: list
  show_inactive:
    description: whether to show expired/disabled Tiles
    required: false
    type: boolean
{% endconfiguration %}
