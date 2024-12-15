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

- You own an igloohome device(s) and have paired them to an account.
- Have an active subscription on [iglooaccess](https://access.igloocompany.co/register) with the same account.

## Setup

Once the account has been created:

- [Sign in](https://access.igloocompany.co/login).
- Jump to [API access](https://access.igloocompany.co/api-access).
- Create a set of credentials with the name `Home Assistant`.
- Copy out the `Client ID` & `Client Secret`.
- Keep these credentials secure and never share them with others.
- Add this integration to your Home Assistant instance.
- Copy the `Client ID` & `Client Secret` to the respective text fields when prompted by the integration.
- The integration will retrieve the devices under your account and update their last known battery level regularly.

## Verify successful integration

Once the correct `Client ID` & `Client Secret` have been provided:

- Battery entities:
  - Devices that have a battery level should be automatically recognized, and entities created. If devices are added post-integration, kindly reload the set of `Client Credentials`.
  - The integration makes use of battery levels stored in the igloohome server as a last-known state.
  - If you have an igloohome bridge, the bridge will periodically update the server with the latest state.
  - If you do not have an igloohome bridge, using Bluetooth commands (e.g., Unlock, Sync) via the igloohome mobile app will update the server with the latest state.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

### Battery level not updating

- Try reloading the client credentials.
- Check if your subscription is active.
- If you are using an igloohome bridge, ensure that it is linked to the battery-powered devices. 

### Authentication problems

- Verify that your [API credentials](https://access.igloocompany.co/api-access) are correctly filled in.
- Ensure your API credentials have not expired or been revoked.