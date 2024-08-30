---
title: Date
description: Instructions on how to set up date entities within Home Assistant.
ha_category:
  - Date
ha_release: '2023.6'
ha_domain: date
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Date** {% term integration %} is built for the controlling and monitoring of dates on devices.

{% include integrations/building_block_integration.md %}

If you are looking for a way to create a similar entity, please take a look at the [Date/Time helper](/integrations/input_datetime).

## Actions

### Date actions

Available {% term actions %}: `date.set_value`

### Action`date.set_value`

Set a new value for the date {% term entity %}.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of dates to control.
| `date` | no | New date value to set.
