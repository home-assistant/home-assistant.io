{%- assign target_domain = include.domain | default: page.domain -%}

<a id="targets"></a>
<a id="targets-of-the-action"></a>

## Targets of the action

This action requires a target. The target is the object of the action. You can point the action at a single {% term entity %}, a device, an area, a floor, or a label, and Home Assistant will run the action on every matching {{ target_domain }} entity behind that target.

- **Entity**: one specific {{ target_domain }} entity, such as `{{ target_domain }}.living_room`.
- **Device**: every {{ target_domain }} entity that belongs to a device.
- **Area**: every {{ target_domain }} entity in a room or area.
- **Floor**: every {{ target_domain }} entity on a floor.
- **Label**: every {{ target_domain }} entity that shares a label.

You can also select different target types in one action. For example, you can add a specific entity and an area as targets in the same action to run the action on both of them at once.

To learn which entities Home Assistant includes for a device, area, floor, or label, and how it handles several entities, refer to [Automation targets](/docs/automation/targets/).

To leave out some of these entities, refer to [Excluding targets](/docs/automation/targets/#excluding-targets). For example, you can leave out one {{ target_entity_type }} in an area.
