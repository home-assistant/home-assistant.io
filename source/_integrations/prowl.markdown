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
ha_config_flow: true
---

The **Prowl** {% term integration %} uses [Prowl](https://www.prowlapp.com/) to deliver push notifications from Home Assistant to your iOS device.

## Prerequisites

Go to the [Prowl website](https://www.prowlapp.com/) and create a new API key.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The Prowl API key you created on the Prowl website."
{% endconfiguration_basic %}

## Sending notifications

The **Prowl** integration adds a notify {% term entity %} for each configured API key. To send a notification, use the [**Send a notification message**](/actions/notify.send_message/) (`notify.send_message`) {% term action %} and select the Prowl notify entity as the target. To set a priority or attach a URL, use the [**Prowl: Send message**](/actions/prowl.send_message/) (`prowl.send_message`) action instead.

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

## Prowl automation examples

You can use this integration to send a push notification to your iOS device when something happens in your home.

{% include docs/paste_yaml_tip.md %}

### Automation: send a notification when the front door opens

This automation sends a high-priority notification when the front door opens.

- **Trigger**: Door opened
  - **Target**: Front door (`binary_sensor.front_door`)
- **Action**: Send message
  - **Target**: Prowl (`notify.prowl`)
  - **Priority**: High

{% details "YAML example for a notification when the front door opens" %}

{% example %}
automation: |
  alias: "Prowl: front door opened"
  triggers:
    - trigger: door.opened
      target:
        entity_id: binary_sensor.front_door
  actions:
    - action: prowl.send_message
      target:
        entity_id: notify.prowl
      data:
        title: "Front door"
        message: "The front door was opened."
        priority: high
{% endexample %}

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
