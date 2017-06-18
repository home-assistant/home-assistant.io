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

Your Sesame needs to be paired with a mobile device running the app in *virtual station* mode, or a standalone [Wi-Fi Access Point](https://candyhouse.co/collections/frontpage/products/wi-fi-access-point).

Once you have remote access enabled, add the following to your `configuration.yaml` file:
```yaml
# Example configuration.yaml entry
lock:
  - platform: sesame
    email: abc@i-lovecandyhouse.co
    password: super-strong-password
```

Configuration variables:

- **email** (*Required*): The email address for your Sesame account.
- **password** (*Required*): The password for your Sesame account.
