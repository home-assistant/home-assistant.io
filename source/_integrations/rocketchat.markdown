---
title: Rocket.Chat
description: Instructions on how to add Rocket.Chat notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.56
ha_domain: rocketchat
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `rocketchat` notify {% term integration %} allows you to send messages to your [Rocket.Chat](https://rocket.chat/) instance from Home Assistant.

## Configuration

To add Rocket.Chat to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
notify:
  - platform: rocketchat
    name: NOTIFIER_NAME
    url: https://rocketchat.example.com
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    room: YOUR_ROOM_NAME
```

- `name` (*Optional*): Name displayed in the frontend. The notifier will bind to the `notify.NOTIFIER_NAME` action.
- `url` (*Required*): The URL of your Rocket.Chat instance.
- `username` (*Required*): The Rocket.Chat username.
- `password` (*Required*): The Rocker.Chat password.
- `room` (*Required*): The chat room name to send messages to.

### Script example

```yaml
rocketchat_notification:
  sequence:
  - action: notify.NOTIFIER_NAME
    data:
      message: "Message to Rocket.Chat from Home Assistant!"
      data:
        emoji: ":smirk:"
```

#### Message variables

- **message** (*Required*): Message to be displayed.
- **data** (*Optional*): Dictionary containing any of the variables defined in the [Rocket.Chat documentation](https://developer.rocket.chat/reference/api/rest-api/endpoints/core-endpoints/chat-endpoints/postmessage)

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
