---
title: "To-do item added"
trigger: todo.item_added
domain: todo
description: "Triggers when one or more to-do items are added to a list."
related_triggers:
  - todo.item_completed
  - todo.item_removed
---

The **To-do item added** trigger is useful when you want Home Assistant to react as soon as a new task appears on a list. You can use it to send a reminder, start a follow-up script, or highlight that a shared list has changed.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the to-do list you want to watch. You can also select an area, floor, device, entity, or label if that target resolves to one or more to-do lists.
5. From the triggers shown for that target, select **To-do item added**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `todo.item_added`. A basic example looks like this:

{% example %}
trigger: |
  trigger: todo.item_added
  target:
    entity_id: todo.shopping_list
{% endexample %}

This fires every time a new item is added to `todo.shopping_list`.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md %}

## Good to know

- This trigger fires after Home Assistant adds a new item to the targeted to-do list.
- Changes to `unavailable` or `unknown` do not count as items being added.
- Trigger data includes the to-do list `entity_id` and the affected `item_ids`, which can help if you build a more advanced automation later.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a phone notification when a grocery item is added

If you share a grocery list with someone else, this automation lets you know when the list changes so you can check it before your next trip to the store.

- **Trigger**: To-do item added
- **Target**: Grocery list
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a grocery list notification" %}

{% example %}
automation: |
  alias: "Notify me when the grocery list changes"
  triggers:
    - trigger: todo.item_added
      target:
        entity_id: todo.grocery_list
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          A new item was added to the grocery list.
{% endexample %}

{% enddetails %}

### Automation: start a packing review script when a travel item is added

If you keep a travel checklist in Home Assistant, this automation can start a script that reviews the list whenever someone adds a new item before a trip.

- **Trigger**: To-do item added
- **Target**: Travel checklist
- **Action**: Turn on script

{% details "YAML example for starting a packing review script" %}

{% example %}
automation: |
  alias: "Review packing list when a new item is added"
  triggers:
    - trigger: todo.item_added
      target:
        entity_id: todo.travel_checklist
  actions:
    - action: script.turn_on
      target:
        entity_id: script.review_travel_checklist
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
