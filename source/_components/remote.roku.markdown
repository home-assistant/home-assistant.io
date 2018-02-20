---
layout: page
title: "Roku Remote"
description: "Instructions how to integrate Roku into Home Assistant."
date: 2018-02-19 20:0+0000
sidebar: true
comments: false
sharing: true
footer: true
logo: roku.png
ha_category: Remote
ha_release: "0.64"
ha_iot_class: "Local Polling"
---

The `roku` remote platform allows you to send remote control buttons to a Roku device. It is automatically setup when a Roku is configured, please see [Roku Component page](/components/roku/) for configuration details.

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

A typical service call for press several buttons looks like this.

```yaml
service: remote.send_command
data:
  entity_id: remote.roku
  command:
    - left
    - left
    - select
```
