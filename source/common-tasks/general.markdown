---
title: "Common tasks - installation independent"
description: "Common tasks"
installation_name: "Installation independent"
---
This section provides tasks that do not depend on a specific Home Assistant installation type or a specific integration. They may be referenced in other procedures.

{% include common-tasks/enable_entities.md %}

## Defining a custom polling interval

If you want to define a specific interval at which your device is being polled for data, you can disable the default polling interval and create your own polling automation.

## What is data polling?

Data polling is the process of querying a device or service at regular intervals to check for updates or retrieve data. By defining a custom polling interval, you can control how frequently your system checks for new data, which can help optimize performance and reduce unnecessary network traffic.

## Why use an automation instead of changing the integration's polling configuration?

Creating an automation for polling gives you more flexibility on when to poll:

1. Not all integrations have a configurable polling interval. The homeassistant.update_entity service, on the other hand, works with most of the integrations; no code changes are required.
2. An automation allows you to poll whenever you want. For example, if you have a rate-limited solar panel provider with a maximum number of requests per day, you may want to lower/stop the polling at night but poll more frequently during the day.

{% include common-tasks/define_custom_polling.md %}

{% include common-tasks/remove_device_service.md %}