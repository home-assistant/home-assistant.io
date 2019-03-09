---
layout: page
title: "Examples sending notification depending of the presence"
description: "Examples sending notification depending of the presence"
date: 2017-02-12 19:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

This will send a message when someone in your known devices list connects to your local network. In other words, when someone arrives home. It will only work if you are using the [Nmap](/components/device_tracker.nmap_tracker/) device tracker or a similar component. 

This example uses [Telegram](/components/notify.telegram/) to send the notification.

```yaml
notify:
  - name: Telegram
    platform: telegram
    api_key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    chat_id: xxxxxxxxx
```

Add the automation rule. Change `device_name_here` to match the device you want to track. 

```yaml
automation:
  trigger:
    platform: state
    entity_id: device_tracker.device_name_here
    from: 'not_home'
    to: 'home'
  action:
    service: notify.Telegram
    data:
      message: 'Person is now home'
```
