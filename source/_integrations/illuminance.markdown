---
title: Illuminance
description: This integration provides illuminance automation triggers and conditions.
ha_category:
  - Automation
ha_release: 2026.4
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: illuminance
ha_integration_type: system
---

This {% term integration %} provides automation triggers and conditions for binary sensors with device class light and for sensor and number entities with device class illuminance. There are no configuration options for this integration.

## Illuminance and brightness

- **Illuminance** is a measured input. It describes how much ambient light is reaching a sensor and is reported in lux (lx) by entities like a room or outdoor light sensor. You react to it with the triggers and conditions in this integration.
- **Brightness** is a controllable output. It is a property of light entities in the [Light integration](/integrations/light/), expressed as a value between 0 and 255, or as a percentage in the UI. You set it when turning a lamp on, for example with the **Turn on light** action and setting **Brightness** to 40%.

A common pattern is to combine them: use an [Illuminance crossed threshold](/triggers/illuminance.crossed_threshold/) trigger to react when ambient light drops, then use the Light integration's **Turn on light** action to set the lamps to the brightness level you want.

{% include integrations/triggers.md %}
