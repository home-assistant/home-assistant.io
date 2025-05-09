---
title: Azure Service Bus
description: Setup for Azure Service Bus integration
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.102
ha_codeowners:
  - '@hfurubotten'
ha_domain: azure_service_bus
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `Azure Service Bus` integration allows you to send messages to [Azure Service Bus](https://azure.microsoft.com/products/service-bus/) from within Home Assistant.

## First-time setup

This assumes you already have an Azure account. Otherwise, create a free account [here](https://azure.microsoft.com/free/).

You need to create a Service Bus namespace; you can follow [this guide](https://learn.microsoft.com/azure/service-bus-messaging/service-bus-quickstart-portal#create-a-namespace-in-the-azure-portal).

You must then create a Shared Access Policy for the Service Bus with `Send` claims or use the RootManageAccessKey from your namespace (this key has additional claims, including managing the event hub and listening, which are not needed for this purpose), for more details on the security of Service Bus [go here](https://learn.microsoft.com/azure/service-bus-messaging/service-bus-authentication-and-authorization#shared-access-signature). Alternatively you can create a dedicated key for only one queue or topic, to restrict access to only that queue or topic.

Once you have the connection string with `Send` policy, you can set up the integration itself.

{% important %}
The queue or topic that you are sending to needs to exists with the service bus namespace before you use it within Home Assistant. See [here](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-quickstart-portal) for how to set up a queue and [here](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-quickstart-topics-subscriptions-portal) for setting up a topic and subscriptions.
{% endimportant %}

## Configuration

Add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
notify:
  - platform: azure_service_bus
    connection_string: !secret servicebus_connection_string
    topic: t-test
  - platform: azure_service_bus
    connection_string: !secret servicebus_connection_string
    queue: q-test
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  type: string
  default: notify
connection_string:
  description: Connection string found in the Azure portal, with `send` claim in the key.
  required: true
  type: string
queue:
  description: Which queue to send notifications on.
  required: exclusive
  type: string
topic:
  description: Which topic to send notifications on.
  required: exclusive
  type: string
{% endconfiguration %}

{% tip %}
If you plan to send all state changes from one or more entities within Home Assistant, you should consider using the [Azure Event Hub](/integrations/azure_event_hub/) integration instead.
{% endtip %}

## Usage

The notification service will translate the data given to a JSON object on the service bus. The `message` field will always be set, but the fields `target` and `title` are optional and are only included in the service bus message if set. Any input given in the `data` section, will be flattened to the root of the JSON object and follow the structure given. All input given in the data section will be included in the message.

See the example below for how an automation trigger translates to a message on the service bus.

```yaml
automation:
  - alias: "Sunset Service Bus message"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: notify.test_queue
        data:
          message: "Sun is going down"
          title: "Good evening"
          data:
            sun_direction: "Down"
            custom_field: 123
            custom_object:
              trigger_more: true
              explain: "It's starting to get dark"
```

The message that can be retrieved from a queue or topic subscription:

```json
{
  "message": "Sun is going down",
  "title": "Good evening",
  "sun_direction": "Down",
  "custom_field": 123,
  "custom_object": {
    "trigger_more": true,
    "explain": "It's starting to get dark"
  }
}
```
