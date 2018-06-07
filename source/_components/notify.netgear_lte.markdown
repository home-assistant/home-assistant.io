---
layout: page
title: "Netgear LTE Notify"
description: "Instructions on how to add Netgear LTE notifications to Home Assistant."
date: 2018-06-06 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: netgear.png
ha_category: Notifications
ha_release: 0.72
---

The `netgear_lte` platform allows you to use a Netgear LTE modem for notifications from Home Assistant. The message will be sent as an SMS text message.

This requires you to have set up the [Netgear LTE component](/components/netgear_lte/).

```yaml
# Example configuration.yaml entry
notify:
  - platform: netgear_lte
    name: sms
    target: "+15105550123"
```

{% configuration %}
target:
    description: The phone number of a default recipient or a list with multiple recipients.
    required: true
    type: string, list
name:
    description: Setting the optional parameter `name` allows multiple notifiers to be created.
    required: false
    default: notify
    type: string
host:
    description: The modem to use. Not needed if you only have one.
    required: false
    type: string
{% endconfiguration %}
