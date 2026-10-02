---
title: Daikin Onecta
description: Instructions for integrating Daikin Onecta devices into Home Assistant.
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

Record the client ID and client secret. You need both when adding the application credentials to Home Assistant.

## Configuration

1. Add the client ID and client secret as [application credentials](/integrations/application_credentials/#manual-setup) for **Daikin Onecta**.
2. Add the **Daikin Onecta** integration.
3. Sign in to Daikin Onecta and authorize Home Assistant.

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

The integration provides the following options:

- **High and low polling intervals** and the start time for each interval.
- **Delay after a setting change** before background polling resumes.
- **HomeKit fan-speed aliases** for devices that expose fixed fan speeds.

## Troubleshooting

### Authentication or setup fails

Verify that the client ID and client secret in Home Assistant match the OAuth client in the Daikin Developer Portal. Confirm that the redirect URI is exactly `https://my.home-assistant.io/redirect/oauth`.

If authentication expires or is revoked, Home Assistant starts a reauthentication flow. Complete it from **Settings** > **Devices & services** to restore access.

### Expected entities are missing

Home Assistant only creates entities for functions that Daikin reports for the device. Confirm that the device is online and visible in the Onecta app, then use the refresh button to request an update. If a supported feature is still missing, download diagnostics and include them when reporting the issue.

### Devices are unavailable

The integration is cloud based. If Daikin Onecta, the device connection, or your internet connection is unavailable, entities become unavailable until a successful cloud update is received.

## Removing the integration

{% include integrations/remove_device_service.md %}
