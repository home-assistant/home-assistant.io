---
title: KIWI
description: Instructions on how to integrate KIWI Smart Lock and Smart Entry.
ha_category:
  - Lock
ha_release: 0.72
ha_iot_class: Cloud Polling
ha_domain: kiwi
ha_platforms:
  - lock
---

The `KIWI` platform allows you to open your KIWI Smart Locks and Smart Entry Devices.
All you need to get started is a KIWI account. Register at [the KIWI website](https://kiwi.ki/login/).

## Configuration

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
