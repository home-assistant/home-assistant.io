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

The **Indoor Air Quality** {% term integration %} is a helper that combines readings from your existing environmental sensors into one indoor air quality score. You can use it to summarize the air quality in a room or trigger automations from one overall result instead of watching many separate entities.

Use case: If your monitor reports temperature, humidity, carbon dioxide, and particulate matter as separate sensors, this helper can turn them into one numeric index and one easy-to-read air quality level.

The calculation uses the [IAQUK Indoor Air Quality Rating Index from 2015](https://web.archive.org/web/20161014083724id_/http://iaquk.org.uk/ESW/Files/IAQ_Rating_Index.pdf). IAQUK is an indoor rating methodology. It is not the UK government's outdoor Daily Air Quality Index (DAQI), and the result is not a regulatory or medical measurement.

## Supported devices

You can use this integration with any device in Home Assistant that provides one or more supported sensor entities. During setup, you can select a device and let Home Assistant detect matching sensors automatically, or you can choose the sensors manually.

The integration can use these source types:

- Temperature
- Humidity
- Carbon dioxide
- Total volatile organic compounds (tVOC)
- Volatile organic compound index (VOC index)
- PM2.5 particulate matter
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

After setup, select **Configure** on the integration entry to change the selected sources or the rating methodology.

{% configuration_basic %}
Device:
  description: The device that provides your air quality readings. Home Assistant uses it to automatically detect supported sensors.
Rating standard:
  description: The rating methodology used to calculate the score. The integration currently supports the IAQUK 2015 indoor rating methodology.
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
PM2.5 sensor:
  description: Optional PM2.5 source used for the air quality calculation.
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
  - **Description**: A numeric indoor air quality score from 13 to 65. Higher values mean better air quality.
  - **Remarks**: Home Assistant scores each configured source with the IAQUK component bands, averages the component scores, and normalizes the result to the 13–65 range. Attributes show the limiting source, the number of configured and usable sources, and each component score.

- **Level**
  - **Description**: A text summary of the current indoor air quality.
  - **States**: Excellent, Good, Fair, Poor, Inadequate
  - **Remarks**: Uses the same calculation as the **Index** sensor and exposes the same diagnostic attributes.

If you create the helper from a device, the sensors are linked to that device in Home Assistant. If you create it manually, Home Assistant creates a separate helper device for the Indoor Air Quality entry.

## Examples

You can use this integration in a few different ways:

- Create one Indoor Air Quality helper for each room using the same source types so you can compare rooms at a glance
- Start with automatic device detection, then adjust the selected sensors later by selecting **Configure** on the integration entry
- Combine sensors from different devices when one monitor does not provide every air quality measurement you want to include

## Data updates

This integration does not poll. Home Assistant recalculates the indoor air quality score whenever one of the configured source sensors changes state.

## Known limitations

- Only the IAQUK 2015 indoor rating methodology is currently available
- You can configure either a tVOC sensor or a VOC index sensor for one helper, not both
- Home Assistant normalizes the configured subset of IAQUK components. Scores calculated from different source sets are not directly comparable.
- A tVOC source must report a supported mass concentration. Home Assistant does not convert arbitrary tVOC ppm or ppb readings because those units depend on the sensor's reference compound.
- If any configured sensor is unavailable, nonnumeric, outside its physical range, or reports an unsupported unit, the helper entities become unavailable until all configured sources are usable again.
- The overall level follows the normalized IAQUK calculation. Check the **Limiting source** attribute before using the result for health-related notifications because averaging can make a poor component less prominent in the overall result.

## Troubleshooting

If Home Assistant does not detect any sensors automatically, set up the helper again and enable **Choose additional sensors** so you can pick the source entities manually.

If a source does not affect the result, check that the entity has a numeric state and uses a supported unit.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
