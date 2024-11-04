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

{% details "Security recommendation" %}
As Cookidoo cannot share shopping lists between accounts and everybody interacting with it uses the same credentials, make sure you protect your credentials accordingly. All users of your Home Assistant instance will have access to the same Cookidoo account.
{% enddetails %}

{% include integrations/config_flow.md %}

## To-do lists

This integration provides two non-sortable to-do lists:

1. **Shopping list**
   - Contains ingredients from recipes
   - Items can only be `checked`
   - Items cannot be `created`, `deleted`, or `renamed`

2. **Additional purchases**
   - Contains user-added items to purchase
   - Items can be `created`, `deleted`, and `updated`
   - Items do not have a `description` field
