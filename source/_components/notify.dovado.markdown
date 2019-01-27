---
layout: page
title: "Dovado SMS"
description: "How to integrate Dovado SMS notifications within Home Assistant."
date: 2019-01-26 15:45
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
logo: dovado.png
ha_release: 0.87
ha_iot_class: "Local Polling"
---

The `dovado` notify platform allows you to send SMS from your [Dovado](http://www.dovado.com/) router, if it supports it.

<p class='note'>
You must have the [Dovado component](/components/dovado/) configured to use this notify platform.
</p>

To add the Dovado notify platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - platform: dovado
```

### {% linkable_title Usage %}

This is a notify platform and thus can be controlled by calling the notify service [as described here](/components/notify/). It will send an SMS notification to a single phone number in the notification **target**.

```yaml
# Example automation notification entry
automation:
  - alias: The sun has set
    trigger:
      platform: sun
      event: sunset
    action:
      service: notify.dovado
      data:
        message: 'The sun has set'
        target: '+14151234567'
```
