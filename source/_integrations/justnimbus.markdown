---
title: JustNimbus
description: Instructions on how to configure the JustNimbus integration within Home Assistant
ha_category:
  - Environment
ha_release: 2022.9
ha_iot_class: Cloud Polling
ha_domain: justnimbus
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
ha_codeowners:
  - '@kvanzuijlen'
---

The JustNimbus integration queries the JustNimbus API used by the JustNimbus web dashboard.
This integration allows you to collect and save data to get an historic overview of your water bag
usage.

## Prerequisites

To configure and use this integration, you need to have a
[JustNimbus water bag](https://justnimbus.com/regenwatersysteem/) (Dutch), and
you need to be subscribed for the web dashboard functionality. For this configuration, you need the
client ID from the URL. For example: `https://dashboard.justnimbus.com/api/installation/<client_id>/data`.

{% include integrations/config_flow.md %}

## Sensor Types

When configured, the integration will create twelve sensors for each configured client ID:

- Pump flow, in `L/min` (Liters/minute)
- Drink flow, in `L/min` (Liters/minute)
- Pump pressure, in `bar`
- Pump starts, a number counting the number of times the pump has started
- Pump hours, a number counting the number of hours the pump has been used
- Reservoir temperature, in `°C`
- Reservoir content, in `L` (Liters)
- Total saved, in `L` (Liters)
- Total replenished, in `L` (Liters)
- Error code
- Total use, in `L` (Liters)
- Max reservoir content, in `L` (Liters)
