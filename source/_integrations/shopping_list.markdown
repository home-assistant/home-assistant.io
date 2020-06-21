---
title: Shopping List
description: Instructions on how to integrate a Shopping list into Home Assistant using Intent.
ha_category:
  - Intent
ha_release: '0.50'
ha_config_flow: true
ha_quality_scale: internal
ha_domain: shopping_list
---

The `shopping_list` integration allows you to keep track of shopping list items. Includes the ability to add items via your voice using the sentence "Add eggs to my shopping list".

## Configuration - GUI

From the Home Assistant front page go to **Configuration** and then select **Integrations** from the list.

Use the plus button in the bottom right to add a new integration called **Shopping List**.

In the popup:
- Submit

The success dialog will appear or an error will be displayed in the popup.

## Configuration - Manual

```yaml
# Example configuration.yaml entry
shopping_list:
```

## Services

You can add or remove items on your shopping list by using the following services.

### Service `shopping_list.add_item`

| Service data attribute | Optional | Description                                            |
|------------------------|----------|--------------------------------------------------------|
| `name`                 |       no | Name of the item to add. Example: "Beer"               |

### Service `shopping_list.complete_item`

| Service data attribute | Optional | Description                                            |
|------------------------|----------|--------------------------------------------------------|
| `name`                 |       no | Name of the item to mark as completed. Example: "Beer" |
