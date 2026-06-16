---
title: "Is not in zone"
condition: zone.not_in_zone
domain: zone
description: "Tests if one or more people or device trackers are not in a zone."
related_conditions:
  - zone.in_zone
  - zone.occupancy_is_not_detected
---

The **Is not in zone** condition passes when a selected person or device tracker is outside a selected zone. Use it to make an automation continue only when someone is away from home, away from work, or outside another zone that matters to the automation.

When you target more than one person or device tracker, the **Check when** option controls whether one matching target is enough or every selected target must be outside the zone.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Is not in zone**.
5. Select what you want to check. Under **By target**, choose one or more people or device trackers.
6. Under **Zone**, select the zone to check against.
7. If you selected more than one target, under **Check when**, pick **Any** or **All**.
8. Under **For at least**, you can set how long the target must have been outside the zone before the condition passes. Leave it at zero for the condition to pass immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Zone:
  description: The zone to test against.
  required: true
Check when:
  description: Pick **Any** to pass if at least one selected target is outside the zone, or **All** to pass only when every selected target is outside the zone. The default is **Any**.
  required: false
For at least:
  description: How long the target must have been outside the zone before the condition passes. The default is zero, which passes immediately.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `zone.not_in_zone`. A basic example looks like this:

{% example %}
condition: |
  condition: zone.not_in_zone
  target:
    entity_id: person.nina
  options:
    zone: zone.home
{% endexample %}

This passes when `person.nina` is not in `zone.home`.

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
  description: How long the target must have been outside the zone before the condition passes. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes, and seconds.
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

- **Any** (default): the condition passes if at least one of the selected people or device trackers is outside the zone.
- **All**: the condition passes only when every selected person or device tracker is outside the zone.

## Good to know

- This condition uses the `in_zones` attribute reported by person and device tracker entities.
- If a selected person or device tracker is `unknown` or `unavailable`, Home Assistant does not treat that target as being outside the zone.
- To check the opposite state, use [Is in zone](/conditions/zone.in_zone/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn off the office fan when Nina is not home

When the home zone becomes empty, this automation turns off the office fan if Nina is not in the home zone.

- **Trigger**: Zone occupancy cleared
  - **Zone**: Home (`zone.home`)
- **Condition**: Is not in zone
  - **Target**: Nina (`person.nina`)
  - **Zone**: Home (`zone.home`)
- **Action**: Turn off fan
  - **Target**: Office fan (`fan.office`)

{% details "YAML example for turning off the office fan when Nina is not home" %}

{% example %}
automation: |
  alias: "Turn off the office fan when Nina is not home"
  triggers:
    - trigger: zone.occupancy_cleared
      options:
        zone: zone.home
  conditions:
    - condition: zone.not_in_zone
      target:
        entity_id: person.nina
      options:
        zone: zone.home
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.office
{% endexample %}

{% enddetails %}

### Automation: notify if a phone is not at school in the morning

At 08:30, this automation sends a notification if a tracked phone is not in the school zone.

- **Trigger**: Time is 08:30
- **Condition**: Is not in zone
  - **Target**: Phone (`device_tracker.phone`)
  - **Zone**: School (`zone.school`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying if a phone is not at school" %}

{% example %}
automation: |
  alias: "Notify if a phone is not at school"
  triggers:
    - trigger: time
      at: "08:30:00"
  conditions:
    - condition: zone.not_in_zone
      target:
        entity_id: device_tracker.phone
      options:
        zone: zone.school
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The tracked phone is not at school."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
