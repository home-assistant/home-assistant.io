---
title: Prowl
description: Instructions on how to add Prowl notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.52
ha_iot_class: Cloud Push
ha_domain: prowl
ha_platforms:
  - notify
ha_integration_type: integration
---

The `prowl` platform uses [Prowl](https://www.prowlapp.com/) to deliver push notifications from Home Assistant to your iOS device.

Go to the [Prowl website](https://www.prowlapp.com/) and create a new API key.

To add Prowl notifications to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: prowl
    api_key: YOUR_API_KEY
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
api_key:
  description: The Prowl API key to use.
  required: true
  type: string
{% endconfiguration %}

### Prowl service data

The following attributes can be placed `data` for extended functionality.

| Service data attribute | Optional | Default | Description |
| ---------------------- | -------- | ------- | ----------- |
| `priority`             |      yes |    0    | Priority level, for more info refer to the [Prowl API documentation](https://www.prowlapp.com/api.php#add). |
| `url`                  |      yes |   n/a   | URL to be attached, for more info refer to the [Prowl API documentation](https://www.prowlapp.com/api.php#add). |

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
