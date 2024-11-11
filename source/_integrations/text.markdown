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
ha_integration_type: entity
---

The Text integration is built for the controlling and monitoring of text values on devices.

{% include integrations/building_block_integration.md %}

If you are looking for a way to create a text entity, please take a look at the [Text helper](/integrations/input_text).

## Actions

### Text actions

Available actions: `text.set_value`

### Action `text.set_value`

Set the textual value of the text entity.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of texts to control.
| `value` | no | The new text value to set.
