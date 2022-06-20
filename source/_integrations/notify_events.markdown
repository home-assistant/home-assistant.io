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
---

## Description

The [Notify.Events service](https://notify.events/) is a platform for the **notify** component.

This platform allows you to quickly configure the distribution of messages between different recipients, no matter how they are used to receiving notifications:

- [Telegram](https://telegram.org/)
- [Viber](https://viber.com/)
- [Signal](https://signal.org/)
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

1. SignUp to [Notify.Events](https://notify.events/) and create a Channel
2. Add **Home Assistant** source to this channel and get your **token**
3. Add the Notify.Events integration to your installation by adding the following to your `configuration.yaml` file:

```yaml
notify_events:
  token: YOUR_TOKEN
  webhook_id: my_secret_webhook_id
```

{% configuration %}
token:
  description: Your channel source token.
  required: true
  type: string
webhook_id:
  description: Technical webhook id required to let Notify.Events make Action's callbacks work.
  required: false
  type: string
{% endconfiguration %}

**Advice**: change the value of the `webhook_id` parameter to some random string to prevent mad web-bots from triggering your actions.

Now you can use notify_events integration as a platform for your **notify service**, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry

notify:
  - name: NOTIFIER_NAME (e.g. "events")
    platform: notify_events
```

{% configuration %}
name:
  description: "The optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`."
  required: false
  type: string
  default: notify
{% endconfiguration %}

### That's it!

Now you can use the `notify.events` service inside your Home Assistant to:
- Send any notifications or alerts
- Distribute events by `level` and `priority`
- Attach **files** and **images** (local or remote)
- Define **actions** to set up quick reaction buttons in your notifications
- .. and just keep using your favorite messenger to receive them!

### Example service call

```yaml
- service: notify.events
  data:
    message: "Suspicious activity at your front door!"
    data:
      level: "warning"
      priority: "high"
      images:
        - name: "local_photo.jpg"
          path: "/tmp/front_door_cam/motion.jpg"
        - name: "remote_photo.jpg"
          url: "https://i.ibb.co/R27KsVQ/front-door-camera-1.jpg"
      actions:
        - name: open_front_door
          title: Open door
        - name: call_police
          title: Call the cops!
```

### Message optional parameters

The following attributes can be placed inside `data` for extended functionality.

| Attribute  | Description                                                                                                                                                                                      |
|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`    | Message title.                                                                                                                                                                                   |
| `level`    | For recipients who have differences in the display of messages at different levels, this level will be applied.<br>Available values: `verbose`, `info`, `notice`, `warning`, `error`, `success`. |
| `priority` | For recipients which supports priority, the message will be highlighted accordingly.<br>Available values: `lowest`, `low`, `normal`, `high`, `highest`.                                          |
| `images`   | Array of images to attach (see item properties below).                                                                                                                                           |
| `files`    | Array of files to attach (see item properties below).                                                                                                                                            |
| `actions`  | Array of callback action buttons (see item properties below).                                                                                                                                    |
| `token`    | Notify.Events channel token (in case you want to override the channel to get this message to).                                                                                                   |

### Images and Files

Every item of **images** and **files** has the following properties:

| Property                     | Required | Description      |
|------------------------------|----------|------------------|
| `path` or `url` or `content` | True     | File source.     |
| `name`                       | False    | Result file name |
| `mime_type`                  | False    | File MIME-type   |

### Actions

All described **Actions** are becoming the buttons you will see under the notification message to take an action right from the chat.

After you pushing one of those buttons, Notify.Events will trigger an Event through your Home Assistant webhook, which you can use as a trigger for your automations.
**Event type** will be the same as selected action `name` parameter, so you can set up reaction for every action you set up.

```yaml
# Automation trigger configuration example:
...
trigger:
- platform: event
  event_type: call_police
...
```

Every item of **actions** has the following properties:

| Property | Required | Description           |
|----------|----------|-----------------------|
| `name`   | True     | Action name (type)    |
| `title`  | True     | Action (button) title |

**Notice**: don't forget to make sure that your Home Assistant instance is reachable from the web and you've set the `external_url` parameter in your `configuration.yaml`.

**Advice**: prefix the action `names` to prevent conflict with some other trigger Events, for example call you can use **"ne_"** prefix: `"ne_open_the_door"`, `"ne_turn_on_the_bedroom_ac"`, etc.

### Troubleshooting


> #### Notifications don't come
> - Check that the **token** parameter in the `configuration.yaml` file is correct.
> - Check that Notify.Events channel you send notifications to has subscribers
> - If you don't see any notification messages in the **Messages** section on your Notify.Events channel page, please make sure that your Home Assistant instance have internet access

> #### Notification comes without Actions (buttons)
> - Make sure that you've configured the **webhook_id** parameter as it showed in example above
> - Check that you describe Actions according to the format (see example above)
> - Check that your notify_events component is updated to the last version.

If you still have an issue with receiving notifications, please feel free to [contact us](https://notify.events/contacts).

### And of course

Please see the [getting started with automation page](/getting-started/automation/) to use notifications effectively.
