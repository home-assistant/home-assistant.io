---
title: Xthings Cloud
description: Connect and control Xthings Cloud smart home devices with Home Assistant.
ha_release: 2026.6
ha_category:
  - Light
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@XthingsJacobs'
ha_domain: xthings_cloud
ha_integration_type: hub
ha_platforms:
  - light
ha_quality_scale: bronze
---

The **Xthings Cloud** {% term integration %} allows you to control and monitor your [Xthings](https://xthings.com) smart home devices through the Xthings Cloud service. Xthings provides a range of smart home products including smart lights under the **U-tec** brand.

Use case: Control your Xthings smart lights from a single Home Assistant dashboard with real-time status updates via WebSocket push.

## Supported devices

The following device types are supported:

- **Smart lights**: on/off, brightness, HS color, color temperature

## Prerequisites

Before setting up the integration, make sure you have:

1. A **Xthings Cloud** account. You can create one in the **Xthings** mobile app.
2. At least one light device added and online in the **Xthings** app.
3. If your account has two-factor authentication (2FA) enabled, have access to your registered email or phone to receive verification codes.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
    description: "The email address used to register your Xthings Cloud account."
Password:
    description: "Your Xthings Cloud account password. The password is only used during login and is not stored."
Verification code:
    description: "The 6-digit verification code sent to your email or phone. Only required if your account has 2FA enabled."
{% endconfiguration_basic %}

## Supported functionality

The **Xthings Cloud** integration provides the following entities.

### Lights

- **Smart light**
  - **Description**: On/off, brightness (0–100%), HS color, and color temperature (2000–6500K) control.
  - **Remarks**: Devices with brightness in their status are automatically registered as light entities.

## Data updates

The **Xthings Cloud** integration uses a combination of push and {% term polling %} for data updates:

- **WebSocket push** (primary): The integration maintains a persistent WebSocket connection to the Xthings Cloud. Device status changes and online/offline events are pushed in real-time, typically within 1–2 seconds.
- **Polling** (fallback): As a safety net, the integration polls the cloud API every 30 minutes to ensure data consistency in case of missed WebSocket messages.

## Known limitations

- The integration communicates with devices through the Xthings Cloud service. If the cloud service is unavailable, devices cannot be controlled.

## Troubleshooting

### Unable to connect during setup

#### Symptom: "Unable to connect to Xthings Cloud"

The setup form shows the error "Unable to connect to Xthings Cloud".

#### Resolution

1. Check your internet connection.
2. Verify that `api.cloud.xthings.com` is reachable from your network.
3. If you are behind a corporate firewall or proxy, ensure HTTPS traffic to `api.cloud.xthings.com` is allowed.

### Incorrect password

#### Symptom: "Incorrect password"

The setup form shows the error "Incorrect password".

#### Resolution

1. Double-check your password in the Xthings mobile app.
2. If you have forgotten your password, use the "Forgot Password" feature in the app to reset it.

### Devices not showing up

After successful setup, some or all devices are missing.

#### Resolution

1. Make sure the devices are added and online in the Xthings mobile app.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %} > **Xthings Cloud** > **⋮** > **Reload** to refresh.
3. Check the Home Assistant logs for any error messages from `xthings_cloud`.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
