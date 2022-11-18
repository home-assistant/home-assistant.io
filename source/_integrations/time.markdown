---
title: Time
description: Instructions on how to set up time entities within Home Assistant.
ha_category:
  - Time
ha_release: '2022.12'
ha_domain: time
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The Date integration is built for the controlling and monitoring of times on devices.

Time entities are created automatically by integrations that support them.

## Services

### time services

Available services: `time.set_value`

### Service `time.set_value`

Set a new value for the time entity.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of times to control.
| `time` | no | New time value to set.
