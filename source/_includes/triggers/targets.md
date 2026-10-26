{% comment %}
Parameters:
  domain                    Optional. Domain used in the examples. Defaults to the page domain.
  entity_type               Optional. What the trigger accepts, in plain words, for example
                            "door sensor or motorized door". Defaults to "<domain> entity".
  example                   Optional. An example entity ID. Defaults to "<domain>.living_room".
  custom_trigger_variables  Optional. Set (to anything) to leave out the default "Trigger variables"
                            section, for triggers that pass different data. The page then adds
                            its own "Trigger variables" section after this include.
{% endcomment %}
{%- assign target_domain = include.domain | default: page.domain -%}
{%- capture default_entity_type %}{{ target_domain }} entity{% endcapture -%}
{%- assign target_entity_type = include.entity_type | default: default_entity_type -%}
{%- capture default_example %}{{ target_domain }}.living_room{% endcapture -%}
{%- assign target_example = include.example | default: default_example -%}

<a id="targets"></a>
<a id="targets-of-the-trigger"></a>

## Targets of the trigger

This trigger requires a target. The target is the object that Home Assistant will watch. You can select a single {% term entity %}, a device, an area, a floor, or a label as a target, and Home Assistant will watch every matching {{ target_entity_type }} behind that target.

- **Entity**: one specific {{ target_entity_type }}, such as `{{ target_example }}`.
- **Device**: every {{ target_entity_type }} that belongs to a device.
- **Area**: every {{ target_entity_type }} in a room or area.
- **Floor**: every {{ target_entity_type }} on a floor.
- **Label**: every {{ target_entity_type }} that shares a label.

You can also select different target types in one trigger. For example, you can add a specific entity and an area as targets in the same trigger to monitor both of them at once.

To learn which entities Home Assistant includes for a device, area, floor, or label, and how it handles several entities, refer to [Automation targets](/docs/automation/targets/).

To leave out some of these entities, refer to [Excluding targets](/docs/automation/targets/#excluding-targets). For example, you can leave out one {{ target_entity_type }} in an area.

{% if page.trigger %}{% unless include.custom_trigger_variables %}
### Trigger variables

When the trigger reacts, the `trigger` variable identifies the entity that made it react. This is useful when a target contains multiple entities, such as a device, area, floor, or label.

The following trigger-specific variables are available:

- `trigger.entity_id`: Entity ID of the entity that made the trigger react.
- `trigger.from_state`: Previous state object of that entity.
- `trigger.to_state`: New state object of that entity.
- `trigger.for`: Timedelta object of how long the trigger criteria were met, if applicable.

For example, use {% raw %}`{{ trigger.to_state.name }}`{% endraw %} in an action to include the name of the entity that made the trigger react in a notification.

The `trigger` variable describes the entity that made the trigger react. It doesn't contain all the entities of the target.
{% endunless %}{% endif %}
