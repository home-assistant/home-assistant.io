---
title: LlamaLab Automate
description: Instructions on how to add LlamaLab Automate notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.27
ha_domain: llamalab_automate
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `llamalab_automate` {% term integration %} uses Googles Cloud Messaging Services to push messages from Home Assistant to your Android device running the LlamaLab [Automate](https://llamalab.com/automate/) app. This can serve as an alternative to Tasker + AutoRemote.

## Prerequisites

Go to [https://llamalab.com/automate/cloud/](https://llamalab.com/automate/cloud/) and create a new API key/secret.

## Configuration

To use this notification {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: llamalab_automate
    api_key: YOUR_API_KEY
    to: YOUR_EMAIL_ADDRESS
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: notify
  type: string
api_key:
  description: Enter the API key for Automate.
  required: true
  type: string
to:
  description: Email address the Automate-Fiber is configured for.
  required: true
  type: string
device:
  description: Name of the target device to receive the messages.
  required: false
  type: string
{% endconfiguration %}

Example Automation:

```yaml
- action: notify.entity_id
      data:
        message: "This is the message"
        data:
          priority: Normal
```

Message delivery `priority` in the nested `data` section is optional (default value: Normal).
Value "High" attempts to awaken the receiving device.

Receiving cloud messages in Automate:

1. Add a new flow
2. Insert block "Messaging -> Cloud message receive"
3. Insert block "Interface -> Toast show"
4. Connect OK from Flow beginning to IN of Cloud receive
5. Connect OK from Cloud receive to Toast show
6. Connect OK form Toast show to IN of Cloud receive
7. Tap Cloud receive and select the email account as setup in your configuration
8. Assign a variable name for the Payload
9. Tap Toast show and set the message value to the variable you've specified

If you have multiple devices paired to one Google Mail account and want to control each instance of Automate individually, you can set the notifier to target a specific device. To determine your devices name, add a Cloud Message send block to your flow, tap it and scroll all the way to the bottom. Device names are case sensitive.
