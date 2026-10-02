---
title: Daikin Onecta
description: Instructions for integrating Daikin Onecta devices into Home Assistant.
ha_category:
  - Climate
  - Energy
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@jwillemsen'
ha_domain: daikin_onecta
ha_integration_type: integration
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

The **Daikin Onecta** integration lets you monitor and control compatible Daikin devices through the [Daikin Onecta](https://www.daikin.eu/en_us/product-group/control-systems/onecta.html) cloud service.

{% include integrations/config_flow.md %}

## Prerequisites

- A Daikin device connected to the Onecta service.
- A Daikin Onecta account with access to that device.

## Configuration

1. Select **Add integration** from the **Settings** > **Devices & services** page.
2. Search for **Daikin Onecta**.
3. Sign in with your Daikin Onecta account and authorize Home Assistant.

Home Assistant discovers the devices available to your account and creates the entities supported by each device.

## Supported functionality

Depending on the device and its available management points, the integration provides controls and information for:

- Climate control, including operating mode, target temperature, fan speed, swing direction, and presets.
- Domestic hot water tanks.
- Energy consumption and thermal-output sensors.
- Device state, diagnostics, schedules, and supported switches.
- Firmware-update availability and installation.

## Options

The integration offers options to control the normal and high-frequency cloud polling intervals, their schedule, and the delay after a setting change before polling resumes. You can also enable aliases for fixed fan speeds used by HomeKit.

## Troubleshooting

If authentication expires or is revoked, Home Assistant starts a reauthentication flow. Complete it from **Settings** > **Devices & services** to restore access.

The integration is cloud based. If Daikin Onecta or your internet connection is unavailable, entities may temporarily become unavailable until the next successful update.
