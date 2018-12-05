---
layout: page
title: "Mailgun Notify"
description: "Instructions on how to add Mailgun mail notifications to Home Assistant."
date: 2017-02-06 16:52
sidebar: true
comments: false
sharing: true
footer: true
logo: mailgun.png
ha_category: Notifications
ha_release: 0.38
---

The Mailgun notification service allows you to send emails via Mailgun's REST API. It requires the [Mailgun component] to be set up.

[Mailgun component]: /components/mailgun/

## {% linkable_title Sample configuration %}

```yaml
# Example configuration.yaml entry
mailgun:
  domain: EXAMPLE.COM
  api_key: YOUR_API_KEY

notify:
  - name: mailgun
    platform: mailgun
    recipient: CHANGE@EXAMPLE.COM
```

{% configuration %}
domain:
  description: This is the domain name to be used when sending out mail.
  required: true
  type: string
sandbox:
  description: "(**Deprecated**) If a sandboxed domain is used, specify it in `domain`."
  required: false
  default: false
  type: boolean
api_key:
  description: This is the API Key that has been generated in your Mailgun account.
  required: true
  type: string
recipient:
  description: The email address of the recipient.
  required: true
  type: string
sender:
  description: The sender's email address.
  required: false
  default: "`hass@DOMAIN`, where `DOMAIN` is the outgoing mail domain, as defined by the `domain` configuration entry."
  type: string
{% endconfiguration %}

## {% linkable_title Example automation %}

The following automation reacts to an event by sending out an email with two attachments.

```yaml
# Example automation using Mailgun notifications
automation:
  trigger:
    platform: event
    event_type: SPECIAL_EVENT
  action:
    service: notify.mailgun
    data:
      title: "Something special has happened"
      message: "This a test message from Home Assistant"
      data:
        images:
          - /home/pi/pic_test1.png
          - /home/pi/pic_test2.png
```
