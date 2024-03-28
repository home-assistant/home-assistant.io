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
---

The **Bring!** integration allows you to interact with your [Bring!](https://www.getbring.com/) shopping lists within Home Assistant.

For authentication, the integration requires the `email` and `password` you used for your Bring! account. If you want to automatically receive notifications via the Bring! app when Home Assistant adds or removes an item from the list, you should use a dedicated account (such as `email: your.name+ha@gmail.com`) to connect Home Assistant with [Bring!](https://www.getbring.com/).

{% include integrations/config_flow.md %}

## Related topics

- [Bring!](https://www.getbring.com/)
- [To-do list integration documentation](/integrations/todo)
- [List of to-do list integrations](/integrations/#to-do-list)
- [To-do list card](/dashboards/todo-list/)