---
title: Vacuum is encountering an error
condition: vacuum.is_encountering_an_error
domain: vacuum
description: "Passes when the vacuum cleaner is in an error state."
---

The **Vacuum cleaner is encountering an error** condition passes when one or more targeted vacuums are in an error state.

Use this when you want an automation to act only if the robot still needs attention, like sending a reminder later in the day, turning on a helper light, or skipping a follow-up routine until the issue is fixed.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Vacuum: Vacuum cleaner is encountering an error**.
5. Under **Targets**, select the vacuum entity, an area, a floor, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Each** or **All**.
7. Under **For at least**, enter how long the vacuum must remain in the error state before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple vacuums are targeted, controls how results combine. Pick **Each** to pass if at least one targeted vacuum is in an error state, or **All** to pass only when every targeted vacuum is in an error state.
  required: true
For at least:
  description: The time the vacuum must remain in the error state before the condition passes.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `vacuum.is_encountering_an_error`. A basic example looks like this:

{% example %}
condition: |
  condition: vacuum.is_encountering_an_error
  target:
    entity_id: vacuum.upstairs
  options:
    behavior: each
{% endexample %}

This passes when `vacuum.upstairs` is reporting an error.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple vacuums are targeted, controls how results combine. Accepts `all` or `each`.
  required: true
  type: string
  default: each
for:
  description: >
    The time the vacuum must remain in the error state before the condition passes.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Entities with state `unavailable` or `unknown` are ignored when Home Assistant evaluates the condition.
- With **Each** (default), the condition passes if at least one targeted vacuum is in an error state.
- With **All**, the condition passes only if every targeted vacuum that Home Assistant can evaluate is in an error state.
- If every targeted vacuum is `unavailable` or `unknown`, **Each** fails and **All** passes.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: remind you about an unresolved vacuum error

This automation checks every evening whether the upstairs vacuum is still in an error state. If it is, Home Assistant sends a reminder so the problem does not go unnoticed until the next cleaning run.

- **Trigger**: Time: 18:00
- **Condition**: Vacuum is encountering an error
  - **Target**: Upstairs vacuum
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an unresolved vacuum error reminder" %}

{% example %}
automation: |
  alias: "Reminder for vacuum error"
  triggers:
    - trigger: time
      at: "18:00:00"
  conditions:
    - condition: vacuum.is_encountering_an_error
      target:
        entity_id: vacuum.upstairs
      options:
        behavior: each
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Vacuum still needs help"
        message: "The upstairs vacuum is still reporting an error."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
