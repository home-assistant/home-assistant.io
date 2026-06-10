---
title: "Entered zone"
trigger: zone.entered
domain: zone
description: "Triggers when one or more people or device trackers enter a zone."
related_triggers:
  - zone.left
  - zone.occupancy_detected
---

The **Entered zone** trigger fires when a person or device tracker enters a selected zone. Use it to start an automation when someone arrives home, reaches work, or enters another place that you track with a zone.

When you target more than one person or device tracker, the **Trigger when** option controls whether the automation runs for each arrival, only the first arrival, or only after all selected targets are in the zone.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Entered zone**.
5. Select what you want to monitor. Under **By target**, choose one or more people or device trackers.
6. Under **Zone**, select the zone to monitor.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
8. Under **For at least**, you can set how long the target must stay in the zone before the trigger fires. Leave it at zero to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Zone:
  description: The zone to trigger on.
  required: true
Trigger when:
  description: Pick **Each** to fire every time any selected target enters the zone, **First** to fire only when the first selected target enters the zone, or **All** to fire only after every selected target is in the zone. The default is **Each**.
  required: false
For at least:
  description: How long the target must stay in the zone before the trigger fires. The default is zero, which fires immediately.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `zone.entered`. A basic example looks like this:

{% example %}
trigger: |
  trigger: zone.entered
  target:
    entity_id: person.nina
  options:
    zone: zone.work
{% endexample %}

This fires when `person.nina` enters `zone.work`.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
zone:
  description: The zone to trigger on.
  required: true
  type: string
behavior:
  description: When multiple people or device trackers are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: How long the target must stay in the zone before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes, and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

<a id="targets"></a>
<a id="targets-of-the-trigger"></a>

## Targets of the trigger

This trigger requires a target. The target is the person or device tracker that Home Assistant will watch.

- **Entity**: one specific person or device tracker entity, such as `person.nina` or `device_tracker.phone`.
- **Device**: every matching person or device tracker entity that belongs to a device.
- **Area**: every matching person or device tracker entity in a room or area.
- **Floor**: every matching person or device tracker entity on a floor.
- **Label**: every matching person or device tracker entity that shares a label.

You can also select different target types in one trigger.

{% include triggers/behavior.md %}

## Good to know

- This trigger uses the `in_zones` attribute reported by person and device tracker entities.
- If the selected person or device tracker is `unknown` or `unavailable`, Home Assistant does not treat that state as entering the zone.
- To react when a target leaves the same zone, use [Left zone](/triggers/zone.left/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when Nina arrives at work

When Nina enters the work zone, this automation sends a notification to your phone.

- **Trigger**: Entered zone
  - **Target**: Nina (`person.nina`)
  - **Zone**: Work (`zone.work`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a work arrival notification" %}

{% example %}
automation: |
  alias: "Notify when Nina arrives at work"
  triggers:
    - trigger: zone.entered
      target:
        entity_id: person.nina
      options:
        zone: zone.work
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Nina arrived at work."
{% endexample %}

{% enddetails %}

### Automation: turn on the hallway light when anyone gets home

When the first selected person enters the home zone after sunset, this automation turns on the hallway light.

- **Trigger**: Entered zone
  - **Target**: Nina and Alex
  - **Zone**: Home (`zone.home`)
  - **Trigger when**: First
- **Condition**: Sun is below horizon
- **Action**: Turn on light
  - **Target**: Hallway light (`light.hallway`)

{% details "YAML example for turning on the hallway light when someone gets home" %}

{% example %}
automation: |
  alias: "Turn on the hallway light when someone gets home"
  triggers:
    - trigger: zone.entered
      target:
        entity_id:
          - person.nina
          - person.alex
      options:
        zone: zone.home
        behavior: first
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
