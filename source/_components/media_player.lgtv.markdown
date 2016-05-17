---
layout: page
title: "LG Netcast TV"
description: "Instructions how to integrate a LG TV (Netcast 3.0 & 4.0) within Home Assistant."
date: 2016-05-12 23:22
sidebar: true
comments: false
sharing: true
footer: true
logo: lg.png
ha_category: Media Player
ha_iot_class: "Local Poll"
ha_release: 0.20
----------------

The `lg_netcast` platform allows you to control a LG Smart TV running NetCast 3.0
(LG Smart TV models released in 2012) and NetCast 4.0 (LG Smart TV models released in 2013).
For the new LG WebOS TV's use the [webostv](/components/mediaplayer.webostv) platform.

To add a LG TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  platform: lg_netcast
  host: 192.168.0.20
  access_token: 889955
  name: Living Room TV
```

Configuration variables:

- **host** *Required*: The IP of the LG Smart TV, e.g. 192.168.0.20
- **access_token** *Optional*: The access token needed to connect.
- **name** *Optional*: The name you would like to give to the LG Smart TV. The default is "LG TV Remote".

To get the access token for your TV configure the `lg_netcast` platform in Home Assistant without the `access_token`.
After starting Home Assistant the TV will display the access token on screen.
Just add the token to your configuration and restart Home Assistant and the media player component for your LG TV will show up.

<p class='note'>
The access token will not change until you factory reset your TV.
</p>

