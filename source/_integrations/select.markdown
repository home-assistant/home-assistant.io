---
title: Select
description: Instructions on how to manage your Select entities with Home Assistant.
ha_category:
  - Select
ha_release: 2021.7
ha_quality_scale: internal
ha_domain: select
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Select** {% term integration %} manages the state of the select entities and allows
you to control them. This integration allows other integrations to offer
a limited set of selectable options for the entity.

{% include integrations/building_block_integration.md %}

## The state of a select entity

The state of a select entity is the value of the currently selected option.

<p class='img'>
<img src='/images/integrations/select/state_select.png' alt='Screenshot showing the state of a select entity in the developer tools' />
Screenshot showing the state of a select entity in the developer tools.
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

{% include integrations/actions.md %}

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}
