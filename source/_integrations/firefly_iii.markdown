---
title: Firefly III
description: Instructions on how to integrate Firefly III with Home Assistant.
ha_category:
  - Finance
  - Sensor
ha_release: '2025.11'
ha_iot_class: Local Polling
ha_codeowners:
  - '@erwindouna'
ha_domain: firefly_iii
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

The **Firefly III** {% term integration %} is used as an interface to the [Firefly III API](https://api-docs.firefly-iii.org/).
Firefly III is a free open-source personal finance manager. It contains a full transaction management system, budgets, categories and reports. You can easily import transactions via the diverse options Firefly III offers. It even contains a rule engine to automate and help organize your bookkeeping.

## Prerequisites

Before you can configure Firefly III within Home Assistant, you need a few things:

- Have Firefly III installed and a user with administrator rights
- An access token. 

Create a Firefly III Personal Access Token by following these steps:

1. Log in to your Firefly III instance.
2. To create an access token, follow the steps in the [Firefly III documentation](https://docs.firefly-iii.org/how-to/firefly-iii/features/api/#personal-access-tokens).
3. Copy the generated Access Token and store it somewhere safe, you will need it in the next steps.

{% include integrations/config_flow.md %}

## Supported functionality

There is currently support for the following device types within Home Assistant:

- Sensors - for monitoring the accounts, categories and their balances.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, consider deleting the Firefly III access token.
