---
layout: page
title: "Channels"
description: "Instructions how to integrate Channels into Home Assistant."
date: 2018-03-06 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: channels.png
ha_category: Media Player
ha_release: 0.65.0
ha_iot_class: "Local Polling"
---


The Channels platform allows you to control [Channels](https://getchannels.com/) from Home Assistant. Play, pause, seek, or skip commercials on an instance of Channels that is running on your network.

Your favorite channels will appear as sources in the Source List in Home Assistant.

To add Channels to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: channels
    name: Family Room Channels
    host: 192.168.1.50
```

Configuration variables:

- **host** (*Required*): The IP of the device Channels is running on, eg. 192.168.1.50
- **port** (*Optional*): The port where Channels is accessible, defaults to 57000.
- **name** (*Optional*): The name of the Channels instance in Home Assistant, eg. Family Room Channels. Defaults to Channels.

### {% linkable_title Service `channels_seek_forward` %}

Seek forward by the number of seconds currently set in settings on the instance of Channels.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String that points at `entity_id` of Channels app.


### {% linkable_title Service `channels_seek_backward` %}

Seek backward by the number of seconds currently set in settings on the instance of Channels.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String that points at `entity_id` of Channels app.

### {% linkable_title Service `channels_seek_by` %}

Seek forward or backward by a provided number of seconds.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String that points at `entity_id` of Channels app.
| `seconds` | no | Number of seconds to seek in the timeline by. Negative seconds seeks backwards.
