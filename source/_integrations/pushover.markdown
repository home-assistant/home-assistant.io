---
title: Pushover
description: Instructions on how to add Pushover notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: pre 0.7
ha_iot_class: Cloud Push
ha_domain: pushover
ha_platforms:
  - notify
---

The [Pushover service](https://pushover.net/) is a platform for the notify component. This allows integrations to send messages to the user using Pushover.

## Configuration

In order to get an API key you need to [register an application](https://pushover.net/apps/clone/home_assistant) on the Pushover website. Your Pushover user key can be found on the [Pushover dashboard](https://pushover.net/dashboard).

To use Pushover notifications, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: pushover
    api_key: YOUR_API_KEY
    user_key: YOUR_USER_KEY
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
api_key:
  description: Your API key.
  required: true
  type: string
user_key:
  description: Your user key for Pushover.
  required: true
  type: string
{% endconfiguration %}

Example Automation:

```yaml
- service: notify.entity_id
      data:
        message: "This is the message"
        title: "Title of message"
        data:
          url: "https://www.home-assistant.io/"
          sound: pianobar
          priority: 0
          attachment: "http://example.com/image.png"
```

Component specific values in the nested `data` section are optional.

Image attachments can be added using the `attachment` parameter, which can either be a valid URL for an image (ex: `http://example.com/image.png`) or a local file reference (ex: `/tmp/image.png`).

To use a specific Pushover device, set it using `target`. If one of the entered devices doesn't exist or is disabled in your Pushover account it will send a message to all you devices. To send to all devices, just skip the target attribute.

```yaml
- service: notify.entity_id
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
        service: notify.notify
        data:
          message: "The location of {{ User }} has been queried via Alexa."
        data:
          title: "Home Assistant"
          target: pixel
          data:
            sound: falling
            url: "https://www.home-assistant.io/"
            attachment: "/tmp/image.png"
```

{% endraw %}
