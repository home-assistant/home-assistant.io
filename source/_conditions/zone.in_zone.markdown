---
title: "Is in zone"
condition: zone.in_zone
domain: zone
description: "Tests if one or more people or device trackers are in a zone."
related_conditions:
  - zone.not_in_zone
  - zone.occupancy_is_detected
---

The **Is in zone** condition passes when a selected person or device tracker is in a selected zone. Use it to make an automation continue only when someone is home, at work, or in another zone that matters to the automation.

When you target more than one person or device tracker, the **Check when** option controls whether one matching target is enough or every selected target must be in the zone.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Is in zone**.
5. Select what you want to check. Under **By target**, choose one or more people or device trackers.
6. Under **Zone**, select the zone to check against.
7. If you selected more than one target, under **Check when**, pick **Any** or **All**.
8. Under **For at least**, you can set how long the target must have been in the zone before the condition passes. Leave it at zero for the condition to pass immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Zone:
  description: The zone to test against.
  required: true
Check when:
  description: Pick **Any** to pass if at least one selected target is in the zone, or **All** to pass only when every selected target is in the zone. The default is **Any**.
  required: false
For at least:
  description: How long the target must have been in the zone before the condition passes. The default is zero, which passes immediately.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `zone.in_zone`. A basic example looks like this:

{% example %}
condition: |
  condition: zone.in_zone
  target:
    entity_id: person.nina
  options:
    zone: zone.home
{% endexample %}

This passes when `person.nina` is in `zone.home`.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
zone:
  description: The zone to test against.
  required: true
  type: string
behavior:
  description: When multiple people or device trackers are targeted, controls how results combine. Accepts `any` or `all`.
  required: false
  type: string
  default: any
for:
  description: How long the target must have been in the zone before the condition passes. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes, and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

<a id="targets"></a>
<a id="targets-of-the-condition"></a>

## Targets of the condition

This condition requires a target. The target is the person or device tracker that Home Assistant will check.

- **Entity**: one specific person or device tracker entity, such as `person.nina` or `device_tracker.phone`.
- **Device**: every matching person or device tracker entity that belongs to a device.
- **Area**: every matching person or device tracker entity in a room or area.
- **Floor**: every matching person or device tracker entity on a floor.
- **Label**: every matching person or device tracker entity that shares a label.

You can also select different target types in one condition.

### Behavior with multiple targets

When you target more than one person or device tracker, the **Check when** option controls how the results combine:

- **Any** (default): the condition passes if at least one of the selected people or device trackers is in the zone.
- **All**: the condition passes only when every selected person or device tracker is in the zone.

## Good to know

- This condition uses the `in_zones` attribute reported by person and device tracker entities.
- If a selected person or device tracker is `unknown` or `unavailable`, Home Assistant does not treat that target as being in the zone.
- To check the opposite state, use [Is not in zone](/conditions/zone.not_in_zone/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: unlock the side door only when Nina is home

When the front door contact sensor turns on, this automation unlocks the side door only if Nina is already in the home zone.

- **Trigger**: State changes to on
  - **Target**: Front door contact sensor (`binary_sensor.front_door`)
- **Condition**: Is in zone
  - **Target**: Nina (`person.nina`)
  - **Zone**: Home (`zone.home`)
- **Action**: Unlock lock
  - **Target**: Side door (`lock.side_door`)

{% details "YAML example for unlocking a side door only when Nina is home" %}

{% example %}
automation: |
  alias: "Unlock the side door when Nina is home"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  conditions:
    - condition: zone.in_zone
      target:
        entity_id: person.nina
      options:
        zone: zone.home
  actions:
    - action: lock.unlock
      target:
        entity_id: lock.side_door
{% endexample %}

{% enddetails %}

### Automation: send a reminder when everyone is at work

At 09:00, this automation sends a reminder if both selected people are in the work zone.

- **Trigger**: Time is 09:00
- **Condition**: Is in zone
  - **Target**: Nina and Alex
  - **Zone**: Work (`zone.work`)
  - **Check when**: All
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a reminder when everyone is at work" %}

{% example %}
automation: |
  alias: "Send a reminder when everyone is at work"
  triggers:
    - trigger: time
      at: "09:00:00"
  conditions:
    - condition: zone.in_zone
      target:
        entity_id:
          - person.nina
          - person.alex
      options:
        zone: zone.work
        behavior: all
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Everyone is at work."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
