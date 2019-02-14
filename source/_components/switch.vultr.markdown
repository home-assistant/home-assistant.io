---
layout: page
title: "Vultr Switch"
description: "Instructions on how to set up Vultr switches within Home Assistant."
date: 2017-10-17 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: vultr.png
ha_category: System Monitor
ha_release: "0.58"
ha_iot_class: "Cloud Polling"
---

The `vultr` switch platform allows you to control (start/stop) your
[Vultr](https://www.vultr.com/) subscription.

To control your Vultr subscription, you first have to set up
your [Vultr hub](/components/vultr/).

## {% linkable_title Configuration %}

Minimal `configuration.yaml` (produces `switch.vultr_web_server`):

```yaml
# Example configuration.yaml entry
switch:
  - platform: vultr
    subscription: YOUR_SUBSCRIPTION_ID
```

{% configuration %}
subscription:
  description: List of droplets you want to control.
  required: true
  type: string
name:
  description: The name you want to give this switch.
  required: false
  default: "Vultr {subscription label}"
  type: string
{% endconfiguration %}

## {% linkable_title Additional Examples %}

Full example that produces `switch.amazing_server`, assuming a subscription
that has an ID of `123456` and a label of `Web Server`:

```yaml
# Example configuration.yaml entry
switch:
  - platform: vultr
    name: Amazing Server
    subscription: 123456
```
