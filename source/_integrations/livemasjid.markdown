---
title: Livemasjid
description: Instructions on how to integrate the Livemasjid integration within Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2021.8.1
ha_config_flow: true
ha_domain: livemasjid
ha_codeowners:
  - '@lockhaty'
ha_platforms:
  - sensor
---

The Livemasjid integration allows you to get alerts or start a live stream when your preferred streams start broadcasting. You can set a 
"Primary Subscription" which takes precedence and will always start the stream even if another stream is currently active.

The "Alternate Subscriptions" takes a list of alternate streams that you would like to automatically stream to your media player when the stream starts. Note, 
if there is an active stream playing, it will not start a stream that starts while the existing stream is playing.

The "Primary Device" and "Alternate Devices" are the media player entities that you would like to stream on.

{% include integrations/config_flow.md %}

## Integration Sensors

The following sensors are added by the integration:

  - sensor.stream_name - A sensor is created for all of your subscribed streams with a status of online/offline. There are also several attributes that may be of interest example number of listeners
  - sensor.livemasjid_active_stream - This denotes the currently active stream, and is set to idle when there is no active streams playing.
