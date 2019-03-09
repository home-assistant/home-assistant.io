---
layout: page
title: "KIWI Lock"
description: "Instructions on how to integrate KIWI Smart Lock and Smart Entry."
date: 2018-05-16 13:37
sidebar: true
comments: false
sharing: true
footer: true
logo: kiwi.png
ha_category: Lock
featured: false
ha_release: 0.72
ha_iot_class: "Cloud Polling"
---

The `KIWI` platform allows you to open your KIWI Smart Locks and Smart Entry Devices. 
All you need to get started is a KIWI account. Register at [the KIWI website](https://kiwi.ki/login/).

## {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
lock:
  - platform: kiwi
    username: mail@example.com
    password: mySecretPassword
```

{% configuration %}
username:
  required: true
  description: The username of your KIWI account.
  type: string
password:
  required: true
  description: The password of your KIWI account.
  type: string
{% endconfiguration %}
