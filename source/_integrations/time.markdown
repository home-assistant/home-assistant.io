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

The **Time** {% term integration %} is built for controlling and monitoring times on devices.

{% include integrations/building_block_integration.md %}

If you are looking for a way to create a similar entity, please take a look at the [Date/Time helper](/integrations/input_datetime).

## Time states

The {% term state %} of a time {% term entity %} is a time, stored in the format HH:MM:SS, for example, `07:30:00`. The Home Assistant interface shows the time in your local time format.

In addition, the entity can have the following states. Each item shows the interface label, followed by the stored state:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

{% include integrations/actions.md %}
