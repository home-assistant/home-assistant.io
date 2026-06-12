{%- assign target_domain = include.domain | default: page.domain -%}

<a id="targets"></a>
<a id="targets-of-the-condition"></a>

## Targets of the condition

This condition requires a target. The target is the object that Home Assistant will check. You can point the condition at a single {% term entity %}, a device, an area, a floor, or a label, and Home Assistant will evaluate every matching {{ target_domain }} entity behind that target.

- **Entity**: one specific {{ target_domain }} entity, such as `{{ target_domain }}.living_room`.
- **Device**: every {{ target_domain }} entity that belongs to a device.
- **Area**: every {{ target_domain }} entity in a room or area.
- **Floor**: every {{ target_domain }} entity on a floor.
- **Label**: every {{ target_domain }} entity that shares a label.

You can also select different target types in one condition. For example, you can add a specific entity and an area as targets in the same condition to check both of them at once.
