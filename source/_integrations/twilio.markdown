---
title: Twilio
description: Instructions on how to add Twilio notifications to Home Assistant.
ha_category:
  - Hub
ha_release: '0.40'
ha_config_flow: true
ha_domain: twilio
ha_iot_class: Cloud Push
ha_integration_type: integration
---

The `twilio` integration enables the sending of notifications via SMS and the creation of calls with [Twilio](https://twilio.com).

A free trial account is available at [Twilio](https://twilio.com) website providing free calls to verified phone numbers.
Calls are limited to 10 minutes and will play a short trial message before your message runs. Upgraded accounts have no limitation.

## Configuration

To use this notification integration in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
twilio:
  account_sid: ACCOUNT_SID_FROM_TWILIO
  auth_token: AUTH_TOKEN_FROM_TWILIO
```

{% configuration %}
account_sid:
  description: "Your Twilio Account SID which can be found in your [console](https://www.twilio.com/console). It starts with the letters `AC`."
  required: true
  type: string
auth_token:
  description: "Your Twilio AUTH TOKEN which can be found in your [console](https://www.twilio.com/console). It should be directly under where you found the `account_sid`."
  required: true
  type: string
{% endconfiguration %}

### Usage

After configuring the base Twilio integration, add and configure either or both of the [Twilio SMS](/integrations/twilio_sms) and [Twilio Phone](/integrations/twilio_call) integrations to utilize the notification functionality.

To be able to receive events from Twilio, your Home Assistant instance needs to be accessible from the web and you need to have the external URL [configured](/integrations/homeassistant/#external_url) in Home Assistant.

To set it up, go to the integrations page in the configuration screen and find Twilio. Click on configure. Follow the instructions on the screen to configure Twilio.

You will get a URL of the following format: `https://<home-assistant-domain>/api/webhook/9940e99a26fae4dcf6fe0a478124b6b58b578ea4c55c9a584beb1c9f5057bb91`. To generate inbound events, you have to configure your [webhooks with Twilio](https://www.twilio.com/docs/glossary/what-is-a-webhook):
 - Go to your Twilio [console](https://www.twilio.com/console).
 - Under **phone numbers** > **manage** > **active numbers** > (select number) > **configure**.
 - Paste your URL in the webhook URL box for **A call comes in** and **A message comes in** and save.

Events coming in from Twilio will be available as events in Home Assistant and are fired as `twilio_data_received`. The data specified by Twilio will be available as the event data. You can use this event to trigger automations.

Here is an example:

```yaml
automation:
  triggers:
    - trigger: event
      event_type: twilio_data_received
      event_data:
        From: '+1XXXXXXXXXXX'
        To: '+1YYYYYYYYYYY'
        CallStatus: ringing
        Direction: inbound
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.garage_door
```

The above opens the garage door when the number `+1XXXXXXXXXXX` calls `+1YYYYYYYYYYY` (considering that `+1YYYYYYYYYYY` is one of your numbers registered in Twilio).

An example of an SMS handler:

{% raw %}
```yaml
alias: "Twilio incoming"
triggers:
  - trigger: event
    event_type: twilio_data_received
actions:
  - variables:
      sender: |
        {{ trigger.event.data.From }}
      message: |
        {{ trigger.event.data.Body }}
  - action: notify.persistent_notification
    data:
      message: |
        incoming twilio message from {{sender}}: {{ message }}
        all event data: {{ trigger.event.data }}
```
{% endraw %}
