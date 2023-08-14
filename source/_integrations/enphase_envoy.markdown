---
title: Enphase Envoy
description: Instructions on how to setup Enphase Envoy with Home Assistant.
ha_category:
  - Energy
ha_release: 0.76
ha_iot_class: Local Polling
ha_domain: enphase_envoy
ha_zeroconf: true
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@cgarwood'
  - '@dgomes'
  - '@joostlek'
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
  - switch
ha_integration_type: integration
---

An integration for the [Enphase Envoy](https://enphase.com/en-us/products-and-services/envoy-and-combiner) solar energy gateway. This integration works with older models that only have production metrics (ie. Envoy-C) and newer models that offer both production and consumption metrics (ie. Envoy-S). Firmware version 3.9 or newer is required.

{% include integrations/config_flow.md %}

## Capabilities

This integration will offer various sensors depending on the configuration of your Enphase system. Sensors are available for the following:

- Current energy production & consumption
- Historical energy production & consumption
- Power production per-inverter

_Consumption sensors require your Envoy to be properly configured with consumption CT sensors installed._

For Enphase Ensemble systems with the Enpower/IQ System Controller and Encharge/IQ Batteries installed, additional features are available:

- Sensors for battery status and usage
- Sensors for grid status
- Sensors for the state of the Enpower's 4 load-shedding relays
- A switch allowing you to take your system on-grid and off-grid. Note that the Enpower has a slight delay built-in between receiving these commands and actually switching the system on or off grid.

## Envoy authentication requirements

For newer models running firmware 7 and greater, you will need your Enlighten cloud username and password. The integration will use these credentials to obtain an Envoy access token from the Enlighten cloud.

For models running firmware 5 and older, use `installer` for the username. No password is required. The integration will automatically detect the `installer` password.
