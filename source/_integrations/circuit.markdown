---
title: Unify Circuit
description: Instructions on how to send a notification to a Unify Circuit Conversation.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.111
ha_codeowners:
  - '@braam'
ha_domain: circuit
ha_platforms:
  - notify
ha_integration_type: integration
---

The `Unify Circuit` platform allows you to send notifications from Home Assistant to a conversation in [Unify Circuit](https://www.circuit.com/).

## Setup

To send a notification to Circuit, you need to add the Incoming Webhook app to your conversation. When the app is added, you will receive a webhook URL that needs to be added to your `configuration.yaml`.

More details for creating the webhook app, visit: [Create webhook Circuit](https://www.circuit.com/unifyportalfaqdetail?articleId=164448)

## Configuration

To add the Unify Circuit platform to your installation, add the following to your `configuration.yaml` file:

```yaml
circuit:
  webhook:
    - name: circuit_hass
      url: https://eu.yourcircuit.com/rest/v2/webhooks/incoming/<ID>
```

{% configuration %}
name:
  description: Setting this parameter allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  type: string
  default: "notify"
url:
  description: The webhook URL created in the setup step.
  required: true
  type: string
{% endconfiguration %}

### Unify circuit notify message

HTML tags can be placed inside `message` for extended functionality.

Example for message:

```yaml
message: <b>Message</b> that will be added.
```
