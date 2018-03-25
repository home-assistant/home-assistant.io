---
layout: page
title: "ClickSend SMS"
description: "Instructions on how to add ClickSend notifications to Home Assistant."
date: 2017-06-22 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: clicksend.png
ha_category: Notifications
ha_release: 0.48
---


The `clicksend` platform uses [ClickSend](https://clicksend.com) to deliver notifications from Home Assistant.

### Get your ClickSend API Credentials
Go to your [ClickSend Dashboard](https://dashboard.clicksend.com) section and create your new project. After creating your project, you should now be able to obtain your `username` and `api_key`.

To add ClickSend to your installation, add the following to your Home Assistant `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - platform: clicksend
    name: ClickSend
    username: CLICKSEND_USERNAME
    api_key: CLICKSEND_API_KEY
    recipient: PHONE_NO
```

{% configuration %}
name:
  description: "Setting the optional parameter name allows multiple notifiers to be created. The default value is `ClickSend`. The notifier will bind to the service `notify.NOTIFIER_NAME`."
  required: false
  type: string
username:
  description: Your Clicksend username.
  required: true
  type: string
api_key:
  description: Your Clicksend API Key.
  required: true
  type: string
recipient:
  description: "Your phone number. This is where you want to send your notification SMS messages, e.g., `09171234567`."
  required: true
  type: string
sender:
  description: The name or number of the sender.
  required: false
  type: string
  default: recipient
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
