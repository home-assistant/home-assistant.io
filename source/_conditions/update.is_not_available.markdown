---
title: "Update is not available"
condition: update.is_not_available
domain: update
description: "Tests if one or more updates are not available."
related_conditions:
  - update.is_available
---

The **Update is not available** condition passes when one or more targeted
update entities are currently up to date. Use it when an automation should
continue only if a device or service does not have an update waiting.

This condition is useful for clean-up automations, status checks, and routines
that should run only after everything you target is already up to date.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** >
   **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Update is not available**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)),
   pick the device, area, floor, label, or specific update entity you want to
   evaluate.
6. Under **Condition passes if** (see
   [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the update must have stayed up to
   date before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple update entities are targeted, controls how results combine. Pick **Any** to pass if at least one targeted update is up to date, or **All** to pass only when every targeted update is up to date.
For at least:
  description: How long the update must have stayed up to date before the condition passes.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `update.is_not_available`. A basic example
looks like this:

{% example %}
condition: |
  condition: update.is_not_available
  target:
    entity_id: update.office_router_firmware
{% endexample %}

This passes when `update.office_router_firmware` is currently up to date.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are
not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple update entities are targeted, controls how results combine.
    Accepts `any` or `all`.
  required: false
  type: string
for:
  description: >
    How long the update must have stayed up to date before the condition
    passes. Use the `HH:MM:SS` format, like `00:10:00` for 10 minutes.
  required: false
  type: string
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition checks update entities whose state is `off`, which means no
  update is available.
- Entities in the `unavailable` or `unknown` state are ignored.
- With **All**, the condition passes only if every available targeted update is
  up to date. If every targeted entity is `unavailable` or `unknown`, **All**
  passes and **Any** fails.
- If you use `for`, each matching update must stay up to date for the full time
  you set.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn off a reminder light after the update has been installed

If you use a light as a reminder for pending updates, this automation turns it
off once the update is no longer available.

- **Trigger**: Time: 21:30
- **Condition**: Update is not available
  - **Target**: Guest room speaker update
- **Action**: Turn off light

{% details "YAML example for turning off an update reminder light" %}

{% example %}
automation: |
  alias: "Turn off a reminder light after the update has been installed"
  triggers:
    - trigger: time
      at: "21:30:00"
  conditions:
    - condition: update.is_not_available
      target:
        entity_id: update.guest_room_speaker_firmware
  actions:
    - action: light.turn_off
      target:
        entity_id: light.hallway_lamp
{% endexample %}

{% enddetails %}

### Automation: run a script only after all selected devices are up to date

If you have created a script for a routine that should run only after updates
are done, this automation can wait until every targeted update entity is back
to up to date.

- **Trigger**: Time: 22:00
- **Condition**: Update is not available
  - **Target**: Upstairs update label
  - **Condition passes if**: All
- **Action**: Run script

{% details "YAML example for waiting until updates are done" %}

{% example %}
automation: |
  alias: "Run a script only after all selected devices are up to date"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: update.is_not_available
      target:
        label_id: upstairs_updates
      options:
        behavior: all
  actions:
    - action: script.evening_shutdown
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
