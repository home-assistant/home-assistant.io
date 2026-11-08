---
description: Instructions on how to integrate Powerfox Cloud within Home Assistant.
ha_release: 2025.1
ha_domain: powerfox
---

The **Powerfox Cloud** {% term integration %} allows you to gather data from your [Poweropti](https://shop.powerfox.energy/collections/frontpage) devices, by using their cloud API and fetching the data in Home Assistant.

[Powerfox](https://www.powerfox.energy/) is a German company that provides smart meters (Poweropti) for reading electricity, water, gas, and heat. They have their own cloud platform where you can monitor the usage of your devices and get insights into your energy consumption.

The Powerfox FLOW device delivers its measurements via a daily/hourly report endpoint, while other devices provide real-time data.

{% note %}
If you have a **PA 201901**, **PA 201902**, or **PB 202001** (poweropti+) and prefer to poll your device locally without relying on the cloud, see the [Powerfox Local](/integrations/powerfox_local) integration.
{% endnote %}

## Use cases

- Track electricity, gas, heat, and water consumption and costs in the [energy dashboard](/energy).
- Get notified when power usage stays unusually high, so you can switch off large loads.
- Use the returned energy sensor to run appliances when your solar panels produce more than you use.
- Compare daily gas consumption and cost over time.

## Prerequisites

1. Create a Powerfox account in the Powerfox app.
2. Add your Poweropti or Powerfox FLOW device to your account.
3. Confirm that the app shows measurements from your device.

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

The integration uses {% term polling %} to fetch data from the Powerfox cloud at the following intervals:

- Power, heat, and water meters: every 10 seconds.
- Powerfox FLOW gas meters: every 5 minutes, because Powerfox publishes these values as hourly and daily report blocks.
- The list of devices in your account: every 30 minutes.

Devices you add to your Powerfox account appear in Home Assistant automatically after the next device list update. Devices you remove from your account are also removed from Home Assistant. The integration reloads when the list of devices changes.

## Actions

This integration does not provide additional actions.

## Examples

### Get alerted when power usage spikes

Use this automation to keep an eye on sudden peaks in your electricity usage. When the Powerfox sensor reports more than 4 kW for two minutes, Home Assistant sends a notification so you can react quickly (for example by switching off large loads).

{% details "Example YAML automation" %}
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
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      title: "High consumption detected"
      message: "Powerfox currently reports {{ states('sensor.poweropti_power') }} W."
```
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

The energy-based variants are [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity) in the entity registry. Enable them if you have a gas-to-kWh conversion configured in Powerfox.

## Known limitations

- The integration requires an internet connection and the Powerfox cloud. For supported devices, the [Powerfox Local](/integrations/powerfox_local) integration works without the cloud.
- Powerfox FLOW values are not real-time. They change when Powerfox publishes a new report block.
- If one device in your account has no data yet, or its data is restricted by privacy settings, the integration keeps retrying to start. Sensors for your other devices are unavailable until the start succeeds.
- An account needs at least one device before you can set up the integration.

## Troubleshooting

{% details "No devices were found in this Powerfox account" %}

### Symptom

When you set up the integration, the form shows "No devices were found in this Powerfox account."

#### Description

The email address and password are correct, but no device is linked to this account.

#### Resolution

1. Open the Powerfox app and sign in with the same account.
2. Add your device to the account, then try again.

{% enddetails %}

{% details "Data is restricted due to privacy settings" %}

### Symptom

Sensors of a device are unavailable, and the logs show that its data is restricted due to privacy settings in the Powerfox app.

#### Description

Powerfox refuses to share data for this device because data transmission has been denied for the account.

#### Resolution

Allow data transmission in the Powerfox app, then wait for the next update.

{% enddetails %}

{% details "Cost sensors stay at zero" %}

### Symptom

The gas cost sensors stay at zero.

#### Description

Powerfox only publishes currency fields when a tariff is configured in the app.

#### Resolution

Set the tariff in the Powerfox app, then wait for the next report. The sensors update once the API provides those fields.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
