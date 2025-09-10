---
title: igloohome
description: Integrates igloohome smart access devices.
ha_category:
  - Sensor
ha_release: 2025.2
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@keithle888'
ha_domain: igloohome
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: bronze
---

The **igloohome** {% term integration %} grants Home Assistant access to paired [smart access device\(s\)](https://www.igloohome.co/#products). The features of this integration includes:

- For [Bridge](https://www.igloohome.co/products/bridge) owners:
  - Regular updates of all linked devices' battery level.

- For non-bridge owners:
  - Regular updates of devices' last-known battery level.
    - Battery levels are updated by using the sync function on igloohome mobile app with the device.

## Prerequisites

- You own an igloohome device(s) and have paired them to an account.
- Have an active subscription on [iglooaccess](https://access.igloocompany.co/register) with the same account.

## Setup

Once you have registered and activated your [iglooaccess](https://access.igloocompany.co/register) account:

- [Sign in](https://access.igloocompany.co/login).
- Jump to [API access](https://access.igloocompany.co/api-access).
- Create a set of credentials with the name `Home Assistant`.
- Copy out the `Client ID` & `Client Secret`.
- Keep these credentials secure and never share them with others.
- Add this integration to your Home Assistant instance.
- Copy the `Client ID` & `Client Secret` to the respective text fields when prompted by the integration.
- The integration will retrieve the devices under your account and create entries for them in Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Client ID:
  description: "Client ID provided by your iglooaccess account."
  required: true
  type: string
Client secret:
  description: "Client Secret provided by your iglooaccess account."
  required: true
  type: string
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

Some generic troubleshooting steps:

- Ensure that your subscription is still active.

### Battery levels not updating

- If you are using a bridge, ensure that it is linked to the correct devices.
- If you do not have a bridge. Sync the device with the igloohome mobile app, then reload the config entry associated to the device.

### Authentication problems

- Verify that your [API credentials](https://access.igloocompany.co/api-access) are correctly filled in.
- Ensure your API credentials have not expired or been revoked.
