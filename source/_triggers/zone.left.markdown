---
title: "Left zone"
trigger: zone.left
domain: zone
description: "Triggers when one or more people or device trackers leave a zone."
related_triggers:
  - zone.entered
  - zone.occupancy_cleared
---

The **Left zone** trigger fires when a person or device tracker leaves a selected zone. Use it to start an automation when someone leaves home, leaves work, or moves out of another zone you track.

When you target more than one person or device tracker, the **Trigger when** option controls whether the automation runs for each departure, only the first departure, or only after all selected targets have left the zone.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Left zone**.
5. Select what you want to monitor. Under **By target**, choose one or more people or device trackers.
6. Under **Zone**, select the zone to monitor.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
8. Under **For at least**, you can set how long the target must stay outside the zone before the trigger fires. Leave it at zero to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Zone:
  description: The zone to trigger on.
  required: true
Trigger when:
  description: Pick **Each** to fire every time any selected target leaves the zone, **First** to fire only when the first selected target leaves the zone, or **All** to fire only after every selected target has left the zone. The default is **Each**.
  required: false
For at least:
  description: How long the target must stay outside the zone before the trigger fires. The default is zero, which fires immediately.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `zone.left`. A basic example looks like this:

{% example %}
trigger: |
  trigger: zone.left
  target:
    entity_id: person.nina
  options:
    zone: zone.home
{% endexample %}

This fires when `person.nina` leaves `zone.home`.

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
  description: How long the target must stay outside the zone before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes, and seconds.
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
- If the selected person or device tracker is `unknown` or `unavailable`, Home Assistant does not treat that state as leaving the zone.
- To react when a target enters the same zone, use [Entered zone](/triggers/zone.entered/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: lock the front door when everyone leaves home

When all selected people have left the home zone for 5 minutes, this automation locks the front door.

- **Trigger**: Left zone
  - **Target**: Nina and Alex
  - **Zone**: Home (`zone.home`)
  - **Trigger when**: All
  - **For at least**: 5 minutes
- **Action**: Lock lock
  - **Target**: Front door (`lock.front_door`)

{% details "YAML example for locking the front door when everyone leaves" %}

{% example %}
automation: |
  alias: "Lock the front door when everyone leaves"
  triggers:
    - trigger: zone.left
      target:
        entity_id:
          - person.nina
          - person.alex
      options:
        zone: zone.home
        behavior: all
        for: "00:05:00"
  actions:
    - action: lock.lock
      target:
        entity_id: lock.front_door
{% endexample %}

{% enddetails %}

### Automation: notify when a phone leaves school

When a tracked phone leaves the school zone, this automation sends a notification.

- **Trigger**: Left zone
  - **Target**: Phone (`device_tracker.phone`)
  - **Zone**: School (`zone.school`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a school departure notification" %}

{% example %}
automation: |
  alias: "Notify when a phone leaves school"
  triggers:
    - trigger: zone.left
      target:
        entity_id: device_tracker.phone
      options:
        zone: zone.school
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The tracked phone left school."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
