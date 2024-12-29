---
title: Notify.Events
description: Instructions on how to integrate Notify.Events service with your Home Assistant notifications.
ha_release: 0.112
ha_category:
  - Notifications
ha_domain: notify_events
ha_codeowners:
  - '@matrozov'
  - '@papajojo'
ha_iot_class: Cloud Push
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

## Description

The [Notify.Events service](https://notify.events/) is an {% term integration %} for the **notify** integration. 

This platform allows you to quickly configure the distribution of messages between different recipients, no matter how they are used to receiving notifications: 

- [Telegram](https://telegram.org/)
- [Viber](https://viber.com/)
- [Slack](https://slack.com/)
- [Rocket.Chat](https://rocket.chat/)
- [Discord](https://discordapp.com/)
- Jabber / XMPP
- Webpush
- SMS
- VoiceCall

You can find a full supported messenger list [here](https://notify.events/features).

## Setting up

To start getting notifications, you need to follow those simple steps:
 
1. Sign up to [Notify.Events](https://notify.events/) and create a Channel
2. Add **Home Assistant** source to this channel and get your **token**
3. Add the Notify.Events integration to your installation by adding the following to your {% term "`configuration.yaml`" %} file:

```yaml
notify_events:
  token: YOUR_TOKEN
```

{% configuration %}
token:
  description: Your channel source token.
  required: true
  type: string
{% endconfiguration %}

Now you can use notify_events integration as a platform for your **notify service**, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}:

```yaml
# Example configuration.yaml entry

notify:
  - name: NOTIFIER_NAME (e.g. "events")
    platform: notify_events
```

{% configuration %}
name:
  description: "The optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action."
  required: false
  type: string
  default: notify
{% endconfiguration %}

### That's it!

Now you can use the `notify.events` action inside your Home Assistant to:
- Send any notifications or alerts
- Distribute events by `level` and `priority`
- Attach **files** and **images** (local or remote)
- .. and just keep using your favorite messenger to receive them!

### Example action

```yaml
- action: notify.events
  data:
    message: "Backyard motion detected!"
    data:
      level: "warning"
      priority: "high"
      images:
        - name: "local_photo.jpg"
          path: "/tmp/backyard_cam/motion.jpg"
        - name: "remote_photo.jpg"
          url: "https://i.ibb.co/Jt1845X/motion.jpg"
```

### Message optional parameters

The following attributes can be placed inside `data` for extended functionality.

| Attribute  | Description                                                                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`    | Message title.                                                                                                                                                                                   |
| `level`    | For recipients who have differences in the display of messages at different levels, this level will be applied.<br>Available values: `verbose`, `info`, `notice`, `warning`, `error`, `success`. |
| `priority` | For recipients which supports priority, the message will be highlighted accordingly.<br>Available values: `lowest`, `low`, `normal`, `high`, `highest`.                                          |
| `images`   | Array of images to attach (see item properties below).                                                                                                                                           |
| `files`    | Array of files to attach (see item properties below).                                                                                                                                            |
| `token`    | Notify.Events channel token (in case you want to override the channel to get this message to).                                                                                                   |

Every item of images and files has the following properties:

| Property                     | Required | Description      |
| ---------------------------- | -------- | ---------------- |
| `path` or `url` or `content` | True     | File source.     |
| `name`                       | False    | Result file name |
| `mime_type`                  | False    | File MIME-type   |

To use notifications effectively, please see the [getting started with automation page](/getting-started/automation/).
