---
title: "To-do item completed"
trigger: todo.item_completed
domain: todo
description: "Triggers when a to-do item is marked as done."
related_triggers:
  - todo.item_added
  - todo.item_removed
---

The **To-do item completed** trigger is useful when you want an automation to run after someone finishes a task on a list. You can use it to lock up for the night, clean up completed items, or send a confirmation that a chore is done.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the to-do list you want to watch. You can also select an area, floor, device, entity, or label if that target resolves to one or more to-do lists.
5. From the triggers shown for that target, select **To-do item completed**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `todo.item_completed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: todo.item_completed
  target:
    entity_id: todo.evening_checklist
{% endexample %}

This fires every time an item is marked complete in `todo.evening_checklist`.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md %}

## Good to know

- This trigger fires when an item changes into the completed state.
- Changes to `unavailable` or `unknown` do not count as an item being completed.
- Trigger data includes the to-do list `entity_id` and the affected `item_ids`.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: lock the front door after the last evening task is finished

If you use an evening checklist, this automation can lock the front door as soon as the last task is marked complete.

- **Trigger**: To-do item completed
- **Target**: Evening checklist
- **Condition**: All to-do items completed
- **Action**: Lock

{% details "YAML example for locking the front door after the evening checklist" %}

{% example %}
automation: |
  alias: "Lock the front door after the evening checklist"
  triggers:
    - trigger: todo.item_completed
      target:
        entity_id: todo.evening_checklist
  conditions:
    - condition: todo.all_completed
      target:
        entity_id: todo.evening_checklist
  actions:
    - action: lock.lock
      target:
        entity_id: lock.front_door
{% endexample %}

{% enddetails %}

### Automation: clear completed chores every night

If you want to keep a chore list tidy, this automation removes completed items after someone marks a task done late in the evening.

- **Trigger**: To-do item completed
- **Target**: Chore list
- **Condition**: Time is after 21:00
- **Action**: Remove completed items

{% details "YAML example for clearing completed chores at night" %}

{% example %}
automation: |
  alias: "Clear completed chores at night"
  triggers:
    - trigger: todo.item_completed
      target:
        entity_id: todo.chore_list
  conditions:
    - condition: time
      after: "21:00:00"
  actions:
    - action: todo.remove_completed_items
      target:
        entity_id: todo.chore_list
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
