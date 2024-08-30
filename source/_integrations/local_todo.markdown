---
title: Local to-do
description: Instructions on how to use local to-do lists in Home Assistant.
ha_category:
  - To-do list
ha_iot_class: Local Polling
ha_release: 2023.11
ha_config_flow: true
ha_domain: local_todo
ha_codeowners:
  - '@allenporter'
ha_integration_type: integration
ha_platforms:
  - todo
related:
  - docs: /integrations/todo/
    title: To-do list integration documentation
  - docs: /dashboards/todo-list/
    title: To-do list card
---

The **Local to-do list** {% term integration %} allows you to create to-do lists in Home Assistant.
To-do lists are shown on the **To-do list** dashboard for tracking items and whether
or not they have been completed.

See the [**To-do list** integration](/integrations/todo) for additional details
about to-do list entities.

{% include integrations/config_flow.md %}
