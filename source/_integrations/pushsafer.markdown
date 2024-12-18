---
title: Pushsafer
description: Instructions on how to add Pushsafer notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.39
ha_domain: pushsafer
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The [Pushsafer service](https://www.pushsafer.com/) is a platform for the notify integration. This allows you to send messages to the user using Pushsafer.

In order to get a private or alias key you need to go to the [Pushsafer website](https://www.pushsafer.com) and register.

To use Pushsafer notifications, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: pushsafer
    private_key: YOUR_KEY
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: notify
  type: string
private_key:
  description: Your private or alias key. Private key = send the notification to all devices with standard params, alias key send the notification to the devices stored in the alias with predefined params.
  required: true
  type: string
{% endconfiguration %}

### Examples

Message to two devices with formatted text.

```yaml
actions:
  - action: notify.notify
    data:
      title: "Test to 2 devices"
      message: "Attention [b]bold[/b] text[br][url=https://www.pushsafer.com]Link to Pushsafer[/url]"
      data:
        icon: "2"
        iconcolor: "#FF0000"
        sound: "2"
        vibration: "1"
        url: "https://www.home-assistant.io/"
        urltitle: "Open Home Assistant"
        time2live: "0"
```

Message to one device with formatted text and image from an external URL.

```yaml
actions:
  - action: notify.notify
    data:
      title: "Test to 1 device with image from an url"
      message: "Attention [i]italic[/i] Text[br][url=https://www.home-assistant.io/]Testlink[/url]"
      data:
        icon: "14"
        iconcolor: "#FFFF00"
        sound: "22"
        vibration: "31"
        url: "https://www.home-assistant.io/"
        urltitle: "Open Home Assistant"
        time2live: "60"
        picture1:
          url: "https://www.home-assistant.io/images/integrations/alexa/alexa-512x512.png"
```

Message to two devices and one device group with formatted text and local image.

```yaml
actions:
  - action: notify.notify
    data:
      title: "Test to 3 devices with local image"
      message: "Attention [i]italic[/i] Text[br][url=https://www.home-assistant.io/]Testlink[/url]"
      target: ["1111","2222","gs3333"],
      data:
        icon: "20"
        iconcolor: "#FF00FF"
        sound: "33"
        vibration: "0"
        url: "https://www.home-assistant.io/"
        urltitle: "Open Home Assistant"
        time2live: "10"
        priority: "2"
        retry: "60"
        expire: "600"
        confirm: "10"
        answer: "1"
        answeroptions: "yes|no|maybe"
        answerforce: "1"
        picture1: {
          path: "C:\\Users\\Kevin\\AppData\\Roaming\\.homeassistant\\image-760-testimage.jpg"
```

To customize your push-notification you can take a look at the [Pushsafer API description](https://www.pushsafer.com/en/pushapi).

When setting up the application you can use this [icon](/images/favicon-192x192.png).

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
