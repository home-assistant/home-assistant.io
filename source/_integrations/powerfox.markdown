---
title: Powerfox
description: Instructions on how to integrate Powerfox within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2025.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@klaasnicolaas'
ha_domain: powerfox
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
ha_quality_scale: silver
ha_zeroconf: true
---

The **Powerfox** {% term integration %} allows you to gather data from your [Poweropti](https://shop.powerfox.energy/collections/frontpage) devices, by using their cloud API and fetch the data in Home Assistant.

[Powerfox](https://www.powerfox.energy/) is a German company that provides smart meters (Poweropti) for reading electricity, water, gas, and heat. They have their own cloud platform where you can monitor the usage of your devices and get insights into your energy consumption.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Email:
  description: The email address of your Powerfox account.
Password:
  description: The password of your Powerfox account.
{% endconfiguration_basic %}

## Poweropti devices

Not all Poweropti devices are supported currently. Check the list below to see if your device is working with this integration. Create a [feature request](/help/) if your device is not supported yet.

| Device                | Type        | Supported  |
| --------------------- | ----------- | ---------- |
| PA 201901 / PA 201902 | Power meter | Yes        |
| PB 202001             | Power meter | Yes        |
| WA 201902             | Water meter | Yes        |
| Powerfox FLOW         | Gas meter   | No         |
| HA 201902             | Heat meter  | Yes        |

## Data updates

The integration will update its information by polling Powerfox every
minute. This ensures the data in Home Assistant is up to date.

## Actions

This integration does not provide additional actions.

## Supported functionality

The Powerfox platform mainly provides sensors that you can use in your [energy dashboard](/energy).

### Power meter

It will create the following sensors:

- **Power (W)**: Active power that is measured.
- **Energy usage (kWh)**: How much energy is used since the installation.
- **Energy usage - low tariff (kWh)**: Energy usage on the low tariff.
- **Energy usage - high tariff (kWh)**: Energy usage on the high tariff.
- **Energy returned (kWh)**: Energy returned to the grid.

{% note %}
The energy tariff sensors are only available if your Poweropti device supports it.
{% endnote %}

### Water meter

It will create the following sensors:

- **Cold water (m³)**: How much cold water is used.
- **Warm water (m³)**: How much warm water is used.

### Heat meter

It will create the following sensors:

- **Total eneregy (kWh)**: How much energy is used.
- **Delta energy (kWh)**: How much energy is used since the last update.
- **Total volume (m³)**: How much water is used.
- **Delta volume (m³)**: How much water is used since the last update.

## Troubleshooting

There are no commonly known issues with this integration.

## Remove integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
