---
title: Bring!
description: Instructions on how to integrate the Bring! todo list with Home Assistant.
ha_category:
  - To-do list
ha_iot_class: Cloud Polling
ha_release: 2024.2
ha_config_flow: true
ha_codeowners:
  - '@miaucl'
  - '@tr4nt0r'
ha_domain: bring
ha_integration_type: service
ha_platforms:
  - diagnostics
  - sensor
  - todo
related:
  - docs: /integrations/todo
    title: To-do list integration documentation
  - docs: /integrations/#to-do-list
    title: List of to-do list integrations
  - docs: /dashboards/todo-list/
    title: To-do list card
  - url: https://www.getbring.com/
    title: Bring!
---

The **Bring!** integration allows you to interact with your [Bring!](https://www.getbring.com/) shopping lists within Home Assistant.

For authentication, the integration requires the `email` and `password` you used for your Bring! account. If you want to automatically receive notifications via the Bring! app when Home Assistant adds or removes an item from the list, you should use a dedicated account (such as `email: your.name+ha@gmail.com`) to connect Home Assistant with [Bring!](https://www.getbring.com/).

{% include integrations/config_flow.md %}

## Sensors

- **Urgent:** Shows the number of items tagged with the **Urgent** badge on the shopping list. Completed items are excluded.
- **On occasion:** Displays the count of items marked with the **If convenient** badge.
- **Discount only:** Indicates the number of items tagged with the **Offer** badge.
- **Region & Language:** The sensor can be used for diagnostics. If everything is set correctly, it will display the selected region for the shopping list. If it shows **Unknown**, the region has not been set properly in the **Bring!** app.
- **List access**: Indicates whether the shopping list is **personal** (private) or **shared** (accessible to others).

## Actions

You can use the actions from the [to-do list](/integrations/todo/) to create, update, or delete items on your Bring! shopping lists.

### Notifications

The **Bring** integration offers an action to send push notifications to the Bring! mobile apps of other members of a shared shopping list. The Bring! mobile app has 4 predefined notification types. Note: If you want to receive these notifications yourself, you need to use a dedicated account as mentioned above.

| Data attribute | Optional | Description                                                                                                                      |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `target`               |       no | Target Bring! list(s) whose members should be notified.                                                                          |
| `message`              |       no | Type of push notification to send to list members. See [Notification types](#available-notification-types).                      |
| `item`                 |      yes | **Required for `urgent_message`.** Article name to include in the message. For example: *Urgent Message - Please buy cilantro urgently*. |

### Available notification types

| Notification type | Text of notification                                |
| ----------------- | --------------------------------------------------- |
| going_shopping    | I'm going shopping! - Last chance to make changes   |
| changed_list      | List updated - Take a look at the articles          |
| shopping_done     | Shopping done - The fridge is well stocked          |
| urgent_message    | Urgent Message - Please buy `Article name` urgently |

### Sending a going shopping notification

```yaml
...
actions:
  - action: bring.send_message
    target:
      entity_id: todo.bring_shoppinglist
    data:
      message: going_shopping 
```

### Sending an urgent message notification

Note that for the notification type `urgent_message` the attribute `item` is **required**.

```yaml
...
actions:
  - action: bring.send_message
    target:
      entity_id: todo.bring_shoppinglist
    data:
      message: urgent_message
      item: Cilantro
```
