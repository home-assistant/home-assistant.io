---
layout: page
title: "KNX Notify"
description: "Instructions on how to use the KNX notify with Home Assistant."
date: 2016-09-03 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: Notifications
ha_release: 0.53
ha_iot_class: "Local Push"
---

The `knx` notify platform allows you to send notifications to [KNX](http://www.knx.org) devices.

The `knx` component must be configured correctly, see [KNX Component](/components/knx).

To use your KNX switch in your installation, add the following lines to your `configuration.yaml` file:

```yaml
notify:
  - platform: knx
    name: Alarm
    address: '5/1/10'
```

* **name** (*Optional*): A name for this device used within Home Assistant.
* **address**: KNX group address of the notification
