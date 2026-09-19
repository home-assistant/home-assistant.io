---
title: Temperature
description: This integration provides temperature automation triggers and conditions.
ha_category:
  - Automation
ha_release: 2026.4
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: temperature
ha_integration_type: system
related:
  - docs: /integrations/climate/
    title: Climate integration
  - docs: /integrations/water_heater/
    title: Water heater integration
  - docs: /integrations/weather/
    title: Weather integration
  - docs: /integrations/sensor/
    title: Sensor integration
---

This {% term integration %} provides automation triggers and conditions for [climate](/integrations/climate/), [water heater](/integrations/water_heater/), and [weather](/integrations/weather/) entities, as well as [sensors](/integrations/sensor/) with device class temperature. There are no configuration options for this integration.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}
