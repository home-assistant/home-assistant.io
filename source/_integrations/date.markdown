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

## The state of a date entity

The state of a date entity is the actual date value.

<p class='img'>
<img src='/images/integrations/date/state_date.png' alt='Screenshot showing the state of a date in the developer tools' />
Screenshot showing the state of a date in the developer tools. In the example shown, the state is January 1, 2020; in the format YYYY-MM-DD.
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Actions

### Date actions

Available {% term actions %}: `date.set_value`

### Action`date.set_value`

Set a new value for the date {% term entity %}.

| Data attribute | Optional | Description                                                                |
| -------------- | -------- | -------------------------------------------------------------------------- |
| `entity_id`    | no       | String or list of strings that point at `entity_id`'s of dates to control. |
| `date`         | no       | New date value to set.                                                     |
