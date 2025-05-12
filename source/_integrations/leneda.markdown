---
title: Leneda
description: Instructions on how to integrate Leneda with Home Assistant.
ha_category:
  - Energy
ha_release: "2025.6"
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - "@fedus"
ha_domain: leneda
ha_quality_scale: bronze
ha_platforms:
  - sensor
ha_integration_type: integration
---

## Introduction

The Leneda integration connects Home Assistant to the [Leneda Luxembourg Energy Platform](https://leneda.eu), enabling you to monitor your energy consumption and production data in Luxembourg.

## Prerequisites

Before setting up the integration, you need:
- An Energy ID and API key from your Leneda platform account
  - Learn how to create an Energy ID [here](https://leneda.eu/en/docs/what-is-energyid.html)
  - Generate your API key by following this [guide](https://leneda.eu/en/docs/how-to-generate-and-manage-api-keys.html)
- Your metering point ID(s) - unique identifiers for your energy meters

{% include integrations/config_flow.md %}

{% configuration_basic %}
API Key:
    description: Your API key
Energy ID:
    description: Your Energy ID
Metering Point ID:
    description: The identifier for the electricity or gas meter you want to access
{% endconfiguration_basic %}

### Adding Additional Metering Points

You can add more metering points in two ways:

1. **Using an existing Energy ID**:
   - Go through the configuration steps again
   - Choose "Add using existing Energy ID"
   - Enter the new metering point ID

2. **With a new Energy ID**:
   - Go through the configuration steps again
   - Choose "Add with new Energy ID"
   - Enter the new API token, Energy ID, and metering point ID

{% note -%}Leneda allows users to grant access rights to specific OBIS codes for metering points to other users. However, the integration only allows adding a metering point once (with one Energy ID). Choose the Energy ID that provides all the access rights you need for your desired sensors.{% endnote %}

## Sensors

The integration creates sensors and statistics objects based on the OBIS codes you select for your metering points. You have two options for setting up these sensors.

### Setup Options

You have two ways to set up sensors:

1. **Automatic Probing**:
   - The integration scans all OBIS codes for your metering point
   - Shows which codes return data from Leneda
   - You can modify the pre-selected sensors before completing setup

2. **Manual Setup**:
   - Skip the probing process
   - Manually select the OBIS codes you want to monitor

{% note -%}The integration allows selecting any OBIS code, even if your metering point doesn't provide data for it. Sensors for unavailable data will show as unknown.{% endnote %}

### Available Sensors

For a complete list of OBIS codes and their meanings, visit [Leneda's documentation](https://leneda.eu/en/docs/obis-code-meaning.html). Here is a summary:

#### Electricity Consumption
- Active energy consumption
- Reactive energy consumption
- Covered consumption (Layer 1-4)
- Remaining consumption

#### Electricity Production
- Active energy production
- Reactive energy production
- Shared production (Layer 1-4)
- Remaining production

#### Gas Consumption
- Volume consumption
- Standard volume consumption
- Energy consumption

## Data Updates

### API Delay

The integration updates data every hour. Note that the Leneda API currently has a one-day lag, so the most recent data available will be from the previous day. This lag currently makes real-time monitoring impossible but provides accurate historical data for analysis.

### Accurate long term statistics

Despite the one-day lag, the integration pulls accurate hourly long-term statistics for the last 52 weeks when a sensor is created. The statistics will be continually updated. You can find the statistics in {% my developer_statistics title="**Developer Tools** > **Statistics**"%} and search for "leneda".

**This delay means that there will be no data in the energy dashboard for today and likely yesterday** (depending on time of day you are checking).

## Energy Dashboard

Since the Leneda API has (at least) a one-day lag, historical data is inserted into statistics objects by this integration. You must therefore be careful to select the statistics, and not the sensors for use with the energy dashboard.

To add the statistics to the energy dashboard:
1. Navigate to the configuration of the energy dashboard (**{% my config_energy title="Settings > Dashboards > Energy" %}**):
2. Click on "Add Consumption" or "Add Production".
3. Select the relevant Leneda statistics from the list.

For electricity consumption, the relevant OBIS code is 1-1:1.29.0 (measured active consumption).
For electricity production, the relevant OBIS code is 1-1:2.29.0 (measured active production).

## Troubleshooting

If you experience issues:

1. Verify your API token and Energy ID
2. Confirm your metering point IDs are correct
3. Check if you can access the [Leneda web app](https://app.leneda.eu)
4. Review Home Assistant logs for error messages
5. Ensure your Home Assistant instance has internet access

### Geoblocking

The Leneda API may block API requests outside of Luxembourg. If you have trouble logging in or accessing your data, please make sure that you can access the API from the internet connection used by your Home Assistant instance. The easiest way to test this is by logging into the [Leneda web app](https://app.leneda.eu).

### Gas Consumption Data

If you expect consumption data for gas but don't see it, please first check that you can see your gas consumption in the [Leneda web app](https://app.leneda.eu). If you don't, you may first need to contact your energy provider to enable this feature.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the [Leneda web app](https://app.leneda.eu) and remove the API keys used by Home Assistant (unless you will still be using them otherwise).
