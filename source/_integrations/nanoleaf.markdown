---
title: Nanoleaf
description: Instructions how to integrate Nanoleaf Panels into Home Assistant.
ha_category:
  - Light
ha_codeowners:
  - '@milanmeu'
ha_config_flow: true
ha_homekit: true
ha_iot_class: Local Polling
ha_release: 0.67
ha_domain: nanoleaf
ha_platforms:
  - light
ha_zeroconf: true
ha_ssdp: true
---

The Nanoleaf integration allows you to control and monitor Nanoleaf Light Panels, Canvas, Shapes, Elements, and Lines.

This integration does not support the Nanoleaf Remote and Essentials lights.

{% include integrations/config_flow.md %}
