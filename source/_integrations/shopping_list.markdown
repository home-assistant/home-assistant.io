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

{% include integrations/actions.md %}

## Using in automations

A `shopping_list_updated` event is triggered when items in the list are modified, with the following data payload attached to it. This can be used to trigger automations such as sending a push notification when someone adds an item to the shopping list, which when clicked, will open the list.

| Data payload attribute | Description                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `action`               | What action was taken on the item. See below for possible values. |
| `item`                 | A dictionary containing details of the item that was updated.                                                                                          |
| `item.id`              | A unique ID for this item                                                                                                                              |
| `item.name`            | The text attached to the item, for example `Milk`                                                                                                      |
| `item.complete`        | A boolean indicated whether the item has been marked as complete.                                                                                      |

```yaml
alias: "Notify on new shopping list item"
triggers:
  - trigger: event
    event_type: shopping_list_updated
    event_data:
      action: "add"
actions:
  - action: notify.notify
    data:
      message: "{{ trigger.event.data.item.name }} has been added to the shopping list"
      data:
        clickAction: "/shopping-list"
        url: "/shopping-list"
```

The possible values for `action` here are:

- `add`: A new item being added.
- `update`: An item being updated (unless using the `shopping_list.complete_item` action, or one of the whole list actions).
- `complete`: An item being completed (via the `shopping_list.complete_item` action only).
- `remove`: An item being removed.

You can also trigger an automation when a `shopping_list_updated` event was triggered by any of the following actions:

- `clear`: A completed item was cleared from the list.
- `sorted`: The items in the list were sorted by name.
- `reorder`: An item has been reordered in the list.
- `update_list`: All items have been updated (via the `shopping_list.complete_all` or `shopping_list.incomplete_all` actions).

In these cases, the event does not return a list item.
