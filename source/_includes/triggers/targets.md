{%- assign target_domain = include.domain | default: page.domain -%}

<a id="targets"></a>
<a id="targets-of-the-trigger"></a>

## Targets of the trigger

This trigger requires a target. The target is the object that Home Assistant will watch. You can select a single {% term entity %}, a device, an area, a floor, or a label as a target, and Home Assistant will watch every matching {{ target_domain }} entity behind that target.

- **Entity**: one specific {{ target_domain }} entity, such as `{{ target_domain }}.living_room`.
- **Device**: every {{ target_domain }} entity that belongs to a device.
- **Area**: every {{ target_domain }} entity in a room or area.
- **Floor**: every {{ target_domain }} entity on a floor.
- **Label**: every {{ target_domain }} entity that shares a label.

You can also select different target types in one trigger. For example, you can add a specific entity and an area as targets in the same trigger to monitor both of them at once.

### Trigger variables

When the trigger fires, the `trigger` variable identifies the entity that caused it to fire. This is useful when a target contains multiple entities, such as a device, area, floor, or label.

The following trigger-specific variables are available:

| Template variable | Data |
| ---- | ---- |
| `trigger.entity_id` | Entity ID of the entity that caused the trigger to fire. |
| `trigger.from_state` | Previous state object of that entity. |
| `trigger.to_state` | New state object of that entity. |
| `trigger.for` | Duration configured for the trigger, or `None` if no duration is configured. |

For example, use `{{ trigger.to_state.name }}` in an action to include the name of the entity that caused the trigger in a notification.

The `trigger` variable describes the entity that caused the trigger to fire; it does not contain all entities resolved from the configured target.
