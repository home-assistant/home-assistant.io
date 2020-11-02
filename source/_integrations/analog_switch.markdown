---
title: Analog Switch
description: Instructions on how to set up your analog switches with Home Assistant.
ha_category:
  - Analog Switch
ha_release: 0.118
ha_quality_scale: internal
ha_domain: analog_switch
ha_iot_class: ~
---

Keeps track on analog switches in your environment, their state and allows you to control them. This integration allows other integrations to get a value input from user within a range.

### Services

The Analog Switch entities registers the following services:

| Service | Data | Description |
| ------- | ---- | ----------- |
| `decrement` | `entity_id(s)`<br>`area_id(s)` | Decrement the value of specific `analog_switch` entities by an integration-specific `step`
| `increment` | `entity_id(s)`<br>`area_id(s)` | Increment the value of specific `analog_switch` entities by an integration-specific `step`
| `set_value` | `value`<br>`entity_id(s)`<br>`area_id(s)` | Set the value of specific `analog_switch` entities
