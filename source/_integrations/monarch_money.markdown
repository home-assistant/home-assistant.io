---
title: Monarch Money
description: Instructions on the Monarch Money Integration for personal finance.
ha_category:
  - Finance
  - Sensor
ha_iot_class: Cloud Polling
ha_release: '2024.10'
ha_codeowners:
  - '@jeeftor'
  - '@bradleyseanf'
ha_domain: monarch_money
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
---

[Monarch Money](https://monarch.com) is a personal finance aggregation and budgeting service that integrates with Plaid, MX, and FinCity, the three major financial backends.

## Prerequisites

- You need a Monarch Money account to use this integration.
- You need account credentials. This integration supports both `username` and `password` login, as well as accounts configured with `MFA`.

{% include integrations/config_flow.md %}

### Accounts & devices

Each `account` is set up as a device in Home Assistant and contain the following sensors:

|Sensor|Description|
|-------|---------------|
|Balance|Account balance|
|Age| This sensor shows when the data was retrieved by Monarch's back end |
|Owner|Shows the institution owner in Monarch Money|

### Budgets

Each `budget` category is set up as a service device in Home Assistant and contains the following sensors for the current month:

| Sensor | Description |
|--------|-------------|
| Budget actual | The actual amount recorded for the category. |
| Budget planned | The amount budgeted for the category. |
| Budget remaining | The remaining amount reported by Monarch Money, including rollover from previous months. |

Budget data updates every four hours. New categories appear after the next update.

If Monarch Money returns a category without current-month data, its device and sensors still appear, but the sensors are **Unavailable** until data is available. If current-month data is available but an individual amount is missing, that sensor shows as **Unknown**.
