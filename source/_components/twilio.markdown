---
layout: page
title: "Twilio"
description: "Instructions how to add Twilio notifications to Home Assistant."
date: 2016-05-14 14:14
sidebar: true
comments: false
sharing: true
footer: true
logo: twilio.png
ha_category: Hub
ha_release: "0.40"
---

The `twilio` component enables the sending of notifications via SMS and the creation of calls with [Twilio](https://twilio.com).

Free trial account is available at [Twilio](https://twilio.com) website providing free calls to verified phone numbers.
Calls are limited to 10 minutes and will play a short trial message before your message runs. Upgraded accounts have no limitation.

To use this notification component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
twilio:
  account_sid: ACCOUNT_SID_FROM_TWILIO
  auth_token: AUTH_TOKEN_FROM_TWILIO
```

Configuration variables:

- **account_sid** (*Required*): Your Twilio Account SID which can be found in your [console](https://www.twilio.com/console). It starts with the letters `AC`.
- **auth_token** (*Required*): Your Twilio AUTH TOKEN which can be found in your [console](https://www.twilio.com/console). It should be directly under where you found the `account_sid`.

### {% linkable_title Usage %}
After configuring the base Twilio component, add and configure either or both of the [twilio SMS](https://home-assistant.io/components/notify.twilio_sms/) and [twilio Phone](https://home-assistant.io/components/notify.twilio_call) components to utilize the notification functionality.
