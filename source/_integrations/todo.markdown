---
title: To-do list
description: Instructions on how to use to-do lists within Home Assistant.
ha_domain: todo
ha_release: 2023.11
ha_category:
  - To-do list
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
related:
  - docs: /integrations/local_todo
    title: Local to-do list integration documentation
  - docs: /dashboards/todo-list/
    title: To-do list card
---

The **To-do list** {% term integration %} provides to-do list {% term entities %}, allowing other integrations
to integrate to-do lists into Home Assistant. To-do lists are shown on the **To-do lists**
dashboard for tracking items and whether they have been completed.

{% include integrations/building_block_integration.md %}

For example, [Local to-do](/integrations/local_todo/) is a fully local integration to create to-do lists and tasks within your Home Assistant instance, [Shopping list](/integrations/shopping_list) specifically for shopping that can be added to with Assist, or other integrations work with online services providing to-do list data.

## Viewing and managing to-do lists

Each to-do list is represented as its own entity in Home Assistant and can be
viewed and managed on a to-do list dashboard. You can find the to-do list dashboard
in the main sidebar of your Home Assistant instance.

## The state of a to-do list entity

The state of a to-do list entity is a number, which represents the number of
incomplete items in the list.

<p class='img'>
<img src='/images/integrations/todo/state_todo.png' alt='Screenshot showing the state of a to-do list entity in the developer tools' />
Screenshot showing the state of a to-do list entity in the developer tools.
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Blueprint to add an item to a dedicated list

This blueprint allows you to create a script to add an
item to a pre-configured to-do list.

{% my blueprint_import badge blueprint_url="https://community.home-assistant.io/t/add-to-do-item/699193" %}

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

{% include integrations/actions.md %}

## To-do list automation examples

To-do list triggers and conditions make it easier to react to changes in a list or check whether a list still needs attention.

{% include integrations/labs_entity_triggers_note.md %}

{% include docs/paste_yaml_tip.md %}

### Automation: send a notification when someone adds a shopping item

If you share a shopping list with your household, this automation lets you know right away when someone adds a new item.

- **Trigger**: To-do item added
- **Target**: Shopping list
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a shopping list notification" %}

{% example %}
automation: |
  alias: "Notify me when a shopping item is added"
  triggers:
    - trigger: todo.item_added
      target:
        entity_id: todo.shopping_list
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          A new item was added to the shopping list.
{% endexample %}

{% enddetails %}

### Automation: lock the front door when the evening checklist is finished

If you keep an evening checklist in Home Assistant, this automation locks the front door after the last task is marked complete.

- **Trigger**: To-do item completed
- **Condition**: All to-do items completed
- **Target**: Evening checklist
- **Action**: Lock lock

{% details "YAML example for locking up after the evening checklist is done" %}

{% example %}
automation: |
  alias: "Lock the front door when the evening checklist is done"
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
