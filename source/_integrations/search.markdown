---
title: Search
description: Internal search module for Home Assistant.
ha_category:
  - Other
ha_release: 0.105
ha_codeowners:
  - '@home-assistant/core'
ha_domain: search
ha_quality_scale: internal
ha_integration_type: system
---

The `search` integration is an internally used integration by the
Home Assistant Core.

All data stored in Home Assistant is interconnected, making it a graph.
This means it can be searched as a graph.

This integration allows the internals of Home Assistant to search for
relations between things like areas, devices, entities, configuration entries,
[scenes](/integrations/scene/), [scripts](/integrations/script/) and [automations](/integrations/automation/).

Currently these relations are displayed on the "Related" tab in more info dialogs, and on Device info pages.

The search integration is automatically loaded with the Home Assistant frontend
and does not need to be configured separately.
