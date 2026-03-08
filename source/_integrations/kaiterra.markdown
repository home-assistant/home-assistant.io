---
title: Kaiterra
description: Instructions on how to integrate your Kaiterra device into Home Assistant.
ha_iot_class: Cloud Polling
ha_category:
  - Health
ha_release: '0.100'
ha_codeowners:
  - '@Michsior14'
ha_domain: kaiterra
ha_platforms:
  - sensor
ha_integration_type: integration
ha_config_flow: true
ha_quality_scale: bronze
---

The **Kaiterra** {% term integration %} lets you monitor air quality readings from your Kaiterra devices in Home Assistant by using the [Kaiterra REST API](https://dev.kaiterra.com/).

You can use the integration to monitor devices like Laser Egg and Sensedge, and use their readings in dashboards, automations, and alerts.

## Supported devices

The following Kaiterra devices are known to work with this integration:

- Laser Egg
- Sensedge

## Prerequisites

Before you begin, make sure you have:

1. A Kaiterra account.
2. A Kaiterra device that is visible in the Kaiterra dashboard.
3. An API key from the [Kaiterra dashboard](https://dashboard.kaiterra.cn/).
4. The device ID of the device you want to add.

To create an API key in the Kaiterra dashboard, open **Settings** > **Profile** > **Developer**.

If you previously set up Kaiterra in your {% term "configuration.yaml" %} file, remove that YAML configuration before adding the integration from the UI.

{% include integrations/config_flow.md %}

To set up the integration, you need the following information:

{% configuration_basic %}
API key:
  description: Your personal API key from the Kaiterra dashboard.
Device ID:
  description: The ID of the Kaiterra device you want to add.
{% endconfiguration_basic %}

Add one config entry for each Kaiterra device you want to monitor.

## Configuration options

{% include integrations/option_flow.md %}

The integration provides the following configuration options:

{% configuration_basic %}
AQI standard:
  description: The Air Quality Index standard used to calculate the overall air quality reading. Available values are `us`, `cn`, and `in`.
{% endconfiguration_basic %}

## Supported functionality

The integration provides sensor entities for measurements like:

- Temperature
- Humidity
- PM2.5
- PM10
- Carbon dioxide
- Total volatile organic compounds (TVOC)
- AQI

All entities for a configured device are grouped under one Kaiterra device in Home Assistant.

## Data updates

This integration {% term polling polls %} data from the Kaiterra API every 60 seconds.

## Troubleshooting

### I can't add the integration from the UI

If Home Assistant shows a message saying this integration must be added via {% term "configuration.yaml" %}, the old integration metadata is still being used.

Try the following:

1. Remove any old Kaiterra YAML configuration.
2. Restart Home Assistant.
3. Refresh your browser.

### I can't see my device

Make sure the device is visible in the Kaiterra dashboard and that you entered the correct device ID.

### The temperature unit is not what I expect

Home Assistant controls how temperature is displayed based on your unit preferences. The integration provides the device reading, and Home Assistant converts the displayed unit when needed.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
