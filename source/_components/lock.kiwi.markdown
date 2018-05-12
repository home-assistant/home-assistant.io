---
layout: page
title: "KIWI Lock"
description: "Instructions on how to integrate KIWI Smart Lock and Smart Entry."
date: 2017-08-13 17:25
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Lock
featured: false

ha_release: 0.63.1
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

Configuration variables:

- **username** (*Required*): The username of your KIWI account.
- **password** (*Required*): The password of your KIWI account.
