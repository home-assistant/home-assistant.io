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

The Time integration is built for the controlling and monitoring of times on devices.

{% include integrations/building_block_integration.md %}

If you are looking for a way to create a similar entity, please take a look at the [Date/Time helper](/integrations/input_datetime).

## Actions

### Time actions

Available actions: `time.set_value`

### Action `time.set_value`

Set a new value for the time entity.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of times to control.
| `time` | no | New time value to set.
