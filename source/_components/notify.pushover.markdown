---
layout: page
title: "Pushover"
description: "Instructions on how to add Pushover notifications to Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
logo: pushover.png
ha_category: Notifications
ha_release: pre 0.7
---


The [Pushover service](https://pushover.net/) is a platform for the notify component. This allows components to send messages to the user using Pushover.

## {% linkable_title Configuration %}

In order to get an API key you need to [register an application](https://pushover.net/apps/clone/home_assistant) on the Pushover website. Your Pushover user key can be found on the [Pushover dashboard](https://pushover.net/dashboard).

To use Pushover notifications, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: pushover
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    user_key: ABCDEFGHJKLMNOPQRSTUVXYZ
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **api_key** (*Required*): Your API key.
- **user_key** (*Required*): Your user key for Pushover.

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
          file:
            url: !secret camera_still_image
            auth: basic
            username: !secret camera_username
            password: !secret camera_password
```

Component specific values in the nested `data` section are optional.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

When sending a notification, optional parameters can also be set as per the pushover [API documentation](https://pushover.net/api).

Example notification triggered from the Alexa component for an intents is shown below which also uses [Automation Templating](/getting-started/automation-templating/) for the message:

{% raw %}
```yaml
# Example configuration.yaml entries
alexa:
  intents:
    LocateIntent:
      action:
        service: notify.notify
        data_template:
          message: "The location of {{ User }} has been queried via Alexa."
        data:
          title: "Home Assistant"
          data:
            sound: falling
            device: pixel
            url: "https://www.home-assistant.io/"
```
{% endraw %}
