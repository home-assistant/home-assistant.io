---
title: ClickSend SMS
description: Instructions on how to add ClickSend notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.48
ha_domain: clicksend
ha_iot_class: Cloud Push
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `clicksend` platform uses [ClickSend](https://clicksend.com) to deliver notifications from Home Assistant.

## Prerequisites

Go to your [ClickSend Dashboard](https://dashboard.clicksend.com) section and create your new project. After creating your project, you should now be able to obtain your `username` and `api_key`.

## Configuration

To add ClickSend to your installation, add the following to your Home Assistant {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
notify:
  - platform: clicksend
    name: ClickSend
    username: CLICKSEND_USERNAME
    api_key: CLICKSEND_API_KEY
    recipient: PHONE_NO
    
# Multiple recipients
notify:
  - platform: clicksend
    name: ClickSend
    username: CLICKSEND_USERNAME
    api_key: CLICKSEND_API_KEY
    recipient: [PHONE_NO1, PHONE_NO2]
```

{% configuration %}
name:
  description: "Setting the optional parameter name allows multiple notifiers to be created. The default value is `ClickSend`. The notifier will bind to the `notify.NOTIFIER_NAME` action."
  required: false
  type: string
username:
  description: Your Clicksend username.
  required: true
  type: string
api_key:
  description: Your Clicksend API Key.
  required: true
  type: string
recipient:
  description: "A single or multiple phone numbers. This is where you want to send your SMS notification messages, e.g., `09171234567` or `[09171234567, 09177654321]`."
  required: true
  type: [string, list]
sender:
  description: The name or number of the sender. (Limited to 11 characters.)
  required: false
  type: string
  default: "`hass`"
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
