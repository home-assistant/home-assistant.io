---
layout: page
title: "Mailgun"
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

The component supports push messages and generates events based on inbound data. To use, add a Route set to Store and Notify with a URL of the following form: `https://<home-assistant-domain>/api/mailgun?api_password=<password>`

To send messages, use the [Mailgun notify platform][notify].

[notify]: /components/notify.mailgun/

## {% linkable_title Sample configuration %}

```yaml
# Example configuration.yaml entry
mailgun:
  domain: mg.example.com
  api_key: token-XXXXXXXXX
```

Configuration variables:

- **domain** (*Required*): This is the domain name to be used when sending out mail. Defaults to the first custom domain you have set up.
- **api_key** (*Required*): This is the API token that has been generated in your Mailgun account.
- **sandbox** (*Optional*): Whether to use the sandboxed domain for outgoing mail. The `domain` item takes precedence over this. Defaults to `False`.
