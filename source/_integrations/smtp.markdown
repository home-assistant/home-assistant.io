---
title: SMTP
description: Instructions on how to add email notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: pre 0.7
ha_domain: smtp
ha_platforms:
  - notify
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
ha_config_flow: true
ha_codeowners:
  - '@manjotsc'
---

The **SMTP** {% term integration %} allows you to deliver notifications from Home Assistant to an email recipient.

{% include integrations/config_flow.md %}

Check your email provider configuration or help pages to get the correct SMTP settings.

{% configuration_basic %}
Mail server:
  description: Your SMTP server address (e.g., smtp.gmail.com, smtp.office365.com).
Port:
  description: "SMTP port. Common ports: 587 (STARTTLS), 465 (SSL/TLS), 25 (unencrypted)."
Security:
  description: "Connection security: STARTTLS (recommended), SSL/TLS, or None."
Login:
  description: Your email address or account username.
Password:
  description: Account password or app-specific password.
From address:
  description: The email address notifications will be sent from.
From name:
  description: Friendly name shown in emails. Can be overwritten per service call.
To address:
  description: Default recipient. Can be overwritten per service call. Comma-separate multiple.
Connection timeout:
  description: How long to wait for server response (1-60 seconds).
Verify SSL certificate:
  description: Validate the server's SSL certificate. Ignored when security is set to None.
Enable debug logging:
  description: Log detailed SMTP communication for troubleshooting.
{% endconfiguration_basic %}

## Sensors

The integration provides the following sensors:

- **Last sent**: Timestamp of the last successfully sent email.
- **Last error**: The last error message encountered when sending failed.

## Actions

### Action `smtp.send_message`

Send an email message via SMTP.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `config_entry` | no | The SMTP account to send from. |
| `message` | yes | Plain text body. Supports templates. Optional if HTML content is provided. |
| `subject` | yes | Subject line. Supports templates. |
| `to` | yes | List of recipient email addresses. Leave empty to use default from setup. |
| `from_name` | yes | Override the sender name for this message. |
| `html` | yes | HTML formatted content. Supports Jinja2 templates. |
| `images` | yes | List of image file paths to attach. |

{% important %}
When adding images, make sure the folders containing the attachments are added to `allowlist_external_dirs`. See: [Setup basic documentation](/integrations/homeassistant/#allowlist_external_dirs)
{% endimportant %}

#### Example automation

```yaml
- alias: "Send E-Mail Every Morning"
  triggers:
    - trigger: time
      at: "08:00:00"
  actions:
    - action: smtp.send_message
      data:
        config_entry: YOUR_CONFIG_ENTRY_ID
        subject: "Good Morning"
        message: "Rise and shine"
        to:
          - "morning@example.com"
```

#### Example with HTML and images

```yaml
- alias: "Burglar Alarm"
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion
      to: "on"
  actions:
    - action: smtp.send_message
      data:
        config_entry: YOUR_CONFIG_ENTRY_ID
        subject: "Intruder alert"
        message: "Intruder alert at apartment!!"
        images:
          - /config/www/snapshot1.jpg
          - /config/www/snapshot2.jpg
        html: |
          <!DOCTYPE html>
          <html>
            <body>
              <h1>Intruder Alert!</h1>
              <p>Motion detected at apartment.</p>
              <img src="cid:snapshot1.jpg" alt="Snapshot 1" />
              <img src="cid:snapshot2.jpg" alt="Snapshot 2" />
            </body>
          </html>
```

The `images` field adds image attachments to the email. If `html` is defined, the images can be referenced in-line using `src="cid:image_name.ext"` where `image_name.ext` is the basename of the image file.

#### Example with templated HTML

This example sends a styled email with Home Assistant update status using Jinja2 templates:

```yaml
- alias: "Send Update Status Email"
  triggers:
    - trigger: state
      entity_id: update.home_assistant_core_update
  actions:
    - action: smtp.send_message
      data:
        config_entry: YOUR_CONFIG_ENTRY_ID
        subject: "Home Assistant Update Status"
        message: "Home Assistant is running version {{ state_attr('update.home_assistant_core_update', 'installed_version') }}"
        html: |
          <!doctype html>
          <html>
            <body style="margin:0;padding:16px;font-family:Arial,Helvetica,sans-serif;background:#f6f7f9;">
              <div style="max-width:520px;margin:0 auto;background:#ffffff;
                          border:1px solid #e5e7eb;border-radius:12px;padding:18px;">

                <div style="font-size:18px;font-weight:700;margin-bottom:12px;">
                  Home Assistant Core – Update Status
                </div>

                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:6px 0;font-weight:600;">Installed Version</td>
                    <td style="padding:6px 0;text-align:right;">
                      {{ state_attr('update.home_assistant_core_update', 'installed_version') }}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:6px 0;font-weight:600;">Latest Version</td>
                    <td style="padding:6px 0;text-align:right;">
                      {{ state_attr('update.home_assistant_core_update', 'latest_version') }}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:6px 0;font-weight:600;">Auto Update</td>
                    <td style="padding:6px 0;text-align:right;">
                      {{ 'Enabled' if state_attr('update.home_assistant_core_update', 'auto_update') else 'Disabled' }}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:6px 0;font-weight:600;">Update In Progress</td>
                    <td style="padding:6px 0;text-align:right;">
                      {{ 'Yes' if state_attr('update.home_assistant_core_update', 'in_progress') else 'No' }}
                    </td>
                  </tr>
                </table>

                <div style="margin-top:12px;padding-top:10px;border-top:1px solid #f0f0f0;">
                  <a href="{{ state_attr('update.home_assistant_core_update', 'release_url') }}"
                     style="font-size:13px;color:#2563eb;text-decoration:none;">
                    View Release Notes
                  </a>
                </div>

                <div style="margin-top:10px;font-size:12px;color:#6b7280;">
                  Generated: {{ now().strftime('%Y-%m-%d %H:%M:%S') }}
                </div>

              </div>
            </body>
          </html>
```

## Specific email provider configuration

Check below some configurations examples for specific email providers.

### Google Mail

Use the following settings for Gmail:

- **Mail server**: `smtp.gmail.com`
- **Port**: `587`
- **Security**: STARTTLS

Google has some extra layers of protection that need special attention. You must use [an application-specific password](https://support.google.com/mail/answer/185833) in your notification configuration.

If any of the following conditions are met you will not be able to create an app password:

- You do not have 2-step verification enabled on your account.
- You have 2-step verification enabled but have only added a security key as an authentication mechanism.
- Your Google account is enrolled in Google's [Advanced Protection Program](https://landing.google.com/advancedprotection/).
- Your Google account belongs to a Google Workspace that has disabled this feature.

### Outlook / Microsoft 365

- **Mail server**: `smtp.office365.com`
- **Port**: `587`
- **Security**: STARTTLS

### Yahoo Mail

- **Mail server**: `smtp.mail.yahoo.com`
- **Port**: `587`
- **Security**: STARTTLS

## YAML configuration

{% important %}
YAML configuration is deprecated. Existing YAML configurations will be automatically imported. New setups should use the UI configuration above.
{% endimportant %}

To enable notification by email via YAML, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
notify:
  - name: "NOTIFIER_NAME"
    platform: smtp
    sender: "YOUR_SENDER"
    recipient: "YOUR_RECIPIENT"
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  type: string
  default: notify
sender:
  description: Email address of the sender.
  required: true
  type: string
recipient:
  description: Default email address of the recipient of the notification. This can be a recipient address or a list of addresses for multiple recipients.
  required: true
  type: [list, string]
server:
  description: SMTP server which is used to send the notifications.
  required: false
  type: string
  default: localhost
port:
  description: The port that the SMTP server is using.
  required: false
  type: integer
  default: 587
timeout:
  description: The timeout in seconds that the SMTP server is using.
  required: false
  type: integer
  default: 5
username:
  description: Username for the SMTP account.
  required: false
  type: string
password:
  description: Password for the SMTP server that belongs to the given username. Make sure to wrap it in double quotes; e.g., `"MY_PASSWORD"`.
  required: false
  type: string
encryption:
  description: Set mode for encryption, `starttls`, `tls` or `none`.
  required: false
  type: string
  default: starttls
sender_name:
  description: "Sets a custom 'sender name' in the emails headers (*From*: Custom name <example@mail.com>)."
  required: false
  type: string
debug:
  description: Enables Debug, e.g., `true` or `false`.
  required: false
  type: boolean
  default: false
verify_ssl:
  description: If the SSL certificate of the server needs to be verified.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

To learn more about how to use notifications in your automations, please see the [getting started with automation page](/getting-started/automation/).
