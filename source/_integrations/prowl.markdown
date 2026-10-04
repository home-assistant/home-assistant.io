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

The **Prowl** integration adds a notify {% term entity %} for each configured API key. To send a notification, use the **Send a notification message** (`notify.send_message`) {% term action %}.

{% example %}
action: |
  action: notify.send_message
  target:
    entity_id: notify.prowl
  data:
    title: "Reminder"
    message: "Have you considered frogs?"
{% endexample %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
