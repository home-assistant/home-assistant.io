{%- assign target_domain = include.domain | default: page.domain -%}

## Targets

This action supports **targets**. A target tells Home Assistant what the action should act on. You can point it at a single {% term entity %}, a device, an area, a floor, or a label, and Home Assistant runs the action on every matching {{ target_domain }} entity behind that target.

- **Entity**: one specific {{ target_domain }} entity, such as `{{ target_domain }}.living_room`.
- **Device**: every {{ target_domain }} entity that belongs to a device.
- **Area**: every {{ target_domain }} entity in a room or area.
- **Floor**: every {{ target_domain }} entity on a floor.
- **Label**: every {{ target_domain }} entity that shares a label.

You can also mix target types in one call. For example, combine a specific entity with an area to run the action on both at once.
