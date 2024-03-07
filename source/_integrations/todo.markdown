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
---

The to-do list integration provides to-do list entities, allowing other integrations
to integrate to-do lists into Home Assistant. To-do lists are shown on the to-do list
dashboard for tracking items and whether or not they have been completed.

{% include integrations/building_block_integration.md %}

For example, [Local To-do](/integrations/local_todo/) is a fully local integration to create to-do lists and tasks within your Home Assistant instance, [Shopping list](/integrations/shopping_list) specifically for shopping that can be added to with Assist, or other integrations work with online services providing to-do list data.

## Viewing and managing to-do lists

Each to-do list is represented as its own entity in Home Assistant and can be
viewed and managed on a to-do list dashboard. You can find the to-do list dashboard
in the main sidebar of your Home Assistant instance.

## The state of a to-do list entity

The state of a to-do list entity is a number, which represents the number of
incomplete items in the list.

## Services

Some to-do list integrations allow Home Assistant to manage the to-do items in the list. The
services provided by some to-do list entities are described below or you can read more about [Service Calls](/docs/scripts/service-calls/).


### Service `todo.get_items`

Get to-do items from a to-do list. A to-do list `target` is selected with a [target selector](/docs/blueprint/selectors/#target-selector). The `data` payload supports the following fields:

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `status` | yes | Only return to-do items with this status. |  `needs_action`, `completed`

This is a full example that returns all to-do items that have not been completed:

```yaml
service: todo.get_items
target:
  entity_id: todo.personal_tasks
data:
  status:
    - needs_action
```

### Service `todo.add_item`

Add a new to-do item. A to-do list `target` is selected with a [Target Selector](/docs/blueprint/selectors/#target-selector) and the `data` payload supports the following fields:

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `item` | no | the name of the to-do Item. | Submit income tax return
| `due_date` | yes | The date the to-do item is expected to be completed. | 2024-04-10
| `due_datetime` | yes | The date and time the to-do item is expected to be completed. | 2024-04-10 23:00:00
| `description` | yes | A more complete description than the one provided by the summary | Collect all necessary documents and submit the final return.

Only one of `due_date` or `due_datetime` may be specified.

This is a full example of service call in YAML:

```yaml
service: todo.add_item
target:
  entity_id: todo.personal_tasks
data:
  item: "Submit Income Tax Return"
  due_date: "2024-04-10"
  description: "Collect all necessary documents and submit the final return."
```

### Service `todo.update_item`

Update a to-do item. A to-do list `target` is selected with a [Target Selector](/docs/blueprint/selectors/#target-selector) and the `data` payload supports the following fields:

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `item` | no | The name of the to-do Item to update. | Submit income tax return
| `rename` | yes | The new name of the to-do Item. | Something else
| `status` | yes | The overall status of the To-do Item. |  `needs_action` or `completed`
| `due_date` | yes | The date the to-do item is expected to be completed. | 2024-04-10
| `due_datetime` | yes | The date and time the to-do item is expected to be completed. | 2024-04-10 23:00:00
| `description` | yes | A more complete description than the one provided by the summary. | Collect all necessary documents and submit the final return.

At least one of `rename` or `status` is required. Only one of `due_date` or `due_datetime` may be specified. This is a full example of a service call that updates the status and the name of a to-do item.

```yaml
service: todo.update_item
target:
  entity_id: todo.personal_tasks
data:
  item: "Submit income tax return"
  rename: "Something else"
  status: "completed"
```

### Service `todo.remove_item`

Removing a to-do item. A to-do list `target` is selected with a [Target Selector](/docs/blueprint/selectors/#target-selector), and the `data` payload supports the following fields:

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `item` | no | The name of the to-do item. | Submit income tax return

This is a full example of a service call that deletes a to-do Item with the specified name.

```yaml
service: todo.remove_item
target:
  entity_id: todo.personal_tasks
data:
  item: "Submit income tax return"
```

### Service `todo.remove_completed_items`

Removes all completed to-do items. A to-do list `target` is selected with a [Target Selector](/docs/blueprint/selectors/#target-selector).

This is a full example of a service call that deletes all completed to-do items.

```yaml
service: todo.remove_completed_items
target:
  entity_id: todo.personal_tasks
```
