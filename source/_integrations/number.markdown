---
title: Number
description: Instructions on how to manage your Number entities with Home Assistant.
ha_category:
  - Number
ha_release: 2020.12
ha_quality_scale: internal
ha_domain: number
ha_iot_class:
ha_codeowners:
  - '@home-assistant/core'
  - '@Shulyaka'
---

Keeps track on `number` entities in your environment, their state, and allows you to control them. This integration allows other integrations to get a value input from user within a range.

### Services

The Number entities registers the following services:

| Service | Data | Description |
| ------- | ---- | ----------- |
| `set_value` | `value`<br>`entity_id(s)`<br>`area_id(s)` | Set the value of specific `number` entities
