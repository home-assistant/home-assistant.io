---
title: ntfy
description: Instructions on how to integrate ntfy with Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 2025.5
ha_config_flow: true
ha_codeowners:
  - '@tr4nt0r'
ha_domain: ntfy
ha_integration_type: integration
ha_platforms:
  - diagnostics
  - notify
ha_quality_scale: bronze
---

The **ntfy** {% term integration %} allows publishing push notifications on [ntfy.sh](https://ntfy.sh/) or other ntfy services.

## About ntfy

**ntfy** is a simple HTTP-based pub-sub notification service that allows you to send notifications to phones or desktops. The official [ntfy](https://ntfy.sh/) service also provides additional features, such as notifications via email or phone calls using text-to-speech to read messages aloud. Since ntfy is 100% open-source, you can choose to use alternative public ntfy services or even host your own instance.

## How you can use this integration

The ntfy integration can be used to send push notifications from automations and scripts in real-time to your mobile devices and desktops.

## Prerequisites

1. **Service URL**

    To set up the **ntfy** integration, you need the URL of the ntfy service you wish to use.

    - Use `https://ntfy.sh` for the official ntfy service.
    - Provide the URL of an alternative public ntfy service or your self-hosted instance (for example, `https://your-ntfy-instance.com`).

2. **Authentication**

    Depending on whether the server is configured to support access control, some topics may be read/write protected so that only users with the correct credentials can subscribe or publish to them. To publish/subscribe to protected topics, you can provide a username and password.

3. **Adding a topic**

    To set up topics for notifications, select the three-dot {% icon "mdi:dots-vertical" %} menu next to the entry of the previously configured ntfy service, then click **{% icon "mdi:plus" %} Add topic**.

    You can now choose one of the following options:

    - Select **Enter topic** to add a new topic. Use an **existing topic name** by retrieving it from the ntfy app or the ntfy service's website. Simply copy and paste the topic name into the configuration.
    - Select **Generate topic name** to allow the integration to generate a **random topic name** automatically.

    Repeat these steps for each topic you want to add.

{% note %}

Topics may not be password-protected, so choose a name that's not easy to guess. If you are sending sensitive information, consider reserving the topic and restricting access to it.

{% endnote %}

{% include integrations/config_flow.md %}

## Configuration parameters

### Service parameters

{% configuration_basic %}
"Service URL":
    description: "Address of the ntfy service. Defaults to `https://ntfy.sh`."
"Username (optional)":
    description: "Username required to authenticate with protected ntfy topics."
"Password (optional)":
    description: "Password corresponding to the provided username for authentication."
{% endconfiguration_basic %}

### Topic parameters

{% configuration_basic %}
"Topic":
    description: "Name of the topic."
"Display name (optional)":
    description: "An alternative name to display instead of the topic name. This helps identify topics with complex or hard-to-read names more easily."
{% endconfiguration_basic %}

## Notifiers

The **ntfy** integration will add a {% term device %} with an associated notify {% term entity %} for each configured topic. To publish notifications, you can use the `notify.send_message` {% term action %}. To use notifications, please see the [getting started with automation page](/getting-started/automation/).

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
