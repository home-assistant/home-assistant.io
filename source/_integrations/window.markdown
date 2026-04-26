---
title: Window
description: This integration provides window automation triggers and conditions.
ha_category:
  - Automation
ha_release: 2026.4
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: window
ha_integration_type: system
---

This {% term integration %} provides automation triggers and conditions for binary sensors and covers with device class `window`. There are no configuration options for this integration.

## Triggers

This integration provides the following device triggers:

- `opened`
- `closed`

Example trigger:

```yaml
triggers:
  - trigger: device
    device_id: 1234567890abcdef1234567890abcdef
    domain: window
    entity_id: binary_sensor.kitchen_window
    type: opened
```

## Conditions

This integration provides the following device conditions:

- `is_open`
- `is_closed`

Example condition:

```yaml
conditions:
  - condition: device
    device_id: 1234567890abcdef1234567890abcdef
    domain: window
    entity_id: binary_sensor.kitchen_window
    type: is_closed
```
