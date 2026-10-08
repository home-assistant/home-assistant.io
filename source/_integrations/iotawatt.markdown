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
ha_integration_type: device
---

Integration for the [IoTaWatt](https://www.iotawatt.com/) Open WiFi Electricity Monitor. It
will collect data from the Current Transformer Clamps (Input CTs) and any Outputs that are defined on the IoTaWatt
and create them as sensors in Home Assistant.

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Provide legacy period energy sensors:
  description: Whether the deprecated period energy sensors, which reset at device-local midnight, are provided in addition to the lifetime energy sensors. On by default for devices added before the lifetime sensors were introduced, and off for newly added devices. Disabling this also reduces the number of requests sent to the IoTaWatt device.
{% endconfiguration_basic %}

## Energy management and sensor availability

You can use the energy sensors directly with the Home Assistant energy dashboard.

For every power sensor, the integration provides a lifetime energy sensor (suffixed `.wh_lifetime`). These are meter readings counted by the IoTaWatt itself since the beginning of its datalog; the start of the metering period is available in the `metering_since` attribute. Use these sensors in the energy dashboard. Home Assistant automatically derives hourly, daily, and monthly values from them.

IoTaWatt **Inputs** are available as sensors and are shown on the IoTaWatt device page in Home Assistant.

Any **Outputs** you create within the IoTaWatt unit are also available as sensors for use in the energy dashboard and templates. However, they are not listed on the IoTaWatt device page because of the Home Assistant policy on unique naming. When you configure the energy dashboard or create a template or helper, start typing the name of a defined IoTaWatt output. Home Assistant suggests completing the sensor name.

### Deprecated period energy sensors

Previous versions provided energy sensors (suffixed `.wh`) that reset at device-local midnight. These are deprecated and will be removed in a future release. Existing installations keep them alongside the new lifetime sensors and show a repair issue until the migration is completed:

1. Replace the deprecated `.wh` sensors with the corresponding `.wh_lifetime` sensors in the energy dashboard and in automations, scripts, and templates.
2. Go to {% my repairs title="**Settings** > **System** > **Repairs**" %} and fix the IoTaWatt repair issue. Alternatively, turn off the **Provide legacy period energy sensors** option in the IoTaWatt integration entry.

This removes the deprecated sensors; already recorded long-term statistics remain available. Newly added IoTaWatt devices only provide the lifetime sensors.

## Energy production systems

If you have an energy production system such as solar panels, follow these instructions:

### Configure IoTaWatt

You will need to configure IoTaWatt output sensors for consumption, export, and production.

For example:

| Name | Unit | Formula |
| - | - | - |
| MainsConsumption|Watts|`(Main_In_Red + Main_In_White + Main_In_Blue) max 0` |
| MainsExport|Watts|`((Main_In_Red + Main_In_White + Main_In_Blue) min 0) abs` |
| Solar|Watts|`((Solar_Red max 0) + (Solar_White max 0) + (Solar_Blue max 0))` |

Replace `(Main_In_Red + Main_In_White + Main_In_Blue)` with the correct formula for your main feed.  

#### Using a solar net system

The IoTaWatt team recommends that the inputs for solar reads positive which can be achieved by either changing the orientation of the CT sensor or in the IoTaWatt's input settings, check `Reverse`.

Replace `(Main_In_Red + Main_In_White + Main_In_Blue)` with `(Main_In_Red + Main_In_White + Main_In_Blue - Solar)`

If you have two solar sensors named `Solar1` and `Solar2` you would use:
`(Main_In_Red + Main_In_White + Main_In_Blue - Solar1 - Solar2)`

### Configure Energy Management

The IoTaWatt Outputs are available for use:

In the Grid Consumption settings, select `MainsConsumption.wh_lifetime`  
In the Return to grid settings, select `MainsExport.wh_lifetime`  
In the Solar production settings, select `Solar.wh_lifetime`
