---
title: Humidity
description: This integration provides humidity automation triggers and conditions.
ha_category:
  - Automation
ha_release: 2026.4
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: humidity
ha_integration_type: system
related:
  - docs: /integrations/humidifier/
    title: Humidifier
  - docs: /integrations/climate/
    title: Climate
  - docs: /integrations/weather/
    title: Weather
---

This {% term integration %} provides automation triggers and conditions for climate, humidifier, and weather entities, as well as sensors with device class humidity. There are no configuration options for this integration.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}
