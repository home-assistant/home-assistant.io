---
title: Air Quality
description: Instructions on how to add air quality sensors with Home Assistant
ha_release: 0.85
ha_iot_class:
ha_domain: air_quality
ha_quality_scale: internal
---

The `air_quality` base platform allows other integrations to process information 
about air quality and pollution details. It is used by integrations that provide 
an `air_quality` sensor - you can find those under the `health` [integrations].

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

[integrations]: https://www.home-assistant.io/integrations/#health
