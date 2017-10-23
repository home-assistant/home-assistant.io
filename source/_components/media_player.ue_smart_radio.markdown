---
layout: page
title: "Logitech UE Smart Radio"
description: "Instructions on how to integrate a Logitech UE Smart Radio player into Home Assistant."
date: 2017-10-23 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ueradio.png
ha_category: Media Player
ha_release: 0.57
ha_iot_class: "Cloud Polling"
---


The `ue_radio` platform allows you to control a [Logitech UE Smart Radio](https://www.uesmartradio.com) from Home Assistant. This lets you control both Logitech UE Smart Radios and Logitech Squeezebox Radios that have been updated with the UE Smart Radio update.

To add your UE Smart Radio player to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: ue_radio
    email: EMAIL
    password: PASSWORD
```

Configuration variables:

- **email** (*Required*): This is the email you use to log in to `uesmartradio.com`.
- **password** (*Required*): Password you use to log in to `uesmartradio.com`.
