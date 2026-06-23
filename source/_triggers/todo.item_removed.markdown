---
title: "To-do item removed"
trigger: todo.item_removed
domain: todo
description: "Triggers when a to-do item is removed from a list."
related_triggers:
  - todo.item_added
  - todo.item_completed
---

The **To-do item removed** trigger is useful when you want Home Assistant to react after an item disappears from a list. You can use it to notify someone, refresh a related routine, or keep another system in sync with your to-do list.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the to-do list you want to watch. You can also select an area, floor, device, entity, or label if that target resolves to one or more to-do lists.
5. From the triggers shown for that target, select **To-do item removed**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `todo.item_removed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: todo.item_removed
  target:
    entity_id: todo.shopping_list
{% endexample %}

This fires every time an item is removed from `todo.shopping_list`.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md %}

## Good to know

- This trigger fires after Home Assistant removes one or more items from the targeted to-do list.
- Changes to `unavailable` or `unknown` do not count as items being removed.
- Trigger data includes the to-do list `entity_id` and the affected `item_ids`, which can be useful in a more advanced automation.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify the household when a shopping item is removed

If you use a shared shopping list, this automation can let everyone know that an item was removed, which often means it has already been bought.

- **Trigger**: To-do item removed
- **Target**: Shopping list
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a shopping item removal notification" %}

{% example %}
automation: |
  alias: "Notify me when a shopping item is removed"
  triggers:
    - trigger: todo.item_removed
      target:
        entity_id: todo.shopping_list
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          An item was removed from the shopping list.
{% endexample %}

{% enddetails %}

### Automation: turn off a reminder light when an item is removed from the errands list

If you use a light as a reminder that errands are still pending, this automation turns it off after an item is removed from the list.

- **Trigger**: To-do item removed
- **Target**: Errands list
- **Action**: Turn off light

{% details "YAML example for turning off a reminder light" %}

{% example %}
automation: |
  alias: "Turn off the errands reminder light"
  triggers:
    - trigger: todo.item_removed
      target:
        entity_id: todo.errands_list
  actions:
    - action: light.turn_off
      target:
        entity_id: light.hallway_reminder
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
