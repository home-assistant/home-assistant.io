---
title: Air quality
description: Instructions on how to add air quality sensors with Home Assistant
ha_release: 0.85
ha_domain: air_quality
ha_quality_scale: internal
ha_category: []
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Air quality** {% term integration %} allows other integrations to process information about air quality and pollution details. It is used by integrations that provide an `air_quality` sensor - you can find those under the `health` [integrations](/integrations/#health).

The platforms cover the following levels (if they are available):

- The particulate matter 0.1 (<= 0.1 μm) level.
- The particulate matter 2.5 (<= 2.5 μm) level.
- The particulate matter 10 (<= 10 μm) level.
- The Air Quality Index (AQI).
- The O3 (ozone) level.
- The CO (carbon monoxide) level.
- The CO2 (carbon dioxide) level.
- The SO2 (sulphur dioxide) level.
- The N2O (nitrogen oxide) level.
- The NO (nitrogen monoxide) level.
- The NO2 (nitrogen dioxide) level.

{% include integrations/building_block_integration.md %}

## The state of an air quality entity

The state of an air quality entity represents the concentration of particles in the air that are 2.5 microns or fewer in diameter. The state is a number. The number is followed by the unit of measurement (micrograms per cubic meter: "µg/m³"). For example, *PM2.5: 4 µg/m³*. In this example, the state is 4.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.
