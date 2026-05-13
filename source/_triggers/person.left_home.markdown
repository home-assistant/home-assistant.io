---
title: "Left home"
trigger: person.left_home
domain: person
description: "Triggers when one or more persons leave home."
related_triggers:
  - person.entered_home
---

The **Left home** trigger fires when a person leaves the home zone. Use it for automations like locking up, turning things off, or starting routines that should run only after someone has gone out.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets-of-the-trigger)), pick the person you want to monitor. You can also target an area, floor, device, specific entity, or label if your person entities are organized that way.
5. From the triggers shown for that target, select **Left home**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Any**, **First**, or **Last**.
7. Under **For at least**, set how long the person must stay away before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple people are targeted, controls when the trigger fires. Pick **Any** to fire every time any targeted person leaves home, **First** to fire only when the first targeted person leaves home, or **Last** to fire only after every targeted person has left home.
For at least:
  description: How long the person must stay away before the trigger fires. Leave it at zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `person.left_home`. A basic example looks like this:

{% example %}
trigger: |
  trigger: person.left_home
  target:
    entity_id: person.ada
{% endexample %}

This fires when `person.ada` leaves the home zone.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple people are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: false
  type: string
  default: any
for:
  description: >
    Duration the person must stay away before the trigger fires. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires when a person leaves the home zone, whether the new state becomes `not_home` or another named zone.
- If a person changes from `unavailable` or `unknown`, that recovery does not count as leaving home.
- To react when someone comes back instead, use [Entered home](/triggers/person.entered_home/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: lock the front door when you leave home

This automation locks the front door when Ada leaves home.

- **Trigger**: Left home
  - **Target**: Ada
- **Trigger when**: Any
- **Action**: Lock: Lock

{% details "YAML example for locking the front door" %}

{% example %}
automation: |
  alias: "Lock the front door when Ada leaves home"
  triggers:
    - trigger: person.left_home
      target:
        entity_id: person.ada
  actions:
    - action: lock.lock
      target:
        entity_id: lock.front_door
{% endexample %}

{% enddetails %}

### Automation: arm the alarm when the last person leaves home

This automation waits until both Ada and Stacey have left home before it arms the alarm.

- **Trigger**: Left home
  - **Target**: Ada and Stacey
- **Trigger when**: Last
- **Action**: Alarm control panel: Arm away

{% details "YAML example for arming the alarm when everyone leaves" %}

{% example %}
automation: |
  alias: "Arm the alarm when everyone leaves"
  triggers:
    - trigger: person.left_home
      target:
        entity_id:
          - person.ada
          - person.stacey
      options:
        behavior: last
  actions:
    - action: alarm_control_panel.alarm_arm_away
      target:
        entity_id: alarm_control_panel.home
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
