---
title: "Updater"
description: "Detecting when Home Assistant updates are available."
logo: home-assistant.png
ha_category:
  - Other
ha_qa_scale: internal
ha_release: 0.8
---

The `updater` integration will check daily for new releases. It will show a badge in the frontend if a new version is found. As [Hass.io](/hassio/) has its own schedule for release it doesn't make sense to use this integration on Hass.io.

The updater integration will also collect basic information about the running Home Assistant instance and its environment. The information includes the current Home Assistant version, the time zone, Python version and operating system information. No identifiable information (i.e., IP address, GPS coordinates, etc.) will ever be collected. If you are concerned about your privacy, you are welcome to scrutinize the Python [source code](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/components/updater).

## Configuration

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
updater:
```

{% configuration %}
reporting:
  description: Whether or not to share system information when checking for updates.
  required: false
  type: boolean
  default: true
include_used_components:
  description: Whether or not to report the integrations that you are using in Home Assistant.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

For further information about the Updater's data, please check the [detailed overview](/docs/backend/updater/). If you choose not to share any information when checking for updates, you can set `reporting: false`.

It is possible to report the integrations that you are using to the Home Assistant developers. This will help them focus on improving the popular ones. To enable this option, you have to add `include_used_components: true`.

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

## Notification

For an added bonus, an automation integration can be created to send a message with a notifier when that state of this component's entity changes.

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
