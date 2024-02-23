---
title: "Common tasks - installation independent"
description: "Common tasks"
installation_name: "Installation independent"
---
This section provides tasks that do not depend on a specific Home Assistant installation type or a specific integration. They may be referenced in other procedures.

{% include common-tasks/enable_entities.md %}

## Defining a custom polling interval

Creating an automation for polling gives you more flexibility on when to poll.

Why use an automation instead of changing the integration's configuration for polling?

1. Not all integrations have a configurable polling interval. The homassistant.update_entity service on the other hand works with most of the integrations, no code changes required.
2. An automation allows you to poll whenever you want. For example, if you have a rate-limited solar panel provider with a maximum number of requests per day, you may want to lower/stop the polling at night but poll more frequently during the day.

{% include common-tasks/define_custom_polling.md %}