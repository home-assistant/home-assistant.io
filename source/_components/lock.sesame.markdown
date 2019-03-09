---
layout: page
title: "Sesame Smart Lock"
description: "Instructions on how to integrate Sesame by CANDY HOUSE into Home Assistant."
date: 2017-05-02 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: sesame.png
ha_category: Lock
ha_iot_class: "Cloud Polling"
ha_release: "0.47"
---

The `sesame` platform allows you to control your [Sesame](https://candyhouse.co/) smart locks made by CANDY HOUSE, Inc.

## {% linkable_title Configuration %}

Your Sesame needs to be paired with a mobile device running the app in *virtual station* mode, or a standalone [Wi-Fi Access Point](https://candyhouse.co/collections/frontpage/products/wi-fi-access-point).

Once you have remote access enabled using one of the above AND the Integration - cloud option enabled on the Sesame app for that lock settings, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
lock:
  - platform: sesame
    email: YOUR_E_MAIL_ADDRESS
    password: YOUR_PASSWORD
```

{% configuration %}
email:
  description: The email address for your Sesame account.
  required: true
  type: string
password:
  description: The password for your Sesame account.
  required: true
  type: string
{% endconfiguration %}

