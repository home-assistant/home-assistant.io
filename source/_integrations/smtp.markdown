---
title: SMTP
description: Instructions on how to add email notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: pre 0.7
ha_domain: smtp
ha_config_flow: true
ha_platforms:
  - notify
ha_integration_type: service
---

The **SMTP** {% term integration %} allows you to deliver notifications from Home Assistant to an email recipient.

{% include integrations/config_flow.md %}

Check your email provider configuration or help pages to get the correct SMTP settings.
{% configuration_basic %}
Sender email:
    description: "Email address that will appear in the From field."
Sender name:
    description: "Display name shown as the email sender."
Host:
    description: "Hostname or IP address of your SMTP server. For example, `smtp.example.com`."
Port:
    description: "Port number used by your SMTP server. Common values are `587` (STARTTLS) and `465` (TLS)."
Connection security:
    description: "Encryption method used for the SMTP connection. `starttls` upgrades a plain connection to encrypted (recommended). `tls` uses encryption from the start. `none` sends without encryption."
Username:
    description: "Username used to authenticate with the SMTP server."
Password:
    description: "Password or app-specific password for the SMTP account."
Verify SSL certificate:
    description: "Enable certificate verification for secure SSL/TLS connections."
{% endconfiguration_basic %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Connection timeout:
    description: "Maximum time in seconds to wait for a response from the SMTP server before the connection attempt is aborted. Defaults to 5 seconds. Must be between 1 and 1800 seconds (30 minutes)."
Reply-To email address:
    description: "Email address to use for recipient replies. If not specified, the sender's email address is used."
Reply-To name:
    description: "Display name shown as the Reply-To name."
Return-Path:
    description: "Email address to use for bounce messages. If not specified, the sender's email address is used."
{% endconfiguration_basic %}

## Adding recipients

You need to add at least one recipient email address. During the integration setup, you will be asked to add your first recipient email address. Additional recipients can be added later. Recipients are managed separately and can be added, edited, or removed at any time.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **SMTP** integration.
2. Select **Add recipient**.
3. Enter the email address you want to send notifications to.
4. Select **Submit**.

Repeat these steps to add more recipients. Every email address you add can be selected as target for the corresponding integration.

## Specific email provider configuration

Check below some configurations examples for specific email providers.
If you are in doubt about the SMTP settings required, check your email provider configuration or help pages for more information about its specific SMTP configuration.

### Google Mail

Example configuration for Google Mail.

| **Parameter** | Value |
| -------- | ------------- |
| **Host** | `smtp.gmail.com` |
| **Port** | `587` |
| **Sender email** | `example@gmail.com` |
| **Sender name** | _sender name_ |
| **Connection security** | `STARTTLS` |
| **Username** | `example@gmail.com` |
| **Password** | _your app password_ |

Google has some extra layers of protection that need special attention. You must use [an application-specific password](https://support.google.com/mail/answer/185833) in your notification configuration.

To be able to create an app password:

- You must have 2-step verification enabled on your account with another authentication mechanism than security key.
- Your Google account must not be enrolled in Google's [Advanced Protection Program](https://landing.google.com/advancedprotection/).
- Your Google account must not belong to a Google Workspace that has disabled this feature. Accounts owned by a school, business, or other organization are examples of Google Workspace accounts.

## Supported functionality

### Notifiers

The **SMTP** {% term integration %} will add a notify {% term entity %} for each configured recipient. To send a notification, you can use the **Send a notification message** (`notify.send_message`) {% term action %}. For more customizable notifications, use the [**SMTP: Send message**](/actions/smtp.send_message/) (`smtp.send_message`) instead.

{% example %}
action: |
  action: notify.send_message
  data:
    title: "Reminder Have you considered frogs?"
    message: "Just checking in. Have you considered frogs today? If not, there's still time."
  target:
    entity_id: notify.my_email
{% endexample %}

{% include integrations/actions.md %}

## SMTP automation examples

You can use this integration to create automations that send a notification to your email address when something happens.

{% include docs/paste_yaml_tip.md %}

### Automation: send an email message when front door opens

This automation sends a notification message to an email address when the front door opens.

- **Trigger**: State
  - **Entity**: Front door binary sensor
  - **To**: On
- **Action**: Send a notification message
  - **Target**: My email address (`notify.my_email`)

{% details "YAML example for email notification when door opens" %}

{% example %}
automation: |
  alias: "Notify by email: front door opened"
  triggers:
    - trigger: door.opened
      target:
        entity_id: binary_sensor.front_door
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_email
      data:
        title: "Alert: Front Door Opened"
        message: >
          The front door was opened at {{ now().strftime('%Y-%m-%d %H:%M:%S') }}.
{% endexample %}

{% enddetails %}

## Known limitations

- The **SMTP** integration does not currently support OAuth 2.0 authentication.

## Troubleshooting

 The **SMTP** integration requires network connectivity to the configured SMTP server. If you use a mail server on the internet, verify that your internet connection is stable. Your email service provider may also experience downtime, including scheduled maintenance.

When reporting an issue, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics). Reload the integration. As soon as the issue reoccurs, stop debug logging again. The debug log file will be downloaded automatically.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
