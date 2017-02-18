---
layout: page
title: "Mailgun"
description: "Instructions how to add Mailgun mail notifications to Home Assistant."
date: 2017-02-06 16:52
sidebar: true
comments: false
sharing: true
footer: true
logo: mailgun.png
ha_category: Notifications
ha_release: 0.38
---

The Mailgun notification service allows you to send emails via Mailgun's REST API.

## {% linkable_title Sample configuration %}

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: mailgun
    domain: YOUR_MAILGUN_DOMAIN
    token: TOKEN
    recipient: RECIPIENT_EMAIL
```

Configuration variables:

- **domain** (*Optional*): This is the domain name to be used when sending out mail. Defaults to the first custom domain you have set up.
- **sandbox** (*Optional*): Whether to use the sandboxed domain for outgoing mail. The `domain` item takes precedence over this. Defaults to `False`.
- **token** (*Required*): This is the API token that has been generated in your Mailgun account.
- **recipient** (*Required*): The email address of the recipient.
- **sender** (*Optional*): The sender's email address. Defaults to `hass@DOMAIN`, where `DOMAIN` is outgoint mail domain, as defined by the `domain` and `sanbox` configuration entries.

## {% linkable_title Full configuration %}

A full configuration example for the Mailgun notifier system can look like this:

```yaml
# Example configuration.yaml entry
notify:
  - name: mailgun
    platform: mailgun
    domain: mg.example.com
    sanbox: False
    token: 'token-XXXXXXXXX'
    recipient: me@example.com
```

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
