---
title: Powerfox Cloud
description: Instructions on how to integrate Powerfox Cloud within Home Assistant.
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
ha_integration_type: hub
ha_quality_scale: silver
ha_zeroconf: true
---

The **Powerfox Cloud** {% term integration %} allows you to gather data from your [Poweropti](https://shop.powerfox.energy/collections/frontpage) devices, by using their cloud API and fetching the data in Home Assistant.

[Powerfox](https://www.powerfox.energy/) is a German company that provides smart meters (Poweropti) for reading electricity, water, gas, and heat. They have their own cloud platform where you can monitor the usage of your devices and get insights into your energy consumption.

The Powerfox FLOW device delivers its measurements via a daily/hourly report endpoint, while other devices provide real-time data.

{% note %}
If you have a **PA 201901**, **PA 201902**, or **PB 202001** (poweropti+) and prefer to poll your device locally without relying on the cloud, see the [Powerfox Local](/integrations/powerfox_local) integration.
{% endnote %}

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
| Powerfox FLOW         | Gas meter   | Yes (report) |
| HA 201902             | Heat meter  | Yes        |

## Data updates

The integration polls the Powerfox cloud every 10 seconds. Power, heat, and water meters return real-time snapshots. The Powerfox FLOW relies on the hourly/daily report endpoint. The coordinator still polls every 10 seconds, but the values refresh whenever Powerfox publishes a new block in the report.

## Actions

This integration does not provide additional actions.

## Examples

### Get alerted when power usage spikes

Use this automation to keep an eye on sudden peaks in your electricity usage. When the Powerfox sensor reports more than 4 kW for two minutes, Home Assistant sends a notification so you can react quickly (for example by switching off large loads).

{% details "Example YAML automation" %}
{% raw %}

```yaml
alias: "Powerfox high usage alert"
description: "Notify me when the Powerfox meter reports sustained high power draw."
triggers:
  - trigger: numeric_state
    entity_id: sensor.poweropti_power
    above: 4000
    for:
      minutes: 2
actions:
  - action: notify.mobile_app_phone
    data:
      title: "High consumption detected"
      message: "Powerfox currently reports {{ states('sensor.poweropti_power') }} W."
```

{% endraw %}
{% enddetails %}

Replace the threshold value, and the `notify` target with the entities that exist in your installation.

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

- **Total energy (kWh)**: How much energy is used.
- **Delta energy (kWh)**: How much energy is used since the last update.
- **Total volume (m³)**: How much water is used.
- **Delta volume (m³)**: How much water is used since the last update.

### Powerfox FLOW gas meter

FLOW data is exposed via the Powerfox report endpoint and provides daily/hourly aggregates. The integration creates:

- **Gas consumption today (m³)**: How much gas is consumed today.
- **Gas consumption energy today (kWh)**: How much gas energy is consumed today.
- **Current gas consumption (m³)**: Current gas consumption rate.
- **Current gas consumption energy (kWh)**: Current gas consumption energy rate.
- **Gas cost today (€)**: Total gas cost today (requires tariff in the Powerfox app).
- **Minimum consumption today (m³)**: Lowest hourly consumption observed so far today.
- **Maximum consumption today (m³)**: Highest hourly consumption observed so far today.
- **Average consumption today (m³)**: Average hourly consumption observed so far today.
- **Minimum consumption energy today (kWh)**: Lowest hourly energy consumption observed so far today.
- **Maximum consumption energy today (kWh)**: Highest hourly energy consumption observed so far today.
- **Average consumption energy today (kWh)**: Average hourly energy consumption observed so far today.
- **Maximum gas cost today (€)**: Highest hourly gas cost observed so far today.

The energy-based variants are disabled by default in the entity registry. Enable them if you have a gas-to-kWh conversion configured in Powerfox.

## Troubleshooting

{% details "Cost sensors stay at zero" %}

Powerfox only publishes currency fields when a tariffs are configured in their app. Set the tariff inside the Powerfox app, then wait for the next report; the Home Assistant sensors will populate once the API exposes those fields.
{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
