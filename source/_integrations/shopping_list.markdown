---
title: Shopping List
description: Instructions on how to integrate a Shopping list into Home Assistant using Intent.
ha_category:
  - Intent
ha_release: '0.50'
ha_config_flow: true
ha_quality_scale: internal
ha_iot_class: Local Push
ha_domain: shopping_list
---

The `shopping_list` integration allows you to keep track of shopping list items. 

Your shopping list will be accessible from the sidebar, and you can optionally add the [Shopping List card](/lovelace/shopping-list/) to your Lovelace dashboard. With the [Conversation integration](/integrations/conversation/) you can add items to your shopping list using voice commands like "Add eggs to my shopping list." 

{% include integrations/config_flow.md %}

## Services

You can add or remove items from your shopping list by using the following services.

### Service `shopping_list.add_item`

| Service data attribute | Optional | Description                                            |
|------------------------|----------|--------------------------------------------------------|
| `name`                 |       no | Name of the item to add. Example: "Milk"               |

### Service `shopping_list.complete_item`

| Service data attribute | Optional | Description                                            |
|------------------------|----------|--------------------------------------------------------|
| `name`                 |       no | Name of the item to mark as completed. Example: "Milk" |

## Using in Automations

The simplest way use shopping list with automations (e.g., when entering a zone with shops) is to create a notification that can be clicked to open the shopping list.
This is tested to work with the Android companion app.

{% raw %}

```yaml
service: notify.notify
title: "Time to shop?"
message: 'Click to open the shopping list'
data:
  clickAction: "/shopping-list"
  url: "/shopping-list"
```

{% endraw %}
