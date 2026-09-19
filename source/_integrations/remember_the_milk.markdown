---
title: Remember The Milk
description: Instructions on how to use Remember The Milk with Home Assistant.
ha_category:
  - Calendar
  - To-do list
ha_iot_class: Cloud Polling
ha_release: 0.57
ha_domain: remember_the_milk
ha_integration_type: service
ha_config_flow: true
ha_platforms:
  - todo
ha_quality_scale: legacy
ha_platforms:
  - todo
related:
  - docs: /integrations/todo
    title: To-do list integration documentation
  - docs: /integrations/#to-do-list
    title: List of to-do list integrations
  - docs: /dashboards/todo-list/
    title: To-do list card
---

The **Remember The Milk** {% term integration %} connects your [Remember The Milk](https://www.rememberthemilk.com) (<abbr title="Remember The Milk">RTM</abbr>) account to Home Assistant. Your RTM lists appear as [to-do lists](/integrations/todo/) in Home Assistant, so you can manage list items from the **To-do list** dashboard or the [**To-do list** card](/dashboards/todo-list/) and add tasks from automations. The integration supports connecting several Remember The Milk accounts.

## Prerequisites

You need a Remember The Milk account, an API key, and a shared secret.

1. Sign in to your [Remember The Milk account](https://www.rememberthemilk.com).
2. Apply for an [API key](https://www.rememberthemilk.com/services/api/keys.rtm). You also receive a shared secret when the key is approved.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: The API key of your Remember The Milk API application.
Shared secret:
  description: The shared secret of your Remember The Milk API application.
{% endconfiguration_basic %}

After you enter your API key and shared secret, Home Assistant shows an **Authorize** link. Select the link to allow Home Assistant to access your Remember The Milk account on the Remember The Milk website. When you have completed the authorization, return to Home Assistant and select **Submit** to finish the setup.

To connect more than one account, add the integration again for each Remember The Milk account.

## To-do lists

Each of your Remember The Milk lists appears in Home Assistant as a [to-do list](/integrations/todo/) entity. You can view and manage your lists from the [**To-do list** dashboard card](/dashboards/todo-list/).

Your lists stay in sync with your Remember The Milk account in both directions. Creating, renaming, or deleting a list in Home Assistant is reflected in your RTM account, and vice versa. Smart, archived, locked, and deleted lists are not synced.

Each to-do list item supports a summary, an optional due date or due date and time, and an optional description.

### Adding a list

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Remember The Milk** integration.
2. Select **Add list**.
3. Enter a name for the list. A new list with that name is also created in your Remember The Milk account.

### Renaming a list

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Remember The Milk** integration.
2. Next to the list you want to rename, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Reconfigure**.
3. Enter a new name. The list is also renamed in your Remember The Milk account.

### Removing a list

Removing a list in Home Assistant also deletes it from your Remember The Milk account.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Remember The Milk** integration.
2. Next to the list you want to remove, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Delete**.

{% include integrations/actions.md %}

## Automation example

Here's an example for an automation that creates a new task whenever `sensor.mysensor` is `on` and completes it when the sensor reports `off`. This way it reminds you to switch it off. By using the `entity_id` as ID for the task, you can use the same rule also for multiple sensors.

{% example %}
automation: |
  alias: "Match fan to ceiling light"
    - triggers:
        - trigger: state
          entity_id: sensor.mysensor
          to: "on"
      actions:
        - action: remember_the_milk.my_rtm_username_create_task
          data:
            name: "Please switch off {{ trigger.entity_id }}"
            id: "{{ trigger.entity_id }}"
    - triggers:
        - trigger: state
          entity_id: sensor.mysensor
          to: "off"
      actions:
        - action: remember_the_milk.my_rtm_username_complete_task
          data:
            id: "{{ trigger.entity_id }}"
{% endexample %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Disclaimer

This integration uses the Remember The Milk API but is not endorsed or certified by Remember The Milk.
