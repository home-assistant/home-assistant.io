{% comment %}
Parameters:
  domain                    Optional. Domain used in the examples. Defaults to the page domain.
  custom_trigger_variables  Optional. Set (to anything) to leave out the default "Trigger variables"
                            section, for triggers that pass different data. The page then adds
                            its own "Trigger variables" section after this include.
{% endcomment %}
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

To learn which entities Home Assistant includes for a device, area, floor, or label, and how it handles several entities, refer to [Automation targets](/docs/automation/targets/).

To leave out some of these entities, refer to [Excluding targets](/docs/automation/targets/#excluding-targets). For example, you can leave out one {{ target_entity_type }} in an area.

{% if page.trigger %}{% unless include.custom_trigger_variables %}
### Trigger variables

When the trigger fires, the `trigger` variable identifies the entity that caused it to fire. This is useful when a target contains multiple entities, such as a device, area, floor, or label.

The following trigger-specific variables are available:

| Template variable | Data |
| ---- | ---- |
| `trigger.entity_id` | Entity ID of the entity that caused the trigger to fire. |
| `trigger.from_state` | Previous state object of that entity. |
| `trigger.to_state` | New state object of that entity. |
| `trigger.for` | Timedelta object of how long the trigger criteria was met, if applicable. |

For example, use {% raw %}`{{ trigger.to_state.name }}`{% endraw %} in an action to include the name of the entity that caused the trigger in a notification.

The `trigger` variable describes the entity that caused the trigger to fire; it does not contain all entities resolved from the configured target.
{% endunless %}{% endif %}
