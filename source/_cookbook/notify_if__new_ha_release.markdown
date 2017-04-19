---
layout: page
title: "Send notification if new Home Assistant release"
description: "Basic example of how to send a notification if a new Home Assistant release is available"
date: 2016-07-17 10:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

The following example sends a notification via XMPP if a new Home Assistant release is available:

```yaml
notify:
  - platform: xmpp
    name: jabber
    sender: sender@jabber.org
    password: !secret xmpp_password
    recipient: recipient@jabber.org

automation:
  - alias: Update notifications
    trigger:
      - platform: state
        entity_id: updater.updater
    action:
      service: notify.jabber
      data:
        message: 'There is a new Home Assistant release available.'
```
