---
title: Daikin ONECTA
description: Instructions on how to integrate Daikin ONECTA cloud devices with Home Assistant.
ha_category:
  - Sensor
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@jwillemsen'
ha_domain: daikin_onecta
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
ha_zeroconf: true
---

The **Daikin ONECTA** {% term integration %} connects Home Assistant to compatible Daikin devices through the Daikin ONECTA cloud API.

## Prerequisites

You need a Daikin ONECTA account containing at least one supported device and Daikin developer application credentials.

Create an application in the Daikin developer portal and configure its OAuth redirect URI for Home Assistant. Add the application's client ID and client secret to Home Assistant using the {% term "application credentials" %} integration.

{% include integrations/config_flow.md %}

During setup, Home Assistant redirects you to Daikin to authorize access to your ONECTA account.

## Supported functionality

The initial Home Assistant Core integration exposes sensor data reported by the ONECTA API. The exact sensors depend on the capabilities reported by each Daikin device.

Examples include:

- Room, outdoor, leaving-water, and tank temperatures
- Room humidity and particulate-matter concentrations when reported by the device
- Device and operating-state information
- Electrical and gas consumption data
- Thermal output data
- Remaining daily ONECTA API request allowance

## Data updates

The integration uses cloud {% term polling %}. It automatically polls the ONECTA API at intervals chosen to balance timely updates with Daikin's API limits.

Daikin applies API rate limits. The integration tracks the rate-limit information returned by the ONECTA API and delays updates when the API reports that the limit has been reached.

## Known limitations

- An internet connection and the Daikin ONECTA cloud service are required.
- Available sensors vary by Daikin model and by the management points and characteristics returned by the ONECTA API.
- The initial Home Assistant Core integration exposes sensors only.

## Troubleshooting

If setup cannot connect to Daikin, verify that the developer application credentials and OAuth redirect URI are correct.

If updates temporarily stop, the Daikin ONECTA API rate limit may have been reached. The integration resumes polling after the retry period reported by the API.

## Removing the integration

This integration follows standard integration removal; no extra steps are required.

{% include integrations/remove_device_service.md %}
