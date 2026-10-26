---
description: Instructions on how to integrate AnyList shopping lists with Home Assistant.
ha_release: 2026.11
ha_domain: any_list
related:
  - docs: /integrations/todo/
    title: To-do list integration documentation
  - docs: /dashboards/todo-list/
    title: To-do list card
  - url: https://www.anylist.com/
    title: AnyList
---

The **AnyList** {% term integration %} connects your [AnyList](https://www.anylist.com/) shopping lists to Home Assistant. Each AnyList shopping list is represented by a Home Assistant to-do list entity.

You can add, rename, complete, uncomplete, edit the description of, and remove shopping-list items from Home Assistant. Lists created, renamed, or removed in AnyList are reflected in Home Assistant without reconfiguring the integration.

## Prerequisites

You need an AnyList account with an email address and password.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Email:
  description: "The email address associated with your AnyList account."
Password:
  description: "The password used to sign in to your AnyList account."
{% endconfiguration_basic %}

## To-do lists

The integration creates one to-do list entity for each AnyList shopping list. The entity state is the number of incomplete items in that list.

The following item properties are synchronized:

- Item name
- Completed or incomplete status
- Description

Changes made in Home Assistant are sent to AnyList immediately. Changes made in AnyList are delivered to Home Assistant through AnyList's realtime connection.

## Known limitations

### Supported features

The integration exposes AnyList shopping lists only. Recipes and meal planning are not included.

### Unofficial API

AnyList does not provide a public API. Changes to the AnyList service may temporarily affect the integration until it is updated.

### Internet connection

An internet connection is required because all data is synchronized through AnyList's cloud service.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
