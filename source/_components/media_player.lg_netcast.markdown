---
layout: page
title: "LG Netcast TV"
description: "Instructions on how to integrate a LG TV (Netcast 3.0 & 4.0) within Home Assistant."
date: 2016-05-12 23:22
sidebar: true
comments: false
sharing: true
footer: true
logo: lg.png
ha_category: Media Player
ha_iot_class: "Local Poll"
ha_release: "0.20"
ha_iot_class: "Local Polling"
---

The `lg_netcast` platform allows you to control a LG Smart TV running NetCast 3.0 (LG Smart TV models released in 2012) and NetCast 4.0 (LG Smart TV models released in 2013). For the new LG WebOS TV's use the [webostv](/components/media_player.webostv) platform.

To add a LG TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: lg_netcast
    host: 192.168.0.20
```

{% configuration %}
host:
  description: The IP address of the LG Smart TV, e.g., 192.168.0.20.
  required: true
  type: string
access_token:
  description: The access token needed to connect.
  required: false
  type: string
name:
  description: The name you would like to give to the LG Smart TV.
  required: false
  default: LG TV Remote
  type: string
refresh_preview:
  description: Force the refresh of the preview image captured from the TV every time it is requested.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

To get the access token for your TV configure the `lg_netcast` platform in Home Assistant without the `access_token`.
After starting Home Assistant the TV will display the access token on screen.
Just add the token to your configuration and restart Home Assistant and the media player component for your LG TV will show up.

<p class='note'>
The access token will not change until you factory reset your TV.
</p>

By default, the preview image that is captured from the TV and shown in the media player component is only refreshed on Home Assistant startup, or the first time the TV is turned on or the platform is initialized. This is because the image is cached in the media player component itself. To force updating the preview every time it is requested such that a near-live image is shown in the user interface, set `refresh_preview` to `true`.

<p class='note'>
Setting `refresh_preview` to `true` effectively disables the image cache for all media player platforms and could introduce a slight performance degradation.
</p>
