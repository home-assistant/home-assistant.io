---
title: OurGroceries
description: Instructions on how to integrate OurGroceries shopping lists into Home Assistant.
ha_category:
  - To-do List
ha_release: '2023.12'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@OnFreund'
ha_domain: ourgroceries
ha_platforms:
  - todo
ha_integration_type: integration
related:
  - docs: /integrations/todo
    title: To-do list integration documentation
  - docs: /integrations/#to-do-list
    title: List of to-do list integrations
  - docs: /dashboards/todo-list/
    title: To-do list card
  - url: https://www.ourgroceries.com/
    title: OurGroceries
---

This integration connects with an [OurGroceries](https://www.ourgroceries.com/) account and integrates your shopping lists into Home Assistant.
It adds a [to-do list entity](/integrations/todo) for each shopping list, allowing you to create, update, or delete items on the list from the **To-do list** dashboard.

{% include integrations/config_flow.md %}
