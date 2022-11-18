---
title: Text
description: Instructions on how to set up text entities within Home Assistant.
ha_category:
  - Text
ha_release: '2022.12'
ha_domain: text
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
  - '@raman325'
ha_integration_type: entity
---

The Text integration is built for the controlling and monitoring of text values on devices.

Text entities are created automatically by integrations that support them.

## Services

### text services

Available services: `text.set_value`

### Service `siren.turn_on`

Turn the siren on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of texts to control.
| `value` | no | The new text value to set.
