---
title: Date/Time
description: Instructions on how to set up date/time entities within Home Assistant.
ha_category:
  - Date/Time
ha_release: '2023.6'
ha_domain: datetime
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Date/Time** {% term integration %} is built for the controlling and monitoring of timestamps on devices.

{% include integrations/building_block_integration.md %}

If you are looking for a way to create a Date/Time entity, please take a look at the [Date/Time helper](/integrations/input_datetime).

## Actions

### datetime actions

Available {% term actions %}: `datetime.set_value`

### Action `datetime.set_value`

Set a new value for the datetime {% term entity %}.

| Data attribute | Optional | Description                                                                                                  |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `entity_id`            | no       | String or list of strings that point at `entity_id`'s of datetimes to control.                               |
| `datetime`             | no       | New datetime value to set. If timezone is not included, the Home Assistant instance's timezone will be used. |
