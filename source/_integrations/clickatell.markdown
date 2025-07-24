---
title: Clickatell
description: Instructions on how to add Clickatell notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.56
ha_domain: clickatell
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `clickatell` platform uses [Clickatell](https://www.clickatell.com) to deliver SMS notifications from Home Assistant.

## Setup

Go to your [Clickatell SMS Platform Portal](https://portal.clickatell.com/#/) section and create a new SMS integration. There are three screens of information required to create an integration. Please ensure the following:

1. Give the new Integration an identification name.
2. Ensure it is set for 'production' use.
3. Select 'HTTP' as your API type.
4. Ensure that the you select for the messaging type to be 'one way messaging'.
5. Be aware of the international number format option as this impacts the structure of the phone numbers you provide.
6. Once you have completed entering your details an API key is generated. Copy the API key.

## Configuration

To add Clickatell to your installation, add the following to your Home Assistant {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
notify:
  - platform: clickatell
    name: USER_DEFINED_NAME
    api_key: CLICKATELL_API_KEY
    recipient: PHONE_NO
```

{% configuration %}
name:
  description: Setting the optional parameter name allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: clickatell
  type: string
api_key:
  description: Your Clicktell API key.
  required: true
  type: string
recipient:
  description: Your phone number. This is where you want to send your notification SMS messages. e.g., `61444333444`.
  required: true
  type: string
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
