---
layout: page
title: "Twitch"
description: "Instructions on how to integrate Twitch sensors into Home Assistant."
date: 2015-12-19 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: twitch.png
ha_category: Social
ha_release: "0.10"
ha_iot_class: "Cloud Polling"
---


The `twitch` platform will allow you to monitor [Twitch](http://www.twitch.tv/) channel status from within Home Assistant and setup automation based on the information.

## {% linkable_title Configuration %}

To use Twitch with your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: twitch
  clientid: "clientid"
  channels:
    - channel1
    - channel2
```

{% configuration %}
clientid:
  description: A id twitch need to know what client is calling [follow this to get one](https://dev.twitch.tv/docs/v5/#getting-a-client-id)
  required: true
channels:
  description: List of channels.
  required: true
  type: map
  keys:
    channel_id:
      description: Name of the channel.
{% endconfiguration %}

