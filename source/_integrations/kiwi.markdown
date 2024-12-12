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
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `KIWI` {% term integration %} allows you to open your KIWI Smart Locks and Smart Entry Devices.
All you need to get started is a KIWI account. Register at [the KIWI website](https://kiwi.ki/login/).

## Configuration

To enable the KIWI {% term integration %}, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
