---
title: Profiler
description: Profile Home Assistant.
ha_category:
  - Utility
ha_release: 0.117
ha_quality_scale: internal
ha_domain: profiler
ha_codeowners:
  - '@bdraco'
ha_config_flow: true
ha_integration_type: integration
---

The **Profiler** {% term integration %} provides a profile which is a set of statistics that identifies how much time each part of Home Assistant is taking. It can help track down a performance issue or provide insight about a misbehaving integration.

{% include integrations/config_flow.md %}

{% include integrations/actions.md %}
