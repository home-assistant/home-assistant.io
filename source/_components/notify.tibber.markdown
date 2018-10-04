---
layout: page
title: "Tibber"
description: "Instructions on how to integrate Tibber within Home Assistant."
date: 2015-10-04 16:34
sidebar: true
comments: false
sharing: true
footer: true
logo: tibber.png
ha_category: Notifications
ha_release: 0.80
ha_qa_scale: silver
ha_iot_class: "Cloud Polling"
---

The requirement is that you have setup [Tibber component](/components/tibber/).


### {% linkable_title Usage %}

Tibber can send a notification by calling the notify service [as described here](/components/notify/). It will send a notification to all devices registered in the Tibber account. 


To use notifications, please see the [getting started with automation page](/getting-started/automation/).

### {% linkable_title Send message %}

```yaml
action:
  service: notify.tibber
  data:
    title: Your title
    message: This is a message for you!
```
