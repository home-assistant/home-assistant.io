---
title: Daikin Onecta
description: Instructions for integrating Daikin Onecta devices into Home Assistant.
ha_release: 2026.11
ha_category:
  - Climate
  - Energy
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jwillemsen'
ha_domain: daikin_onecta
ha_integration_type: device
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - select
  - sensor
  - switch
  - system_health
  - update
  - water_heater
---

The **Daikin Onecta** {% term integration %} lets you monitor and control compatible Daikin heating, cooling, and hot-water devices through the [Daikin Onecta](https://www.daikin.eu/en_us/product-group/control-systems/onecta.html) cloud service.

Devices and entities are discovered from the Onecta account. The entities available for a device depend on the management points and capabilities that Daikin reports for it.

## Prerequisites

- A Daikin device connected to the Onecta service.
- A Daikin Onecta account with access to that device.
- An OAuth client created in the [Daikin Developer Portal](https://developer.cloud.daikineurope.com/docs/b0dffcaa-7b51-428a-bdff-a7c8a64195c0/getting_started).

When creating the OAuth client, add this redirect URI:

```text
https://my.home-assistant.io/redirect/oauth
```

If you have disabled [My Home Assistant](/integrations/my/), use `<HOME_ASSISTANT_URL>/auth/external/callback` instead. Replace `<HOME_ASSISTANT_URL>` with the external URL of your Home Assistant instance.

Record the client ID and client secret, then add them as [application credentials](/integrations/application_credentials/#manual-setup) for **Daikin Onecta** in Home Assistant.

{% include integrations/config_flow.md %}

## Supported functionality

Depending on the capabilities reported by the device, the integration can provide:

- Climate control: HVAC mode, target temperature, fan speed, swing direction, and available presets.
- Domestic hot water control for compatible tanks.
- Energy consumption and thermal-output sensors when the device reports that data.
- Schedule selection, diagnostic sensors, and switches for supported device features.
- Firmware update availability and installation only when the device reports that updates are supported.

## Data updates

The integration {% term polling polls %} the Daikin Onecta cloud service. After a setting change, Home Assistant temporarily defers background polling to avoid immediately overwriting the confirmed local state and to reduce cloud API requests. Use the refresh button to request an update immediately.

## Options

To change these options, go to **Settings** > **Devices & services**, select **Daikin Onecta**, then select **Configure**.

- **High frequency period update interval**: The polling interval, in minutes, from the high-frequency start time until the low-frequency start time. The default is 10 minutes; valid values are 5 to 240 minutes.
- **Low frequency period update interval**: The polling interval, in minutes, outside the high-frequency period. The default is 30 minutes; valid values are 10 to 240 minutes.
- **High frequency period start time**: The time at which high-frequency polling begins. The default is 07:00.
- **Low frequency period start time**: The time at which low-frequency polling begins. The default is 22:00. With the default times, Home Assistant polls every 10 minutes from 07:00 to 22:00 and every 30 minutes from 22:00 to 07:00.
- **Number of seconds that a data refresh is ignored after a command**: The time Home Assistant waits after a successful setting change before resuming background polling. The default is 30 seconds; valid values are 20 to 300 seconds. Use the refresh button to request an update immediately.
- **Expose HomeKit compatible fan speed aliases**: Enables HomeKit-compatible names for fixed fan speeds when your device supports them. Disabled by default.

## Troubleshooting

### Authentication or setup fails

Verify that the client ID and client secret in Home Assistant match the OAuth client in the Daikin Developer Portal. Confirm that the redirect URI is `https://my.home-assistant.io/redirect/oauth`, or `<HOME_ASSISTANT_URL>/auth/external/callback` when My Home Assistant is disabled.

If authentication expires or is revoked, Home Assistant starts a reauthentication flow. Complete it from **Settings** > **Devices & services** to restore access.

### Expected entities are missing

Home Assistant only creates entities for functions that Daikin reports for the device. Confirm that the device is online and visible in the Onecta app, then use the refresh button to request an update. If a supported feature is still missing, download diagnostics and include them when reporting the issue.

### Devices are unavailable

The integration is cloud based. If Daikin Onecta, the device connection, or your internet connection is unavailable, entities become unavailable until a successful cloud update is received.

## Removing the integration

{% include integrations/remove_device_service.md %}
