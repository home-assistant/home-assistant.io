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
  - '@jyavenard'
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integration for the [IoTaWatt](https://www.iotawatt.com/) Open WiFi Electricity Monitor. It
will collect data from the Current Transformer Clamps (Input CTs) and any Outputs that are defined on the IoTaWatt
and create them as sensors in Home Assistant.

{% include integrations/config_flow.md %}

## Energy management

You can use the energy sensors directly with the Home Assistant energy dashboard.

If you have an energy production system such as solar panels, follow these instructions:

### Configure IoTaWatt

You will need to configure two new IoTaWatt output sensors:

| Name | Unit | Formula
| - | - | -
| MainsConsumption|Watts|`(Main_In_Red + Main_In_White + Main_In_Blue) max 0`
| MainsExport|Watts|`((Main_In_Red + Main_In_White + Main_In_Blue) min 0) abs`

Replace `(Main_In_Red + Main_In_White + Main_In_Blue)` with the correct formula for your main feed.

#### Using a solar net system

The IoTaWatt team recommends that the inputs for solar reads positive which can be achieved by either changing the orientation of the CT sensor or in the IoTaWatt's input settings, check `Reverse`.

Replace `(Main_In_Red + Main_In_White + Main_In_Blue)` with `(Main_In_Red + Main_In_White + Main_In_Blue - Solar)`

If you have two solar sensors named `Solar1` and `Solar2` you would use:
`(Main_In_Red + Main_In_White + Main_In_Blue - Solar1 - Solar2)`

### Configure Energy Management

In the Grid Consumption settings, select `MainsConsumption.wh`  
In the Return to grid settings, select `MainsExport.wh`  
In the Solar production settings, select `Solar.wh`
