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
  - url: https://cookidoo.ch/
    title: Cookidoo
  - url: https://www.vorwerk.com/
    title: Vorwerk GmbH
---

The **Cookidoo** integration allows you to interact with your [Cookidoo](https://www.getbring.com/) shopping lists within Home Assistant.

For authentication, the integration requires the `email` and `password` you used for your Cookidoo account.

{% include integrations/config_flow.md %}

## To-do lists

There are two non-sortable to-do lists added in this integration. One containing all ingredients which are part of a recipe and can therefore only be `checked` and **not** `created`, `delete` or `renamed`. The second to-do list contains additional items, which can be `created`, `delete`, and `updated` but do not have a `description`.

## Actions

You can use the actions from the [to-do list](/integrations/todo/) to `create`, `update`, or `delete` items on your Cookidoo shopping lists.
