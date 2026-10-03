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
  - camera
  - light
  - lock
  - switch
ha_quality_scale: bronze
---

The **Xthings Cloud** {% term integration %} allows you to control and monitor your [Xthings](https://xthings.com) smart home devices through the Xthings Cloud service. This integration currently supports the **U-tec Bright A19 Color** smart light bulb.

Control your Xthings smart lights from a single Home Assistant dashboard. For A19-C1 bulbs, you can enable a native cloud connection that requests the bulb's current state and confirms changes after each command.

## Supported devices

The following device types are supported:

- **U-tec Bright A19 Color light bulb (Xthings Cloud)**: on/off, brightness, HS color, color temperature

## Prerequisites

Before setting up the integration, make sure you have:

1. A **Xthings Cloud** account. You can create one in the **Xthings** mobile app.
2. At least one light device added and online in the **Xthings** app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
    description: "The email address used to register your Xthings Cloud account."
Password:
    description: "Your Xthings Cloud account password. The password is only used during login and is not stored."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Enable native bulb connection:
    description: "Use the native cloud connection for U-tec Bright A19-C1 bulbs. Disabled by default. Home Assistant requests the bulb's current state at startup, after reconnecting, and approximately every 30 seconds. Commands are confirmed by reading the state back from the bulb."
{% endconfiguration_basic %}

The native connection uses your existing Xthings account and the connection credentials included with the integration. You do not need to configure a separate MQTT broker, an OpenAPI application, or certificate files. It requires internet access and is not a local Wi-Fi or Bluetooth connection. Other models keep their existing connection.

## Supported functionality

The **Xthings Cloud** integration provides the following entities.

### Lights

- **Smart light**
  - **Description**: On/off, brightness (0–100%), color, and color temperature control. A19-C1 bulbs display an approximate color temperature between 2700 and 6500 K.
  - **Remarks**: Devices with brightness in their status are automatically registered as light entities. With the native connection enabled, A19-C1 bulbs in Xthings groups remain individually controllable.

## Data updates

The **Xthings Cloud** integration uses a combination of push and {% term polling %} for data updates:

- With the native bulb connection enabled, A19-C1 bulbs use a separate cloud connection. Home Assistant requests their state at startup, after reconnecting, and approximately every 30 seconds. Changes made in another app can take until the next successful request to appear. A bulb becomes unavailable when its connection drops or several state requests in a row go unanswered.
- Other devices use WebSocket updates and a cloud API poll every 30 minutes. If the native bulb connection cannot be set up for a reason other than authentication, these devices keep working. While native setup has failed or a native bulb is unavailable, Home Assistant retries every 10 minutes and looks up the bulb's connection again, so a bulb moved into or between Xthings groups reconnects without a reload. If Xthings rejects your account during native setup, Home Assistant asks you to sign in again; see [Account needs authentication](#account-needs-authentication).

## Known limitations

- The integration communicates with devices through the Xthings Cloud service. If the cloud service is unavailable, devices cannot be controlled.
- Only A19-C1 bulbs have been verified with the native connection.
- A19-C1 bulbs report a warm-to-cool setting from 1 to 100, not a Kelvin value. Home Assistant maps that setting linearly to the advertised 2700–6500 K range. The intermediate Kelvin values are estimates; a vendor conversion formula has not been verified.
- The native connection depends on shared application credentials. If Xthings revokes or replaces them, native controls may require an integration dependency update.
- With the native connection enabled, a color or color temperature change from Home Assistant also resends the bulb's other settings as Home Assistant last confirmed them. A change made in the Xthings app shortly before, such as a new brightness, can be undone. Wait until the change appears in Home Assistant before changing color or color temperature there.

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

### Account needs authentication

If Xthings rejects your account credentials, Home Assistant asks you to sign in again. Open {% my integrations title="**Settings** > **Devices & services**" %}, find **Xthings Cloud**, and follow the authentication prompt. Use the same Xthings account as before. Your existing devices and native connection option are preserved.

### Native bulb is unavailable

1. Check that the bulb has power and is online in the Xthings app.
2. Check the internet connection for Home Assistant and the bulb.
3. Wait up to 10 minutes. Home Assistant retries unavailable bulbs, including bulbs you added to, removed from, or moved between Xthings groups. To retry immediately, reload **Xthings Cloud**.
4. Check {% my logs title="**Settings** > **System** > **Logs**" %} for a native bulb setup error. Lost connections to a bulb are not logged, so a bulb that is unavailable without a setup error usually means the bulb or the Xthings Cloud service is not responding.

You can disable **Enable native bulb connection** to return to the original cloud connection. That connection may omit the current color temperature, so disabling the option does not provide equivalent temperature readback.

### Devices not showing up

After successful setup, some or all devices are missing.

#### Resolution

1. Make sure the devices are added and online in the Xthings mobile app.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %} > **Xthings Cloud** > **⋮** > **Reload** to refresh.
3. Check the Home Assistant logs for any error messages from `xthings_cloud`.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
