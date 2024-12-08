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
ha_domain: monarch_money
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

[Monarch Money](https://www.monarchmoney.com) is a personal finance aggregation and budgeting service that integrates with Plaid, MX, and FinCity, the three major financial backends.

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
