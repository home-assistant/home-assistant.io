---
title: Redgtech
description: Integrate your Redgtech smart switches with Home Assistant.
ha_category:
  - Switch
ha_release: 2026.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jonhsady'
  - '@luan-nvg'
ha_domain: redgtech
ha_platforms:
  - switch
ha_integration_type: service
ha_quality_scale: bronze
---

The **Redgtech** {% term integration %} connects your [Redgtech](https://redgtech.com.br/) smart switches to Home Assistant. Redgtech is a Brazilian smart home brand that makes cloud-connected switches and relays. With this integration, you can control and monitor your Redgtech switches directly from Home Assistant.

## Prerequisites

1. Create a **Redgtech** account if you do not already have one.
2. Add your devices to the account using the Redgtech app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: The email address associated with your Redgtech account.
Password:
  description: The password for your Redgtech account.
{% endconfiguration_basic %}

## Supported functionality

### Switches

The **Redgtech** integration provides a switch entity for each smart switch in your Redgtech account. Each switch entity supports turning on and off.

## Data updates

The **Redgtech** integration {% term polling polls %} the Redgtech cloud API for device states every 15 seconds. The integration automatically handles token renewal when needed, so you will not need to re-authenticate manually.

## Troubleshooting

### The integration can't connect

Make sure your internet connection is working and that your Redgtech devices are visible and controllable in the Redgtech app. If they are not, check the device's power and network connection.

### Devices don't appear after setup

Make sure your devices are properly configured in the Redgtech app and that your Redgtech account has access to them. If devices are still missing, try removing and re-adding the integration.

### Authentication errors

Verify that your email address and password are correct and that your Redgtech account is active. You can confirm your credentials by logging in to the Redgtech app.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
