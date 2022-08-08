---
title: Just Nimbus
description: Instructions on how to configure the Just Nimbus integration within Home Assistant
ha_category:
  - Environment
ha_release: 2022.9
ha_iot_class: Cloud Polling
ha_domain: just_nimbus
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

The `justnimbus` sensor platform queries the JustNumbus API used by the Just Nimbus web dashboard.
This integration allows you to collect and save data to get an historic overview of your water bag
usage.

## Prerequisites

To configure and use this integration, you need to have a
[Just Nimbus water bag](https://justnimbus.com/regenwatersysteem/) (Dutch) and
you need to be subscribed for the web dashboard functionality. For this configuration you need the
client id from the URL. I.e.: `https://dashboard.justnimbus.com/api/installation/<client_id>/data`.

{% include integrations/config_flow.md %}

## Sensor Types

When configured, the platform will create twelve sensors for each configured client id:

- Pump Flow, in `L/min` (Liters/minute)
- Drink Flow, in `L/min` (Liters/minute)
- Pump Pressure, in `bar`
- Pump Starts, a number counting the amount of times the pump has started
- Pump Hours, a number counting the amount of hours the pump has been used
- Reservoir Temperature, in `°C`
- Reservoir Content, in `L` (Liters)
- Total Saved, in `L` (Liters)
- Total Replenished, in `L` (Liters)
- Error Code
- Total Use, in `L` (Liters)
- Max Reservoir Content, in `L` (Liters)
