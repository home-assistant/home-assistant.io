---
layout: page
title: "SendGrid"
description: "Instructions on how to add email notifications via SendGrid to Home Assistant."
date: 2016-02-27 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: sendgrid.png
ha_category: Notifications
---

The `sendgrid` notification platform sends email notifications via [SendGrid](https://sendgrid.com/), a proven cloud-based email platform.

To enable notification emails via SendGrid in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: sendgrid
    api_key: API_KEY
    sender: SENDER_EMAIL_ADDRESS
    recipient: YOUR_RECIPIENT
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **api_key** (*Required*): SendGrid API key - https://app.sendgrid.com/settings/api_keys
- **sender** (*Required*): E-mail address of the sender.
- **recipient** (*Required*): Recipient of the notification.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
