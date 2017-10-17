---
layout: page
title: "Vultr Binary Sensor"
description: "Instructions on how to set up Vultr binary sensors within Home Assistant."
date: 2017-10-17 21:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
logo: vultr.png
ha_release: ""
ha_iot_class: "Cloud Polling"
---

The `vultr` binary sensor platform allows you to monitor your Vultr subscriptions (virtual private servers).

To use your Vultr subscriptions, you first have to set up your [Vultr hub](/components/vultr/) and then add the following to your `configuration.yaml` file:

```yaml
binary_sensor:
  - platform: vultr
    subs:
      - "123456"
      - "567899"
```

Configuration variables:

- **subs** (*Required*): List of subscriptions you want to monitor, these can be found in the URL when viewing a server

