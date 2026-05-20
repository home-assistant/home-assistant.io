---
title: "Gate closed"
trigger: gate.closed
domain: gate
description: "Triggers after one or more gates close."
related_triggers:
  - gate.opened
---

The **Gate closed** trigger fires when a targeted gate changes to closed. Use it when you want an automation to wait until access is secured again before it runs.

This trigger is useful for turning lights back off, confirming that a gate finished closing, or starting routines that should happen only after the gate is shut.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Gate closed**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your gate is in, like your driveway or courtyard. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, enter how long the gate must stay closed before the trigger fires. Leave it at zero to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple gates are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted gate closes, **First** to fire only when the first targeted gate closes, or **All** to fire only after every targeted gate is closed.
For at least:
  description: How long the gate must stay closed before the trigger fires. Set it to zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `gate.closed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: gate.closed
  target:
    entity_id: cover.driveway_gate
{% endexample %}

This fires when `cover.driveway_gate` closes.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple gates are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the gate must stay closed before the trigger fires.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger works only with `cover` entities that use the `gate` device class.
- If a gate comes back from `unavailable` or `unknown`, that recovery does not count as the gate closing.
- The `for` option only fires the automation if the gate stays closed for the entire time you set.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off the driveway lights after the gate has been closed for 2 minutes

If your driveway lights turn on when the gate opens, this automation turns them back off after the gate has stayed closed for 2 minutes. That gives you enough time to park and walk inside.

- **Trigger**: Gate closed
   - **Target**: Driveway gate
   - **For at least**: 00:02:00
- **Action**: Light: Turn off light

{% details "YAML example for turning off driveway lights after the gate closes" %}

{% example %}
automation: |
  alias: "Turn off driveway lights after the gate closes"
  triggers:
    - trigger: gate.closed
      target:
        entity_id: cover.driveway_gate
      options:
        for: "00:02:00"
  actions:
    - action: light.turn_off
      target:
        entity_id: light.driveway
{% endexample %}

{% enddetails %}

### Automation: lock the side door after the courtyard gate closes

If you use the courtyard gate as your usual way in, you might want the side door to lock only after the gate is shut again. This automation waits for the gate to close, then locks the door.

- **Trigger**: Gate closed
   - **Target**: Courtyard gate
- **Action**: Lock lock

{% details "YAML example for locking the side door after the gate closes" %}

{% example %}
automation: |
  alias: "Lock the side door after the courtyard gate closes"
  triggers:
    - trigger: gate.closed
      target:
        entity_id: cover.courtyard_gate
  actions:
    - action: lock.lock
      target:
        entity_id: lock.side_door
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
