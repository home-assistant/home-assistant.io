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
ha_integration_type: integration
ha_codeowners:
  - '@engrbm87'
---

The [Pushover service](https://pushover.net/) is a platform for the notify integration. This allows integrations to send messages to the user using Pushover.

## Configuration

In order to get an API key, you need to [register an application](https://pushover.net/apps/clone/home_assistant) on the Pushover website. Your Pushover user key can be found on the [Pushover dashboard](https://pushover.net/dashboard).

{% include integrations/config_flow.md %}

Example Automation:

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

To use a specific Pushover device, set it using `target`. If one of the entered devices doesn't exist or is disabled in your Pushover account it will send a message to all you devices. To send to all devices, just skip the target attribute.

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

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

When sending a notification, optional parameters can also be set as per the Pushover [API documentation](https://pushover.net/api).

Example notification triggered from the Alexa integration for an intents is shown below which also uses [Automation Templating](/getting-started/automation-templating/) for the message:

{% raw %}

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

{% endraw %}
