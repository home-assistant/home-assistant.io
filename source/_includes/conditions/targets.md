{% comment %}
Parameters:
  domain       Optional. Domain used in the examples. Defaults to the page domain.
  entity_type  Optional. What the condition accepts, in plain words, for example
               "door sensor or motorized door". Defaults to "<domain> entity".
  example      Optional. An example entity ID. Defaults to "<domain>.living_room".
{% endcomment %}
{%- assign target_domain = include.domain | default: page.domain -%}
{%- capture default_entity_type %}{{ target_domain }} entity{% endcapture -%}
{%- assign target_entity_type = include.entity_type | default: default_entity_type -%}
{%- capture default_example %}{{ target_domain }}.living_room{% endcapture -%}
{%- assign target_example = include.example | default: default_example -%}

<a id="targets"></a>
<a id="targets-of-the-condition"></a>

## Targets of the condition

This condition requires a target. The target is the object that Home Assistant will check. You can point the condition at a single {% term entity %}, a device, an area, a floor, or a label, and Home Assistant will evaluate every matching {{ target_entity_type }} behind that target.

- **Entity**: one specific {{ target_entity_type }}, such as `{{ target_example }}`.
- **Device**: every {{ target_entity_type }} that belongs to a device.
- **Area**: every {{ target_entity_type }} in a room or area.
- **Floor**: every {{ target_entity_type }} on a floor.
- **Label**: every {{ target_entity_type }} that shares a label.

You can also select different target types in one condition. For example, you can add a specific entity and an area as targets in the same condition to check both of them at once.

To learn which entities Home Assistant includes for a device, area, floor, or label, and how it handles several entities, refer to [Automation targets](/docs/automation/targets/).

To leave out some of these entities, refer to [Excluding targets](/docs/automation/targets/#excluding-targets). For example, you can leave out one {{ target_entity_type }} in an area.
