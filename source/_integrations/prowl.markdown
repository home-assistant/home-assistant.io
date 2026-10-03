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
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---

The **Prowl** {% term integration %} uses [Prowl](https://www.prowlapp.com/) to deliver push notifications from Home Assistant to your iOS device.

## Prerequisites

Go to the [Prowl website](https://www.prowlapp.com/) and create a new API key.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The Prowl API key to use."
Name:
  description: "The name of the notifier. This name is used for the notify entity that is created."
{% endconfiguration_basic %}

## Sending notifications

The **Prowl** integration adds a notify {% term entity %} for each configured API key. To send a notification, you can use the **Send a notification message** (`notify.send_message`) {% term action %}. To set a priority or attach a URL, use the [**Prowl: Send message**](/actions/prowl.send_message/) (`prowl.send_message`) action instead.

{% example %}
action: |
  action: notify.send_message
  target:
    entity_id: notify.prowl
  data:
    title: "Reminder"
    message: "Have you considered frogs?"
{% endexample %}

{% include integrations/actions.md %}

## Legacy notify action (deprecated)

{% warning %}
The legacy `notify.NOTIFIER_NAME` action that is set up with YAML in {% term "`configuration.yaml`" %} is deprecated and will be removed in Home Assistant 2027.5. When you use it, a repair issue is raised.

To migrate, remove the Prowl notify configuration from your {% term "`configuration.yaml`" %} file, [set up the integration in the UI](#configuration), and update your automations and scripts to use the `notify.send_message` or [`prowl.send_message`](/actions/prowl.send_message/) action with the Prowl notify entity as target.
{% endwarning %}

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: prowl
    api_key: YOUR_API_KEY
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: notify
  type: string
api_key:
  description: The Prowl API key to use.
  required: true
  type: string
{% endconfiguration %}

The following attributes can be placed in `data` of the legacy action for extended functionality.

| Data attribute | Optional | Default | Description                                                                                                     |
| -------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `priority`     | yes      | 0       | Priority level, for more info refer to the [Prowl API documentation](https://www.prowlapp.com/api.php#add).     |
| `url`          | yes      | n/a     | URL to be attached, for more info refer to the [Prowl API documentation](https://www.prowlapp.com/api.php#add). |

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
