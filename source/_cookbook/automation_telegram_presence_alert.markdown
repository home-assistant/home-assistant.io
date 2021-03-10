---
title: "Examples sending notification depending of the presence"
description: "Examples sending notification depending of the presence"
ha_category: Automation Examples
---

This will send a message when someone in your known devices list connects to your local network. In other words, when someone arrives home. It will only work if you are using the [Nmap](/integrations/nmap_tracker) device tracker or a similar integration.

This example uses [Telegram](/integrations/telegram) to send the notification.

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
    from: "not_home"
    to: "home"
  action:
    service: notify.Telegram
    data:
      message: "Person is now home"
```
