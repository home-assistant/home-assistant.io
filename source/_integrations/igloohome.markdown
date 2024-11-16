---
title: igloohome
description: Integrates igloohome devices via the igloodeveloper API.
ha_category:
  - Lock
  - Sensor
ha_release: 0.0.1
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@keithle888'
ha_domain: igloohome
ha_platforms:
  - sensor
ha_integration_type: device
---

The **igloohome** {% term integration %} regularly updates the status of your devices by leveraging the [igloodeveloper API](https://igloocompany.stoplight.io/docs/igloohome-api/1w1cuv56ge5xq-overview).

## Pre-requisites

An account with [iglooaccess](https://access.igloocompany.co/register) is required.

## Setup

Once the account has been created:
- [Sign in](https://access.igloocompany.co/login).
- Jump to [API access](https://access.igloocompany.co/api-access).
- Copy out the `Client ID` & `Client Secret`
- Add this integration to your Home Assistance instance.
- Copy the `Client ID` & `Client Secret` to the respective text fields when prompted by the integration.
- The integration will retrieve the devices you own and provide you the last know statuses of the devices.
