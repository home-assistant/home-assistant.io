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

## Date states

The state of a date entity is the actual date value, in the format YYYY-MM-DD. For example, `2020-01-01`. The Home Assistant interface shows the date in your local date format.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

{% include integrations/actions.md %}
