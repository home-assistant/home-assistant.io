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

The component supports push messages and generates events based on inbound data. To generate inbound events, add a Route set to Store and Notify with a URL of the following form: `https://<home-assistant-domain>/api/mailgun?api_password=<password>`

To send messages, use the [Mailgun notify platform][notify].

[notify]: /components/notify.mailgun/

## {% linkable_title Sample configuration %}

```yaml
# Example configuration.yaml entry
mailgun:
  domain: EXAMPLE.COM
  api_key: YOUR_API_KEY
```

{% configuration %}
domain:
  description: This is the domain name to be used when sending out mail. Needs to be the first custom domain you have set up.
  required: true
  type: string
api_key:
  description: This is the API token that has been generated in your Mailgun account.
  required: true
  type: string
sandbox:
  description: "(**Deprecated**) Whether to use the sandboxed domain for outgoing mail. Since the `domain` item is required, it should be set to the sandbox domain name, so this isn't needed."
  required: false
  default: false
  type: boolean
{% endconfiguration %}
