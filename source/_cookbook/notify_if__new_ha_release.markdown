---
title: "Send notification if new Home Assistant release"
description: "Basic example of how to send a notification if a new Home Assistant release is available"
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
  - alias: "Update notification"
    trigger:
      - platform: state
        entity_id: binary_sensor.updater
        from: "off"
        to: "on"
    action:
      - service: notify.jabber
        data:
          message: "There is a new Home Assistant release available."
```

You can use [templates](/topics/templating/) to include the release number of Home Assistant if you prefer. The following example sends a notification via [Pushbullet](/integrations/pushbullet) with the Home Assistant version in the message.

{% raw %}

```yaml
notify:
  - platform: pushbullet
    api_key: "YOUR_KEY_HERE"
    name: pushbullet

automation:
  - alias: "Update notification"
    trigger:
      - platform: state
        entity_id: binary_sensor.updater
        from: "off"
        to: "on"
    action:
      - service: notify.pushbullet
        data: 
          title: "New Home Assistant Release"
          target: "YOUR_TARGET_HERE" #See Pushbullet integration for usage
          message: "Home Assistant {{ state_attr('binary_sensor.updater', 'newest_version') }} is now available."
```

{% endraw %}
