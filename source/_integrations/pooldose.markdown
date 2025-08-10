---
title: SEKO PoolDose
description: Connect your SEKO PoolDose water treatment system to Home Assistant.
ha_category:
  - Water Management
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: "2025.9"
ha_codeowners:
  - '@lmaertin'
ha_domain: pooldose
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `PoolDose` integration connects a [SEKO](https://www.seko.com/) pool dosing system with Home Assistant. SEKO is a manufacturer of various monitoring and control devices for pools and spas.

This integration uses an undocumented local HTTP API, implemented in the PyPi project `python-pooldose`. It provides live readings for pool sensors such as temperature, pH, ORP/Redox, as well as status information.

## Prerequisites

1. Install and set-up the PoolDose devices according to the user manual.
   1. In particular, connect the device to your WiFi network.
   2. Identify the IP address or hostname of the device.
2. Browse to the IP address or hostname (default port: 80).
   1. Try to log in to the web interface with the default password (0000).
   2. Check availability of data in the web interface.
3. Optional: Block the device’s internet access to guarantee fully local operation and prevent potentially breaking firmware updates.

{% include integrations/config_flow.md %}

## Configuration options

{% include integrations/option_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address resp. hostname of your PoolDose device. Identify the IP address resp. hostname in the web interface of the device or of your router.
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Notes

- This integration is fully local and requires no cloud account.
- The device lacks stability in its network connection. Cached values are used when the API is temporarily unavailable.
- The API does not support the non-standard login procedure of the device. Hence, the password for the web interface must be deactivated, i.e., set to its default (0000).

## Sensor entities

| Entity | Unit | Description | States |
|--------|------|-------------|--------|
| **orp** | mV | Current ORP (Redox) value | — |
| **ph_type_dosing** | — | Type of pH dosing being used | pH+, pH- |
| **peristaltic_ph_dosing** | — | pH peristaltic dosing mode | Off, Proportional, On/Off, Timed |
| **ofa_ph_value** | — | Time threshold for pH overfeed alerts | — |
| **orp_type_dosing** | — | Type of ORP dosing being used | Low, High |
| **peristaltic_orp_dosing** | — | ORP peristaltic dosing mode | Off, Proportional, On/Off, Timed |
| **ofa_orp_value** | — | Time threshold for ORP overfeed alerts | — |
| **ph_calibration_type** | — | Type of pH calibration being used | Off, Reference, 1 point, 2 points |
| **ph_calibration_offset** | — | pH calibration offset value | — |
| **ph_calibration_slope** | — | pH calibration slope value | — |
| **orp_calibration_type** | — | Type of ORP calibration being used | Off, Reference, 1 point |
| **orp_calibration_offset** | — | ORP calibration offset value | — |
| **orp_calibration_slope** | — | ORP calibration slope value | — |
