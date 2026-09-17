---
title: Pushover
description: Instructions on how to add Pushover notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: pre 0.7
ha_config_flow: true
ha_iot_class: Cloud Push
ha_domain: pushover
ha_platforms:
  - notify
ha_integration_type: service
ha_codeowners:
  - '@engrbm87'
---

The [Pushover action](https://pushover.net/) is a platform for the notify integration. This allows integrations to send messages to the user using Pushover.

## Configuration

To get an API key, you need to [register an application](https://pushover.net/apps/clone/home_assistant) on the Pushover website. Your Pushover user key can be found on the [Pushover dashboard](https://pushover.net/dashboard).

{% include integrations/config_flow.md %}

## Sending messages

Example automation:

```yaml
- action: notify.entity_id
  data:
    message: "This is the message"
    title: "Title of message"
    data:
      url: "https://www.home-assistant.io/"
      sound: pianobar
      priority: 0
      attachment: "local/image.png"
```

Integration-specific values in the nested `data` section are optional.

Image attachments can be added using the `attachment` parameter, which must be a local file reference (ex: `/tmp/image.png`).

When sending a notification, optional parameters can also be set as per the Pushover [API documentation](https://pushover.net/api).

## Targeting specific devices

To use a specific Pushover device, set it using `target`. If one of the entered devices doesn't exist or is disabled in your Pushover account it will send a message to all your devices. To send to all devices, just skip the target attribute.

```yaml
- action: notify.entity_id
  data:
    message: "This is the message"
    title: "Title of message"
    target:
      - pixel3
      - pixel4a
    data:
      sound: pianobar
      priority: 0
```

## Time-to-live (TTL)

Using the `ttl` parameter, messages may be set to delete automatically after a certain period of time. This is useful for messages that, at some point, outlive their usefulness. The `ttl` parameter specifies a time-to-live in seconds. In the following example, the message will self-delete from the targeted device(s) after 6 hours.

```yaml
- action: notify.pushover
  data:
    message: "This is the message"
    title: "Title of message"
    target:
      - pixel9
      - johnsmith
    data:
      ttl: 21600
```

## Emergency notifications

To use the highest priority, which repeats the notification every x seconds (`retry`) for the duration of y seconds (`expire`), you MUST specify these parameters. The minimal time for the `retry` parameter is 30 seconds. The `expire` parameter has a maximum of 10800 seconds (3 hours). If you target more than one device, make sure to enable the advanced option "Notification dismissal sync" in the app to be able to dismiss the alert on all devices simultaneously.

```yaml
- action: notify.entity_id
  data:
    message: "This is the message"
    title: "Title of message"
    target:
      - iphone11pro
    data:
      priority: 2
      sound: "siren"
      expire: 300
      retry: 30
```

### Canceling emergency notifications

To cancel an emergency notification before it is acknowledged or expires, assign one or more tags to the message using the `tags` field in the `data` section:

```yaml
- action: notify.pushover
  data:
    message: "Motion detected in garage"
    title: "Alert"
    data:
      priority: 2
      retry: 30
      expire: 3600
      tags: garage_alarm
```

Multiple tags can be assigned as a list:

```yaml
- action: notify.pushover
  data:
    message: "Motion detected in garage"
    title: "Alert"
    data:
      priority: 2
      retry: 30
      expire: 3600
      tags:
        - garage_alarm
        - building_a
```

To cancel emergency notifications sent through a specific Pushover account, use the `pushover.cancel` action and select the account. In the UI, the account can be selected from a dropdown; in YAML mode, the `entry_id` field expects the config entry ID of that account:

```yaml
- action: pushover.cancel
  data:
    entry_id: 8955375327824e14ba89e4b29cc3ec9a
    tag: garage_alarm
```

Omitting the `tag` field cancels all currently tracked emergency notifications for the selected account:

```yaml
- action: pushover.cancel
  data:
    entry_id: 8955375327824e14ba89e4b29cc3ec9a
```

Tags are matched independently per message. If a message was sent with multiple tags, it is canceled as soon as any one of its tags matches the tag provided to `pushover.cancel`.

If multiple Pushover accounts are configured, `pushover.cancel` only affects the account selected via `entry_id`. To cancel notifications across multiple accounts, call the action once per account.

{% note %}
Receipt tracking is kept in memory. Receipts are lost when Home Assistant restarts. In that case, emergency notifications that were sent before the restart must expire naturally or be canceled manually via the Pushover app.
{% endnote %}

## Examples

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

Example notification triggered from the Alexa integration for an intents is shown below which also uses [Automation Templating](/getting-started/automation-templating/) for the message:

```yaml
# Example configuration.yaml entries
alexa:
  intents:
    LocateIntent:
      action:
        action: notify.notify
        data:
          message: "The location of {{ User }} has been queried via Alexa."
          title: "Home Assistant"
          target: pixel
          data:
            sound: falling
            url: "https://www.home-assistant.io/"
            attachment: "/tmp/image.png"
```
