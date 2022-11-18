---
title: Date
description: Instructions on how to set up date entities within Home Assistant.
ha_category:
  - Date
ha_release: '2022.12'
ha_domain: date
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The Date integration is built for the controlling and monitoring of dates on devices.

Date entities are created automatically by integrations that support them.

## Services

### date services

Available services: `date.set_value`

### Service `date.set_value`

Set a new value for the date entity.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of dates to control.
| `date` | no | New date value to set.
