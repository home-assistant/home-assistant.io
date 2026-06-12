---
title: Battery
description: This integration provides battery automation triggers and conditions.
ha_category:
  - Other
ha_release: 2026.4
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: battery
ha_integration_type: system
---

This {% term integration %} provides automation triggers and conditions for binary sensors with device class battery and battery charging, and sensors and number entities with device class battery. There are no configuration options for this integration.

For an overview of the status of your battery {% term entities %}, open the [**Maintenance** dashboard](/dashboards/dashboards/#dashboards-only-shown-in-the-dashboard-list-by-default). This dashboard allows you to quickly see which batteries need replacing.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}
