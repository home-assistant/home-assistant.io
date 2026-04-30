---
title: Indoor Air Quality
description: Combine temperature, humidity, gas, and particulate sensor readings into a single indoor air quality score in Home Assistant.
ha_category:
  - Environment
  - Helper
  - Sensor
ha_release: 2026.5
ha_iot_class: Calculated
ha_config_flow: true
ha_codeowners:
  - '@liudger'
ha_domain: indoor_air_quality
ha_platforms:
  - sensor
ha_integration_type: helper
ha_quality_scale: bronze
related:
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs and diagnostics
---

The **Indoor Air Quality** {% term integration %} is a helper that combines readings from your existing environmental sensors into one indoor air quality score. You can use it to summarize the air quality in a room, compare different rooms, or trigger automations from one overall result instead of watching many separate entities.

Use case: If your monitor reports temperature, humidity, carbon dioxide, and particulate matter as separate sensors, this helper can turn them into one numeric index and one easy-to-read air quality level.

## Supported devices

You can use this integration with any Home Assistant device that exposes one or more supported sensor entities. During setup, you can select a device and let Home Assistant detect matching sensors automatically, or you can choose the sensors manually.

The integration can use these source types:

- Temperature
- Humidity
- Carbon dioxide
- tVOC
- VOC index
- Particulate matter, like PM1, PM2.5, and PM10
- Nitrogen dioxide
- Carbon monoxide
- Formaldehyde
- Radon

## Unsupported devices

Devices that do not expose supported sensor entities cannot be detected automatically. Sensors that report unsupported units are ignored by the calculation.

## Prerequisites

Before setting up the integration, make sure the sensor entities you want to use already exist in Home Assistant and report numeric values.

## Configuration

{% include integrations/config_flow.md %}

When you set up the integration, select the device that provides your air quality readings, or enable additional sensor selection if you want to choose sensors manually. If the selected device already has supported entities, Home Assistant preselects the matching sources for you.

## Configuration options

After setup, you can open the integration options to change the selected sources or the rating standard.

{% configuration_basic %}
Device:
  description: The device that provides your air quality readings. Home Assistant uses it to automatically detect supported sensors.
Rating standard:
  description: The air quality rating standard used to calculate the score. At the moment, the integration supports the United Kingdom standard.
Choose additional sensors:
  description: Enable this if you want to review the detected sensors, add more sources, or create the helper without selecting a device first.
Name:
  description: The name for the Indoor Air Quality helper. If you selected a device, Home Assistant uses the device name by default.
Temperature sensor:
  description: Optional temperature source used for the air quality calculation.
Humidity sensor:
  description: Optional humidity source used for the air quality calculation.
Carbon dioxide sensor:
  description: Optional CO2 source used for the air quality calculation.
tVOC sensor:
  description: Optional total volatile organic compounds source used for the air quality calculation. Select either a tVOC sensor or a VOC index sensor.
VOC index sensor:
  description: Optional VOC index source used for the air quality calculation. Select either a VOC index sensor or a tVOC sensor.
Particulate matter sensors:
  description: Optional particulate matter sources used for the air quality calculation. You can select one or more particulate matter sensors.
Nitrogen dioxide sensor:
  description: Optional NO2 source used for the air quality calculation.
Carbon monoxide sensor:
  description: Optional CO source used for the air quality calculation.
Formaldehyde sensor:
  description: Optional formaldehyde source used for the air quality calculation.
Radon sensor:
  description: Optional radon source used for the air quality calculation.
{% endconfiguration_basic %}

## Supported functionality

The integration creates the following sensor entities for each Indoor Air Quality helper.

### Sensors

- **Index**
  - **Description**: A numeric indoor air quality score from 0 to 65. Lower values mean better air quality.
  - **Remarks**: Includes diagnostic attributes such as the number of configured sources, the number of sources currently used, and per-source index values when available.

- **Level**
  - **Description**: A text summary of the current indoor air quality.
  - **States**: Excellent, Good, Fair, Poor, Inadequate
  - **Remarks**: Uses the same calculation as the **Index** sensor and exposes the same diagnostic attributes.

If you create the helper from a device, the sensors are linked to that device in Home Assistant. If you create it manually, Home Assistant creates a separate helper device for the Indoor Air Quality entry.

## Examples

You can use this integration in a few different ways:

- Create one Indoor Air Quality helper for each room so you can compare rooms at a glance
- Start with automatic device detection, then adjust the selected sensors later from the integration options
- Combine sensors from different devices when one monitor does not provide every air quality measurement you want to include

## Data updates

This integration does not poll. Home Assistant recalculates the indoor air quality score whenever one of the configured source sensors changes state.

## Known limitations

- Only the United Kingdom rating standard is currently available
- You can configure either a tVOC sensor or a VOC index sensor for one helper, not both
- If a configured sensor is unavailable or reports an unsupported unit, that source is skipped during recalculation
- If all configured sources are unavailable, the helper keeps its last calculated result until a valid source updates again

## Troubleshooting

If Home Assistant does not detect any sensors automatically, set up the helper again and enable **Choose additional sensors** so you can pick the source entities manually.

If a source does not affect the result, check that the entity has a numeric state and uses a supported unit.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
