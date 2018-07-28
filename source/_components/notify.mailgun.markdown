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
  domain: mg.example.com
  api_key: token-XXXXXXXXX
  sandbox: false

notify:
  - name: mailgun
    platform: mailgun
    recipient: me@example.com
```

Configuration variables:

- **domain** (*Optional*): This is the domain name to be used when sending out mail. Defaults to the first custom domain you have set up.
- **sandbox** (*Optional*): Whether to use the sandboxed domain for outgoing mail. The `domain` item takes precedence over this. Defaults to `false`.
- **token** (*Required*): This is the API token that has been generated in your Mailgun account.
- **recipient** (*Required*): The email address of the recipient.
- **sender** (*Optional*): The sender's email address. Defaults to `hass@DOMAIN`, where `DOMAIN` is outgoint mail domain, as defined by the `domain` and `sanbox` configuration entries.

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
