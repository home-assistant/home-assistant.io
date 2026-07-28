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

## The state of a date/time entity

The state of a date/time entity is the actual date and time value.

<p class='img'>
<img src='/images/integrations/datetime/state_datetime.png' alt='Screenshot showing the state of a date/time entity in the States tab of Tools.' />
Screenshot showing the state of a date/time entity in {% my developer_states title="Settings > Tools > States" %}. In the example shown, the state is January 1, 2020 at 12:00 in the format YYYY-MM-DD T HH:MM:SS.
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

{% include integrations/actions.md %}
