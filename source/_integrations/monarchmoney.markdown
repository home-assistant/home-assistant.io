---
title: Monarch Money
description: Instructions on the Monarch Money Integration for personal finance.
ha_category:
  - Sensor
  - Finance
ha_iot_class: Cloud Polling
ha_release: 2024.9
ha_codeowners:
  - '@jeeftor'
ha_domain: monarchmoney
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
---

[Monarch Money](https://www.monarchmoney.com) is a personal finance aggrigation and budgeting service that ties in with all 3 major financial back ends: Plaid, MX and FinCity.

{% include integrations/config_flow.md %}

## Setup Guide

This integration supports both `username` and `password` login, as well as accounts configured with `MFA`.

### Accounts & Devices

Each `account` will be set up as a device in Home Assistant, and it will contain the following sensors:

|Sensor|Description|
|-------|---------------|
|Balance|Account balance|
|Age| This sensor shows when the data was retrieved by Monarch's back end |
