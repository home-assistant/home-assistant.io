---
title: "Send a reminder"
description: "Send a reminder"
ha_category: Automation Examples
---

Always forget to eat lunch? Let Home Assistant send you a reminder.

Add a [notify platform](/integrations/notify/) of your choice.

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
  - alias: "Send message at a given time"
    trigger:
      platform: time
      at: "12:15:00"
    action:
      service: notify.jabber
      data:
        message: "Time for lunch"
```
