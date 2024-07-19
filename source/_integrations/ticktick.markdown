---
title: TickTick
description: Instructions on how to integrate the TickTick todo list with Home Assistant.
ha_category:
  - To-do list
ha_iot_class: Cloud Polling
ha_release: 2024.7
ha_config_flow: true
ha_codeowners:
  - '@marne182'
ha_domain: ticktick
ha_integration_type: hub
ha_platforms:
  - todo
related:
  - docs: /integrations/todo
    title: To-do list integration documentation
  - docs: /integrations/#to-do-list
    title: List of to-do list integrations
  - docs: /dashboards/todo-list/
    title: To-do list card
  - url: https://www.ticktick.com/
    title: TickTick
---

The **TickTick** {% term integration %} allows you to interact with your [TickTick](https://www.ticktick.com/) shopping lists within Home Assistant.

## Prerequisites

For authentication, the integration requires the `email` and `password` you used for your TickTick account.

Also, a `developer.ticktick.com` account is needed with a `client_id` and `client_secret`, and currently a pre-authenticated access token in JSON format.

{% include integrations/config_flow.md %}
