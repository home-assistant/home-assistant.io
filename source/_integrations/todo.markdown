---
title: To-do Lists
description: Instructions on how to use To-do Lists within Home Assistant.
ha_domain: todo
ha_release: 2023.10
ha_category:
  - To-do List
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The To-do List integration provides todo list entities, allowing other integrations
to integrate To-do Lists into Home Assistant. To-do lists are shown on the To-do list
dashboard for tracking items and whether or not they have been completed.

<div class='note'>

To-do List entities are here to be consumed and provided by other integrations.

This page, therefore, does not provide instructions on how to create To-do
entities. Please see the ["To-do List" category](/integrations/#to-do-list) on the
integrations page to find integrations offering To-do List entities.

</div>

## Viewing and managing To-do lists

Each To-do list is represented as its own entity in Home Assistant and can be
viewed and managed on a to-do list dashboard. You can find the to-do list dashboard
in the main sidebar of your Home Assistant instance.

## The state of an To-do List entity

The state of a To-do List entity is a number, which represents the number of
incomplete items in the list.


## Services

Some To-do List integrations allow Home Assistant to manage the To-do Items in the list. The
services provided by some To-do List entities are described below or you can read more about [Service Calls](/docs/scripts/service-calls/).

### Service `todo.create_item`

Add a new To-do Item. A To-do list `target` is selected with a [Target Selector](/docs/blueprint/selectors/#target-selector) and the `data` payload supports the following fields:

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `summary` | no | A short summary or subject for the To-do Item. | Submit Income Tax Return
| `status` | yes | The overall status of the To-do Item. |  `needs_action` or `completed`

This is a full example of service call in YAML:

```yaml
service: todo.create_item
target:
  entity_id: todo.personal_tasks
data:
  summary: "Submit Income Tax Return"
  status: "needs_action"
```

### Service `todo.update_item`

Update a To-do Item. A To-do list `target` is selected with a [Target Selector](/docs/blueprint/selectors/#target-selector) and the `data` payload supports the following fields:

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `uid` | yes | The Unique identifier of the To-do Item to update. | `bY1PVzZkni1qQQlkanTvBA`
| `summary` | yes | A short summary or subject for the To-do Item. | Submit Income Tax Return
| `status` | yes | The overall status of the To-do Item. |  `needs_action` or `completed`

To-do Items can be identified using either a `uid` or `summary`. This is a full example of
a service call that updates the status of a To-do Item based on the name.

```yaml
service: todo.update_item
target:
  entity_id: todo.personal_tasks
data:
  summary: "Submit Income Tax Return"
  status: "completed"
```

### Service `todo.delete_item`

Delete a To-do Item. A To-do list `target` is selected with a [Target Selector](/docs/blueprint/selectors/#target-selector) and the `data` payload supports the following fields:

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `uid` | yes | The Unique identifier of the To-do Item to update. | `bY1PVzZkni1qQQlkanTvBA`
| `summary` | yes | A short summary or subject for the To-do Item. | Submit Income Tax Return

To-do Items can be identified using either a `uid` or `summary`. This is a full example of
a service call that delete's a To-do Item with the specified name.

```yaml
service: todo.delete_item
target:
  entity_id: todo.personal_tasks
data:
  summary: "Submit Income Tax Return"
```