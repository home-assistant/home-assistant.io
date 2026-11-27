---
title: "Common tasks for every Home Assistant"
description: "Tasks that work the same on every Home Assistant installation: managing users, creating backups, configuring access tokens, and similar housekeeping."
installation_name: "Installation independent"
---
This section provides tasks that do not depend on a specific Home Assistant installation type or a specific integration. They may be referenced in other procedures.

## Backups

To create, store, download, or restore a backup, refer to [Backups](/common-tasks/general/backups/).

{% include common-tasks/enable_entities.md %}

## Defining a custom polling interval

### What is data polling?

Data polling is the process of querying a device or service at regular intervals to check for updates or retrieve data. By defining a custom polling interval, you can control how frequently your system checks for new data, which can help optimize performance and reduce unnecessary network traffic.

### Why use an automation instead of changing the integration's polling configuration?

Creating an automation for polling gives you more flexibility on when to poll:

- Not all integrations have a configurable polling interval. The [**Update entity**](/actions/homeassistant.update_entity/) action works with most integrations.
- An automation allows you to poll whenever you want. For example, if you have a rate-limited solar panel provider with a maximum number of requests per day, you may want to poll less often or stop polling at night, and poll more often during the day.

### To define a custom polling interval

{% include common-tasks/define_custom_polling.md %}

## Checking how an entity gets its data

In principle, an entity polls data if the integration that provides it regularly asks a device or service for data.
An entity pushes data when the device or service sends it.
To find out whether an entity polls or pushes data, check the integration that provides it:

1. Find the integration of the entity. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and look at the **Integration** column.
2. Open the integration's page in the [integration documentation](/integrations/).
3. Find its IoT class on the page. A class that ends in Push, such as Local Push, means the integration mainly receives data. A class that ends in Polling, such as Cloud Polling, means it asks for data.
4. If the page has a **Data updates** section, read it. It might list entities that behave differently from the rest of the integration.

## Removing an integration instance

If you no longer want to use a device or service in Home Assistant, you can remove its integration instance, including all its devices and entities.

The following steps work for most integrations. Some integrations need more steps, such as resetting the device or deleting credentials. For these steps, refer to the documentation of the integration.

{% include integrations/remove_device_service.md %}
