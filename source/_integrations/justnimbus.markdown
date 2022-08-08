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
---

The `JustNimbus` sensor platform queries the JustNumbus API used by the JustNimbus web dashboard.
This integration allows you to collect and save data to get an historic overview of your water bag
usage.

## Prerequisites

To configure and use this integration, you need to have a
[JustNimbus water bag](https://justnimbus.com/regenwatersysteem/) (Dutch) and
you need to be subscribed for the web dashboard functionality. For this configuration you need the
client id from the URL. I.e.: `https://dashboard.justnimbus.com/api/installation/<client_id>/data`.

{% include integrations/config_flow.md %}

## Sensor Types

When configured, the platform will create twelve sensors for each configured client id:

- Pump flow, in `L/min` (Liters/minute)
- Drink flow, in `L/min` (Liters/minute)
- Pump pressure, in `bar`
- Pump starts, a number counting the amount of times the pump has started
- Pump hours, a number counting the amount of hours the pump has been used
- Reservoir temperature, in `°C`
- Reservoir content, in `L` (Liters)
- Total saved, in `L` (Liters)
- Total replenished, in `L` (Liters)
- Error code
- Total use, in `L` (Liters)
- Max reservoir content, in `L` (Liters)
