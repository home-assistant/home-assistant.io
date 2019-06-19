---
layout: page
title: "Roku"
description: "Instructions how to integrate Roku devices into Home Assistant."
date: 2018-10-17 20:47
sidebar: true
comments: false
sharing: true
footer: true
logo: roku.png
ha_category:
  - Hub
  - Media Player
  - Remote
ha_iot_class: Local Polling
ha_release: 0.86
redirect_from:
  - /components/remote.roku/
  - /components/media_player.roku/
---

The [Roku](http://www.roku.com/) component allows integration of Roku, which will be automatically discovered if you enable the [discovery component](/components/discovery/).

There is currently support for the following device types within Home Assistant:

- Media Player
- Remote

The `roku` component can also be forced to load by adding the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
roku:
  - host: IP_ADDRESS
```

{% configuration %}
host:
  description: Set the IP address of the Roku device. Use only if you don't want to autodiscover devices.
  required: false
  type: string
{% endconfiguration %}

## {% linkable_title Services %}

### {% linkable_title Service `roku_scan` %}

Scans the local network for Rokus. All found devices are presented as a persistent notification.

## {% linkable_title Remote %}

The `roku` remote platform allows you to send remote control buttons to a Roku device. It is automatically set up when a Roku is configured.

At the moment, the following buttons are supported:

- back
- backspace
- channel_down
- channel_up
- down
- enter
- find_remote
- forward
- home
- info
- input_av1
- input_hdmi1
- input_hdmi2
- input_hdmi3
- input_hdmi4
- input_tuner
- left
- literal
- play
- power
- replay
- reverse
- right
- search
- select
- up
- volume_down
- volume_mute
- volume_up

A typical service call for pressing several buttons looks like this.

```yaml
service: remote.send_command
data:
  entity_id: remote.roku
  command:
    - left
    - left
    - select
```
