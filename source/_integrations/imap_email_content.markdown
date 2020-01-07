---
title: IMAP Email Content
description: Instructions on how to integrate IMAP email content sensor into Home Assistant.
logo: smtp.png
ha_category:
  - Mailbox
ha_iot_class: Cloud Push
ha_release: 0.25
---

The `imap_email_content` integration will read emails from an IMAP email server and report them as a state change within Home Assistant. This is useful if you have a device that only reports its state via email.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: imap_email_content
    server: imap.gmail.com
    port: 993
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    folder: YOUR_FOLDER
    senders:
      - example@gmail.com
```

{% configuration %}
server:
  description: The IP address or hostname of the IMAP server.
  required: true
  type: string
port:
  description: The port where the server is accessible.
  required: false
  default: 993
  type: integer
name:
  description: Name of the IMAP sensor.
  required: false
  type: string
username:
  description: Username for the IMAP server.
  required: true
  type: string
password:
  description: Password for the IMAP server.
  required: true
  type: string
folder:
  description: Folder to get mails from.
  required: false
  default: INBOX
  type: string
senders:
  description: A list of sender email addresses that are allowed to report state via email. Only emails received from these addresses will be processed.
  required: true
  type: string
value_template:
  description: If specified this template will be used to render the state of the sensor. If a template is not supplied the message subject will be used for the sensor value. The following attributes will be supplied to the template.
  required: false
  type: template
  keys:
    from:
      description: The from address of the email.
    body:
      description: The body of the email.
    subject:
      description: The subject of the email.git.
    date:
      description: The date and time the email was sent.
{% endconfiguration %}

## Example

The following example shows the usage of the IMAP email content sensor to scan the subject of an email for text, in this case, an email from the APC SmartConnect service which tells whether the UPS is running on battery or not.

{% raw %}
```yaml
sensor:
  - platform: imap_email_content
    server: imap.gmail.com
    name: house_electricity
    port: 993
    username: MY_EMAIL_USERNAME
    password: MY_EMAIL_PASSWORD
    senders:
      - no-reply@smartconnect.apc.com
    value_template: >-
      {% if 'UPS On Battery' in subject %}
        power_out
      {% elif 'Power Restored' in subject %}
        power_on
      {% endif %}
```
{% endraw %}

The same template structure can scan the date, body or sender for matching text before setting the state of the sensor.
