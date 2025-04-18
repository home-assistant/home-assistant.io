---
title: Swing2Sleep Smarla
description: Instructions on how to connect Swing2Sleep Smarla to Home Assistant.
ha_category:
  - Switch
ha_iot_class: Cloud Push
featured: true
ha_release: '2025.5.0'
ha_codeowners:
  - '@explicatis'
  - '@rlint-explicatis'
ha_domain: smarla
ha_integration_type: device
ha_platforms:
  - switch
---

The `smarla` {% term integration %} is the main integration to integrate [Swing2Sleep](https://swing2sleep.de) (Smarla) motorized cradles. This integration will allow you to control your Smarla device.

## Requirements

- Swing2Sleep Smarla device with Version 1.6.X or greater.
- Swing2Sleep App.
- Internet connectivity.

## Registration

1. Follow the instructions in the Swing2Sleep App.
2. Connect the device with your Wi-Fi.
3. Follow the steps for **Configuration** until the access token field appears
4. Generate an access token in the Swing2Sleep App under settings.
5. Copy the access token and continue with the **Configuration**.

{% include integrations/config_flow.md %}

## Entities

This component will set up the following entities:

| Entity         | Platform          | Description                           |
| -------------- | ----------------- | ------------------------------------- |
| `cradle`       | `switch`          | Turn `On` or `Off` the oscillation of the cradle. |
| `smartmode`    | `switch`          | Turn `On` or `Off` automatic control of the intensity. |
