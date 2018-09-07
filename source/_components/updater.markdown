---
layout: page
title: "Updater"
description: "Detecting when Home Assistant updates are available."
date: 2015-11-15 20:40
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Other
---

The `updater` component will check daily for new releases. It will show a badge in the frontend if a new version is found. As [Hass.io](/hassio/) has its own schedule for release it doesn't make sense to use this component on Hass.io.

The updater component will also collect basic information about the running Home Assistant instance and its environment. The information includes the current Home Assistant version, the time zone, Python version and operating system information. No identifiable information (i.e., IP address, GPS coordinates, etc.) will ever be collected. If you are concerned about your privacy, you are welcome to scrutinize the Python [source code](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/components/updater.py#L91). For further information about the Updater's data, please check the [detailed overview](/docs/backend/updater/).

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
updater:
```

If you choose not to share any information when checking for updates, you can add `reporting: False`.

It is possible to report the components that you are using to the Home Assistant developers. This will help them focus on improving the popular ones. To enable this option, you have to add `include_used_components: True`. 

```json
"components": [
    "apcupsd",
    "api",
    "automation",
    "binary_sensor",
    "binary_sensor.zwave",
    "camera",
    "camera.uvc",
    "config",
    "config.core",
    ...
]
```

### {% linkable_title Notification %}

For an added bonus, an automation component can be created to send a message with a notifier when that state of this component's entity changes.

```yaml
# Example configuration.yaml entry
automation:
  alias: 'Update Available Notifications'
  trigger:
    platform: state
    entity_id: updater.updater
  action:
    service: notify.notify
    data:
      message: 'Update for Home Assistant is available.'
```

