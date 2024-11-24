---
title: igloohome
description: Integrates igloohome devices via the igloodeveloper API.
ha_category:
  - Sensor
ha_release: 2024.1.0
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@keithle888'
ha_domain: igloohome
ha_platforms:
  - sensor
ha_integration_type: device
---

The **igloohome** {% term integration %} regularly updates the battery level of your devices by leveraging the [igloodeveloper API](https://igloocompany.stoplight.io/docs/igloohome-api/1w1cuv56ge5xq-overview).

## Prerequisites

- You own battery powered igloohome device(s).
- An [iglooaccess](https://access.igloocompany.co/register) account with an active subscription is required.
- Your igloohome devices are paired to the same account.

## Setup

Once the account has been created:

- [Sign in](https://access.igloocompany.co/login).
- Jump to [API access](https://access.igloocompany.co/api-access).
- Create a set of credentials with the name `Home Assistant`.
- Copy out the `Client ID` & `Client Secret`.
- Add this integration to your Home Assistant instance.
- Copy the `Client ID` & `Client Secret` to the respective text fields when prompted by the integration.
- The integration will retrieve the devices under your account and update their last known battery level regularly.

## Verify successful integration

Once the correct `Client ID` & `Client Secret` has been provided:
- Battery entities:
  - Devices that have a battery level should be automatically recognized, and entities created. If devices are added post-integration, kindly reload the set of `Client Credentials`.