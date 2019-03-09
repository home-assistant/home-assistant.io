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

To be able to receive webhooks from Mailgun, your Home Assistant instance needs to be accessible from the web ([Hass.io instructions](/addons/duckdns/)) and you need to have the `base_url` configured for the HTTP component ([docs](/components/http/#base_url)).

To set it up, go to the integrations page in the configuration screen and find Mailgun. Click on configure. Follow the instructions on the screen to configure Mailgun.

You will get a URL of the following format: `https://<home-assistant-domain>/api/webhook/9940e99a26fae4dcf6fe0a478124b6b58b578ea4c55c9a584beb1c9f5057bb91`. To receive webhooks from Mailgun, you need to provide that url as a callback URL in the Webhooks tab of the Mailgun Control Panel.

Events coming in from Mailgun will be available as events in Home Assistant and are fired as `mailgun_message_received`. The [data specified by Mailgun](https://documentation.mailgun.com/en/latest/api-events.html#event-structure) will be available as the event data. You can use this event to trigger automations.

You can then consume that information with the following automation:

```yaml
automation:
  trigger:
    platform: event
    event_type: mailgun_message_received
    event_data:
      action: call_service
  action:
    service: light.turn_on
    entity_id: light.office
```

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
