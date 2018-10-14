---
layout: page
title: "IMAP Email Content"
description: "Instructions on how to integrate IMAP email content sensor into Home Assistant."
date: 2016-09-09 12:30
sidebar: true
comments: false
sharing: true
footer: true
logo: smtp.png
ha_category: Mailbox
ha_iot_class: "Local Polling"
ha_release: 0.25
---


The `imap_email_content` sensor platform will read emails from an IMAP email server and report them as a state change within Home Assistant. This is useful if you have a device that only reports its state via email.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: imap_email_content
    server: imap.gmail.com
    port: 993
    username: USERNAME
    password: PASSWORD
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
      description: The subject of the email.
    date:
      description: The date and time the email was sent.
{% endconfiguration %}
