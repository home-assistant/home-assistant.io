---
title: "SMSAPI"
description: "Instructions on how to add user notifications to Home Assistant."
logo: smsapi.png
ha_category:
  - Notifications
ha_release: 0.97
---

The `smsapi` platform is using polish SMS API operator [SMSAPI](https://www.smsapi.pl) to send SMS via its APIs.

<p class='note warning'>
Regular charges apply and a contract or prepaid plan is needed.
</p>

To enable SMS notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: smsapi
    access_token: SMSAPI_ACCESS_TOKEN
    recipient: PHONE_NUMBER_TO_NOTIFY
```

{% configuration %}
access_token:
  description: This is the token you need to generate in SMSAPI admin panel
  required: true
  type: string
recipient:
  description: This is the phone number you want to send the SMS notification to.
  required: true
  type: string
{% endconfiguration %}

<p class='note warning'>
Before using this integration generate a new token for accessing [SMSAPI](https://ssl.smsapi.pl/react/oauth/manage) programmatically.
</p>
