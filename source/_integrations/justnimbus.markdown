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
This integration allows you to collect and save data to get a historical overview of your water bag
usage.

## Prerequisites

To configure and use this integration, you need to have a
[JustNimbus water bag](https://justnimbus.com/regenwatersysteem/) (Dutch), and
you need to be subscribed for the web dashboard functionality. For this configuration, you need the
client ID and ZIP code from the URL. For example: `https://dashboard.justnimbus.com/user/view.php?system=<client_id>&zip=<zip_code>`. For more help see [JustNimbus' help page](https://dashboard.justnimbus.com/user/view.php).

{% include integrations/config_flow.md %}

## Sensor types

When configured, the integration will create seven sensors for each configured client ID:

- Pump pressure, in `bar`
- Pump type, `text`
- Reservoir temperature, in `°C`
- Reservoir content, in `L` (Liters)
- Reservoir capacity, in `L` (Liters)
- Water saved, in `L` (Liters)
- Water used, in `L` (Liters)
