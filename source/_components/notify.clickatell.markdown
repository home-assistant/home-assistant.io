---
layout: page
title: "Clikatell SMS"
description: "Instructions on how to add Clickatell notifications to Home Assistant."
date: 2017-10-09 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: clickatell.png
ha_category: Notifications
ha_release: 0.56
---


The `clickatell` platform uses [Clickatell](https://clickatell.com) to deliver SMS notifications from Home Assistant.

### Get your Clickatell API Credentials
Go to your [Clickatell SMS Platform Portal](https://portal.clickatell.com/#/) section and create a new SMS integration. There are three screens of information required to creater an integration. Please ensure the following:

1. Give the new Integration an identification name
2. ensure it is set for 'production' use
3. select 'HTTP' as your API type
4. Ensure that the you select for the messaging type to be 'one way messaging'
5. Be aware of the international number format option as this impacts the structure of the phone numbers you provide  
6. Once you have completed entering your details an API key is generated. Copy the API key

### Configuration
To add Clickatell to your installation, add the following to your Home Assistant `configuration.yaml` file:

```yaml
notify:
  - platform: clickatell
    name: USER_DEFINED_NAME
    api_key: CLICKATELL_API_KEY
    recipient: PHONE_NO
```

Configuration variables:

* **name** (Optional): Setting the optional parameter name allows multiple notifiers to be created. The default value is `Clickatell`. The notifier will bind to the service notify.NOTIFIER_NAME.
* **api_key** (Required): Your `API Key`.
* **recipient** (Required): Your phone no. This is where you want to send your notification SMS messages. eg: `61444333444`


To use notifications, please see the [getting started with automation page](https://home-assistant.io/getting-started/automation/).
