---
title: Zeversolar
description: Instructions on how to configure the Zeversolar integration within Home Assistant
ha_category:
  - Environment
ha_release: 2023.2
ha_iot_class: Local Polling
ha_domain: zeversolar
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: device
ha_codeowners:
  - '@kvanzuijlen'
---

The Zeversolar integration uses the local device IP to get information like the current power and
today's total energy production.
This integration allows you to collect and save data providig a historical overview of your Zeversolar
production.

## Prerequisites

You need a Zeversolar inverter connected to your solar panels and Wi-Fi. Furthermore, you need to
get the Zeversolar IP address.

{% include integrations/config_flow.md %}

## Sensor Types

When configured, the integration will create two sensors for each configured inverter:

- Energy today, in `kWh` (Kilowatt-hour)
- Current power, in `W` (Watts)
