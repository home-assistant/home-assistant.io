---
title: Netio JSON
description: Instructions on how to integrate Netio switches and sensors into Home Assistant.
ha_category:
  - Switch
  - Sensor
  - Power Distribution
ha_iot_class: Local Polling
ha_release: 2022.6.6
ha_domain: netio_json
ha_config_flow: true
ha_codeowners:
  - '@cnf'
ha_platforms:
  - switch
  - sensor
ha_integration_type: integration
---

The `netio_json` platform allows you to control your [Netio](https://www.netio-products.com/en/overview/) PowerBOX, PowerPDU, and PowerDIN devices. These are smart outlets controllable through Ethernet and/or Wi-Fi that reports consumptions. This integration requires [JSON API](https://www.netio-products.com/en/glossary/json-over-https) to be enabled on the Netio device.

{% include integrations/config_flow.md %}


## Sensors

The device will show the following sensors:

- Global
  - Phase
  - Current
  - Frequency
  - Energy
  - Power
  - Power Factor
  - Voltage
- Per Outlet
  - Current
  - Energy
  - Power
  - Power Factor

## Switches

The device will present a switch for each outlet it has.
