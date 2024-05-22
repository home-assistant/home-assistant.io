---
title: Shopping list
description: Instructions on how to integrate a Shopping list into Home Assistant using Intent.
ha_category:
  - Intent
  - To-do list
ha_release: '0.50'
ha_config_flow: true
ha_quality_scale: internal
ha_iot_class: Local Push
ha_domain: shopping_list
ha_integration_type: integration
ha_platforms:
  - todo
---

The **Shopping list** {% term integration %} allows you to keep track of shopping list items.

Your shopping list will be accessible from the sidebar, and you can optionally add the [To-do list card](/dashboards/todo-list/) to your dashboard. With the [conversation integration](/integrations/conversation/), you can add items to your shopping list using voice commands like "Add eggs to my shopping list."

{% include integrations/config_flow.md %}

## Services

You can add or remove items from your shopping list by using the following services.

### Service `shopping_list.add_item`

Add an item to the shopping list.

| Service data attribute | Optional | Description                              |
| ---------------------- | -------- | ---------------------------------------- |
| `name`                 | no       | Name of the item to add. Example: "Milk" |

### Service `shopping_list.remove_item`

Remove the first item with matching name from the shopping list.

| Service data attribute | Optional | Description                                 |
| ---------------------- | -------- | ------------------------------------------- |
| `name`                 | no       | Name of the item to remove. Example: "Milk" |

### Service `shopping_list.complete_item`

Mark the first item with matching name as completed in the shopping list. It does not remove the item.

| Service data attribute | Optional | Description                                            |
| ---------------------- | -------- | ------------------------------------------------------ |
| `name`                 | no       | Name of the item to mark as completed. Example: "Milk" |

### Service `shopping_list.incomplete_item`

Mark the first item with matching name as incomplete in the shopping list.

| Service data attribute | Optional | Description                                             |
| ---------------------- | -------- | ------------------------------------------------------- |
| `name`                 | no       | Name of the item to mark as incomplete. Example: "Milk" |

### Service `shopping_list.complete_all`

Mark all items as completed in the shopping list (without removing them from the list).

### Service `shopping_list.incomplete_all`

Mark all items as incomplete in the shopping list.

### Service `shopping_list.clear_completed_items`

Clear completed items from the shopping list.

### Service `shopping_list.sort`

Sort all items by name in the shopping list.

| Service data attribute | Optional | Description                                                         |
| ---------------------- | -------- | ------------------------------------------------------------------- |
| `reverse`              | yes      | Whether to sort in reverse (_descending_) order. (default: `False`) |

## Using in automations

A `shopping_list_updated` event is triggered when items in the list are modified, with the following data payload attached to it. This can be used to trigger automations such as sending a push notification when someone adds an item to the shopping list, which when clicked, will open the list.

| Data payload attribute | Description                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `action`               | What action was taken on the item. Either `add` for a new item being added, or `update` for an item being updated. |
| `item`                 | A dictionary containing details of the item that was updated.                                                      |
| `item.id`              | A unique ID for this item                                                                                          |
| `item.name`            | The text attached to the item, for example `Milk`                                                                  |
| `item.complete`        | A boolean indicated whether the item has been marked as complete.                                                  |

{% raw %}

```yaml
alias: "Notify on new shopping list item"
trigger:
  - platform: event
    event_type: shopping_list_updated
    event_data:
      action: "add"
action:
  - service: notify.notify
    data:
      message: "{{ trigger.event.data.item.name }} has been added to the shopping list"
      data:
        clickAction: "/shopping-list"
        url: "/shopping-list"
```

{% endraw %}
