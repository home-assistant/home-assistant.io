---
title: Door
description: This integration provides door automation triggers and conditions.
ha_category:
  - Automation
ha_release: 2026.4
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: door
ha_integration_type: system
---

The **Door** {% term integration %} provides automation triggers and conditions for entities that represent doors. Use it to react when a front door opens, check whether a patio door is still open, or build automations around a garage door.

It works with `binary_sensor` and `cover` entities that use the `door` device class. There is no setup or configuration for this integration. It becomes available automatically when another integration provides supported door entities.

## Supported entities

The Door integration works with the following entity types when they use the `door` device class:

- `binary_sensor`, like contact sensors on entry, patio, or interior doors
- `cover`, like garage doors that report whether they are open or closed

## Configuration

The Door integration does not require any configuration.

{% include integrations/triggers_conditions_actions.md %}

## Known limitations

Only entities that use the `door` device class appear in these triggers and conditions. If your device is exposed with a different entity type or device class, it will not be available here.
