---
layout: page
title: "Somfy"
description: "Instructions on how to setup the Somfy hub within Home Assistant."
date: 2019-05-24 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: somfy.png
ha_category: Hub
ha_iot_class: "Cloud Polling"
ha_release: 0.94
ha_qa_scale: gold
---

The Somfy component will allow users to integrate their Somfy devices into Home Assistant using the [official API](https://developer.somfy.com/somfy-open-api/apis), unlike the [tahoma](/components/tahoma/) component.

Check the related components pages for actual devices that are supported.

### {% linkable_title Setting up developer account %}
To connect Somfy, you need to setup a developer account.

1. Vist [https://developer.somfy.com](https://developer.somfy.com)
2. Login using your Somfy credentials
3. Open the *My Apps* menu
4. Add a new App
  - App Name: Home Assistant
  - Callback URL: `<YOUR_HOME_ASSISTANT_URL>/auth/somfy/callback`
  - Description: Home Assistant instance
  - Product: Somfy Open API
5. Once Home Assistant restarted, a notification will ask you to log into your Somfy account.

### {% linkable_title Configuration %}
```yaml
# Example configuration.yaml entry
somfy:
  client_id: CONSUMER_KEY
  client_secret: CONSUMER_SECRET
```

{% configuration %}
client_id:
  description: Your Somfy consumer key.
  required: true
  type: string
client_secret:
  description: Your Somfy consumer secret.
  required: true
  type: string
{% endconfiguration %}
