---
layout: page
title: "Apple TV Remote"
description: "Instructions on how to integrate Apple TV remote into Home Assistant."
date: 2017-06-26 20:50
sidebar: true
comments: false
sharing: true
footer: true
logo: apple.png
ha_category: Remote
ha_iot_class: "Local Push"
ha_release: 0.49
---


The `apple_tv` remote platform allows you to send remote control buttons to an Apple TV. It is automatically setup when an Apple TV is configured, please see [Apple TV Component](/components/apple_tv/) for configuration details.

At the moment, the following buttons are supported:

- up
- down
- left
- right
- menu
- top_menu
- select

A typical service call for press several buttons looks like this.

```yaml
service: remote.send_command
data:
  entity_id: remote.apple_tv
  command:
    - left
    - left
    - menu
    - select
```
