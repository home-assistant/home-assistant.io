---
title: ntfy
description: Instructions on how to integrate ntfy with Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 2025.2
ha_config_flow: true
ha_codeowners:
  - '@tr4nt0r'
ha_domain: ntfy
ha_integration_type: integration
ha_platforms:
  - notify
---

The **ntfy** {% term integration %} allows publishing push notifications on [ntfy.sh](https://ntfy.sh/) or other ntfy services.

## About ntfy

**ntfy** is a simple HTTP-based pub-sub notification service to send notifications to phones or desktops. The official [ntfy](https://ntfy.sh/) service also offers notifications via e-mail or by phone calls using text-to-speech to read the message out loud. As Ntfy is 100% open-source, there are also alternative public ntfy services but can also be self-hosted.

## How you can use this integration

The ntfy integration can be used to send push notifications from automations and scripts in real-time to your mobile devices and desktops.

## Prerequisites

1. **Service URL**

    To set up the **ntfy** integration, you need the URL of the ntfy service you wish to use.

    - Use `https://ntfy.sh` for the official ntfy service.
    - Provide the URL of an alternative public ntfy service or your self-hosted instance (for example, `https://your-ntfy-instance.com`).
2. **Topic name**

    Determine the topic name you want to publish notifications to.

    - Enter a **new topic name** to create a unique channel for notifications.
    - Leave the topic field empty to allow the integration to generate a **random topic name** automatically.
    - Use an **existing topic name** by retrieving it from the ntfy app or the ntfy service's website. Simply copy and paste the topic name into the configuration.

{% include integrations/config_flow.md %}

## Configuration parameters

{% configuration_basic %}
"Service URL":
    description: "Address of the ntfy service. Defaults to `https://ntfy.sh`."
"Topic":
    description: "Name of the topic you want to publish to."
{% endconfiguration_basic %}

## Notifiers

The **ntfy** integration will add a notify entity with the name of the topic. To publish notifications, you can use the `notify.send_message` action. To use notifications, please see the [getting started with automation page](/getting-started/automation/).

{% details "Example YAML configuration" %}

{% raw %}

```yaml
action: notify.send_message
data:
  message: "Reminder: Have you considered frogs?"
  entity_id: notify.mytopic
```
{% endraw %}

{% enddetails %}

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
