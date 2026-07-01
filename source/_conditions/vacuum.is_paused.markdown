---
title: Vacuum cleaner is paused
condition: vacuum.is_paused
domain: vacuum
description: "Passes when the vacuum cleaner is paused."
---

The **Vacuum cleaner is paused** condition passes when one or more targeted vacuums are paused in the middle of a cleaning run.

Use this when you want an automation to continue only if the robot is stopped mid-run, like sending a reminder, turning on a nearby light, or resuming later as part of a scheduled routine.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Vacuum cleaner is paused**.
5. Under **Targets**, select the vacuum entity, an area, a floor, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the vacuum must stay paused before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple vacuums are targeted, controls how results combine. Pick **Any** to pass if at least one targeted vacuum is paused, or **All** to pass only when every targeted vacuum is paused.
  required: true
For at least:
  description: The time the vacuum must stay paused before the condition passes.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `vacuum.is_paused`. A basic example looks like this:

{% example %}
condition: |
  condition: vacuum.is_paused
  target:
    entity_id: vacuum.hallway
  options:
    behavior: any
{% endexample %}

This passes when `vacuum.hallway` is paused.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple vacuums are targeted, controls how results combine. Accepts `all` or `any`.
  required: true
  type: string
  default: any
for:
  description: >
    The time the vacuum must stay paused before the condition passes.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Entities with state `unavailable` or `unknown` are ignored when Home Assistant evaluates the condition.
- With **Any** (default), the condition passes if at least one targeted vacuum is paused.
- With **All**, the condition passes only if every targeted vacuum that Home Assistant can evaluate is paused.
- If every targeted vacuum is `unavailable` or `unknown`, **Any** fails and **All** passes.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: remind you if the vacuum is still paused

This automation checks every 15 minutes whether the hallway vacuum is paused. If it is, Home Assistant sends a reminder so you can decide whether to resume it or clear an obstacle.

- **Trigger**: Every 15 minutes
- **Condition**: Vacuum cleaner is paused
  - **Target**: Hallway vacuum
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a paused vacuum reminder" %}

{% example %}
automation: |
  alias: "Reminder for paused vacuum"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  conditions:
    - condition: vacuum.is_paused
      target:
        entity_id: vacuum.hallway
      options:
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Vacuum is paused"
        message: "The hallway vacuum is still paused."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
