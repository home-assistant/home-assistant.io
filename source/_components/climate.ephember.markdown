---
layout: page
title: "EPH Controls Ember Thermostat"
description: "Instructions on how to integrate EPH Controls Ember thermostats within Home Assistant."
date: 2017-10-07 12:40
sidebar: true
comments: false
sharing: true
footer: true
logo: ephcontrolsember.png
ha_category: Climate
ha_release: 0.57
ha_iot_class: "Local Polling"
---


The `ephember` climate platform lets you control [EPH Controls](http://emberapp.ephcontrols.com/) thermostats. The module only works if you have a WiFi gateway to control your EPH system and an account on the ember app.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
climate:
  - platform: ephember
    username: YOUR_EMAIL
    password: YOUR_PASSWORD
```

A single interface can handle up to 32 connected devices.

Configuration variables:

- **username** (*Required*): The email address you used to sign up to the ember app
- **password** (*Required*): The password you used to sign up to the ember app
