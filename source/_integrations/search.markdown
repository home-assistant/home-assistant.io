---
title: Search
description: Internal search module for Home Assistant.
ha_category: []
ha_release: 0.105
ha_codeowners:
  - '@home-assistant/core'
ha_domain: search
---

The `search` integration is an internally used integration by the
Home Assistant Core.

All data stored in Home Assistant is interconnected, making it a graph.
This means it can be searched as a graph.

This integration allows the internals of Home Assistant to search for
relations between things like areas, devices, entities, configuration entries,
scenes, scripts and automations.

The search integration is automatically loaded with the Home Assistant frontend
and does not need to be configured separately.
