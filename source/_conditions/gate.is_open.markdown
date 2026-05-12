---
title: "Gate is open"
condition: gate.is_open
domain: gate
description: "Tests if one or more gates are open."
related_conditions:
  - gate.is_closed
---

The **Gate is open** condition passes when one or more targeted gates are currently open. Use it when an automation should continue only if a gate is still open at the moment the automation runs.

This condition is useful for reminders, security checks, and routines that should warn you before you leave the property or settle in for the night.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Gate is open**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your gate is in, like your driveway or courtyard. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the gate must have stayed open before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple gates are targeted, controls how results combine. Pick **Any** to pass if at least one targeted gate is open, or **All** to pass only when every targeted gate is open.
For at least:
  description: How long the gate must have stayed open before the condition passes.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `gate.is_open`. A basic example looks like this:

{% example %}
condition: |
  condition: gate.is_open
  target:
    entity_id: cover.driveway_gate
{% endexample %}

This passes when `cover.driveway_gate` is currently open.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple gates are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the gate must have stayed open before the condition passes.
  required: false
  type: time
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition works only with `cover` entities that use the `gate` device class.
- Entities in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- With **Any**, the condition passes if at least one available targeted gate is open.
- With **All**, the condition passes only if every available targeted gate is open. If every targeted gate is `unavailable` or `unknown`, **All** passes and **Any** fails.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: remind you at sunset if the driveway gate is still open

At sunset, this automation checks whether the driveway gate is still open. If it is, Home Assistant sends a reminder so you can secure the property before it gets dark.

- **Trigger**: Sun: Sunset
- **Condition**: Gate is open
  - **Target**: Driveway gate
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: Mobile app

{% details "YAML example for an open-gate reminder at sunset" %}

{% example %}
automation: |
  alias: "Remind me if the driveway gate is open at sunset"
  triggers:
    - trigger: sun
      event: sunset
  conditions:
    - condition: gate.is_open
      target:
        entity_id: cover.driveway_gate
      options:
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_mobile_app
      data:
        title: "Driveway gate is open"
        message: "The driveway gate is still open after sunset."
{% endexample %}

{% enddetails %}

### Automation: warn you if any gate is open when you leave home

When you leave home, this automation checks whether any targeted gate is still open. If one is, you get a warning before you get too far away to do anything about it.

- **Trigger**: Person leaves home zone
- **Condition**: Gate is open
  - **Target**: Driveway gate and courtyard gate
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: Mobile app

{% details "YAML example for checking gates when you leave home" %}

{% example %}
automation: |
  alias: "Warn me if a gate is open when I leave home"
  triggers:
    - trigger: zone
      entity_id: person.frenck
      zone: zone.home
      event: leave
  conditions:
    - condition: gate.is_open
      target:
        entity_id:
          - cover.driveway_gate
          - cover.courtyard_gate
      options:
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_mobile_app
      data:
        title: "A gate is still open"
        message: "The driveway gate or courtyard gate is still open."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
