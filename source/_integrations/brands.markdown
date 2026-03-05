---
title: Brands
description: Serves brand images such as icons and logos for integrations and hardware.
ha_category:
  - Other
ha_release: 2026.3
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: brands
ha_integration_type: system
---

The **Brands** {% term integration %} serves the brand images (such as icons and logos) that you see throughout the Home Assistant user interface. For example, the icons shown on integration cards, update entities, and media browser items are all served by this integration.

Brand images are fetched from the Home Assistant brands repository and cached locally on disk so they remain available even when your internet connection is temporarily unavailable.

This integration is automatically loaded by Home Assistant and requires no configuration.
