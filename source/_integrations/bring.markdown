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
  - todo
  - notify
---

The **Bring** integration allows you to interact with your [Bring!](https://www.getbring.com/) shopping lists within Home Assistant.

For authentication, the integration requires the `email` and `password` you used for your Bring! account. If you want to automatically receive notifications via the Bring! app when Home Assistant adds or removes an item from the list, you should use a dedicated account (such as `email: your.name+ha@gmail.com`) to connect Home Assistant with [Bring!](https://www.getbring.com/).

{% include integrations/config_flow.md %}

## Services

You can use the services from the [to-do list](/integrations/todo/) to create, update or delete items on your Bring! shopping lists.

### Notifications

The **Bring** integration offers a service to send push notifications to the Bring! mobile apps of other members of a shared shopping list. The Bring! mobile app has 4 predefined notification types. Note: If you want to receive these notifications yourself, you need to use a dedicated account as mentioned above.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Entity of the Bring! list whose members should be notified.
| `notification_type`    |       no | Type of push notification to send to list members. See [Notification types](#available-notification-types)
| `item_name`            |      yes | **Required for urgent message.** Item name to include in in the message e.g.: 'Breaking news - Please get cilantro!'

### Available Notification types

| Notification type | Text of Notification |
|-------------------|-------------|
| going_shopping| I'm going shopping! - Last chance for adjustments |
| changed_list | List changed - Check it out |
| shopping_done | Shopping done - you can relax |
| urgent_message | Breaking news - Please get `item name`! |

### Sending a going shopping notification

```yaml
...
action:
  service: bring.push_notification
  data:
    entity_id: todo.bring_shoppinglist
    notification_type: going_shopping 
```

### Sending an urgent message notification

Note that for the notification type `urgent_message` the attribute `item_name` is **required**.

```yaml
...
action:
  service: bring.push_notification
  data:
    entity_id: todo.bring_shoppinglist
    notification_type: urgent_message
    item_name: Cilantro
```
