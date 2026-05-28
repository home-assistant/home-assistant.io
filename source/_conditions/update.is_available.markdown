---
title: "Update is available"
condition: update.is_available
domain: update
description: "Tests if one or more updates are available."
related_conditions:
  - update.is_not_available
---

The **Update is available** condition passes when one or more targeted update
entities are currently available. Use it when an automation should continue
only if a device or service still has an update ready to install.

This condition is useful for scheduled maintenance automations, reminders, and
checks you want to run before installing an update.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** >
   **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Update is available**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)),
   pick the device, area, floor, label, or specific update entity you want to
   evaluate.
6. Under **Condition passes if** (see
   [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the update must have stayed available
   before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple update entities are targeted, controls how results combine. Pick **Any** to pass if at least one targeted update is available, or **All** to pass only when every targeted update is available. The default is **Any**.
For at least:
  description: How long the update must have stayed available before the condition passes. The default is `00:00:00`.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `update.is_available`. A basic example
looks like this:

{% example %}
condition: |
  condition: update.is_available
  target:
    entity_id: update.office_router_firmware
{% endexample %}

This passes when `update.office_router_firmware` is currently available.

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
  default: any
for:
  description: >
    How long the update must have stayed available before the condition passes.
    Use the `HH:MM:SS` format, like `00:10:00` for 10 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition checks update entities whose state is `on`, which means an
  update is available.
- Entities in the `unavailable` or `unknown` state are ignored.
- With **All**, the condition passes only if every available targeted update is
  available. If every targeted entity is `unavailable` or `unknown`, **All**
  passes and **Any** fails.
- If you use `for`, each matching update must stay available for the full time
  you set.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: install an update during the evening if it is still available

If you prefer to install updates at a quieter time, this automation checks each
evening whether an update is still available and starts the installation.

- **Trigger**: Time: 21:00
- **Condition**: Update is available
  - **Target**: Office router update
- **Action**: Install update

{% details "YAML example for installing an update in the evening" %}

{% example %}
automation: |
  alias: "Install an update during the evening if it is still available"
  triggers:
    - trigger: time
      at: "21:00:00"
  conditions:
    - condition: update.is_available
      target:
        entity_id: update.office_router_firmware
  actions:
    - action: update.install
      target:
        entity_id: update.office_router_firmware
{% endexample %}

{% enddetails %}

### Automation: remind yourself every morning about a pending update

If you want a simple daily reminder, this automation checks every morning
whether your media player still has an update available and sends a message if
it does.

- **Trigger**: Time: 08:00
- **Condition**: Update is available
  - **Target**: Living room media player update
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for reminding you about a pending update" %}

{% example %}
automation: |
  alias: "Remind me every morning about a pending update"
  triggers:
    - trigger: time
      at: "08:00:00"
  conditions:
    - condition: update.is_available
      target:
        entity_id: update.living_room_media_player_firmware
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Update still available"
        message: >
          The living room media player still has an update waiting.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
