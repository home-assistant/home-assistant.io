---
layout: page
title: "IMAP Unread E-mail"
description: "Instructions on how to integrate IMAP unread email into Home Assistant."
date: 2016-07-11 06:00
sidebar: true
comments: false
sharing: true
footer: true
logo: smtp.png
ha_category: Mailbox
ha_release: 0.25
ha_iot_class: "Cloud Push"
---


The `imap` sensor platform is observing your [IMAP server](https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol) and reporting the amount of unread emails.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: imap
    server: imap.gmail.com
    port: 993
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
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
  description: The IMAP folder to watch.
  required: false
  default: inbox
  type: string
{% endconfiguration %}
