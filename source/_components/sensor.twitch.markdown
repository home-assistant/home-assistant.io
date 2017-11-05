---
layout: page
title: "Twitch"
description: "Instructions how to integrate Twitch sensors into Home Assistant."
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

To use Twitch with your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: twitch
  channels:
    - channel1
    - channel2
```

Configuration variables:

- **channels** array (*Required*): Array of channels.
  - **channel_name** (*Required*): Name of the channel.

