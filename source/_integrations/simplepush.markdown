---
title: Simplepush
description: Instructions on how to add Simplepush notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Polling
ha_release: 0.29
ha_domain: simplepush
ha_platforms:
  - notify
---

The `simplepush` platform uses [Simplepush](https://simplepush.io/) to delivery notifications from Home Assistant to your Android device. Unlike similar apps the Simplepush app requires no registration.

To add Simplepush to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: simplepush
    device_key: ABCDE
```

{% configuration %}
  name:
    description: Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
    required: false
    type: string
  device_key:
    description: The device key of your device.
    required: true
    type: string
  event:
    description: The event for the events.
    required: false
    type: string
  password:
    description: The password of the encryption used by your device.
    required: inclusive
    type: string
  salt:
    description: The salt used by your device.
    required: inclusive
    type: string
{% endconfiguration %}

To test if the service works, just send a message with `curl` from the command-line.

```bash
curl 'https://api.simplepush.io/send/device_key/title/message'
```

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
