---
description: Instructions on how to manage your Select entities with Home Assistant.
ha_release: 2021.7
ha_domain: select
---

The **Select** {% term integration %} manages the state of the select entities and allows
you to control them. This integration allows other integrations to offer
a limited set of selectable options for the entity.

{% include integrations/building_block_integration.md %}

## Select states

The {% term state %} of a select entity is the currently selected option. The Home Assistant interface shows the label of that option. If the integration translates its options, the label can differ from the stored option. If you write templates or edit automations in YAML, use the stored option.

In addition, the entity can have the following states. Each item shows the interface label, followed by the stored state:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

{% include integrations/triggers_conditions_actions.md %}
