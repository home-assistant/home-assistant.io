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
Integration for the [IoTaWatt](https://www.iotawatt.com/) Open WiFi Electricity Monitor. It
will collect data from the Current Transformer Clamps (Input CTs) and any Outputs that are defined on the IoTaWatt
and create them as sensors in Home Assistant.

{% include integrations/config_flow.md %}

## Energy management

IoTaWatt does not provide the exact data that is needed for energy management. We're working with the IotaWatt team on resolving this.

Until then, you can use these instructions to create the correct entities that work with energy management:

### Configure IoTaWatt

You will need to configure two new IoTaWatt output sensors:

| Name | Unit | Formula
| - | - | -
| MainsConsumption|Watts|`(Main_In_Red + Main_In_White + Main_In_Blue) max 0`
| MainsExport|Watts|`((Main_In_Red + Main_In_White + Main_In_Blue) min 0) abs`

Replace `(Main_In_Red + Main_In_White + Main_In_Blue)` with the correct formula for your main feed.

### Configure Home Assistant

Add the following to your configuration.yaml file to convert the Watt measurements into kWh:

```yaml
sensor iotawatt:
  - platform: integration
    source: sensor.mainsexport
    name: Total Grid Export
    unit_prefix: k
  - platform: integration
    source: sensor.mainsconsumption
    name: Total Grid Consumption
    unit_prefix: k
```
