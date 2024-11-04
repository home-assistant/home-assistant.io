---
title: Cookidoo
description: Instructions on how to integrate the Cookidoo todo list with Home Assistant.
ha_category:
  - To-do list
ha_iot_class: Cloud Polling
ha_release: 2024.12
ha_config_flow: true
ha_codeowners:
  - '@miaucl'
ha_domain: cookidoo
ha_integration_type: service
ha_platforms:
  - todo
related:
  - docs: /integrations/todo
    title: To-do list integration documentation
  - docs: /integrations/#to-do-list
    title: List of to-do list integrations
  - docs: /dashboards/todo-list/
    title: To-do list card
  - url: https://cookidoo.international/
    title: Cookidoo the official Thermomix recipe platform
  - url: https://www.vorwerk.com/
    title: Vorwerk GmbH
---

The **Cookidoo** integration allows you to interact with your shopping lists of [Cookidoo the official Thermomix recipe platform](https://cookidoo.international/) within Home Assistant.

For authentication, the integration requires the `email` and `password` you used for your Cookidoo account.

{% include integrations/config_flow.md %}

## To-do list: Ingredients

The ingredients to-do list contains all ingredients which are part of a recipe being added to the shopping list.

As this to-do list is based on the recipes, the list itself can only be used for checking ingredients off.

## To-do list: Additional items

The additional items to-do list contains items independent of any recipe, and can be `created`, `deleted`, and `updated`, but they do not have a `description`.
