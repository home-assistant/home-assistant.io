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

### Configuration
To add ClickSend to your installation, add the following to your Home Assistant `configuration.yaml` file:

```yaml
notify:
  - platform: clicksend
    name: ClickSend
    username: CLICKSEND_USERNAME
    api_key: CLICKSEND_API_KEY
    recipient: PHONE_NO
```

Configuration variables:

* **name** (Optional): Setting the optional parameter name allows multiple notifiers to be created. The default value is `ClickSend`. The notifier will bind to the service notify.NOTIFIER_NAME.
* **username** (Required): Your `Username`.
* **api_key** (Required): Your `API Key`.
* **recipient** (Required): Your phone no. This is where you want to send your notification SMS messages. eg: `09171234567`


To use notifications, please see the [getting started with automation page](https://home-assistant.io/getting-started/automation/).
