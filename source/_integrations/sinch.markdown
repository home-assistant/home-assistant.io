---
title: Sinch SMS
description: Instructions on how to add Sinch notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.101
ha_codeowners:
  - '@bendikrb'
ha_domain: sinch
ha_iot_class: Cloud Push
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `sinch` {% term integration %} uses [Sinch](https://www.sinch.com/products/apis/messaging/sms/) to deliver notifications from Home Assistant.

## Prerequisites

Go to your [Sinch Dashboard](https://dashboard.sinch.com/sms/api/rest) and click "Add new REST API". You should now be able to obtain your `service_plan_id` and `api_key`.

## Configuration

To add Sinch to your installation, add the following to your Home Assistant {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
notify:
  - platform: sinch
    service_plan_id: SINCH_SERVICE_PLAN_ID
    api_key: SINCH_API_KEY
```

{% configuration %}
name:
  description: "Setting the optional parameter name allows multiple notifiers to be created. The default value is `Sinch`. The notifier will bind to the `notify.NOTIFIER_NAME` action."
  required: false
  type: string
service_plan_id:
  description: Your Sinch Service Plan ID.
  required: true
  type: string
api_key:
  description: Your API Token.
  required: true
  type: string
default_recipient:
  description: "A single or multiple phone numbers. This is where you want to send your SMS notification messages by default (when not specifying `target` in the action), e.g., `09171234567` or `[09171234567, 09177654321]`."
  required: false
  type: [string, list]
sender:
  description: The name or number of the sender.
  required: false
  type: string
  default: 'Home Assistant'
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

### Full configuration example

```yaml
# Example configuration.yaml entry
notify:
  - platform: sinch
    name: Sinch
    service_plan_id: SINCH_SERVICE_PLAN_ID
    api_key: SINCH_API_KEY
    default_recipient: [PHONE_NO1, PHONE_NO2]
    sender: Home Assistant
```
