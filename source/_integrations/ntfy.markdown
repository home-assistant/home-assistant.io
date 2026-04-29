---
title: ntfy
description: Instructions on how to integrate ntfy with Home Assistant.
ha_category:
  - Event
  - Notifications
  - Update
ha_iot_class: Cloud Push
ha_release: 2025.5
ha_config_flow: true
ha_codeowners:
  - '@tr4nt0r'
ha_domain: ntfy
ha_integration_type: service
ha_platforms:
  - diagnostics
  - event
  - notify
  - sensor
  - update
ha_quality_scale: platinum
---

The **ntfy** {% term integration %} allows publishing push notifications on [ntfy.sh](https://ntfy.sh/) or other ntfy services.

## About ntfy

**ntfy** is a simple HTTP-based pub-sub notification service that allows you to send notifications to phones or desktops. The official [ntfy](https://ntfy.sh/) service also provides additional features, such as notifications via email or phone calls using text-to-speech to read messages aloud. Since ntfy is 100% open-source, you can choose to use alternative public ntfy services or even host your own instance.

## How you can use this integration

The ntfy integration can be used to send and receive messages via an [ntfy](https://ntfy.sh/) server. For example, to send a notification from Home Assistant to your mobile or send messages from a script to Home Assistant.

## Prerequisites

1. **Service URL**

    To set up the **ntfy** integration, you need the URL of the ntfy service you wish to use.

    - Use `https://ntfy.sh` for the official ntfy service.
    - Provide the URL of an alternative public ntfy service or your self-hosted instance (for example, `https://your-ntfy-instance.com`).

2. **Authentication (optional)**

    Depending on whether the server is configured to support access control, some topics may be read/write protected so that only users with the correct credentials can subscribe or publish to them.

    The **ntfy** integration uses **access token** authentication to access protected topics. When you provide your ntfy username and password, Home Assistant automatically generates and uses an access token for authentication.

3. **Adding a topic**

    To set up topics for notifications, select **{% icon "mdi:plus" %} Add topic**, then, if prompted, select the ntfy service you previously configured.

    You can now choose one of the following options:

    - Select **Enter topic** to add a new topic. Use an **existing topic name** by retrieving it from the ntfy app or the ntfy service's website. Simply copy and paste the topic name into the configuration.
    - Select **Generate topic name** to allow the integration to generate a **random topic name** automatically.

    Repeat these steps for each topic you want to add.

{% note %}

Topics may not be password-protected, so choose a name that's not easy to guess. If you are sending sensitive information, consider reserving the topic and restricting access to it.

{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
"Service URL":
    description: "Address of the ntfy service. Defaults to `https://ntfy.sh`."
"Verify SSL certificate":
    description: "Enable SSL certificate verification for secure connections."
"Username (optional)":
    description: "Username required to authenticate with protected ntfy topics."
"Password (optional)":
    description: "Password corresponding to the provided username for authentication."
{% endconfiguration_basic %}

## Topic configuration parameters

Each topic subentry provides the following configuration parameters:

{% configuration_basic %}
"Topic":
    description: "Name of the topic."
"Display name (optional)":
    description: "An alternative name to display instead of the topic name. This helps identify topics with complex or hard-to-read names more easily."
{% endconfiguration_basic %}

### Topic options

Each topic provides the following optional configuration options to allow narrowing down the messages received when Home Assistant subscribes to the topic. Filters apply only to the [event entity](#events).

{% configuration_basic %}
"Filter by priority":
    description: "Include messages that match any of the selected priority levels. If no priority is selected, all messages are included by default"
"Filter by tags":
    description: "Only include messages that have all selected tags"
"Filter by title":
    description: "Include messages with a title that exactly matches the specified text"
"Filter by message content":
    description: "Include messages with content that exactly matches the specified text"
{% endconfiguration_basic %}

## Supported functionality

### Notifiers

The **ntfy** integration will add a {% term device %} with an associated notify {% term entity %} for each configured topic. To publish notifications, you can use the `notify.send_message` {% term action %}. To use notifications, please see the [getting started with automation page](/getting-started/automation/).

{% details "Example YAML configuration" %}

{% example %}
action: |
  action: notify.send_message
  data:
    message: "Reminder: Have you considered frogs?"
    entity_id: notify.mytopic
{% endexample %}

{% enddetails %}

### Events

An {% term event %} {% term entity %} is created for each configured topic. These entities subscribe to their respective topics and receive notifications from the **ntfy** service in real-time. Each event entity exposes the full contents of the notification through its attributes. These attributes include links, attachments, tags, and other metadata.

You can use {% term event %} {% term entities %} in automations. For example, to trigger actions in Home Assistant, or to forward notifications to other devices for further processing or alerting.

{% details "Example YAML configuration" %}

{% example %}
automation: |
  triggers:
    - trigger: numeric_state
      entity_id:
        - event.mytopic
      attribute: priority
      above: 4
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Received new ntfy notification"
{% endexample %}

{% enddetails %}

### Sensors

The **ntfy** integration adds a device representing the service, along with various sensors that display your usage statistics and current account limits.

#### 📊 Message stats

- **Messages published**
  - **Description**: The total number of messages sent today.
- **Messages remaining**
  - **Description**: The number of messages that can still be sent before the daily limit is reached.
  - **Remarks**: Disabled by default
- **Messages usage limit**
  - **Description**: The maximum number of messages allowed per day on the account.
  - **Category**: Diagnostic
- **Messages expiry duration**
  - **Description**: The duration for which published messages are cached before automatic deletion.
  - **Category**: Diagnostic

#### ✉️ Email stats

- **Emails sent**
  - **Description**: The number of email notifications sent today.
- **Emails remaining**
  - **Description**: The number of email notifications that can still be sent today.
  - **Remarks**: Disabled by default
- **Email usage limit**
  - **Description**: The daily limit for email notifications on the account.
  - **Category**: Diagnostic

#### 📞 Phone call stats

- **Phone calls made**
  - **Description**: The total phone call alerts made today.
- **Phone calls remaining**
  - *Description: The number of phone call alerts that can still be made today.
  - **Remarks**: Disabled by default
- **Phone calls usage limit**
  - **Description**: The maximum number of phone call alerts allowed per day on the account.
  - **Category**: Diagnostic

#### 🔒 Reserved topics

- **Reserved topics**
  - **Description**: The number of reserved topics currently assigned to the account.
- **Reserved topics remaining**
  - **Description**: The number of topics that can still be reserved.
  - **Remarks**: Disabled by default
- **Reserved topics limit**
  - **Description**: The maximum number of reserved topics allowed for the account.
  - **Category**: Diagnostic

#### 📎 Attachment stats

- **Attachment storage**
  - **Description**: The amount of storage space currently used by file attachments.
- **Attachment storage remaining**
  - **Description**: The remaining storage capacity available for attachments.
  - **Remarks**: Disabled by default
- **Attachment storage limit**
  - **Description**: The total storage quota allocated for attachments.
- **Attachment expiry duration**
  - **Description**: The duration attachments are retained before being automatically deleted.
  - **Category**: Diagnostic
- **Attachment file size limit**
  - **Description**: The maximum allowed size for a single attachment file.
  - **Category**: Diagnostic
- **Attachment bandwidth limit**
  - **Description**: The daily bandwidth cap for uploading and downloading attachments.
  - **Category**: Diagnostic

#### ⭐ Account

- **Subscription tier**
  - **Description**: The subscription plan currently assigned to the ntfy account.
  - **Category**: Diagnostic

### Updates

For self-hosted **ntfy** instances, Home Assistant creates an update entity that shows when a new version of **ntfy** is available for download. To perform an update, refer to the official [documentation](https://docs.ntfy.sh/).

#### Prerequisites

- **ntfy** version 2.17.0 or later
- Configured user with **administrator** privileges on the instance

{% include integrations/actions.md %}

## Data updates

The integration retrieves data from **ntfy.sh** (or your own ntfy instance) every 15 minutes to update the usage statistics sensors.

## Known limitations

**ntfy** imposes various rate and usage limits. The official [ntfy.sh](https://ntfy.sh/) service allows up to **60 messages in a burst**, with a **replenishment rate of one message every 5 seconds** (i.e., the full 60-message capacity refills in 5 minutes).

Additional usage limits depend on your account tier. To view your current limits, go to [**Account → Usage**](https://ntfy.sh/account).

Limits may vary when using other **ntfy** services. If you're using a self-hosted instance, you can configure higher limits or disable them entirely.

## Troubleshooting

The **ntfy** integration relies on an active internet connection to communicate with the ntfy service. If you encounter issues, verify that your network connection is stable and the ntfy service is reachable. Additionally, the ntfy service itself may experience downtime, whether unexpected or due to scheduled maintenance.

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs, stop the debug logging again (*download of debug log file will start automatically*). Further, if still possible, please also download the [diagnostics](/integrations/diagnostics) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
