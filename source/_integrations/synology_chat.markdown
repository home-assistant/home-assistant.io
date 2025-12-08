---
title: Synology Chat
description: Instructions on how to add a Synology Chat Bot notifications to Home Assistant.
ha_iot_class: Cloud Push
ha_release: 0.65
ha_category:
  - Notifications
ha_domain: synology_chat
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `synology_chat` notification {% term integration %} allows you to deliver notifications to your [Synology Chat](https://www.synology.com/en-us/dsm/feature/chat) install as a Synology Chat bot.

To configure a Synology Chat bot, first you must create a [Synology Chat Integration Incoming Webhook](https://www.synology.com/en-us/knowledgebase/DSM/tutorial/Collaboration/How_to_configure_webhooks_and_slash_commands_in_Chat_Integration#t2.1). After this is complete, you will have a Webhook URL. This is what will be required in the Home Assistant configuration.

To enable the Synology Chat notification in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
notify:
  - platform: synology_chat
    name: hass_synchat
    resource: https://example.your.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=1&token=ABCDEFG
```

{% configuration %}
name:
  description: "Setting the  parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action."
  required: true
  type: string
verify_ssl:
  description: If SSL/TLS verification for HTTPS resources needs to be turned off (for self-signed certs, etc.).
  required: false
  type: boolean
  default: true
resource:
  description: The incoming webhook URL.
  required: true
  type: string
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

A full example of an action:

```json
{"message": "This is a test message", 
 "data":{
     "file_url":"https://example.com/wp-content/uploads/sites/14/2011/01/cat.jpg"
     }
 }
```
