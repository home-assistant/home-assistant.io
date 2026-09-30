---
title: Bosch Smart Home Camera
description: Instructions on how to integrate Bosch Smart Home cameras into Home Assistant.
ha_category:
  - Camera
ha_release: '2026.10'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: bosch_shc_camera
ha_codeowners:
  - "@mosandlt"
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Bosch Smart Home Camera** {% term integration %} connects your Bosch SingleKey ID account to Home Assistant. Camera entities for your Bosch Smart Home cameras will be added in a later release.

## Supported devices

The following cameras are supported with this account:

- Eyes Outdoor camera
- 360° Indoor camera
- Eyes Outdoor camera II
- Eyes Indoor camera II

## Prerequisites

You need a Bosch SingleKey ID account that has at least one Bosch Smart Home camera registered in the Bosch Smart Camera app.

{% include integrations/config_flow.md %}

You are redirected to the Bosch login page to sign in with your SingleKey ID. Only one account can be set up.

## Supported functionality

This release only sets up the account connection. No entities are created yet.

## Data updates

The integration does not retrieve data from your cameras yet.

## Known limitations

- Camera entities, streaming and other features are not available yet.
- A cloud connection is required.

## Troubleshooting

### The login page does not return to Home Assistant

#### Symptom

After signing in, you are not sent back to Home Assistant.

#### Resolution

1. Make sure your Home Assistant instance is reachable through [My Home Assistant](https://my.home-assistant.io/).
2. Start the setup again from **Settings** > **Devices & services**.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
