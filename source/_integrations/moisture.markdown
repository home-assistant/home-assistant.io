---
title: Moisture
description: This integration provides moisture automation triggers and conditions.
ha_category:
  - Automation
ha_release: 2026.4
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: moisture
ha_integration_type: system
---

This {% term integration %} provides automation triggers and conditions for binary sensors, sensors, and number entities with device class moisture. There are no configuration options for this integration.

## Moisture and humidity

The moisture and humidity integrations both work with water, but they apply to different aspects:

- **Moisture** describes water in or on a surface. It covers wet/dry detection (such as a leak sensor reporting water under a sink) and the moisture content of materials (such as a soil sensor reporting how wet the soil in a plant pot is). Moisture sensors come in two shapes:
  - **Binary moisture sensors** (`binary_sensor` entities with the moisture device class) report only **wet** or **dry**, like a water leak sensor.
  - **Numerical moisture sensors** (`sensor` entities with the moisture device class) report a moisture content as a percentage, like a soil moisture probe.
- **Humidity** describes water vapor in the air. It's reported as a relative humidity percentage by climate devices, humidifiers, weather sensors, and dedicated humidity sensors. For automations based on humidity, use the [Humidity integration](/integrations/humidity/) instead.

If you're reacting to water in or on a surface (a leak, soil, a sponge), use the **moisture** triggers and conditions. If you're reacting to how damp the air feels in a room, use **humidity**.

{% include integrations/triggers.md %}
