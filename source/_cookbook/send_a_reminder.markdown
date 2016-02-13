---
layout: page
title: "Send a reminder"
description: "Send a reminder"
date: 2015-12-16 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

Always forget to eat lunch? Let Home Assistant send you a reminder.

Add a [notify platform](/components/notify/) of your choice.

```yaml
notify:
  - platform: xmpp
    name: jabber
    sender: YOUR_JID
    password: YOUR_JABBER_ACCOUNT_PASSWORD
    recipient: YOUR_RECIPIENT
```

and automation part to your `configuration.yaml` file.

```yaml
automation:
  - alias: Send message at a given time
    trigger:
      platform: time
      hours: 12
      minutes: 15
      seconds: 0
    action:
      service: notify.jabber
      data:
        message: 'Time for lunch'
```


