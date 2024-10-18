---
title: Mailgun
description: Instructions on how to add Mailgun mail notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.38
ha_config_flow: true
ha_domain: mailgun
ha_platforms:
  - notify
ha_integration_type: integration
---

To be able to receive webhooks from Mailgun, your Home Assistant instance needs to be accessible from the web and you need to have the external URL [configured](/integrations/homeassistant/#allowlist_external_urls).

To set it up, go to the integrations page in the configuration screen and find Mailgun. Click on configure. Follow the instructions on the screen to configure Mailgun.

You will get a URL of the following format: `https://<home-assistant-domain>/api/webhook/9940e99a26fae4dcf6fe0a478124b6b58b578ea4c55c9a584beb1c9f5057bb91`. To receive webhooks from Mailgun, you need to provide that URL as a callback URL in the Webhooks tab of the Mailgun Control Panel.

There is currently support for the following device types within Home Assistant:

- [Notifications](#notifications).

## Configuration

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

Events coming in from Mailgun will be available as events in Home Assistant and are fired as `mailgun_message_received`. The [data specified by Mailgun](https://documentation.mailgun.com/en/latest/api-events.html#event-structure) will be available as the event data. You can use this event to trigger automations.

You can then consume that information with the following automation:

```yaml
automation:
  triggers:
    - trigger: event
      event_type: mailgun_message_received
      event_data:
        action: call_service
  actions:
    - action: light.turn_on
      target:
        entity_id: light.office
```

## Notifications

The Mailgun notification action allows you to send emails via Mailgun's REST API. It requires the [Mailgun component](#configuration) to be set up.

### Notifications configuration

```yaml
# Example configuration.yaml entry
notify:
  - name: mailgun
    platform: mailgun
    recipient: CHANGE@EXAMPLE.COM
```

{% configuration %}
name:
  description: "The optional parameter name allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action."
  required: false
  type: string
  default: notify
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

### Example automation

The following automation reacts to an event by sending out an email with two attachments.

```yaml
# Example automation using Mailgun notifications
automation:
  triggers:
    - trigger: event
      event_type: SPECIAL_EVENT
  actions:
    - action: notify.mailgun
      data:
        title: "Something special has happened"
        message: "This a test message from Home Assistant"
        data:
          images:
            - /home/pi/pic_test1.png
            - /home/pi/pic_test2.png
```
