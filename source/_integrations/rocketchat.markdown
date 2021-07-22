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
---

The `rocketchat` notify platform allows you to send messages to your [Rocket.Chat](https://rocket.chat/) instance from Home Assistant.

## Configuration

To add Rocket.Chat to your installation, add the following to your `configuration.yaml` file:

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

- `name` (*Optional*): Name displayed in the frontend. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- `url` (*Required*): The URL of your Rocket.Chat instance.
- `username` (*Required*): The Rocket.Chat username.
- `password` (*Required*): The Rocker.Chat password.
- `room` (*Required*): The chat room name to send messages to.

### Script example

```yaml
rocketchat_notification:
  sequence:
  - service: notify.NOTIFIER_NAME
    data:
      message: "Message to Rocket.Chat from Home Assistant!"
      data:
        emoji: ":smirk:"
```

#### Message variables

- **message** (*Required*): Message to be displayed.
- **data** (*Optional*): Dictionary containing any of the variables defined in the [Rocket.Chat documentation](https://docs.rocket.chat/api/rest-api/methods/chat/postmessage)

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
