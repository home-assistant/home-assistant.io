---
title: IoTaWatt
description: Instructions on how to integrate IoTaWatt into Home Assistant.
ha_release: 2021.9
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: iotawatt
ha_codeowners:
  - '@gtdiehl'
ha_platforms:
  - sensor
---
A sensor platform for the [IoTaWatt](https://www.iotawatt.com/) Open WiFi Electricity Monitor. It 
will collect data from the Current Transformer Clamps (Input CTs) and any Outputs that are defined on the IoTaWatt
and create them as sensors in Home Assistant.

{% include integrations/config_flow.md %}
