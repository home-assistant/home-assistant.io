---
title: Select
description: Instructions on how to manage your Select entities with Home Assistant.
ha_category:
  - Select
ha_release: 2021.7
ha_quality_scale: internal
ha_domain: select
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

Keeps track on `select` entities in your environment, their state, and allows
you to control them. This integration allows other integrations to offer
a limited set of selectable options for the entity.

### Services

The Select entities registers the following services:

| Service | Data | Description |
| ------- | ---- | ----------- |
| `select_option` | `option`<br>`entity_id(s)`<br>`area_id(s)` | Set the current select option of specific `select` entities
