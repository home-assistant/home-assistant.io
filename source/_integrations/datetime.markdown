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

## Date/time states

The state of a date/time entity is the actual date and time value. The state value is in UTC, in the format YYYY-MM-DDTHH:MM:SS+00:00. For example, `2020-01-01T12:00:00+00:00`. The Home Assistant interface shows the date and time in your local date and time format.

In addition, the entity can have the following states:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

{% include integrations/actions.md %}
