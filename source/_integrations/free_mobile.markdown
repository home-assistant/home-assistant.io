---
title: Free Mobile
description: Instructions on how to add Free Mobile SMS notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.11
ha_iot_class: Cloud Push
ha_domain: free_mobile
ha_config_flow: true
ha_platforms:
  - notify
ha_integration_type: service
---

The **Free Mobile** {% term integration %} uses the French mobile operator [Free Mobile](http://mobile.free.fr/) to send SMS to your own cell phone.

## Prerequisites

Before doing anything, you have to activate the SMS API option in your Free Mobile account (In "Gérer mon compte -> Mes Options"). Activating this option will automatically generate a token which is required in your configuration.

<p class='img'>
<img src='/images/integrations/free_mobile/token.png' />
</p>

This API only sends classic SMS messages and only to the cell phone of the account owner. So you only have to provide a text message in your payload.

{% note %}
If you disable and re-enable the SMS API option, please be sure to update your token in your configuration.
{% endnote %}

## Configuration

{% include integrations/config_flow.md %}

{% configuration_basic %}
username:
  description: This is the ID given by Free Mobile to access your online account.
access_token:
  description: You can get this token by activating the SMS API in your online account.
{% endconfiguration_basic %}

{% note %}
To confirm that your username and access token are valid, Home Assistant sends a text message to your phone during setup.
{% endnote %}

## Supported functionality

### Notify actions

A notify action is created using the integration entry name, without spaces. To send a text message, refer to it in an automation or script like in this example:

```yaml
- alias: "Send SMS When Someone Arrives"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  actions:
    - action: notify.YOUR_USERNAME
      data:
        message: "Someone is at the front door"
```

## Troubleshooting

If sending a text message fails, Home Assistant can raise one of the following errors:

- **Wrong username or access token**: The username or access token is no longer valid. Reactivating the SMS API option in your Free Mobile account generates a new token, so update it in the integration entry if you have recently done so.
- **At least one parameter is missing**: The message sent to the action was empty.
- **Too many SMS sent in a short time**: Free Mobile limits how many text messages you can send in a short period. Wait a while before sending another message.
- **Free Mobile server error**: The Free Mobile SMS API is temporarily unavailable. Try again later.

